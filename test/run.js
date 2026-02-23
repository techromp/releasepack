const assert = require('assert');
const path = require('path');
const fs = require('fs');

const { classifyCommits } = require('../src/classify');
const { renderSocialX } = require('../src/render/socialX');

function loadFixture(name) {
  const p = path.join(__dirname, 'fixtures', name);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function run() {
  const commits = loadFixture('commits.json');
  const buckets = classifyCommits(commits);
  const ctx = {
    title: 'Release v0.1.0',
    range: 'v0.0.9..HEAD',
    commitCount: commits.length,
  };

  const out1 = renderSocialX(buckets, ctx);
  const out2 = renderSocialX(buckets, ctx);

  // <= 280 chars
  assert.ok(out1.length <= 280 + 1, `social-x.txt too long: ${out1.length}`); // includes trailing newline

  // Deterministic
  assert.strictEqual(out1, out2, 'social-x output must be deterministic');

  // Snapshot (exact expected)
  const expected = 'Release v0.1.0: add export command • handle empty range • sanitize jwt parsing (and more)\n';
  assert.strictEqual(out1, expected, 'social-x output mismatch');

  process.stdout.write('ok\n');
}

run();
