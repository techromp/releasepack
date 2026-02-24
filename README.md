# releasepack

Deterministic, offline CLI that generates release communication artifacts from your git history.

## Install / run (no install)

```bash
npx releasepack@latest generate
```

By default it writes outputs to `./releasepack-out/`.

## What it generates

`releasepack generate` produces **three paste-ready files**:

- `changelog-section.md`
- `release-notes.md`
- `social-x.txt`

## Example

```bash
# Default: latest tag..HEAD (if tags exist), otherwise last 20 commits
releasepack generate

# Or choose a range explicitly
releasepack generate --from v1.2.0 --to HEAD

# Preview in your terminal (no files written)
releasepack generate --dry-run
```

Sample output snippet:

```text
--- release-notes.md ---
# Demo Release v0.0.1

Generated from git range: last 5 commits

## Added
- add export command

## Fixed
- handle empty range
```

See `docs/demo.txt` for a full deterministic demo run.

## Deterministic / offline

- **No LLM**
- **No OAuth**
- **No API calls**
- **No network access required**

Given the same repo state and commit range, `releasepack` produces the same output.

## Roadmap

- GitHub Action: generate artifacts on tag push and attach to Releases
- Template selection: choose tone/output format (SaaS, OSS, enterprise, hotfix)
- CI mode: machine-friendly output + exit codes for required sections

---

### Links

- npm: https://www.npmjs.com/package/releasepack

Optional Pro Kit (templates + checklists): https://gumroad.com/l/releasepack-pro-kit

## License

MIT
