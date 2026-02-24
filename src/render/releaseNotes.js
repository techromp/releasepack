function section(title, items) {
  if (!items || items.length === 0) return null;
  const out = [];
  out.push(`## ${title}`);
  for (const it of items) out.push(`- ${it.bullet}`);
  out.push('');
  return out.join('\n');
}

function renderReleaseNotes(buckets, context, config = {}) {
  const lines = [];
  lines.push(`# ${context.title}`);
  lines.push('');

  if (config.productName) lines.push(`Product: ${config.productName}`);
  if (config.website) lines.push(`Website: ${config.website}`);
  if (config.audience && config.audience !== 'general') lines.push(`Audience: ${config.audience}`);
  if (config.tone && config.tone !== 'neutral') lines.push(`Tone: ${config.tone}`);
  if (context.configPath) lines.push(`Config: ${context.configPath}`);

  if (config.productName || config.website || (config.audience && config.audience !== 'general') || (config.tone && config.tone !== 'neutral') || context.configPath) {
    lines.push('');
  }

  lines.push(`Generated from git range: ${context.range || `last ${context.commitCount} commits`}`);
  lines.push('');

  const defaultOrder = [
    ['Breaking Changes', buckets.Breaking],
    ['Added', buckets.Added],
    ['Fixed', buckets.Fixed],
    ['Security', buckets.Security],
    ['Changed', buckets.Changed],
    ['Dependencies', buckets.Dependencies],
    ['Docs', buckets.Docs],
    ['Tests', buckets.Tests],
    ['CI', buckets.CI],
    ['Build', buckets.Build],
    ['Other', buckets.Other],
  ];

  const map = new Map([
    ['Breaking', ['Breaking Changes', buckets.Breaking]],
    ['Added', ['Added', buckets.Added]],
    ['Fixed', ['Fixed', buckets.Fixed]],
    ['Security', ['Security', buckets.Security]],
    ['Changed', ['Changed', buckets.Changed]],
    ['Dependencies', ['Dependencies', buckets.Dependencies]],
    ['Docs', ['Docs', buckets.Docs]],
    ['Tests', ['Tests', buckets.Tests]],
    ['CI', ['CI', buckets.CI]],
    ['Build', ['Build', buckets.Build]],
    ['Other', ['Other', buckets.Other]],
  ]);

  const order = Array.isArray(config.sectionsOrder)
    ? config.sectionsOrder.map((k) => map.get(k)).filter(Boolean)
    : defaultOrder;

  for (const [t, items] of order) {
    const s = section(t, items);
    if (s) lines.push(s);
  }

  if (config.signature) {
    lines.push('');
    lines.push('---');
    lines.push(String(config.signature).trim());
    lines.push('');
  }

  // Trim trailing whitespace
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  lines.push('');
  return lines.join('\n');
}

module.exports = {
  renderReleaseNotes,
};
