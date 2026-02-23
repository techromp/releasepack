# Releasepack Pro Kit — Templates

A grab-and-go set of release note templates you can copy into GitHub Releases, a changelog, an internal email, or a status page update. Each template includes a recommended structure and tone cues.

## How to use

1. Pick the template that matches your release type (hotfix, breaking change, enterprise rollout, etc.).
2. Replace bracketed placeholders like **[FEATURE]** and remove sections you don’t need.
3. Keep headings consistent across releases so users can scan.
4. Link to docs/issues/PRs for anything non-trivial.

---

## Template 1 — SaaS Weekly / Biweekly Release (Balanced, user-facing)

**Title:** Release **v[VERSION]** — [MONTH DAY, YEAR]

### Highlights
- **[HIGHLIGHT 1]** — [1 sentence impact]
- **[HIGHLIGHT 2]** — [1 sentence impact]

### Improvements
- [IMPROVEMENT] — [why it matters]
- [IMPROVEMENT]

### Fixes
- [BUG FIX] — [symptom + resolution]
- [BUG FIX]

### Notes
- [KNOWN LIMITATION / BEHAVIOR CHANGE]
- [DEPRECATION NOTICE] (if applicable)

### Thanks
Thanks to [CUSTOMER/COMMUNITY] for reporting **[ISSUE]**.

---

## Template 2 — SaaS Release (Casual, friendly)

**Title:** What’s new in **[PRODUCT]** — **[DATE]**

### The good stuff
- **[FEATURE]**: [short description]
- **[FEATURE]**: [short description]

### Polished up
- [IMPROVEMENT]
- [IMPROVEMENT]

### Squashed bugs
- [FIX] — [plain English]
- [FIX]

### Heads up
- If you notice **[EDGE CASE]**, reach us at **[SUPPORT LINK/EMAIL]**.

---

## Template 3 — SaaS Release (Technical / DevOps heavy)

**Title:** Platform Release **v[VERSION]** — [DATE]

### Summary
This release focuses on **[THEME: reliability/performance/security]**.

### Changes
#### Performance
- [CHANGE] — [metric change if known]

#### Reliability
- [CHANGE]

#### Security
- [CHANGE] — [CVE/Advisory link if applicable]

#### Observability
- [CHANGE] — [logs/metrics/traces]

### Compatibility / Migration
- **Required actions:** [none | steps]
- **Backward compatibility:** [statement]

### Rollout
- **Window:** [TIME RANGE]
- **Regions:** [LIST]
- **Monitoring:** [dashboards/alerts]

---

## Template 4 — Indie App / Game Update (Store-friendly)

**Title:** Update **[VERSION]** — [Short tagline]

### New
- **[FEATURE]** — [player/user benefit]
- **[CONTENT]** — [what changed]

### Improved
- [IMPROVEMENT] — [noticeable difference]

### Fixed
- [FIX] — [symptom]

### Known issues
- [KNOWN ISSUE] — [workaround]

---

## Template 5 — Open Source (GitHub Release notes)

**Title:** **[PROJECT] v[VERSION]**

### Added
- [PR #] [FEATURE] (@contributor)

### Changed
- [PR #] [CHANGE] (@contributor)

### Fixed
- [PR #] [FIX] (@contributor)

### Deprecated
- [PR #] [DEPRECATION] (@contributor)

### Removed
- [PR #] [REMOVAL] (@contributor)

### Security
- [PR #] [SECURITY FIX] (link advisory)

### Upgrade notes
- **Breaking changes:** [none | list]
- **Migration guide:** [LINK]

### Full Changelog
Compare: **[PREV TAG]...v[VERSION]**

---

## Template 6 — Enterprise Release (Serious, risk-aware)

**Title:** Release Bulletin — **[PRODUCT] [VERSION]** (Effective [DATE])

### Executive summary
This release delivers **[BUSINESS OUTCOME]** while maintaining **[SLA/COMPLIANCE]**.

### Scope
- **Applies to:** [TENANTS/ENVIRONMENTS]
- **Rollout method:** [phased | immediate | opt-in]

### Key enhancements
- **[CAPABILITY]** — [impact, controls, who benefits]

### Resolved issues
- [ISSUE] — [impact and resolution]

### Risk & mitigations
- **Risk:** [what could go wrong]
  - **Mitigation:** [monitoring/rollback]

### Operational details
- **Change window:** [TIME]
- **Backout plan:** [LINK/summary]
- **Support:** [contact + escalation]

---

## Template 7 — Breaking Change Release (Technical + migration-focused)

**Title:** **[PROJECT/PRODUCT] v[VERSION]** — Breaking Changes

### Summary
This release introduces **breaking changes** to **[AREA/API/BEHAVIOR]**. If you rely on **[OLD BEHAVIOR]**, you must migrate.

### Breaking changes
1. **[CHANGE NAME]**
   - **What changed:** [before → after]
   - **Who is affected:** [roles/apps]
   - **How to migrate:**
     1. [step]
     2. [step]
   - **Why:** [rationale]

### Deprecations
- **Deprecated:** [THING]
  - **Removal date/version:** [DATE/VERSION]
  - **Replacement:** [THING]

### Non-breaking changes
- [FEATURE/FIX]

### Migration guide
- Full guide: **[LINK]**

---

## Template 8 — Hotfix / Patch Release (Fast, minimal)

**Title:** Hotfix **v[VERSION]** — [DATE]

### Fixed
- **[SEVERITY] [ISSUE]** — [impact] (introduced in [VERSION], fixed in [VERSION])

### Impact
- **Who was affected:** [segment]
- **Time window:** [start → end]
- **Workaround:** [none | steps]

### Action required
- [none | update to vX.Y.Z | clear cache | rotate keys]

### Reference
- Incident/issue: [LINK]

---

## Template 9 — Security Release (Responsible, clear)

**Title:** Security Update — **[PRODUCT] v[VERSION]**

### Summary
We addressed a security issue that could allow **[HIGH-LEVEL IMPACT]** under **[CONDITIONS]**.

### Severity
- **Severity:** [Low/Medium/High/Critical]
- **CVSS (optional):** [score]
- **CVE/Advisory:** [link]

### Who is affected
- [versions/environments]

### Remediation
- **Recommended:** upgrade to **v[VERSION]**
- **Mitigations:** [config/workarounds]

### Timeline (optional)
- [date] — discovered
- [date] — patched
- [date] — disclosed

### Credits
Thanks to **[REPORTER]** for responsible disclosure.

---

## Template 10 — Mobile App Store Release Notes (Strict length, user-facing)

**Title:** Version **[VERSION]**

**What’s new**
- [FEATURE/IMPROVEMENT in plain language]
- [FEATURE/IMPROVEMENT]

**Fixes**
- [FIX]
- [FIX]

**Notes**
- [compatibility / requirement]

---

## Template 11 — Internal Engineering Release (Technical, commit-derived)

**Title:** Engineering Release — **[SERVICE] v[VERSION]**

### Goals
- [goal]

### Changelog (selected)
- feat([scope]): [change] ([PR/commit])
- fix([scope]): [change] ([PR/commit])
- chore([scope]): [change] ([PR/commit])

### Risk assessment
- **Risk level:** [low/med/high]
- **Blast radius:** [components/users]
- **Rollback:** [tag/command/runbook]

### Deployment
- **Plan:** [blue/green/canary]
- **Owner:** [name]
- **Monitoring:** [dashboards]

### Follow-ups
- [task]

---

## Template 12 — Enterprise Customer-Facing “What changed” (Serious, non-technical)

**Title:** Customer Update — **[PRODUCT]** (Release **[VERSION]**, [DATE])

### What changed
- **[CAPABILITY]** — [benefit]

### Why it matters
- [business value]

### What you might notice
- [UI/behavior changes]

### What you need to do
- [nothing | steps]

### Support
Questions? Contact **[CSM/SUPPORT]** and reference **[RELEASE VERSION]**.
