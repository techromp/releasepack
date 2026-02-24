const fs = require('fs');
const path = require('path');

let YAML;

function tryReadFile(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function isObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function normalizeSectionsOrder(val) {
  if (!Array.isArray(val)) return null;
  const allowed = new Set([
    'Breaking',
    'Added',
    'Fixed',
    'Security',
    'Changed',
    'Dependencies',
    'Docs',
    'Tests',
    'CI',
    'Build',
    'Other',
  ]);

  const out = [];
  for (const raw of val) {
    if (typeof raw !== 'string') continue;
    const s = raw.trim();
    if (!s) continue;
    // Accept a few common variants.
    const normalized =
      s.toLowerCase() === 'breaking changes' ? 'Breaking' :
      s.toLowerCase() === 'breaking' ? 'Breaking' :
      s.toLowerCase() === 'dependencies' ? 'Dependencies' :
      s.toLowerCase() === 'security' ? 'Security' :
      s.toLowerCase() === 'added' ? 'Added' :
      s.toLowerCase() === 'fixed' ? 'Fixed' :
      s.toLowerCase() === 'changed' ? 'Changed' :
      s.toLowerCase() === 'docs' ? 'Docs' :
      s.toLowerCase() === 'tests' ? 'Tests' :
      s.toLowerCase() === 'ci' ? 'CI' :
      s.toLowerCase() === 'build' ? 'Build' :
      s.toLowerCase() === 'other' ? 'Other' :
      null;

    const key = normalized || s;
    if (!allowed.has(key)) continue;
    if (!out.includes(key)) out.push(key);
  }

  return out.length ? out : null;
}

function applyDefaults(cfg) {
  const out = {
    productName: cfg.productName,
    website: cfg.website,
    tone: cfg.tone || 'neutral',
    audience: cfg.audience || 'general',
    xHandle: cfg.xHandle,
    signature: cfg.signature,
    sectionsOrder: normalizeSectionsOrder(cfg.sectionsOrder),
  };

  // Remove empty strings.
  for (const k of Object.keys(out)) {
    if (typeof out[k] === 'string' && out[k].trim() === '') out[k] = undefined;
  }

  return out;
}

function parseJsonConfig(text) {
  try {
    const obj = JSON.parse(text);
    if (!isObject(obj)) return null;
    return obj;
  } catch {
    return null;
  }
}

function parseYamlConfig(text) {
  if (!YAML) YAML = require('yaml');
  try {
    const obj = YAML.parse(text);
    if (!isObject(obj)) return null;
    return obj;
  } catch {
    return null;
  }
}

function resolveConfigPath({ cwd, overridePath }) {
  if (overridePath) {
    const p = path.resolve(cwd, overridePath);
    return p;
  }

  const yml = path.join(cwd, 'releasepack.yml');
  const json = path.join(cwd, 'releasepack.json');

  if (fs.existsSync(yml)) return yml;
  if (fs.existsSync(json)) return json;
  return null;
}

function loadConfig({ cwd = process.cwd(), configPath }) {
  const p = resolveConfigPath({ cwd, overridePath: configPath });
  if (!p) {
    return { path: null, config: applyDefaults({}) };
  }

  const text = tryReadFile(p);
  if (text == null) {
    const err = new Error(`failed to read config: ${p}`);
    err.exitCode = 1;
    throw err;
  }

  const ext = path.extname(p).toLowerCase();
  const parsed =
    ext === '.json' ? parseJsonConfig(text) :
    ext === '.yml' || ext === '.yaml' ? parseYamlConfig(text) :
    // If user passes --config without extension, try JSON then YAML.
    parseJsonConfig(text) || parseYamlConfig(text);

  if (!parsed) {
    const err = new Error(`invalid config format: ${p}`);
    err.exitCode = 1;
    throw err;
  }

  return { path: p, config: applyDefaults(parsed) };
}

module.exports = {
  loadConfig,
  resolveConfigPath,
};
