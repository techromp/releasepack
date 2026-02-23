function section(title, items) {
  if (!items || items.length === 0) return null;
  const out = [];
  out.push(`## ${title}`);
  for (const it of items) out.push(`- ${it.bullet}`);
  out.push('');
  return out.join('\n');
}

function renderReleaseNotes(buckets, context) {
  const lines = [];
  lines.push(`# ${context.title}`);
  lines.push('');
  lines.push(`Generated from git range: ${context.range || `last ${context.commitCount} commits`}`);
  lines.push('');

  const order = [
    ['Breaking Changes', buckets.Breaking],
    ['Added', buckets.Added],
    ['Changed', buckets.Changed],
    ['Fixed', buckets.Fixed],
    ['Other', buckets.Other],
  ];

  for (const [t, items] of order) {
    const s = section(t, items);
    if (s) lines.push(s);
  }

  // Trim trailing whitespace
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  lines.push('');
  return lines.join('\n');
}

module.exports = {
  renderReleaseNotes,
};
