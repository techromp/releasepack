const assert = require('assert');
const path = require('path');
const fs = require('fs');

const os = require('os');

const { loadConfig } = require('../src/config');
const { classifyCommits } = require('../src/classify');
const { renderChangelogSection } = require('../src/render/changelog');
const { renderReleaseNotes } = require('../src/render/releaseNotes');
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

  // --- social-x default output stays stable
  const out1 = renderSocialX(buckets, ctx);
  const out2 = renderSocialX(buckets, ctx);

  // <= 280 chars
  assert.ok(out1.length <= 280 + 1, `social-x.txt too long: ${out1.length}`); // includes trailing newline

  // Deterministic
  assert.strictEqual(out1, out2, 'social-x output must be deterministic');

  // Snapshot (exact expected)
  const expected = 'Release v0.1.0: add export command • handle empty range • sanitize jwt parsing (and more)\n';
  assert.strictEqual(out1, expected, 'social-x output mismatch');

  // --- config parsing (YAML and JSON)
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'releasepack-test-'));
  const ymlPath = path.join(tmp, 'releasepack.yml');
  fs.writeFileSync(
    ymlPath,
    [
      'productName: DemoProduct',
      'website: https://example.com',
      'tone: technical',
      'audience: developers',
      'xHandle: demo',
      'signature: "— Demo"',
      'sectionsOrder: [Added, Fixed, Security, Changed, Dependencies, Other, Breaking]',
      '',
    ].join('\n'),
    'utf8',
  );

  const loadedYml = loadConfig({ cwd: tmp });
  assert.strictEqual(loadedYml.path, ymlPath);
  assert.strictEqual(loadedYml.config.productName, 'DemoProduct');
  assert.strictEqual(loadedYml.config.website, 'https://example.com');
  assert.strictEqual(loadedYml.config.tone, 'technical');
  assert.strictEqual(loadedYml.config.audience, 'developers');
  assert.strictEqual(loadedYml.config.xHandle, 'demo');
  assert.strictEqual(loadedYml.config.signature, '— Demo');
  assert.ok(Array.isArray(loadedYml.config.sectionsOrder));

  const jsonPath = path.join(tmp, 'releasepack.json');
  fs.writeFileSync(
    jsonPath,
    JSON.stringify({ productName: 'JsonProduct', tone: 'neutral' }, null, 2),
    'utf8',
  );

  // YAML takes precedence when both exist
  const loadedBoth = loadConfig({ cwd: tmp });
  assert.strictEqual(loadedBoth.config.productName, 'DemoProduct');

  // Explicit --config override
  const loadedJson = loadConfig({ cwd: tmp, configPath: jsonPath });
  assert.strictEqual(loadedJson.path, jsonPath);
  assert.strictEqual(loadedJson.config.productName, 'JsonProduct');

  // --- renderer integration
  const config = loadedYml.config;
  const changelog = renderChangelogSection(buckets, ctx, config);
  const notes = renderReleaseNotes(buckets, ctx, config);
  const social = renderSocialX(buckets, ctx, config);

  assert.ok(changelog.includes('_(DemoProduct · https://example.com)_'), 'changelog should include product + website');
  assert.ok(notes.includes('Product: DemoProduct'), 'release notes should include product');
  assert.ok(notes.includes('Website: https://example.com'), 'release notes should include website');
  assert.ok(notes.includes('— Demo'), 'release notes should include signature');
  assert.ok(social.includes('@demo') || social.includes('@Demo'), 'social should include xHandle');

  process.stdout.write('ok\n');
}

run();
