# releasepack config

`releasepack` can optionally load repo-local configuration to tailor output (branding + ordering) while keeping the CLI deterministic and offline.

## Supported config files

At the **repo root** (current working directory), `releasepack` will load one of:

- `releasepack.yml` (preferred if present)
- `releasepack.json`

You can override with:

```bash
releasepack generate --config ./path/to/releasepack.yml
```

## Fields

All fields are optional unless noted.

- `productName` (string)
- `website` (string)
- `tone` (string, default: `neutral`)
- `audience` (string, default: `general`)
- `xHandle` (string, optional)
- `signature` (string, optional)
- `sectionsOrder` (array of strings, optional)
  - Allowed values: `Breaking`, `Added`, `Fixed`, `Security`, `Changed`, `Dependencies`, `Other`

## Example (YAML)

Create `releasepack.yml` at your repo root:

```yml
productName: releasepack
website: https://github.com/techromp/releasepack
tone: neutral
audience: developers
xHandle: techromp
signature: "— releasepack"
sectionsOrder:
  - Added
  - Fixed
  - Security
  - Changed
  - Dependencies
  - Other
  - Breaking
```

## Example (JSON)

```json
{
  "productName": "releasepack",
  "website": "https://github.com/techromp/releasepack",
  "tone": "neutral",
  "audience": "developers",
  "xHandle": "techromp",
  "signature": "— releasepack",
  "sectionsOrder": ["Added", "Fixed", "Security", "Changed", "Dependencies", "Other", "Breaking"]
}
```

## Notes

- Config is intended to be committed to the repo.
- If config is invalid/unreadable, `releasepack` exits with a non-zero code.
- Config is only used to shape output text/ordering; it does not make network calls.
