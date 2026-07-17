# Quaotz Product and Architecture Blueprint

Status: Draft for engineering review  
Product: Quaotz  
Platforms: Responsive web, iOS, and Android  
Initial launch market: United States  
Visual source: [Quaotz Figma](https://www.figma.com/design/sPpkQ9bWBnsG3wE39WYLRS/Quaotz?node-id=0-1&t=D6uD10iihoVOQWqL-1)  
Interaction references: [Upwork iOS on Mobbin](https://mobbin.com/apps/upwork-ios-248e108f-efcb-488b-9076-3a2efbfeca4e)

## Product Summary

Quaotz is a business-led services marketplace. Businesses publish service opportunities such as a cleaning appointment or project slot. Customers discover those listings and bid upward for the opportunity to book the business. An authorised business member reviews the bids, chooses the winning customer under the listing's award rule, completes the service, receives payment for the business, and builds its reputation.

Quaotz will reuse proven marketplace interaction patterns from Upwork while applying the Quaotz brand, content, subscription rules, and auction model. The build must not copy Upwork trademarks, logos, proprietary copy, or protected assets.

## Confirmed Requirements

- Build a new application rather than modify the previous system.
- Ship responsive web, iOS, and Android applications.
- Use the supplied Figma file as the visual source of truth.
- Use Upwork flows as the navigation and interaction reference.
- Replace `Employer` with `User` and `Freelancer` with `Business Owner` in product language.
- Support Standard, Gold, Diamond, and Platinum subscriptions.
- Verify email before first login.
- Support timed business-created service auctions.
- Support service listings, customer bids, winner selection, bid rejection, messaging, bookings/contracts, payments, reviews, disputes, notifications, media, and moderation.
- Enforce plan-specific visibility, posting limits, geography, profile access, and reporting.

## Product Model

Roles and subscriptions are deliberately separate. A person's identity must not be encoded as a subscription tier.

```text
User account
  |
  +-- Personal profile
  |
  +-- Business memberships ----> Business
  |  owner / admin / service_provider / finance  |
  |                                        +-- Subscription ----> Entitlements
  |                                                               listing limits
  |                                                               discovery delay
  |                                                               geography
  |                                                               messaging scope
  |                                                               reports
  |
  +-- Marketplace activity
         business listing -> auction -> customer bids -> booking -> payment -> review
```

This lets a user own more than one business, lets a business have multiple team members, and allows subscription rules to change without rewriting identity or permissions.

Every verified User can act as a Customer. Creating and verifying a Business profile unlocks Business mode. The applications expose an explicit Customer/Business context switch while preserving one login, inbox identity, security history, and email address.

A User may own or join multiple Businesses. Each Business has an independent subscription, provider profile, membership roles, listings, connected payout account, commission rate, reports, and audit trail. The active Business context must be explicit in every Business action.

## Target Users

### Customer bidder

Discovers Business listings, places bids, communicates with the Business after selection, pays for the booking, receives the service, and leaves a review.

### Business owner

Creates a business profile, publishes service opportunities, reviews customer bids, selects winning customers, completes work, receives payouts, and builds a portfolio and rating.

### Business team member

Acts for a business within explicit permissions such as listing management, winner selection, messaging, delivery, or finance.

### Platform operator

Manages users, businesses, categories, subscriptions, conduct breaches, rating challenges, payment incidents, reports, and audit logs.

## Goals

- Make publishing a service opportunity fast and understandable for Businesses.
- Make customer bids easy to compare without hiding auction urgency.
- Make subscription limits explicit before the user hits a blocked action.
- Make payments, work status, disputes, and reviews traceable.
- Keep the web and mobile domain behaviour identical.
- Preserve Figma fidelity without coupling business logic to screen components.

## Non-Goals

- A literal copy of Upwork branding, copy, assets, or internal business rules.
- A microservice architecture for the first release.
- Building every payment provider in the first milestone.
- Calling held marketplace funds "escrow" until the legal and payment-provider model permits that term.
- A forced 45-day password reset. Current NIST and OWASP guidance recommends changing passwords after compromise rather than on an arbitrary schedule.

## Subscription Entitlements

Plan rules are data, not `if plan === ...` statements scattered through the applications.

| Entitlement | Standard | Gold | Diamond | Platinum |
|---|---:|---:|---:|---:|
| Monthly subscription | $9.99 | $29.99 | $79.99 | $199.99 |
| Annual subscription | $99 | $299 | $799 | $1,999 |
| Business service commission | 15% | 12% | 9% | 6% |
| Monthly service listings | 5 | 20 | 50 | Unlimited |
| New-listing visibility | After 24 hours | Immediate | Immediate | Immediate |
| Listing geography | Same state | Same state | Multi-state | Multi-state |
| Website visible | No | Yes | Yes | Yes |
| In-app monthly Business summary | No | No | Yes | Yes |

Customers use Quaotz without a subscription. Quaotz sells Standard, Gold, Diamond, and Platinum subscriptions to verified Businesses. The Business plan controls listing entitlements and the Quaotz service-commission rate deducted from each completed Customer payment.

Messaging is not a subscription entitlement. A User can message another participant only in the context of a listing on which they have placed or received a bid, an awarded booking, or an active support case. This keeps Customer participation free while limiting unsolicited contact and spam. Recommendations attached to provider bids and partner/co-bidding are excluded because Customers, not Businesses, bid in the locked marketplace model.

## MVP Scope

### Included

- Email/password and social sign-in with email verification.
- Account, personal profile, business profile, and business membership setup.
- Customer mode for every verified User and Business mode for Users with a verified Business profile and active membership.
- Subscription selection and a central entitlement engine.
- Quaotz-owned Business subscriptions and plan-based Business service commissions.
- Service categories and search.
- Business service-listing creation, edit, copy, cancel, media attachments, and liability acceptance.
- Timed ascending-price auctions with a configurable `highest_bid` or `business_choice` award rule.
- Customer bid creation, editing before close, withdrawal, selection, and rejection.
- One-to-one customer/business messaging with attachments and read status.
- Contract creation from a winning bid.
- Card, Apple Pay/Google Pay, and PayPal Customer payments with Business payouts through approved marketplace providers.
- Transaction receipts and declined-payment notifications.
- Reviews, rating summaries, and a rating-challenge intake flow.
- In-app and email notifications.
- Admin moderation, suspension, permanent ban, and audit history.
- Severity-based conduct enforcement and an appeal workflow.
- Responsive web plus iOS/Android builds from the same product contract.

### V1 after MVP

- Multi-Business fulfilment partnerships and payout splitting.
- Profile and portfolio videos up to three minutes, with resumable upload and moderation.
- Monthly downloadable business reports.
- Repeat-customer discounts.
- Enhanced business team permissions.
- Saved searches and richer recommendations.

### Later

- Cryptocurrency/Bitcoin payment provider.
- Advanced fraud scoring and device intelligence.
- Enterprise organisation controls and procurement workflows.
- Recommendation ranking based on marketplace activity.

## Core User Journeys

### 1. Account and profile onboarding

Reference: [Upwork onboarding](https://mobbin.com/flows/9b747614-56ee-4739-9046-270e94239c1a) and [profile creation](https://mobbin.com/flows/6abfd825-cf44-4f09-a7ea-2644aed11cf7).

```text
Welcome
  -> choose intent
  -> create account
  -> verify email
  -> personal profile
  -> customer home, or create business
  -> verify business
  -> choose business subscription
  -> entitlement summary
  -> marketplace home
```

### 2. Publish a Business service listing

```text
New service listing
  -> category and title
  -> description and media
  -> location and service schedule
  -> starting price and accepted payment method
  -> customer requirements
  -> award rule and auction closing time
  -> liability acceptance
  -> review
  -> publish
```

### 3. Discover and bid

Reference: [Upwork job discovery](https://mobbin.com/flows/92659776-1f7c-4a6d-853f-1f6365ba5e5a) and [proposal submission](https://mobbin.com/flows/980da1e5-ae6e-404c-9948-9d1488f89d0d).

```text
Discover
  -> search/filter
  -> service details + server timer
  -> eligibility check
  -> customer bid amount
  -> optional note or requested details
  -> review
  -> submit
  -> live bid status
```

### 4. Award and fulfil

```text
Auction closes
  -> Business compares qualified Customer bids
  -> award rule identifies or recommends a winner
  -> Business confirms the winning Customer
  -> winning bid becomes a booking/contract
  -> Customer funds the booking
  -> work and messaging
  -> service delivery
  -> Customer accepts or disputes
  -> Business payout
  -> mutual review
```

## Route Map

Web routes use the same screen contract as mobile routes, with desktop-specific composition.

| Area | Web | Mobile |
|---|---|---|
| Marketing | `/` | Welcome stack |
| Sign up | `/auth/sign-up` | `/(auth)/sign-up` |
| Verify | `/auth/verify` | `/(auth)/verify` |
| Onboarding | `/onboarding/*` | `/(onboarding)/*` |
| Discover | `/app/discover` | `/(tabs)/discover` |
| Listing details | `/app/listings/[listingId]` | `/listings/[listingId]` |
| New listing | `/app/listings/new` | `/listings/new` |
| Auction bids | `/app/listings/[listingId]/bids` | `/listings/[listingId]/bids` |
| My bids | `/app/bids` | `/(tabs)/bids` |
| Contracts | `/app/contracts` | `/(tabs)/contracts` |
| Messages | `/app/messages` | `/(tabs)/messages` |
| Business profile | `/app/businesses/[businessId]` | `/businesses/[businessId]` |
| Reports | `/app/reports` | `/reports` |
| Subscription | `/app/settings/subscription` | `/settings/subscription` |
| Admin | `/admin/*` | Web only |

## Admin Console

The admin console is a protected web surface inside `apps/web`, not a separate application. It uses a distinct layout and route namespace while sharing the same API, domain policies, validation, and audit model as Customer and Business flows.

Admin roles follow least privilege:

- `super_admin`: role assignment and emergency controls.
- `support`: accounts, businesses, bookings, and communication history required for support.
- `trust_safety`: conduct cases, listings, media, reviews, disputes, and appeals.
- `finance`: subscriptions, payments, commissions, protection fees, refunds, transfers, reconciliation, and payout holds.
- `content_admin`: categories, policy copy, email templates, and marketplace configuration.
- `read_only`: dashboards and audit-safe investigation without mutation rights.

Required admin areas:

- Dashboard: marketplace health, auctions, bookings, gross payment volume, subscriptions, disputes, payout failures, and moderation queues.
- Users and businesses: verification state, memberships, restrictions, subscription, connected payout account, and security events.
- Listings and auctions: inspect, pause, remove, or close with mandatory reason codes.
- Bookings and bids: timeline, award rule, bid history, messages relevant to a case, payment state, and evidence.
- Finance: subscriptions, invoices, commissions, Quaotz Protection fees, refunds, payment-provider events, transfers, and reconciliation exceptions.
- Trust and safety: reports, moderation cases, evidence, progressive enforcement, permanent bans, and appeals.
- Reviews and disputes: rating challenges, protection claims, decisions, partial/full refunds, and payout release.
- Marketplace configuration: categories, plan entitlements, fee versions, notification templates, and feature flags with effective dates.
- Reports and exports: operational, financial, subscription, Business, and audit reports.
- Audit log: append-only record of every sensitive read and mutation, including actor, target, reason, before/after state, request ID, and timestamp.

Admin security requirements:

- Mandatory MFA and recent reauthentication for finance, role, refund, payout, and permanent-ban actions.
- Server-side role and object checks on every admin endpoint; route hiding is never authorization.
- No silent impersonation. Any support session uses an explicit, time-limited, read-only `view as` mode with banners and audit events.
- Two-person approval for high-value refunds, manual payouts, role escalation, and permanent-ban overrides above configurable thresholds.
- Export watermarking, short-lived download links, field-level redaction, and rate limits for sensitive data.
- Emergency access is time-limited, reason-bound, separately alerted, and reviewed after use.

## Recommended Technical Architecture

Use a TypeScript monorepo. Share domain contracts, validation, API clients, analytics events, and design tokens. Keep web and native presentation components separate so both platforms can match their Figma layouts without lowest-common-denominator UI.

```text
                         +----------------------+
                         |  apps/web            |
                         |  marketplace + admin|
                         |  Next.js App Router  |
                         +----------+-----------+
                                    |
+----------------------+            | HTTPS/OpenAPI
| apps/mobile          |            |
| Expo + React Native  +------------+
+----------+-----------+            |
           |                        v
           |              +---------+----------+
           +------------->| apps/server        |
                          | HTTP + job process  |
                          | auth + transactions |
                          +---------+-----------+
                                    |
                    SQL/RLS + jobs  |
                                    v
                      +-------------+--+
                      | PostgreSQL     |
                      | Auth           |
                      | Storage        |
                      | Realtime       |
                      +------+-----+
                             |
                  +----------+-----------+
                  | Payments / Email /   |
                  | Media moderation     |
                  +----------------------+
```

### Proposed stack

- Monorepo: pnpm workspaces and Turborepo.
- Web: Next.js App Router, TypeScript, React Server Components where appropriate.
- Mobile: Expo Router and React Native for iOS and Android.
- Shared packages: `domain`, `api-client`, `design-tokens`, and `test-kit`; `domain` owns validation, policies, state machines, money rules, and analytics event contracts.
- Server: one TypeScript application with separate HTTP and durable-job process commands, an OpenAPI contract, and generated web/mobile clients.
- Data/Auth/Storage/Realtime: Supabase Postgres, Auth, Storage, and private Realtime Broadcast channels.
- Validation: Zod at client boundaries and API boundaries; database constraints remain authoritative.
- Payments: Stripe Connect for cards and digital wallets plus PayPal multiparty at MVP, both behind a `PaymentProvider` boundary; cryptocurrency is added independently later.
- Background work: database-backed durable jobs executed by the server's background-job process for auction closing, payment grace periods, receipts, emails, reports, and media processing.
- Email: transactional provider with templates and event-level idempotency.
- Observability: structured logs, error tracking, audit events, payment webhook history, and job dashboards.

### Repository layout

```text
quaotz/
  apps/
    web/
    mobile/
    server/
  packages/
    domain/
    api-client/
    design-tokens/
    test-kit/
  supabase/
    migrations/
    seed/
    policies/
  docs/
```

### API mutation and error contract

All web and mobile traffic uses the generated OpenAPI client. Successful and failed requests include an `X-Request-Id`, propagated through logs, jobs, audit events, and payment-provider metadata where supported.

```json
{
  "code": "STATE_CONFLICT",
  "message": "This auction is already closed.",
  "details": { "resource": "auction", "currentState": "awarded" },
  "requestId": "req_..."
}
```

- Stable machine codes include `VALIDATION_FAILED`, `UNAUTHENTICATED`, `FORBIDDEN`, `NOT_FOUND`, `RATE_LIMITED`, `STALE_VERSION`, `STATE_CONFLICT`, `IDEMPOTENCY_CONFLICT`, `PROVIDER_UNAVAILABLE`, and `INTERNAL_ERROR`. User-facing copy is mapped separately so internal/provider details are never leaked.
- Retriable side-effecting commands require an `Idempotency-Key`, including bid creation or replacement, auction award, booking creation, payment initiation, refunds, payout actions, messages with attachments, subscription changes, and sensitive admin mutations.
- Store the authenticated actor, endpoint/command, normalized request hash, response status, and response body against the key. Replaying the same key and request returns the original result; reusing it with a different request returns `IDEMPOTENCY_CONFLICT`.
- Mutable resources expose an integer `version`. Update and transition commands include the expected version; a mismatch returns `STALE_VERSION` with the current version and no partial mutation.
- Domain-state rejection returns `STATE_CONFLICT`, not a generic validation error. Rate-limit responses include a safe retry delay. Provider timeouts return an indeterminate/retriable result and are reconciled before the client is allowed to initiate a replacement financial action.
- Idempotency and entity-version checks occur inside the same database transaction as the domain mutation and append-only event. Keys have endpoint-appropriate retention periods, with financial and audit-sensitive keys retained for the corresponding record-retention period.

## Data Model

```text
auth_user 1---1 profile
auth_user 1---* business_membership *---1 business

business 1---* subscription
subscription *---1 subscription_plan
subscription_plan 1---* plan_entitlement

business 1---* service_listing
service_listing 1---1 auction
service_listing 1---* listing_media
auction 1---* customer_bid *---1 auth_user

winning_bid 1---1 contract
contract 1---* milestone
contract 1---* payment
payment 1---* transfer

service_listing 1---* conversation 1---* message
conversation *---1 auth_user (customer)
conversation *---1 business
conversation 0..1---1 contract
contract 1---* review
review 1---* review_dispute

auth_user/business 1---* notification
auth_user/business 1---* moderation_case
all sensitive changes ---> audit_event
```

Primary tables:

- `profiles`, `businesses`, `business_memberships`
- `subscription_plans`, `subscriptions`, `plan_entitlements`
- `service_categories`, `service_listings`, `listing_media`, `listing_terms_acceptance`
- `auctions`, `customer_bids`, `bid_events`
- `contracts`, `milestones`, `deliverables`
- `payments`, `payment_attempts`, `transfers`, `refunds`, `webhook_events`
- `conversations`, `conversation_members`, `messages`, `message_receipts`
- `reviews`, `review_disputes`
- `notifications`, `notification_deliveries`
- `moderation_cases`, `account_restrictions`, `audit_events`

## Auction Rules

- Store `starts_at` and `ends_at` as server timestamps.
- Treat the client countdown as display only.
- Reject every bid at or after `ends_at` in the database transaction.
- Close auctions idempotently in a background job; a delayed job must not extend the auction.
- Store `award_rule` as `highest_bid` or `business_choice`; show it before bidding and lock it when the listing is published.
- For `highest_bid`, award the highest qualified bid at close; break equal-price ties using the earliest accepted bid.
- For `business_choice`, let an authorised Business member select any qualified Customer bid after close and record the selection in the audit history.
- Give `business_choice` auctions a 24-hour selection window. If the Business selects nobody, transition to `expired_unawarded`, release every Customer bid, and notify all participants.
- Record bid changes as immutable events for disputes and audit.
- Prevent the listing owner, business team members, or suspended accounts from bidding.
- Evaluate subscription and geographic eligibility server-side for every bid.

## Messaging Rules

- Create at most one private conversation for each `service_listing + business + customer_user` tuple, enforced by a unique database constraint.
- A Customer may open the conversation only after submitting a qualified bid. Authorised Business members may reply within the active Business context.
- Never add competing Customers to the same conversation or expose their identity, messages, attachments, presence, or read receipts to one another.
- If the Customer wins, attach the existing conversation to the resulting contract so its history continues through fulfilment and support.
- When the auction is awarded or expires, conversations for unsuccessful Customers become read-only. The winning conversation remains writable while the booking or a related support case is active.
- Server-side membership checks guard message reads, sends, attachments, receipts, and realtime subscriptions; hiding a thread in the client is not an authorization control.
- Public listing questions, unsolicited direct messages, and global User-to-User messaging are outside the MVP.

## Authoritative Domain State Machines

Lifecycle state machines live in the shared `domain` package. Web and mobile clients may request an intent, but only the server may execute a transition. Each transition runs transactionally with its invariant checks, database status update, and append-only event record. The event records `previous_state`, `next_state`, actor, reason code, timestamp, correlation ID, and idempotency key. Database constraints reject unknown states, and background jobs, provider webhooks, retries, and admin actions must call the same transition functions as interactive API requests.

```text
auction
draft -> scheduled -> live -> closed_pending_award -> awarded
                         |              |               |
                         |              +-> expired_unawarded
                         +-> cancelled                  

customer_bid
active -> withdrawn
   |   -> rejected
   |   -> released
   +-- -> awarded

booking
awaiting_payment -> funded -> in_progress -> completion_requested
         |             |                         |       |
         +-> cancelled +-> cancelled             |       +-> disputed -> resolved
                                                   +-> approved -> settled

payment
requires_payment -> processing -> succeeded -> partially_refunded -> refunded
                         |             |
                         +-> failed    +-> refunded

payout
pending -> scheduled -> paid
   |          |          |
   +-> paused +-> failed +-> reversed

subscription
pending -> active -> grace_period -> inactive
             |            |             |
             +-> cancelled +-> active   +-> active

moderation_case
open -> investigating -> actioned -> appealed -> upheld
  |          |               |             +-> overturned
  |          +-> dismissed   +-> closed
  +-> closed
```

Additional transition invariants:

- `highest_bid` auctions transition from `live` through `closed_pending_award` to `awarded` in one close transaction when a qualified bid exists; an auction with no qualified bids becomes `expired_unawarded`.
- `business_choice` auctions remain `closed_pending_award` for at most 24 hours before becoming `awarded` or `expired_unawarded`.
- A bid can become `awarded` only once, and only if it belongs to the target auction, remains qualified, and is permitted by the auction's locked award rule.
- A booking cannot become `funded` until a verified provider event confirms payment success, and cannot become `settled` until the applicable 48-hour or seven-day review window and dispute checks pass.
- A payout cannot become `paid` from `paused`; the dispute or risk hold must first transition it back to `scheduled`.
- A subscription payment failure transitions an active subscription to `grace_period`, immediately blocks new listings, and schedules `inactive` after ten days unless payment recovery returns it to `active`.
- Moderation restrictions are separate records from account deletion and subscription state. Permanent identity bans require the locked high-severity reason codes, evidence, reviewer identity, and an appeal path.

## Payment Architecture

Use Stripe Connect for the first card marketplace flow. For a single winning Business, destination charges are simpler. Future multi-Business fulfilment or holding funds until delivery requires separate charges and transfers.

```text
customer payment
  -> provider authorisation
  -> optional Quaotz Protection fee
  -> Quaotz payment record
  -> funded booking
  -> service completion approval
  -> Quaotz service commission
  -> Business net transfer
  -> receipt + ledger entries
```

Rules:

- Webhook events are verified, stored, and processed idempotently.
- Payment state changes only from server-side provider confirmation.
- Quaotz absorbs card-processing charges from its service commission; the Customer pays the winning bid and the Business sees one plan-based service-fee deduction.
- Standard bookings collect payment when awarded. After the Business marks the service complete, the Customer may approve or dispute; otherwise the Business payout releases automatically after 48 hours.
- Customers may purchase optional `Quaotz Protection` for 3% of the winning bid, with a $2.99 minimum and $49.99 maximum. Protected bookings use a seven-day review window, pause Business payout during a dispute, receive priority evidence review, and may receive a full or partial refund for verified non-delivery or material service mismatch.
- Record the protection fee and selected terms on the booking at checkout; later pricing or policy changes must not alter an existing protected booking.
- Do not label or market Quaotz Protection as escrow unless legal counsel and the payment provider approve that regulated use.
- Offer monthly and annual business billing. Annual prices are approximately ten monthly payments, and launch has no free trial.
- Snapshot the Business plan and commission rate onto the booking when the auction is awarded; later plan changes must not alter an existing booking's economics.
- Calculate gross payment, Quaotz commission, processor expense, refunds, and Business net payout as explicit immutable ledger entries using integer minor currency units.
- A declined subscription starts a 10-day grace period and blocks new Business listings immediately.
- Deactivation after the grace period is a scheduled state transition, not a login-time side effect.
- Permanent conduct bans and customer-requested account deletion are different states.
- Apply progressive conduct states: `warning`, `feature_restricted`, `temporarily_suspended`, and `permanently_banned`.
- Permit immediate permanent identity bans for verified fraud, illegal services, credible threats, serious payment abuse, or ban evasion; require evidence, reason codes, reviewer identity, timestamps, and an appeal path.
- Stripe and PayPal use separate provider adapters and reconciliation rules; cryptocurrency is outside MVP.

## Security and Privacy

- Email verification before marketplace access.
- MFA required for admins and recommended for accounts that receive payouts.
- Reauthentication for payout, password, email, and business-ownership changes.
- New-device or meaningful-risk login notification using device, location jump, impossible travel, failed attempts, and unusual-behaviour signals; include a `This wasn't me` action that revokes active sessions and begins recovery.
- Row-level security on private realtime channels and storage objects.
- Signed URLs for private attachments and videos.
- Malware scanning, content-type validation, upload limits, and moderation status for media.
- Strong passphrases, password blocklist, breached-password checks, MFA, attack rate limiting, risk-based reauthentication, and mandatory reset after suspected or confirmed compromise; no arbitrary password expiry.
- Append-only audit history for bids, contracts, payments, reviews, admin actions, and restrictions.
- Data export, account closure, retention, and legal-hold rules defined before production launch.

## Test Strategy

- Test runner: Vitest projects for shared-domain, server, API-client, web component, and mobile component tests.
- Database: Supabase local stack with pgTAP for schema, constraints, functions, and positive/negative RLS-policy tests.
- Web/admin E2E: Playwright projects for Chromium, WebKit, and a focused mobile viewport; use screenshot assertions and accessibility checks on release-critical routes.
- Mobile E2E: Maestro flows on iOS and Android development builds, run locally for smoke coverage and through EAS Workflows for release candidates.
- Unit tests: entitlement decisions, auction validation, money calculations, state machines, and validators.
- Database tests: constraints, RLS policies, concurrent bid submission, auction close, and idempotency.
- Contract tests: OpenAPI clients against the API.
- Integration tests: auth, subscriptions, payment webhooks, messaging, storage, email, and jobs.
- E2E web: Business publishes, Customer bids, Business awards, payment succeeds, delivery and review complete.
- E2E mobile: onboarding, discovery, bidding, messaging, push notification, and deep-link recovery.
- Visual tests: Figma reference screens at defined web and mobile breakpoints.
- Accessibility: keyboard navigation, screen readers, focus order, contrast, reduced motion, and dynamic type.
- Security tests: privilege escalation, object-level access, replayed webhooks, bid race conditions, banned accounts, and file abuse.

### Deterministic test harness

- The `domain` package depends on a `Clock` interface. Production injects UTC wall-clock time; tests inject a clock that can advance to exact boundaries without sleeping.
- Payment, payout, email, malware-scanning, storage-signing, and notification providers have deterministic in-memory fakes plus provider-contract fixtures. The fakes can return success, decline, timeout, duplicate callback, malformed callback, delayed callback, and out-of-order callback results.
- The background-job process exposes a test-only drain helper that runs jobs due at the injected time until the queue is stable, while preserving production retry, lease, deduplication, and dead-letter behaviour.
- Database concurrency tests use explicit transaction barriers to pause two sessions before the contested lock or commit. Tests assert the single valid winner and the typed result returned to every losing request.
- Boundary suites cover one millisecond before, exactly at, and one millisecond after auction close, 24-hour Business selection expiry, 48-hour standard release, seven-day protected review, ten-day subscription grace, idempotency retention, and token/session expiry.
- Test helpers live in `packages/test-kit`; none are reachable from a production build or endpoint.

### Authorization matrix testing

Maintain canonical authorization cases in `packages/test-kit` as data, not duplicated test prose. Each case declares actor identity and role, active Business, target ownership, resource state, attempted action, expected allow/deny result, and stable denial code. The same cases feed domain-policy tests, API integration tests, pgTAP RLS tests, private Storage tests, Realtime channel tests, and selected web/mobile/admin E2E checks.

Required actor dimensions:

- anonymous, unverified User, verified Customer, suspended or permanently banned User;
- Business `owner`, `admin`, `service_provider`, and `finance` member, including membership in another Business and no active Business context;
- Admin `super_admin`, `support`, `trust_safety`, `finance`, `content_admin`, and `read_only` roles;
- the original actor, an unrelated User, another bidder, the winning Customer, the listing Business, and an unrelated Business.

Required negative cases include cross-Business reads and writes, stale or forged Business context, bidder-to-bidder message access, attachment URL reuse, private Realtime subscription, payout-account mutation by a non-owner, Admin UI/API mismatch, self-approval of two-person actions, silent impersonation, export overreach, and access after membership removal or account restriction.

### Payment-provider contract testing

- A provider-neutral contract suite runs against both Stripe and PayPal adapters on every pull request using versioned, signed webhook fixtures and the deterministic provider fakes.
- The suite covers payment creation, repeated creation with one idempotency key, success, decline, cancellation, timeout with indeterminate outcome, delayed confirmation, duplicate and out-of-order webhook delivery, invalid signatures, partial and full refunds, payout pause/release/failure/reversal, reconciliation, and provider-reference lookup.
- Financial assertions compare immutable integer-minor-unit ledger entries: Customer charge, protection fee, Quaotz commission, processor expense, refund, Business net, and provider balance. Every case asserts that ledger debits and credits balance.
- A minimal live-sandbox suite runs nightly and before release against provider test accounts. It checks authentication, API-version compatibility, one payment lifecycle, webhook receipt, one refund, and connected-account or merchant payout capability without becoming a pull-request dependency.
- Fixture refreshes and provider API-version changes require review of the adapter contract diff and a successful live-sandbox run. Production credentials and personal data never enter fixtures or CI logs.

### Realtime recovery testing

- Database/API snapshots are authoritative. Realtime payloads contain resource ID, event type, resource version, and correlation ID, and act as invalidation hints rather than the only copy of state.
- Clients discard duplicate or older versions, apply safe optimistic presentation only when its expected version still matches, and refetch the authoritative snapshot after reconnect, a sequence gap, an unknown event type, or a version conflict.
- `packages/test-kit` provides a transport simulator that can disconnect, delay, drop, duplicate, and reorder events while API mutations continue. Shared client-state tests run the same scenarios for web and mobile.
- Required scenarios include concurrent higher bids, auction close while offline, award while backgrounded, message receipt duplication, membership removal during a session, payout/dispute state changes, token refresh, channel authorization loss, and recovery after application restart.
- E2E smoke flows verify visible reconnect status, eventual convergence, preserved unsent message drafts, no duplicate notifications, and correct deep-link recovery to the latest resource state.

### Visual-regression governance

- Maintain an inventory linking each release-critical route or mobile screen to its Figma node, fixture state, viewport/device, theme, locale, and accessibility assertions.
- Web baselines use fixed desktop, tablet, and narrow-mobile breakpoints in Playwright. Mobile baselines use one representative current iPhone simulator and one representative Android phone emulator, with focused additional coverage for dynamic type, reduced motion, keyboard appearance, safe areas, and platform-specific controls.
- Baselines are captured only from deterministic seeded data with animation, clock, network, random IDs, and image loading controlled by the test harness.
- A pull request may update a baseline only with the corresponding before/after diff, Figma reference, reason, and explicit design-review approval. Percentage thresholds may suppress antialiasing noise but must not hide layout, typography, colour, content, focus, or responsive changes.
- Each visual flow runs companion accessibility checks for semantic labels, heading/order structure, keyboard and focus behaviour, contrast, touch-target size, screen-reader announcements, reduced motion, and dynamic type. A screenshot match does not override an accessibility failure.

### Combined coverage map

Legend: `U` unit/property, `D` database/RLS, `C` API/provider contract, `I` integration, `W` web E2E, `M` mobile E2E, `V` visual/accessibility, `S` security/abuse, `H` deterministic failure/time/concurrency harness.

```text
User identity
  sign up -> verify -> sign in -> recover -> risky-login response       U D I W M S
      |
      +-> Customer context -> discover -> bid/edit/withdraw              U D C I W M V S H
      |                         |                |
      |                         |                +-> private message      U D C I W M S
      |                         +-> lose/released/read-only               U D I W M
      |
      +-> Business context -> verify -> subscribe -> entitlements         U D C I W M V S H
                                |
                                +-> create listing -> publish -> auction   U D C I W M V S H
                                                        |
                    +-----------------------------------+-----------------------------+
                    | highest_bid                       | business_choice             |
                    | tie/no-bid/cancel                 | select/24h expiry           |
                    +------------------- U D I W M H ----+---------------------------+
                                        |
                                      award
                                        |
                  payment -> funded -> work -> complete -> approve/auto/dispute      U D C I W M S H
                                        |                        |
                                        |                        +-> protection review -> refund
                                        +-> payout pause/release/reconcile            U D C I W S H

Business management
  switch business -> member role -> plan change -> grace -> inactive      U D C I W M S H

Trust and administration
  report -> investigate -> action -> appeal -> uphold/overturn             U D C I W V S
  finance/refund/export/config -> two-person approval -> audit             U D C I W V S

Cross-cutting
  generated client/errors/idempotency/version conflicts                    U D C I S
  realtime reconnect/out-of-order/duplicate events                         U D I W M S H
  media type/size/malware/private URL                                       U D C I W M S H
  Figma parity/responsive/dynamic type/reduced motion                       W M V
```

## Performance and Scalability

### Auction write path

- Each bid creation, replacement, or withdrawal opens a short database transaction and locks the target auction row. The transaction rereads authoritative server time, auction state/version, Customer and Business eligibility, current highest qualified bid, and minimum increment.
- If valid, the transaction appends the immutable bid event, updates the bid record, advances the auction's denormalized current-bid projection and version, and writes the outbox event atomically. It performs no provider call, media work, email, or realtime network call while holding the lock.
- The close job uses the same auction lock. A bid at or after `ends_at` is rejected even when it waited for the lock; a close job delayed by contention still closes at the stored time and never extends the auction.
- Realtime, notifications, analytics, and emails consume the committed outbox after the transaction. Consumers deduplicate by event ID and may not infer success from an uncommitted request.
- Index bid history by `(auction_id, accepted_at, id)` and the active Customer bid by `(auction_id, customer_user_id)`; keep current price, current leader, bid count, and auction version on the auction projection so discovery reads do not aggregate the event log.
- Track bid-transaction p50/p95/p99 latency, lock-wait time, conflict/rejection rate, close-job lag, outbox lag, and bids per auction. Alert on sustained lock waits or close lag rather than adding an external queue prematurely.

### Discovery read path

- Maintain a `listing_discovery` projection containing only public, filterable fields: listing and Business IDs, category, normalized search document, state/service area, schedule facets, starting/current price, auction end/state, published/visible time, media thumbnail, rating summary, and visibility rank.
- Update the projection idempotently from committed listing, auction, bid-projection, Business-verification, rating, and entitlement outbox events. API reads never join the immutable bid-event log or financial tables.
- Use Postgres full-text search plus trigram matching for launch, with B-tree/GiST indexes chosen from measured query plans for category, state/service area, visibility time, auction state/end, and sortable price/rating fields. An external `SearchProvider` boundary permits later migration without changing clients.
- Use opaque keyset cursors built from the selected stable sort plus listing ID. Do not use unbounded offsets. Cap page size, requested filters, and query complexity, and return the projection version/freshness timestamp.
- Cache only anonymous/public discovery responses for a short bounded period and vary by normalized filters. Authenticated eligibility and private bid state are overlaid from authoritative data and never stored in a shared public cache.
- If projection processing lags, continue serving the last committed projection, expose freshness metrics, and let listing-detail reads use the authoritative record. Monitor search p50/p95/p99, empty-result rate, query-plan regressions, projection lag, cache hit rate, and cursor errors.

### Realtime fanout

- Use private topics scoped to a single auction, conversation, booking, or User notification stream. Authorization is checked when joining and revalidated when membership, restriction, or resource state changes.
- Clients subscribe only while the resource is visible or the notification stream is active, unsubscribe on context change/background where appropriate, and enforce a small per-session subscription ceiling.
- Publish compact versioned events from the transactional outbox after commit. Events carry identifiers and changed-field hints, not full private records or attachment URLs; clients fetch an authoritative snapshot when needed.
- Coalesce replaceable high-frequency projection updates within a brief bounded window while never coalescing messages, awards, payment transitions, or audit-sensitive events. Presence/typing signals are ephemeral, rate-limited, and limited to active private conversations.
- Do not broadcast the discovery feed globally. Cacheable discovery reads use the indexed projection; active listing-detail screens join only their auction topic.
- Measure active channels, subscribers per hot resource, messages per second, delivery/outbox lag, authorization failures, reconnect rate, snapshot-refetch rate, and provider quota utilization. Apply backpressure by dropping replaceable hints and forcing snapshot refresh, never by dropping durable state transitions.

### Media transfer and processing

- The API creates a pending media record and issues a short-lived, single-object upload grant for a private quarantine path bound to the actor, Business/resource scope, expected size, and allowed content class. Application servers do not buffer file bytes.
- Clients upload directly to object storage and call finalize with the object checksum. A durable job verifies existence, actual size/type, image dimensions or media metadata, checksum, and malware/moderation result before atomically transitioning the record from `pending` through `scanning` to `ready` or `rejected`.
- Only `ready` media can be referenced by public listing projections or messages. Reads require a server-authorized short-lived signed URL; quarantine and rejected objects are never served to end users.
- Use bounded image variants and thumbnails generated asynchronously. Listing/search APIs return only the size needed by the current surface; original media is not fetched for feed cards.
- Multipart/resumable upload is enabled for later large video support, while MVP image/attachment limits remain conservative. Pending or orphaned objects expire through an idempotent cleanup job.
- Apply per-User and per-Business storage/upload quotas, concurrent-upload limits, and rate limits. Monitor upload success/latency, scanning queue age, rejection reasons, orphan bytes, storage growth, egress, and signed-URL failures.

### Admin reporting and exports

- Admin operational screens query indexed, purpose-built views with opaque cursor pagination, bounded date ranges, allowlisted sorts/filters, field selection by role, and explicit query timeouts. They never load an unbounded audit, bid, message, or ledger history.
- Large reports and all file exports are durable background jobs. The request stores the filter, reason, requesting role, permission snapshot, point-in-time cutoff, schema version, and approval IDs where dual control applies.
- Generate exports from a consistent point-in-time snapshot or reporting projection, stream rows into a file rather than retaining the dataset in memory, redact fields by role, watermark sensitive outputs, and write only to private storage.
- On completion, recheck that the requester remains authorized before issuing a short-lived one-time link. Audit request, approval, generation, access, expiry, and deletion; automatically expire the file according to data classification.
- Enforce per-role concurrency and row/size limits. Cancel or split oversized exports and surface progress without holding an HTTP connection.
- A separate analytics warehouse becomes a later scaling option when measured reporting load, retention, or cross-domain analysis exceeds the operational projections; it is not an MVP dependency.

### Launch service levels and capacity proof

Measured at the public API edge, excluding deliberate provider/user waits:

| Signal | Launch objective |
|---|---:|
| API availability | 99.9% monthly |
| Cached/public and authenticated read latency | p95 < 400 ms, p99 < 1 s |
| Non-provider mutation latency | p95 < 600 ms, p99 < 1.5 s |
| Accepted/rejected bid response | p95 < 750 ms, p99 < 2 s |
| Committed outbox event visible to an active client | p95 < 2 s, p99 < 5 s |
| Auction close job lag from stored `ends_at` | p99 < 5 s |
| Critical payment webhook acknowledged after durable receipt | p95 < 500 ms |
| Critical due job started | p99 < 30 s, except auction close above |

- Capacity tests run against production-like indexes, RLS, realistic fixture distributions, and the same process topology. The release candidate must meet the objectives at ten times forecast launch traffic, including a hot-auction scenario rather than only uniform load.
- Model discovery reads, listing details, active-auction refreshes, bid bursts, messages, media finalization, payment webhooks, background jobs, and Admin reads separately. Report saturation for database CPU/connections/locks, application CPU/memory/event loop, queue/outbox age, storage/realtime/provider quotas, and cache hit rate.
- Protect critical mutations with per-actor and per-resource rate limits, bounded request bodies, database timeouts, job concurrency controls, connection-pool limits, and circuit breakers for optional external services.
- Degrade safely: serve the last committed discovery projection when indexing lags, pause noncritical email/report/media variants when queues grow, replace lost realtime hints with snapshot refresh, and keep bid/award/payment correctness ahead of recommendations, analytics, presence, or exports.
- Error-budget alerts combine availability, latency, auction-close lag, webhook receipt, job/outbox age, and financial reconciliation. A sustained burn blocks release and triggers capacity or correctness work before adding features.

## Analytics and Success Metrics

- Verified signup completion rate.
- Time from signup to first request or first bid.
- Listing publish completion rate.
- Percentage of listings receiving at least one qualified customer bid.
- Time to first bid and time to award.
- Auction close-to-contract conversion.
- Payment success and payout completion rates.
- Dispute and refund rates.
- Message response time.
- Subscription conversion, downgrade, failed renewal, and churn.

## Milestones

### M0: Product lock

- Resolve open business rules.
- Inventory Figma frames and map them to routes.
- Approve architecture, data model, and MVP boundary.
- Produce testable acceptance criteria.

### M1: Foundation

- Create monorepo, CI, environment validation, shared tokens, API contract, database migrations, auth, logging, and test harnesses.

### M2: Identity and subscriptions

- Build account verification, profiles, businesses, memberships, plans, entitlements, and onboarding across web and mobile.

### M3: Listings and auctions

- Build service listings, discovery, search, timed ascending auctions, Customer bid management, and notifications.

### M4: Contracts and communication

- Build winning-customer selection, bookings/contracts, messaging, deliverables, and status history.

### M5: Payments and trust

- Build marketplace payments, payouts, receipts, failures, reviews, disputes, moderation, admin finance/trust workflows, and audit tooling.

### M6: Production readiness

- Complete visual parity, accessibility, security review, concurrency tests, backups, monitoring, stores, deployment, and staged launch.

## Decisions Required Before Implementation

No unresolved product-architecture decisions remain from this review pass.

## Decisions Locked

- Initial launch market: United States. The first release uses US addresses, USD, state-based discovery rules, and US-compatible payment onboarding while retaining country-aware data structures for later expansion.
- Marketplace direction: Business-led only. A Business publishes a service opportunity and Customers bid upward to win it; Quaotz does not add a separate Customer-request auction in the first release.
- Award rule: the Business chooses `highest_bid` or `business_choice` while creating the listing. The selected rule is public and immutable after publication.
- Business-choice deadline: the Business has 24 hours after auction close to select a winner. Otherwise the auction expires without an award and all Customer bids are released.
- Account modes: one verified User can act as a Customer and can unlock Business mode by creating or joining a verified Business; duplicate accounts are not required.
- Revenue model: Customers use the marketplace without a subscription. Quaotz sells subscriptions to Businesses and deducts a service commission from Business payouts at a rate determined by that Business's subscription plan.
- Launch pricing: Standard is $9.99/month with a 15% Business commission; Gold is $29.99/month with 12%; Diamond is $79.99/month with 9%; Platinum is $199.99/month with 6%.
- Annual billing: Standard is $99/year, Gold $299, Diamond $799, and Platinum $1,999, with no free trial at launch.
- Processing fees: Quaotz pays card-processing charges from its service commission. Customers pay the winning bid, and Businesses receive the bid less the single published plan commission.
- MVP payment methods: cards, Apple Pay/Google Pay, and PayPal. Bitcoin uses the same provider boundary but ships after MVP.
- Payment release: every booking uses Customer prepayment, Business completion, Customer approval or dispute, and automatic Business payout after 48 hours without a dispute.
- Optional protection: `Quaotz Protection` costs 3% of the winning bid, subject to a $2.99 minimum and $49.99 maximum. It provides a seven-day review window, payout pause, priority evidence review, and full or partial refund for verified non-delivery or material mismatch. It is not marketed as escrow unless approved as a regulated escrow service.
- Multiple businesses: one account may own or join multiple businesses. Every business maintains its own subscription, payout account, team permissions, listings, reports, and audit history.
- Conduct enforcement: use progressive warnings, restrictions, and temporary suspensions for lower-severity or repeated violations; allow immediate permanent identity bans for verified fraud, illegal services, credible threats, serious payment abuse, or ban evasion, with evidence and appeal.
- Password policy: do not force periodic 45-day changes. Require strong passphrases, breached-password blocking, MFA support, attack throttling, and credential reset after suspected or verified compromise.
- Login alerts: notify on new devices or meaningful risk signals rather than every IP change; provide a direct account-protection action that revokes sessions and starts recovery.
- Repository structure: use three apps (`web`, `mobile`, `server`) and four shared packages (`domain`, `api-client`, `design-tokens`, `test-kit`). The server runs separate HTTP and background-job processes from one codebase.
- Launch reporting entitlement: Diamond and Platinum include an in-app monthly Business summary. Downloadable CSV/PDF reports ship after MVP.
- Repeat-customer discounts: not advertised as a launch entitlement; the pricing, abuse, commission, refund, and tax design is deferred to V1.

## Source Notes

- Expo supports workspace-based monorepos and automatically configures modern monorepos: https://docs.expo.dev/guides/monorepos/
- Next.js App Router is the current file-system router: https://nextjs.org/docs/app
- Supabase documents Expo integration, Auth, Storage, RLS, and Realtime Broadcast: https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native
- Stripe Connect is designed for marketplace payment collection and seller payouts: https://docs.stripe.com/connect
- PayPal multiparty payments require marketplace onboarding and production approval: https://developer.paypal.com/docs/multiparty/
- NIST advises against arbitrary periodic password changes: https://pages.nist.gov/800-63-4/sp800-63b.html

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | NOT RUN | Optional follow-up for product/business challenge |
| Codex Review | `/codex review` | Independent 2nd opinion | 0 | NOT RUN | Outside voice skipped |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAR | 33 issues resolved, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 0 | NOT RUN | Recommended before UI implementation |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | NOT RUN | Optional after repository scaffolding |

**VERDICT:** ENG CLEARED — ready to implement. CEO and Design reviews remain optional follow-ups.

NO UNRESOLVED DECISIONS
