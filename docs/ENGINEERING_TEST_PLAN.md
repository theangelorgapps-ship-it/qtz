# Quaotz Engineering Test Plan

Status: implementation-ready plan  
Scope: responsive web, iOS, Android, API/background jobs, Supabase data plane, and secured Admin console  
Source of truth: [`PRODUCT_BLUEPRINT.md`](./PRODUCT_BLUEPRINT.md)

## Quality objectives

1. No Customer, Business member, or Admin can read or mutate data outside their role, Business, listing, booking, or case scope.
2. Every auction, payment, payout, subscription, and moderation transition is deterministic, auditable, and safe to retry.
3. Web, iOS, and Android converge on the same authoritative resource version after offline use or realtime disruption.
4. Money balances in integer minor units across charges, fees, commissions, refunds, transfers, and reversals.
5. Release-critical screens preserve approved Figma layout and meet accessibility requirements.

## Tooling

| Layer | Tool | Responsibility |
|---|---|---|
| Type and static checks | TypeScript, ESLint | unsafe types, imports, unreachable or invalid application code |
| Unit/property | Vitest projects | domain policies, state machines, money, validation, generated-client behaviour |
| Database/RLS | Supabase local stack and pgTAP | migrations, constraints, functions, indexes, RLS, storage policy |
| API/integration | Vitest against local dependencies | auth, OpenAPI, jobs, providers, realtime, storage, email |
| Web/Admin E2E | Playwright | browser journeys, screenshots, accessibility, responsive states |
| Mobile component | React Native Testing Library with Vitest-compatible project setup | screen states and accessible interaction contracts |
| Mobile E2E | Maestro on iOS and Android builds | native journeys, notifications, deep links, offline/reconnect |
| Security | matrix-driven suites plus abuse fixtures | object access, privilege escalation, replay, rate limits, unsafe files |

References: [Vitest projects](https://vitest.dev/guide/projects), [Playwright test projects](https://playwright.dev/docs/test-projects), [Expo Maestro E2E workflows](https://docs.expo.dev/eas/workflows/examples/e2e-tests/), and [Supabase database testing](https://supabase.com/docs/guides/local-development/testing/overview).

## CI and release gates

### Pull request

- formatting, lint, typecheck, generated-code drift, and migration lint;
- all affected Vitest projects and 100% branch coverage for changed critical-domain code;
- all pgTAP schema, constraint, RLS, and transition-function tests;
- API/provider contract tests with deterministic fixtures;
- web smoke journeys plus affected visual and accessibility baselines;
- authorization, idempotency, concurrency, and security regression suites.

### Nightly

- complete Playwright browser matrix;
- iOS and Android Maestro suites;
- Stripe and PayPal sandbox smoke tests;
- reconnect/out-of-order realtime suites, durable-job retry/dead-letter suites, and larger concurrency runs;
- dependency, secret, and migration safety scans.

### Release candidate

- clean database rebuild from migrations and seed;
- full web, Admin, iOS, and Android journeys;
- approved Figma visual baseline diff and accessibility report;
- payment/refund/payout sandbox lifecycle and reconciliation;
- backup/restore drill, observability alert smoke, and rollback rehearsal;
- zero open P0/P1 defects and an explicit disposition for every P2 defect.

Coverage gates are 100% branches for `packages/domain`, authorization policies, money/ledger code, state transitions, idempotency, and provider adapters. Other server code targets at least 95% branches; UI percentage is secondary to complete state/interaction, visual, accessibility, and E2E coverage. No critical branch may be excluded with a coverage-ignore comment.

## Deterministic fixture model

Seed unique, non-production personas for every parallel test process:

- anonymous and unverified User;
- verified Customer A, Customer B, suspended Customer, and permanently banned identity;
- Business Alpha owner, admin, service provider, and finance member;
- Business Beta owner, plus one User belonging to both Businesses;
- each Admin role and a second approver for dual-control actions.

Seed listing fixtures for draft, scheduled, live, closed-pending-award, awarded, expired, and cancelled states; both award rules; no-bid, tied-bid, and multi-bid cases; same-state and out-of-state Customers; and each subscription plan/state. Payment fixtures cover Standard and protected bookings plus every provider and payout state.

Every suite owns unique identifiers and can run in parallel. Database-level tests use transaction rollback. Application-level tests create isolated records and delete only their own disposable data.

## Coverage topology

```text
AUTH -> PROFILE -> CUSTOMER CONTEXT -> DISCOVER -> BID -----------+
   |                                                             |
   +-> BUSINESS CONTEXT -> VERIFY -> SUBSCRIBE -> LIST -> AUCTION +-> AWARD
                                                                     |
                         PRIVATE MESSAGE <---------------------------+
                                                                     |
                         PAY -> FUND -> WORK -> COMPLETE -> REVIEW WINDOW
                                  |                         |       |
                                  |                         |       +-> DISPUTE -> REFUND/RELEASE
                                  |                         +-> APPROVE/AUTO -> PAYOUT
                                  +-> DECLINE/TIMEOUT -> RECONCILE

REPORT -> ADMIN CASE -> ACTION -> APPEAL -> UPHOLD/OVERTURN -> AUDIT
FINANCE ACTION -> SECOND APPROVER -> EXECUTE/EXPIRE -> AUDIT

Every arrow: unit/state branch + DB constraint/RLS + API contract/integration.
Release-critical journeys: web E2E + mobile E2E + visual/accessibility where visible.
Every mutation: success + validation deny + authorization deny + stale version +
state conflict + duplicate idempotency key + same-key/different-body conflict + retry.
```

## Branch inventory and required cases

### AUTH — identity and sessions

- `AUTH-01` email/password sign-up, verification, sign-in, sign-out, and recovery.
- `AUTH-02` supported social sign-in success, provider cancellation, missing verified email, and account-link conflict.
- `AUTH-03` breached password block, rate limit, lockout recovery, MFA enrollment/challenge/recovery, and reauthentication.
- `AUTH-04` known device, new device, meaningful-risk alert, false-positive acknowledgement, and `This wasn't me` global revocation.
- `AUTH-05` expired/revoked tokens during API request, realtime reconnect, upload, and deep-link recovery.

### BIZ — Business identity and membership

- `BIZ-01` create, verify, reject, resubmit, and close a Business.
- `BIZ-02` invite/accept/decline/remove each membership role; last-owner and self-removal safeguards.
- `BIZ-03` switch between two Businesses without cache, route, analytics, upload, or realtime leakage.
- `BIZ-04` stale/forged active-Business context and access immediately after membership removal.

### SUB — subscriptions and entitlements

- `SUB-01` monthly/annual purchase for every plan and a provider-declined purchase.
- `SUB-02` upgrade, downgrade effective date, cancellation, renewal, duplicate callback, and price-version snapshot.
- `SUB-03` payment failure enters grace and blocks new listings immediately; recovery before boundary; inactivity exactly at ten days.
- `SUB-04` listing quota, visibility delay, geography, website, discounts, reports, and team capabilities for every plan.

### LIST/BID/AUCT — marketplace and concurrency

- `LIST-01` every required field, media state, liability acceptance, draft/edit/copy/publish/cancel, and immutable published award rule.
- `LIST-02` entitlement/quota/geography checks and boundary visibility after 24 hours.
- `BID-01` valid bid, minimum increment, edit/replace, withdrawal, Customer eligibility, owner/team self-bid denial, ban/restriction denial.
- `BID-02` one millisecond before, exactly at, and after close; two simultaneous bids; simultaneous edit/withdraw; stale version; repeated idempotency key.
- `AUCT-01` highest qualified bid, equal-price earliest tie-break, no qualified bid, delayed close job, and duplicate close job.
- `AUCT-02` Business-choice selection, unauthorized selection, stale selection, exact 24-hour expiry, and select-versus-expire race.
- `AUCT-03` exactly one winning bid, booking, notification set, and immutable economic snapshot under every race.

### MSG/RT — messaging and realtime

- `MSG-01` one unique private thread per Business–Customer–listing; competing Customer and unrelated Business denial.
- `MSG-02` qualified-bid unlock, unsuccessful read-only transition, winning booking continuation, support-case continuation, and membership removal.
- `MSG-03` text/attachment validation, duplicate send, pagination, read receipt, offline draft, and retry after uncertain response.
- `RT-01` duplicate, old, newer, missing, reordered, malformed, and unknown-version events.
- `RT-02` offline auction close/award, backgrounded app, token refresh, channel revocation, process restart, and eventual snapshot convergence.

### PAY/PROT — payments, protection, and ledger

- `PAY-01` card, Apple Pay/Google Pay, and PayPal success/decline/cancel/timeout; never mark funded from client response alone.
- `PAY-02` verified, invalid-signature, duplicate, delayed, and out-of-order webhooks; replay after partial processing.
- `PAY-03` plan commission snapshot for all plans, protection min/percentage/cap, processor expense, Business net, and balanced ledger property tests.
- `PAY-04` standard approval, dispute, and automatic release exactly at 48 hours; protected equivalents at seven days.
- `PAY-05` payout scheduled/paused/released/failed/retried/reversed and reconciliation of provider-versus-local disagreement.
- `PROT-01` evidence upload, non-delivery/material-mismatch decisions, full/partial/denied refund, payout pause, appeal/support audit, and immutable terms.

### REV/MOD — reviews, conduct, and appeals

- `REV-01` only completed counterparties review, one review per side, rating aggregation, challenge intake, and private moderation evidence.
- `MOD-01` warning, feature restriction, temporary suspension, permanent identity ban, expiration, and appeal.
- `MOD-02` immediate-ban reason allowlist, evidence/reviewer requirement, ban evasion, dismissed report, upheld and overturned appeal.
- `MOD-03` enforcement effect on login, bidding, publishing, messaging, payout, data export, and legal hold without conflating account deletion.

### ADM — secured Admin console

- `ADM-01` route and API denial for non-Admins and every disallowed Admin-role/action pair.
- `ADM-02` mandatory MFA, recent reauthentication, session timeout, sensitive-read audit, export redaction/watermark, and no silent impersonation.
- `ADM-03` dual-control initiation, self-approval denial, second approval, rejection, expiry, duplicate execution, and emergency-access audit.
- `ADM-04` refunds, payout release, restrictions, configuration effective dates, report export, and before/after audit integrity.

### MEDIA/NOTIFY — files and delivery

- `MEDIA-01` accepted types/sizes, forged content type, decompression bomb, malware result, scan timeout, private signed URL expiry, and deleted membership.
- `MEDIA-02` orphan cleanup, duplicate upload, interrupted/resumed upload where supported, moderation rejection, and inaccessible quarantined file.
- `NOTIFY-01` in-app/email/push preference, deduplication, retry, bounce/failure, stale device token, deep link, and sensitive-content redaction.

### UI/VIS/A11Y — experience fidelity

- `UI-01` every Figma-linked release screen in loading, empty, populated, validation, recoverable error, offline, permission-denied, and destructive-confirmation states.
- `VIS-01` approved desktop/tablet/mobile-web, iPhone, and Android baselines with deterministic data and controlled animation/time.
- `A11Y-01` keyboard/focus, semantic labels, heading/order, contrast, target size, screen-reader announcements, reduced motion, and dynamic type.
- `UI-02` refresh, back/deep-link, interrupted onboarding/checkout, keyboard covering fields, safe areas, long content, and slow network.

## Failure-injection catalogue

Every external boundary must support explicit failure fixtures:

- database unavailable, lock timeout, serialization retry, constraint conflict, and read-after-write lag;
- job lease lost, duplicate execution, poison job, retry exhaustion, and dead-letter replay;
- provider timeout before/after remote creation, invalid response, rate limit, duplicate webhook, and reconciliation mismatch;
- email/push failure, stale token, duplicate delivery, and unsafe template data;
- storage upload interruption, signing failure, scanning timeout, malicious file, and orphaned object;
- realtime disconnect, token expiry, sequence gap, and unauthorized resubscription.

For each case assert visible user recovery, safe retry instructions, no duplicate side effect, consistent database state, structured error/request ID, audit event where required, metric/log emission, and operator recovery path.

## Exit criteria

- Every branch ID above maps to at least one automated test or an explicitly approved manual/device-only check.
- All critical-domain branches meet the 100% coverage gate and mutation/error branches are represented in contract tests.
- Authorization matrix contains an allow and deny proof for every supported action.
- Auction and payment concurrency suites pass repeatedly with randomized transaction release ordering.
- Web/Admin and iOS/Android critical journeys pass from a clean seeded environment.
- Visual diffs are approved against Figma and no accessibility blocker remains.
- Live provider smoke, reconciliation, observability, rollback, and backup/restore checks pass for the release candidate.

## Outside this MVP test plan

- Bitcoin/cryptocurrency provider behaviour;
- multi-Business fulfilment payout splitting;
- enterprise organisation/procurement controls;
- exhaustive device/OS combinations beyond the supported representative matrix;
- production penetration testing and legal/compliance certification, which require separate specialist engagements before launch.
