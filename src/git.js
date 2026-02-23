const { execSync } = require('child_process');

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function ensureGitRepo() {
  try {
    const inside = run('git rev-parse --is-inside-work-tree');
    if (inside !== 'true') {
      const err = new Error('not inside a git work tree');
      err.exitCode = 1;
      throw err;
    }
  } catch (e) {
    const stderr = e && e.stderr ? String(e.stderr) : '';
    const msg = stderr.includes('not a git repository')
      ? 'not a git repository (run inside a repo)'
      : 'git not available or not a git repository';
    const err = new Error(msg);
    err.exitCode = 1;
    throw err;
  }
}

function getLatestTag() {
  try {
    const tag = run('git describe --tags --abbrev=0');
    return tag || null;
  } catch {
    return null;
  }
}

function resolveRange({ from, to, fallbackCommits }) {
  const latestTag = getLatestTag();

  let resolvedFrom = from || null;
  let resolvedTo = to || 'HEAD';
  let range = null;
  let title = null;

  if (resolvedFrom) {
    range = `${resolvedFrom}..${resolvedTo}`;
    title = `Release ${resolvedTo}`;
    return {
      mode: 'range',
      from: resolvedFrom,
      to: resolvedTo,
      range,
      title,
      fallbackCommits,
      latestTag,
    };
  }

  if (latestTag) {
    resolvedFrom = latestTag;
    resolvedTo = 'HEAD';
    range = `${latestTag}..HEAD`;
    title = `Release ${latestTag}`;
    return {
      mode: 'latestTag',
      from: resolvedFrom,
      to: resolvedTo,
      range,
      title,
      fallbackCommits,
      latestTag,
    };
  }

  // No tags, no explicit range: use last N commits.
  title = `Release (last ${fallbackCommits} commits)`;
  return {
    mode: 'lastN',
    from: null,
    to: 'HEAD',
    range: null,
    title,
    fallbackCommits,
    latestTag: null,
  };
}

function getCommits(rangeInfo) {
  // Use ASCII unit/record separators for robust parsing.
  const RS = '\x1e'; // record separator
  const US = '\x1f'; // unit separator

  let cmd = 'git log --no-color ';
  if (rangeInfo.mode === 'range' || rangeInfo.mode === 'latestTag') {
    cmd += `${rangeInfo.range} `;
  } else {
    cmd += `-n ${rangeInfo.fallbackCommits} `;
  }

  // hash, subject, body
  cmd += `--pretty=format:%H${US}%s${US}%b${RS}`;

  let out;
  try {
    out = execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    const err = new Error('failed to read git log');
    err.exitCode = 1;
    throw err;
  }

  const records = out.split('\x1e').map((s) => s.trim()).filter(Boolean);
  const commits = records.map((rec) => {
    const parts = rec.split('\x1f');
    const hash = (parts[0] || '').trim();
    const subject = (parts[1] || '').trim();
    const body = (parts[2] || '').trim();
    return { hash, subject, body };
  }).filter((c) => c.hash && c.subject);

  if (commits.length === 0) {
    const err = new Error('no commits found for the selected range');
    err.exitCode = 1;
    throw err;
  }

  return commits;
}

module.exports = {
  ensureGitRepo,
  resolveRange,
  getCommits,
};
