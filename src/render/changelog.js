function mdSection(title, items) {
  if (!items || items.length === 0) return '';
  const lines = [];
  lines.push(`### ${title}`);
  for (const it of items) {
    lines.push(`- ${it.bullet}`);
  }
  return lines.join('\n');
}

function renderChangelogSection(buckets, context) {
  const lines = [];
  lines.push(`## ${context.title}`);
  lines.push('');

  // Breaking first if present.
  const breaking = mdSection('Breaking Changes', buckets.Breaking);
  if (breaking) {
    lines.push(breaking);
    lines.push('');
  }

  for (const key of ['Added', 'Changed', 'Fixed', 'Other']) {
    const sec = mdSection(key, buckets[key]);
    if (sec) {
      lines.push(sec);
      lines.push('');
    }
  }

  // Trim trailing blank line.
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  lines.push('');
  return lines.join('\n');
}

module.exports = {
  renderChangelogSection,
};
