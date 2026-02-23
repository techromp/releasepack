# releasepack

Deterministic, offline CLI that generates release communication artifacts from your git history.

## What it generates

Running `releasepack generate` produces **three files** (ready to paste):

- `changelog-section.md`
- `release-notes.md`
- `social-x.txt`

## Quickstart (no install)

```bash
npx releasepack generate
```

Outputs are written to `./releasepack-out/` by default.

## Install globally

```bash
npm i -g releasepack
releasepack generate
```

## Example commands

```bash
# Default: latest tag..HEAD (if tags exist), otherwise last 20 commits
releasepack generate

# Choose a range explicitly
releasepack generate --from v1.2.0 --to HEAD

# No tags repo: choose last 50 commits
releasepack generate -n 50

# Write to a custom output folder
releasepack generate --out ./out

# Preview in your terminal (no files written)
releasepack generate --dry-run
```

## Deterministic / offline

`releasepack` does not use an LLM and makes no network calls. Given the same repo state and commit range, it will generate the same output.

## License

MIT
