function mdSection(title, items) {
  if (!items || items.length === 0) return '';
  const lines = [];
  lines.push(`### ${title}`);
  for (const it of items) {
    lines.push(`- ${it.bullet}`);
  }
  return lines.join('\n');
}

function renderChangelogSection(buckets, context, config = {}) {
  const lines = [];
  lines.push(`## ${context.title}`);
  lines.push('');

  if (config.productName || config.website) {
    const meta = [];
    if (config.productName) meta.push(config.productName);
    if (config.website) meta.push(config.website);
    lines.push(`_(${meta.join(' · ')})_`);
    lines.push('');
  }

  const defaultKeys = ['Breaking', 'Added', 'Fixed', 'Security', 'Changed', 'Dependencies', 'Other'];
  const keys = Array.isArray(config.sectionsOrder) ? config.sectionsOrder : defaultKeys;

  for (const k of keys) {
    if (k === 'Breaking') {
      const breaking = mdSection('Breaking Changes', buckets.Breaking);
      if (breaking) {
        lines.push(breaking);
        lines.push('');
      }
      continue;
    }
    const sec = mdSection(k, buckets[k]);
    if (sec) {
      lines.push(sec);
      lines.push('');
    }
  }

  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  lines.push('');
  return lines.join('\n');
}

module.exports = {
  renderChangelogSection,
};
