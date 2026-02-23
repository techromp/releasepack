const { Command } = require('commander');
const path = require('path');

const { ensureGitRepo, resolveRange, getCommits } = require('./git');
const { classifyCommits } = require('./classify');
const { renderChangelogSection } = require('./render/changelog');
const { renderReleaseNotes } = require('./render/releaseNotes');
const { renderSocialX } = require('./render/socialX');
const { writeOutputs, printDryRun } = require('./io');

function buildProgram() {
  const program = new Command();

  program
    .name('release-engine')
    .description('Generate release artifacts from git history (deterministic, offline).')
    .version('0.1.0');

  program
    .command('generate')
    .description('Generate changelog-section.md, release-notes.md, and social-x.txt')
    .option('--out <dir>', 'output directory', './release-engine-out')
    .option('--from <ref>', 'starting git ref (tag/sha/branch)')
    .option('--to <ref>', 'ending git ref (tag/sha/branch)', 'HEAD')
    .option('-n, --commits <number>', 'fallback number of commits when no tags and no explicit range', (v) => parseInt(v, 10), 20)
    .option('--title <string>', 'release title (optional)')
    .option('--dry-run', 'print outputs to stdout (do not write files)', false)
    .option('--verbose', 'print resolved range and counts', false)
    .action(async (opts) => {
      ensureGitRepo();

      const rangeInfo = resolveRange({
        from: opts.from,
        to: opts.to,
        fallbackCommits: opts.commits,
      });

      const commits = getCommits(rangeInfo);
      const classified = classifyCommits(commits);

      const title = opts.title || rangeInfo.title;
      const context = {
        title,
        range: rangeInfo.range,
        from: rangeInfo.from,
        to: rangeInfo.to,
        commitCount: commits.length,
      };

      const outDir = path.resolve(process.cwd(), opts.out);

      const outputs = {
        'changelog-section.md': renderChangelogSection(classified, context),
        'release-notes.md': renderReleaseNotes(classified, context),
        'social-x.txt': renderSocialX(classified, context),
      };

      if (opts.verbose) {
        const rangeLabel = rangeInfo.range ? rangeInfo.range : `last ${rangeInfo.fallbackCommits} commits`;
        process.stderr.write(`Resolved range: ${rangeLabel}\n`);
        process.stderr.write(`Commits: ${commits.length}\n`);
      }

      if (opts.dryRun) {
        printDryRun(outputs);
        return;
      }

      writeOutputs(outDir, outputs);
      process.stdout.write(`Wrote ${Object.keys(outputs).length} files to ${outDir}\n`);
    });

  return program;
}

async function main(argv) {
  const program = buildProgram();
  await program.parseAsync(argv);
}

module.exports = { main, buildProgram };
