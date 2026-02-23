const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeOutputs(outDir, outputs) {
  ensureDir(outDir);
  for (const [name, content] of Object.entries(outputs)) {
    const p = path.join(outDir, name);
    fs.writeFileSync(p, content, 'utf8');
  }
}

function printDryRun(outputs) {
  const names = Object.keys(outputs);
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    process.stdout.write(`--- ${name} ---\n`);
    process.stdout.write(outputs[name]);
    if (!outputs[name].endsWith('\n')) process.stdout.write('\n');
    if (i !== names.length - 1) process.stdout.write('\n');
  }
}

module.exports = {
  writeOutputs,
  printDryRun,
};
