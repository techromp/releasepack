# GitHub Action example

This repo includes an example GitHub Actions workflow that runs `releasepack` and uploads the generated files as build artifacts.

## What it does

On a tag push (e.g. `v0.2.0`) or manual trigger, the workflow runs:

```bash
npx releasepack@latest generate --out releasepack-out
```

…and uploads `releasepack-out/` using `actions/upload-artifact`.

## Setup

1) Copy the workflow into your repo:

- `.github/workflows/releasepack.yml`

2) (Optional) Add `releasepack.yml` in your repo root to customize output.

3) Push a tag:

```bash
git tag v0.2.0
git push origin v0.2.0
```

Or run it manually:
- GitHub → **Actions** → **releasepack** → **Run workflow**

## Download artifacts

After the workflow completes:

1) Open the workflow run in GitHub Actions.
2) In the **Artifacts** section, download **releasepack-out**.
3) Unzip it to get:
   - `changelog-section.md`
   - `release-notes.md`
   - `social-x.txt`

## Notes

- The example uses Node 20.
- This workflow is intentionally minimal; it doesn’t create a GitHub Release by itself.
