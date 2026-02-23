#!/usr/bin/env node

const { main } = require('../src/index');

main(process.argv).catch((err) => {
  const msg = err && err.message ? err.message : String(err);
  // Keep stderr terse but useful.
  process.stderr.write(`release-engine: ${msg}\n`);
  process.exitCode = typeof err?.exitCode === 'number' ? err.exitCode : 1;
});
