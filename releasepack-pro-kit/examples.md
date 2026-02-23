# Releasepack Pro Kit — Examples

These are three fully written, realistic example releases. Each includes:
- a **commit-derived changelog snippet** (Conventional Commits style)
- **release notes** (human-readable)
- a **social post** (channel-appropriate)

Use them as references for tone, structure, and level of detail.

---

## Example Release 1 — SaaS product (minor release)

**Product:** AtlasBoard (SaaS project management)

**Version:** v1.18.0

**Date:** 2026-02-23

### Changelog snippet (commit-derived)

```
1a2b3c4 feat(views): add "My Work" dashboard with saved filters
7f8e9d0 feat(notifications): support @mentions in task comments
0aa12bb fix(sync): prevent duplicate tasks during Jira import
c02d3ef perf(api): reduce /tasks payload size by removing redundant fields
9d8c7b6 chore(ui): update empty state copy for Projects
```

### Release notes

# AtlasBoard v1.18.0 — My Work dashboard, mentions, faster tasks API

### Highlights
- **My Work dashboard** — A new home view that shows tasks assigned to you, due soon, and recently updated. Save your favorite filters and come back to them later.
- **@mentions in comments** — Mention teammates in task comments to notify them instantly.

### Improvements
- **Faster task loading** — We reduced the payload returned by `/tasks`, improving load time especially on large projects.
- **Clearer empty states** — Updated copy and guidance when a project has no tasks yet.

### Fixes
- **Jira import duplicates** — Fixed an issue where some Jira imports could create duplicate tasks when a sync job retried.

### Notes
- No action required.
- If you use the Jira import, we recommend running one import after updating to confirm the duplicate prevention logic is in effect.

### Links
- Help: https://docs.atlasboard.example/my-work
- Mentions: https://docs.atlasboard.example/comments#mentions

### Social post

**X / Twitter (short):**
> AtlasBoard v1.18.0 is out: new *My Work* dashboard, @mentions in comments, and faster task loading. \n\nRelease notes: https://atlasboard.example/releases/v1-18-0

**LinkedIn (slightly longer):**
> Shipped AtlasBoard v1.18.0 today — introducing the *My Work* dashboard (personalized task view), @mentions in comments, and a faster tasks API for large workspaces. \n\nDetails: https://atlasboard.example/releases/v1-18-0

---

## Example Release 2 — Open Source library (major breaking change)

**Project:** StreamForge (Node.js streaming utilities)

**Version:** v3.0.0

**Date:** 2026-01-15

### Changelog snippet (commit-derived)

```
4c11aa1 feat(core)!: drop Node 16 support; require Node >= 18
9e20d12 feat(api)!: rename createPipeline() -> pipeline()
2bd44f0 fix(parser): handle CRLF line endings in CSV tokenizer
7f00a21 docs(migration): add v2 -> v3 migration guide
1c9a8e3 chore(release): update build matrix for Node 18/20/22
```

### Release notes

# StreamForge v3.0.0 — Node 18+, new `pipeline()` API

### Summary
This is a major release with two breaking changes: Node version support and a small API rename. The goal is to simplify maintenance and align with current Node LTS.

### Breaking changes
1. **Node 16 is no longer supported**
   - **What changed:** StreamForge now requires **Node >= 18**.
   - **Why:** Node 16 is end-of-life; updating allows modern syntax and faster CI.
   - **Migration:** upgrade your runtime to Node 18+.

2. **API rename: `createPipeline()` → `pipeline()`**
   - **Before:** `createPipeline(a, b, c)`
   - **After:** `pipeline(a, b, c)`
   - **Migration:** rename the callsite.

### Fixes
- **CSV tokenizer** now properly handles CRLF line endings.

### Migration guide
- https://github.com/streamforge/streamforge/blob/main/docs/migrate-v2-to-v3.md

### Full Changelog
- https://github.com/streamforge/streamforge/compare/v2.9.2...v3.0.0

### Social post

**Mastodon (OSS/community tone):**
> StreamForge v3.0.0 is out. Breaking changes: Node >= 18, and createPipeline() is now pipeline(). \n\nMigration guide + full changelog: https://github.com/streamforge/streamforge/releases/tag/v3.0.0

**GitHub Release intro (technical):**
> v3.0.0 drops Node 16 support and renames createPipeline() to pipeline(). See migration guide for the quick update steps.

---

## Example Release 3 — Enterprise hotfix (patch release)

**Product:** VaultRail (enterprise audit & access platform)

**Version:** v4.7.3 (Hotfix)

**Date:** 2026-02-03

### Changelog snippet (commit-derived)

```
0f1e2d3 fix(auth): prevent SSO login loop when IdP returns empty RelayState
2a3b4c5 fix(audit): correct timestamp formatting in export CSV (UTC)
8b7c6d5 chore(runbook): add mitigation steps for SSO loop incident
```

### Release notes

# VaultRail v4.7.3 Hotfix — SSO loop fix, audit export correction

### Fixed
- **High — SSO login loop**
  - **Issue:** Some SSO logins could enter a redirect loop when the IdP returned an empty `RelayState`.
  - **Impact:** Users were unable to complete SSO login in affected configurations.
  - **Resolution:** VaultRail now safely handles empty `RelayState` and completes the login flow.

- **Medium — Audit CSV timestamp formatting**
  - **Issue:** In some exports, timestamps could be formatted inconsistently.
  - **Resolution:** Audit CSV exports now consistently format timestamps in **UTC**.

### Impact
- **Who was affected:** customers using SSO with IdPs that omit or blank `RelayState` in specific flows.
- **Action required:** none. The fix is applied server-side.

### Notes
- We updated internal runbooks with detection and mitigation steps for similar SSO loop symptoms.

### Reference
- Support article: https://support.vaultrail.example/articles/sso-login-loop

### Social post

**Status page note (professional, minimal):**
> Resolved: We deployed VaultRail v4.7.3 to address an issue that could cause an SSO login loop in certain IdP configurations. Audit export timestamps are now consistently formatted in UTC.

**Customer email snippet (enterprise tone):**
Subject: VaultRail Hotfix v4.7.3 — SSO login loop resolution

Body:
> We deployed hotfix v4.7.3 on 2026-02-03 to resolve an SSO redirect loop observed in specific IdP flows with empty RelayState. No action is required. If your users continue to see login issues, please contact Support and reference v4.7.3.
