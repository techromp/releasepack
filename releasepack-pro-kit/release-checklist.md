# Releasepack Pro Kit — Release Checklist

Use this as a rigorous, repeatable checklist for shipping software. It’s intentionally detailed; remove items that don’t apply to your product.

**Legend**
- **[Owner]** Suggested owner role
- **Evidence**: what to capture (links, screenshots, hashes)

---

## 1) Pre-release checklist (build, quality, readiness)

### 1.1 Scope & readiness
- [PM/Eng Lead] Confirm **release scope** is frozen (features, fixes, exclusions).
- [PM] Confirm **target date/time**, rollout strategy (phased/canary/full), and success metrics.
- [Eng Lead] Confirm **risk level** (low/med/high) and mitigation plan.
- [Eng Lead] Confirm **on-call coverage** for release window + 24h.
- [PM/Support] Confirm customer commitments (SLAs, contractual requirements).

**Evidence:** release brief / ticket, rollout plan, on-call schedule.

### 1.2 Code health
- [Eng] All intended PRs merged; no last-minute unreviewed changes.
- [Eng] Branch is up to date with main; conflicts resolved.
- [Eng] Static analysis/lints pass (no waived checks without a reason).
- [Eng] Dependency updates reviewed for risk (transitive deps too).
- [Eng] Feature flags documented (default states + who can toggle).

**Evidence:** PR list, CI links, dependency diff.

### 1.3 Testing & verification
- [QA/Eng] Unit tests passing.
- [QA/Eng] Integration tests passing.
- [QA] E2E/regression suite complete (or explicitly waived with sign-off).
- [QA/PM] Critical user flows validated:
  - signup/login/auth
  - billing/checkout (if applicable)
  - data import/export
  - role/permission flows
  - mobile/desktop parity (if applicable)
- [Eng] Cross-browser/device testing (as required).
- [Eng] Performance checks:
  - key endpoints within budget
  - load test results reviewed (if major change)
- [Sec] Security checks:
  - SAST/DAST (where applicable)
  - secrets scanning
  - dependency vulnerability scan reviewed

**Evidence:** test run links, test plan, perf charts.

### 1.4 Data & migrations
- [Eng] Schema migrations reviewed:
  - backward compatible (preferred)
  - safe defaults / nullable strategy
  - indexes planned (concurrent/online if required)
- [Eng] Migration tested on production-like dataset.
- [Eng] Rollback strategy defined:
  - can code roll back with migration present?
  - do you need a down migration?
- [Eng] Verify data retention/PII handling changes.

**Evidence:** migration PR, runbook, rollback notes.

### 1.5 Observability & ops readiness
- [SRE/Eng] Logs, metrics, tracing instrumented for new flows.
- [SRE] Alerts exist/updated for:
  - error rate
  - latency
  - saturation (CPU/memory/queue)
  - key business events (payments, signup)
- [SRE] Dashboards updated and bookmarked for release monitoring.
- [SRE] Runbooks updated:
  - known failure modes
  - mitigation steps
  - contact/escalation paths

**Evidence:** dashboard links, alert definitions, runbook links.

### 1.6 Documentation & UX
- [Eng/PM] Public docs updated (if user-visible changes).
- [Eng] API docs updated (OpenAPI/SDK docs/changelogs).
- [Design/PM] UI copy reviewed for clarity.
- [PM] Screenshots or GIFs prepared for marketing/support.

**Evidence:** doc PRs, updated help center pages.

### 1.7 Compliance & privacy (if applicable)
- [Legal/Sec] Data processing changes reviewed (DPA, subprocessors).
- [Sec] Access control changes validated (least privilege).
- [Sec] Audit logging confirmed for sensitive actions.
- [PM] Regional requirements validated (GDPR/CCPA/HIPAA/SOC2 policy impacts).

**Evidence:** approvals, policy references.

### 1.8 Release artifacts & provenance
- [Eng] Version number chosen and applied (see versioning section below).
- [Eng] Build is reproducible and labeled:
  - tag created
  - build number recorded
  - artifact checksums captured
- [Eng] SBOM generated (if required).
- [Eng] Container images scanned and signed (if required).

**Evidence:** git tag, build logs, artifact registry links.

### 1.9 Go/No-Go
- [PM/Eng Lead/SRE] Final review meeting completed.
- [PM] Customer communications drafted and scheduled.
- [SRE] Rollout window reserved; change freeze exceptions approved (if needed).

**Evidence:** Go/No-Go note, comms plan.

---

## 2) Release execution checklist (during the release)

- [Eng/SRE] Confirm current main is green; re-run critical pipelines if needed.
- [Eng] Create release branch (if you use them) and/or tag.
- [SRE] Deploy to staging / pre-prod.
- [QA] Smoke test on staging:
  - login
  - critical API calls
  - key UI flows
- [SRE] Start production rollout (canary/phased):
  - enable feature flags gradually
  - verify key dashboards
- [SRE] Monitor in real time:
  - error rate
  - latency
  - database metrics
  - queue depth
  - customer-reported issues
- [SRE] If degradation: pause rollout, roll back, or toggle flags per runbook.

**Evidence:** deployment IDs, canary metrics snapshot.

---

## 3) Post-release checklist (stabilization, follow-through)

### 3.1 Immediate verification (0–2 hours)
- [QA/Eng] Smoke test in production.
- [SRE] Confirm no alert storms; validate SLOs.
- [Support] Watch inbound tickets and social mentions.
- [PM] Confirm success metrics hit (or explain variance).

### 3.2 Documentation and housekeeping (same day)
- [Eng] Publish release notes/changelog (if not already).
- [Eng] Ensure tags/releases are consistent across repos.
- [Eng] Close milestone / update issue tracker.
- [Eng] Remove stale feature flags or add expiration dates.
- [SRE] Verify backups and scheduled jobs are healthy.

### 3.3 Retrospective and learning (within 1–7 days)
- [PM/Eng Lead/SRE] Hold a release retro:
  - what went well
  - what surprised us
  - what to improve
  - action items with owners/dates
- [Eng] Convert incidents into follow-up work (tests, alerts, refactors).

**Evidence:** retro doc, action items.

---

## 4) Communication checklist

### 4.1 Internal comms
- [PM/Eng Lead] Announce release plan:
  - scope summary
  - timing + rollout
  - risk level
  - owner/on-call
- [SRE] Provide monitoring links and incident channel.
- [Support] Provide support playbook:
  - FAQs
  - known issues
  - escalation path

### 4.2 External comms (customers/users)
- [PM/Marketing] Choose channels:
  - in-app banner
  - email newsletter
  - blog
  - GitHub release
  - status page
  - social posts (X/LinkedIn/Mastodon)
- [PM] Clarify messaging:
  - what changed
  - who benefits
  - what users need to do
  - breaking changes/migration steps
- [PM/Support] Provide “how to get help” link.

### 4.3 Timing and sequencing
- Announce **breaking changes** before release (or at least at release) with migration guide.
- For hotfixes, communicate quickly and clearly:
  - what happened
  - who is impacted
  - what to do
- If a rollout is phased, be explicit that availability may vary by region/account.

---

## 5) Versioning checklist (SemVer + practical rules)

### 5.1 Decide versioning scheme
- Use **SemVer** when possible: **MAJOR.MINOR.PATCH**.
- For SaaS where users don’t “install versions,” still version internally for traceability.
- Decide if you also use:
  - build metadata (e.g., `1.4.2+20260223.1`)
  - pre-releases (e.g., `2.0.0-rc.1`)

### 5.2 Apply SemVer rules consistently
- **PATCH**: bug fixes, security fixes, internal changes, no API/behavior changes for consumers.
- **MINOR**: new backwards-compatible features.
- **MAJOR**: breaking API/behavior changes or removals.

### 5.3 Tagging and artifacts
- Create a git tag `vX.Y.Z` pointing to the exact commit shipped.
- Ensure artifacts reference the tag/commit SHA.
- Confirm release notes reference the correct compare range.

### 5.4 Breaking change requirements
- Written migration guide.
- Deprecation plan when possible:
  - warn in advance
  - provide replacement
  - set removal version/date

### 5.5 Hotfix rules
- If hotfixing a prior version, decide branch strategy:
  - `release/X.Y` branch for patching
  - cherry-pick into main
- Ensure the hotfix is included in the next normal release too.

---

## 6) Optional checklists (pick what applies)

### 6.1 API/SDK release
- Regenerate clients.
- Update changelog with endpoints/fields.
- Validate backwards compatibility with contract tests.

### 6.2 Database-heavy release
- Verify query plans; add indexes.
- Use online migration strategy.
- Monitor replication lag.

### 6.3 UI release
- Verify accessibility checks (contrast, keyboard nav).
- Verify localization keys.
- Validate responsive breakpoints.

### 6.4 Incident-driven hotfix
- Add regression test.
- Write a brief incident summary.
- Post-mortem schedule if impact warrants.
