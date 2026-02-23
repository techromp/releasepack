function parseConventionalType(subject) {
  // e.g. feat(api)!: add new endpoint
  const m = subject.match(/^([a-zA-Z]+)(\([^\)]+\))?(!)?:\s+/);
  if (!m) return null;
  return {
    type: m[1].toLowerCase(),
    breaking: Boolean(m[3]),
  };
}

function heuristicType(subject) {
  const s = subject.toLowerCase();
  if (s.includes('fix') || s.startsWith('fix ') || s.startsWith('bug')) return 'fix';
  if (s.includes('add') || s.includes('introduc') || s.includes('create')) return 'feat';
  if (s.includes('remove') || s.includes('delete')) return 'change';
  if (s.includes('refactor')) return 'refactor';
  if (s.includes('perf') || s.includes('speed') || s.includes('optimiz')) return 'perf';
  if (s.includes('doc')) return 'docs';
  return 'other';
}

function bucketForType(type) {
  switch (type) {
    case 'feat':
      return 'Added';
    case 'fix':
      return 'Fixed';
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
    Changed: [],
    Fixed: [],
    Other: [],
    Breaking: [],
  };

  for (const c of commits) {
    const conv = parseConventionalType(c.subject);
    const type = conv ? conv.type : heuristicType(c.subject);

    const breaking = (conv && conv.breaking) || /BREAKING CHANGE/i.test(c.body);
    const bullet = cleanSubject(c.subject);

    if (breaking) {
      buckets.Breaking.push({ ...c, bullet });
    }

    const bucket = bucketForType(type);
    buckets[bucket].push({ ...c, bullet });
  }

  return buckets;
}

module.exports = {
  classifyCommits,
};
