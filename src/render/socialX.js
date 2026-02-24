function truncateTo280(s) {
  if (s.length <= 280) return s;
  // Reserve 1 char for ellipsis.
  return s.slice(0, 279).replace(/\s+\S*$/, '').trimEnd() + '…';
}

function pickTopBullets(buckets, max) {
  // Prefer Added then Fixed then Security. Keep deterministic; ignore Breaking in v0.1 X post.
  const order = ['Added', 'Fixed', 'Security', 'Changed', 'Dependencies', 'Docs', 'Tests', 'CI', 'Build', 'Other'];
  const map = {
    Added: buckets.Added || [],
    Fixed: buckets.Fixed || [],
    Security: buckets.Security || [],
    Changed: buckets.Changed || [],
    Dependencies: buckets.Dependencies || [],
    Docs: buckets.Docs || [],
    Tests: buckets.Tests || [],
    CI: buckets.CI || [],
    Build: buckets.Build || [],
    Other: buckets.Other || [],
  };

  const picked = [];
  for (const k of order) {
    for (const it of map[k]) {
      if (it.isBreaking) continue;
      picked.push(it.bullet);
      if (picked.length >= max) return picked;
    }
  }
  return picked;
}

function renderSocialX(buckets, context, config = {}) {
  const bullets = pickTopBullets(buckets, 3);

  let base = `${context.title}: `;
  if (bullets.length === 0) {
    base += 'Update released.';
    return truncateTo280(base) + '\n';
  }

  base += bullets.join(' • ');

  const total =
    (buckets.Added?.length || 0) +
    (buckets.Fixed?.length || 0) +
    (buckets.Security?.length || 0) +
    (buckets.Changed?.length || 0) +
    (buckets.Dependencies?.length || 0) +
    (buckets.Docs?.length || 0) +
    (buckets.Tests?.length || 0) +
    (buckets.CI?.length || 0) +
    (buckets.Build?.length || 0) +
    (buckets.Other?.length || 0) +
    (buckets.Breaking?.length || 0);

  if (total > bullets.length) base += ' (and more)';

  // Optional: add handle and/or website if it fits.
  const extras = [];
  if (config.xHandle) {
    const h = String(config.xHandle).trim();
    if (h) extras.push(h.startsWith('@') ? h : `@${h}`);
  }
  if (config.website) {
    const w = String(config.website).trim();
    if (w) extras.push(w);
  }
  if (extras.length) {
    const candidate = `${base} — ${extras.join(' · ')}`;
    base = truncateTo280(candidate);
    return base + '\n';
  }

  return truncateTo280(base) + '\n';
}

module.exports = {
  renderSocialX,
};
