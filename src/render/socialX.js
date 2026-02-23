function truncateTo280(s) {
  if (s.length <= 280) return s;
  // Reserve 1 char for ellipsis.
  return s.slice(0, 279).replace(/\s+\S*$/, '').trimEnd() + '…';
}

function pickTopBullets(buckets, max) {
  // Prefer Added then Fixed then Security. Keep deterministic; ignore Breaking in v0.1 X post.
  const order = ['Added', 'Fixed', 'Security', 'Changed', 'Dependencies', 'Other'];
  const map = {
    Added: buckets.Added || [],
    Fixed: buckets.Fixed || [],
    Security: buckets.Security || [],
    Changed: buckets.Changed || [],
    Dependencies: buckets.Dependencies || [],
    Other: buckets.Other || [],
  };

  const picked = [];
  for (const k of order) {
    for (const it of map[k]) {
      picked.push(it.bullet);
      if (picked.length >= max) return picked;
    }
  }
  return picked;
}

function renderSocialX(buckets, context) {
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
    (buckets.Other?.length || 0) +
    (buckets.Breaking?.length || 0);

  if (total > bullets.length) base += ' (and more)';

  return truncateTo280(base) + '\n';
}

module.exports = {
  renderSocialX,
};
