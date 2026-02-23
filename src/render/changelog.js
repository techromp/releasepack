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

  // Order: Breaking, Added, Fixed, Security, Changed, Dependencies, Other
  const breaking = mdSection('Breaking Changes', buckets.Breaking);
  if (breaking) {
    lines.push(breaking);
    lines.push('');
  }

  for (const key of ['Added', 'Fixed', 'Security', 'Changed', 'Dependencies', 'Other']) {
    const sec = mdSection(key, buckets[key]);
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
