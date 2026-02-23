function parseConventional(subject) {
  // e.g. feat(api)!: add new endpoint
  const m = subject.match(/^([a-zA-Z]+)(\(([^\)]+)\))?(!)?:\s+/);
  if (!m) return null;
  return {
    type: m[1].toLowerCase(),
    scope: (m[3] || '').toLowerCase() || null,
    breaking: Boolean(m[4]),
  };
}

function includesAny(haystack, needles) {
  return needles.some((n) => haystack.includes(n));
}

function heuristicType(subject) {
  const s = subject.toLowerCase();

  // Security first
  if (includesAny(s, ['cve', 'vuln', 'security', 'xss', 'csrf', 'sanitize', 'auth', 'jwt'])) return 'security';

  // Dependencies
  if (includesAny(s, ['bump', 'upgrade', 'dependabot', 'dependency', 'deps'])) return 'deps';

  if (s.includes('fix') || s.startsWith('fix ') || s.startsWith('bug')) return 'fix';
  if (s.includes('add') || s.includes('introduc') || s.includes('create')) return 'feat';
  if (s.includes('remove') || s.includes('delete')) return 'change';
  if (s.includes('refactor')) return 'refactor';
  if (s.includes('perf') || s.includes('speed') || s.includes('optimiz')) return 'perf';
  if (s.includes('doc')) return 'docs';
  return 'other';
}

function bucketFor({ conv, type }) {
  // Explicit conventional commit mapping overrides generic buckets.
  if (conv) {
    if (conv.type === 'security') return 'Security';
    if (conv.type === 'deps') return 'Dependencies';
    if (conv.scope === 'deps' && (conv.type === 'build' || conv.type === 'chore')) return 'Dependencies';
  }

  switch (type) {
    case 'feat':
      return 'Added';
    case 'fix':
      return 'Fixed';
    case 'security':
      return 'Security';
    case 'deps':
      return 'Dependencies';
    case 'perf':
      return 'Changed';
    case 'refactor':
      return 'Changed';
    case 'docs':
      return 'Changed';
    case 'chore':
    case 'build':
    case 'ci':
    case 'test':
    case 'style':
      return 'Changed';
    case 'change':
      return 'Changed';
    default:
      return 'Other';
  }
}

function cleanSubject(subject) {
  // Strip conventional prefix to keep bullets readable.
  const m = subject.match(/^([a-zA-Z]+)(\([^\)]+\))?(!)?:\s+(.*)$/);
  if (m && m[4]) return m[4].trim();
  return subject.trim();
}

function classifyCommits(commits) {
  const buckets = {
    Added: [],
    Fixed: [],
    Security: [],
    Changed: [],
    Dependencies: [],
    Other: [],
    Breaking: [],
  };

  for (const c of commits) {
    const conv = parseConventional(c.subject);
    const type = conv ? conv.type : heuristicType(c.subject);

    const breaking = (conv && conv.breaking) || /BREAKING CHANGE/i.test(c.body);
    const bullet = cleanSubject(c.subject);

    if (breaking) {
      buckets.Breaking.push({ ...c, bullet });
    }

    const bucket = bucketFor({ conv, type });
    buckets[bucket].push({ ...c, bullet });
  }

  return buckets;
}

module.exports = {
  classifyCommits,
};
