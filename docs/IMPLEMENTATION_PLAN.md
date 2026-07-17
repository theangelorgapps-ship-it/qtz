# Quaotz Implementation Plan

Generated from the completed `/plan-eng-review`. This document turns the approved product blueprint into build-actionable work. Product rules remain authoritative in [`PRODUCT_BLUEPRINT.md`](./PRODUCT_BLUEPRINT.md); test acceptance remains authoritative in [`ENGINEERING_TEST_PLAN.md`](./ENGINEERING_TEST_PLAN.md).

## What already exists

| Existing asset | Current value | Reuse decision |
|---|---|---|
| Quaotz Figma file | Visual language, screens, components, navigation concepts, and product flow | Use as visual truth; inventory node-to-route coverage before implementation |
| Upwork iOS Mobbin flows | Interaction references for onboarding, profile creation, discovery, and bid submission | Use as interaction research only; do not copy branding, assets, text, or proprietary rules |
| Product blueprint | Locked business model, architecture, data model, state machines, security, tests, and SLOs | Treat as the implementation contract |
| Engineering test plan | Branch inventory, fixtures, failure injection, CI gates, and release criteria | Implement tests alongside each task and use as `/qa` input |
| Existing application code | None inside `quaotz/`; the folder currently contains planning artifacts only | Build fresh; do not couple Quaotz to unrelated workspace projects |

## NOT in scope

- Customer-created service-request auctions: launch is Business-led only, so a second marketplace direction would double core flows.
- Literal Upwork duplication: Quaotz may reuse familiar interaction patterns, not Upwork trademarks, copy, proprietary assets, or hidden business rules.
- Bitcoin/cryptocurrency at MVP: captured in `QTZ-TODO-001` after the first payment/ledger system is proven.
- Multi-Business fulfilment and split payouts: captured in `QTZ-TODO-002` after single-Business contracts and transfers are stable.
- Portfolio videos: captured in `QTZ-TODO-003`; MVP media is images and attachments.
- Downloadable Business reports: captured in `QTZ-TODO-004`; launch provides the promised Diamond/Platinum in-app monthly summary.
- Repeat-customer discounts: captured in `QTZ-TODO-005`; removed from launch entitlements until pricing and ledger rules exist.
- Configurable custom Business roles: captured in `QTZ-TODO-006`; MVP uses four fixed roles.
- Saved-search alerts and personalised recommendations: captured in `QTZ-TODO-007/008`; deterministic discovery launches first.
- Separate Admin application or microservices: `/admin` shares the secured web/API/domain system, and the server remains one codebase with HTTP and background-job processes.
- External search engine, data warehouse, or workflow engine at MVP: Postgres projections, durable jobs, and explicit domain state machines meet the launch requirement.
- Calling Quaotz Protection “escrow”: prohibited until legal counsel and the payment provider approve that regulated use.
- Exhaustive device/OS coverage: release uses representative supported devices plus focused accessibility/platform cases.

## Build dependency graph

```text
T1 repository + local platform + CI
 |
 +--> T2 design tokens / Figma inventory -------------------+
 |
 +--> T3 domain contracts / state machines / API contract --+----+
 |                                                           |    |
 +--> T4 database / RLS / jobs / audit ----------------------+    |
      |                                                           |
      +--> T5 identity / Business / Admin auth                     |
      |      +--> T6 subscriptions / entitlements                  |
      |                                                            |
      +--> T7 listings / discovery projection                      |
             +--> T8 auctions / bids / resource realtime ----------+
                    +--> T9 messaging / media                       |
                    +--> T10 booking / payment / protection         |
                               +--> T11 reviews / moderation / Admin |
                                                                    |
T2 + T3 + APIs --> T12 web/Admin UI --------------------------------+
T2 + T3 + APIs --> T13 iOS/Android UI -------------------------------+
T1 + every feature --> T14 automated quality gates -----------------+
T8 + T10 + T11 --> T15 observability / load / recovery -------------+
all above --> T16 release pipelines / staged launch
```

## Failure-mode register

| Codepath | Production failure | Automated test | Error handling | User/operator experience |
|---|---|---|---|---|
| Sign-up/session | Verification or session provider times out | `AUTH-01/05` integration + E2E | Preserve state, typed retry, request ID | Recoverable message; no partial account confusion |
| Business context | Cached active Business survives membership removal | `BIZ-03/04` authorization/realtime | Revalidate context and revoke channels | User returns to context picker with clear access-change message |
| Subscription | Renewal callbacks arrive twice/out of order | `SUB-02/03`, provider contract | Idempotent state transition and reconciliation | One entitlement state; billing incident visible to finance/Admin |
| Listing/media | Object uploads but finalize/scan job fails | `MEDIA-01/02` | Quarantine, retry/dead letter, orphan expiry | Media remains processing/rejected; never silently published |
| Discovery | Projection consumer lags or dies | projection/job/load tests | Serve last committed projection, freshness metric, restart consumer | Feed may be briefly stale; detail remains authoritative |
| Bid mutation | Simultaneous bids race at auction close | `BID-02`, `AUCT-01/03` concurrency | Auction row lock, recheck time/state, typed conflict | Exactly one accepted order; loser sees updated price/closed state |
| Auction close | Scheduler runs late or twice | `AUCT-01/02` | Stored deadline, idempotent close, outbox dedupe | Auction never extends; participants receive one outcome |
| Realtime | Drop, duplicate, reorder, or authorization loss | `RT-01/02` transport harness | Version checks and authoritative refetch | Reconnect indicator then converged state, no false success |
| Messaging | Customer reads another bidder’s thread | `MSG-01/02`, permission matrix | Server/RLS/storage/realtime deny | Clear forbidden state; security event logged where appropriate |
| Payment initiation | Provider times out after creating a charge | `PAY-01/02` contracts | Indeterminate state, lookup/reconcile before retry | “Checking payment” state, never a duplicate charge |
| Ledger/payout | Refund or reversal creates imbalance | `PAY-03/05` property/contract | Immutable balanced entries and blocked transition | Finance incident alert; Customer/Business sees truthful status |
| Protection dispute | Evidence scan/review misses release deadline | `PROT-01`, job boundary tests | Pause payout, SLA alert, durable case | Case remains open with visible status; no silent payout |
| Review/moderation | Restriction is applied without evidence/appeal | `REV-01`, `MOD-01/02` | Required reason/evidence/reviewer and transition guards | User receives reason and appeal path; Admin audit is complete |
| Admin action/export | Actor self-approves or loses access mid-export | `ADM-02/03/04` | Dual control, permission snapshot + delivery recheck | Action denied/expired; every attempt audited |
| Notification | Provider duplicates or loses delivery | `NOTIFY-01` | Event dedupe, retry, bounce/token cleanup | In-app truth remains; no duplicate sensitive notification |
| Deployment | Migration or provider config is incompatible | release migration/sandbox/rollback gates | Preflight, backward-compatible migration, staged rollout | Deployment stops or rolls back before broad user impact |

No failure mode above lacks both a test and an explicit handling/recovery path. **Critical silent gaps: 0.**

## Inline ASCII diagrams to keep with implementation

- `packages/domain/src/auction/state-machine.ts`: auction/bid state transition diagram and close-versus-bid lock order.
- `packages/domain/src/booking/state-machine.ts`: booking, payment, dispute, and payout transition relationship.
- `packages/domain/src/subscription/state-machine.ts`: active/grace/inactive recovery boundaries.
- `apps/server/src/payments/`: provider request, durable webhook receipt, ledger, reconciliation, and payout pipeline.
- `apps/server/src/jobs/`: lease, execute, retry, dead-letter, and idempotency pipeline.
- `apps/server/src/realtime/`: transaction outbox to private resource topic to snapshot recovery.
- `packages/test-kit/src/concurrency/`: transaction-barrier setup and the expected single-winner result.

These comments must be updated in the same change as their corresponding state or pipeline. A stale diagram fails review.

## Worktree parallelization strategy

### Dependency table

| Step/workstream | Modules touched | Depends on |
|---|---|---|
| Foundation and contracts | repository root, `packages/domain`, `packages/api-client`, `packages/design-tokens`, `supabase/` | — |
| Server marketplace | `apps/server`, `supabase/` feature migrations | Foundation and contracts |
| Web and Admin | `apps/web` | Foundation contracts, generated client, design tokens |
| Mobile | `apps/mobile` | Foundation contracts, generated client, design tokens |
| Quality infrastructure | `packages/test-kit`, CI workflows, test configuration | Initial repository scaffold |
| Production readiness | deployment configuration, observability configuration, release documentation | All feature workstreams |

### Parallel lanes

- **Lane A:** T1 → T3 → T4 → T5 → T6 → T7 → T8 → T9 → T10 → T11. Sequential ownership of shared domain/database/server contracts.
- **Lane B:** T2 → T12. Web/Admin can proceed against locked contracts and fixtures after T2/T3, consuming generated clients without redefining domain rules.
- **Lane C:** T2 → T13. Mobile proceeds in parallel with Lane B after tokens/contracts stabilize.
- **Lane D:** T1 → T14. Test infrastructure starts after scaffolding, then adds coverage alongside each merged feature.
- **Lane E:** T15 → T16. Production readiness begins after critical auction/payment/Admin paths exist and finishes after all lanes merge.

### Execution order

1. Complete and merge T1, T2, and the first stable T3 contracts.
2. Launch Lane A server work, Lane B web, Lane C mobile, and Lane D quality work in parallel worktrees.
3. Merge small contract increments before their web/mobile consumers; regenerate the API client once per contract change.
4. Merge feature-complete lanes into an integration branch, run T14, then execute T15 and T16 sequentially.

### Conflict flags

- Lane A and Lane D both touch database/test configuration. Lane A owns migrations and policies; Lane D owns tests and must rebase after schema merges.
- Lanes B and C consume `api-client` and `design-tokens` but must not modify them independently. Contract/token changes go through their owning foundation change.
- Admin and marketplace web work both live in `apps/web`; keep them in Lane B or give explicit route-directory ownership to avoid repeated layout/config conflicts.

## Implementation Tasks

Synthesized from this review's findings. Each task derives from a specific finding above. Run with Codex; checkbox as you ship.

- [ ] **T1 (P1, human: ~2d / CC: ~45min)** — Foundation — Scaffold the monorepo and reproducible local platform
  - Surfaced by: Architecture review — right-sized three-app/four-package repository and complete distribution requirement.
  - Files: repository root, `apps/`, `packages/`, `supabase/`, CI workflows.
  - Verify: install from a clean checkout; start local Supabase; run formatting, lint, typecheck, unit, database, web build, and mobile export commands.

- [ ] **T2 (P1, human: ~3d / CC: ~2h)** — Design system — Inventory Figma and implement Quaotz tokens/components
  - Surfaced by: Architecture/Test review — Figma is visual truth and requires governed cross-platform baselines.
  - Files: `packages/design-tokens`, `apps/web` UI foundation, `apps/mobile` UI foundation, design inventory docs.
  - Verify: token parity check, component accessibility tests, and approved representative web/iOS/Android screenshots.

- [ ] **T3 (P1, human: ~4d / CC: ~3h)** — Domain/API — Implement canonical contracts, state machines, clock, errors, concurrency, and outbox events
  - Surfaced by: Code Quality D19/D20/D22 and Test D23/D26.
  - Files: `packages/domain`, `packages/api-client`, `apps/server` contract/transport boundaries.
  - Verify: 100% branch coverage for state/policy/money code; generated-client drift check; clock and idempotency boundary suites.

- [ ] **T4 (P1, human: ~5d / CC: ~4h)** — Data/Security — Build migrations, constraints, RLS, storage/realtime policies, jobs, and audit trail
  - Surfaced by: Architecture security decisions and Test D24 authorization matrix.
  - Files: `supabase/migrations`, `supabase/policies`, `apps/server`, `packages/test-kit` authorization cases.
  - Verify: clean migration replay, `supabase test db`, positive/negative matrix cases, cross-Business and Admin escalation tests.

- [ ] **T5 (P1, human: ~5d / CC: ~4h)** — Identity/Administration — Build User, Customer/Business context, memberships, security, and Admin access
  - Surfaced by: Architecture account/admin decisions and Code Quality D20.
  - Files: `apps/server` identity/admin modules, `apps/web` auth/admin shells, `apps/mobile` auth/context flows.
  - Verify: `AUTH-*`, `BIZ-*`, and `ADM-01/02` suites; MFA/reauth/session-revocation E2E.

- [ ] **T6 (P1, human: ~4d / CC: ~3h)** — Revenue — Implement Business subscriptions, billing, plan entitlements, grace, and in-app monthly summary
  - Surfaced by: Architecture revenue decisions, Code Quality D18, TODO decision D34.4/D34.5.
  - Files: `packages/domain`, `apps/server` billing/entitlements, `apps/web`, `apps/mobile` onboarding/settings.
  - Verify: every plan/monthly/annual/grace branch, entitlement matrix, duplicate/out-of-order billing callbacks, and advertised-feature UI checks.

- [ ] **T7 (P1, human: ~5d / CC: ~4h)** — Marketplace — Implement service listings and the indexed discovery projection
  - Surfaced by: Performance D29 and subscription visibility/geography rules.
  - Files: `apps/server` listing/search modules, `supabase/` projection/index migrations, generated client.
  - Verify: listing lifecycle, projection idempotency/lag, cursor stability, query plans, search/filter boundaries, and p95 read SLO load test.

- [ ] **T8 (P1, human: ~6d / CC: ~5h)** — Auctions — Implement bid serialization, award rules, close jobs, and scoped realtime
  - Surfaced by: Architecture auction rules, Performance D28/D30, Test D23/D26.
  - Files: `packages/domain` auction policies, `apps/server` auction/jobs/realtime, `supabase/` bid/index migrations.
  - Verify: `BID-*`, `AUCT-*`, and `RT-*`; randomized transaction barriers; exact deadlines; one winner; bid p95 and close-lag SLOs.

- [ ] **T9 (P1, human: ~5d / CC: ~4h)** — Communication/Media — Build private listing conversations and quarantine media pipeline
  - Surfaced by: Code Quality D21 and Performance D31.
  - Files: `apps/server` messaging/media, `apps/web` inbox, `apps/mobile` inbox, storage policies, background jobs.
  - Verify: `MSG-*`, `MEDIA-*`, and authorization matrix; direct upload/finalize/scan/reject/cleanup; competitor isolation.

- [ ] **T10 (P1, human: ~8d / CC: ~7h)** — Payments/Bookings — Build booking, payment, protection, ledger, payout, and reconciliation flows
  - Surfaced by: Architecture payment/protection decisions and Test D25.
  - Files: `packages/domain` money/booking, `apps/server` providers/webhooks/ledger/reconciliation, checkout/status UI.
  - Verify: `PAY-*` and `PROT-*`, balanced-ledger property tests, provider contracts, nightly sandbox lifecycle, 48-hour/seven-day boundaries.

- [ ] **T11 (P1, human: ~6d / CC: ~5h)** — Trust/Admin — Build reviews, disputes, moderation, appeals, finance controls, and background exports
  - Surfaced by: Architecture Admin/conduct decisions and Performance D32.
  - Files: `apps/server` trust/admin/export modules, `apps/web/app/admin`, private report storage.
  - Verify: `REV-*`, `MOD-*`, and `ADM-*`; dual control, redaction/watermark, permission recheck, audit completeness, bounded queries.

- [ ] **T12 (P1, human: ~10d / CC: ~8h)** — Web/Admin UX — Implement responsive routes and approved Figma states
  - Surfaced by: User requirement for Quaotz web plus exact supplied UI/UX and Test D27.
  - Files: `apps/web` public, Customer, Business, and Admin routes.
  - Verify: Playwright critical journeys in Chromium/WebKit, responsive screenshot inventory, keyboard/screen-reader/contrast/reduced-motion checks.

- [ ] **T13 (P1, human: ~12d / CC: ~10h)** — Mobile UX — Implement iOS/Android routes, notifications, deep links, and recovery
  - Surfaced by: User requirement for both native platforms, Mobbin flow reference, Test D26/D27.
  - Files: `apps/mobile`, platform configuration, notification/deep-link configuration.
  - Verify: Maestro iOS/Android critical journeys, approved device baselines, offline/reconnect, dynamic type, safe areas, notification/deep-link recovery.

- [ ] **T14 (P1, human: ~8d ongoing / CC: ~8h)** — Quality — Implement the engineering test plan and CI release gates
  - Surfaced by: Test D23-D27 and mandatory complete branch/user-flow coverage.
  - Files: `packages/test-kit`, all feature tests, Playwright/Maestro, Supabase tests, CI workflows.
  - Verify: every test-plan ID mapped; critical packages at 100% branches; full negative authorization and failure-injection suites green.

- [ ] **T15 (P1, human: ~4d / CC: ~3h)** — Reliability — Add observability, SLO dashboards, alerts, load tests, backup/restore, and degradation controls
  - Surfaced by: Performance D28-D33.
  - Files: `apps/server` instrumentation, load-test project, infrastructure/operations configuration and runbooks.
  - Verify: objectives met at 10× forecast including hot auction; alert smoke; queue/provider failure drills; backup/restore and reconciliation checks.

- [ ] **T16 (P1, human: ~5d / CC: ~4h)** — Distribution — Build staged web/API deployment and iOS/Android store pipelines
  - Surfaced by: Architecture distribution check and Production-readiness milestone.
  - Files: deployment configuration, EAS configuration/workflows, environment validation, release/rollback docs.
  - Verify: staging promotion, migration preflight/rollback, web/API health, signed iOS/Android release candidates, provider production-readiness checklist.

## Completion Summary

- Step 0: Scope Challenge — scope reduced to one Business-led marketplace and a right-sized monorepo; accepted by user.
- Architecture Review: 16 issues found; all 16 decisions resolved.
- Code Quality Review: 6 issues found; all 6 decisions resolved.
- Test Review: combined diagram produced; 5 harness/coverage gaps identified and resolved; dedicated test plan written.
- Performance Review: 6 issues found; all 6 decisions resolved.
- NOT in scope: written.
- What already exists: written; no Quaotz application code exists yet.
- `TODOS.md` updates: 8 items proposed individually; all 8 approved and captured.
- Failure modes: 16 production paths documented; 0 critical silent gaps.
- Outside voice: skipped; no independent model findings were incorporated.
- Parallelization: 5 lanes; 4 can progress in parallel after foundation, 1 final integration/release lane is sequential.
- Lake Score: 33/33 review recommendations selected the complete/recommended path; 8/8 deferred items explicitly captured.
