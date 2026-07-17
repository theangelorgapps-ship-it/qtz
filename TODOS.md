# Quaotz Deferred Work

These items were explicitly approved for deferral during the engineering-plan review. They are not launch commitments. Re-evaluate priority using production evidence after the dependency named on each item is stable.

## QTZ-TODO-001 — Bitcoin/cryptocurrency payment adapter

- **What:** Add a compliant Bitcoin or cryptocurrency payment provider behind the existing `PaymentProvider` boundary.
- **Why:** Preserve the requested payment method without exposing MVP to extra custody, compliance, volatility, refund, and reconciliation risk.
- **Pros:** Expands payment choice and can reach Customers who prefer digital assets while reusing Quaotz's ledger and provider-contract model.
- **Cons:** Adds jurisdiction/provider approval, conversion, fee disclosure, refund valuation, reconciliation, fraud, and support complexity.
- **Context:** MVP launches with cards, Apple Pay/Google Pay, and PayPal. Do not imply Quaotz holds cryptocurrency or provides regulated custody without specialist approval.
- **Depends on / blocked by:** Stable card/PayPal payment, refund, payout, ledger, reconciliation, compliance, and production-support operations.

## QTZ-TODO-002 — Multi-Business fulfilment and payout splitting

- **What:** Allow multiple Businesses to collaborate on one booking and split its payout.
- **Why:** Support services that require several independent providers.
- **Pros:** Enables larger jobs, partnerships, and more supply combinations.
- **Cons:** Multiplies contract allocation, responsibility, dispute, refund, tax-reporting, provider-transfer, and ledger complexity.
- **Context:** This is fulfilment collaboration, not Businesses bidding. MVP has exactly one listing Business and one payout destination per booking.
- **Depends on / blocked by:** Proven single-Business booking, immutable ledger, payout, refund, dispute, and reconciliation flows; provider support for separate charges and transfers.

## QTZ-TODO-003 — Business portfolio videos

- **What:** Support moderated Business profile and portfolio videos up to three minutes with resumable upload.
- **Why:** Increase Customer trust and let Businesses demonstrate service quality.
- **Pros:** Richer profiles may improve listing engagement and booking conversion.
- **Cons:** Adds transcoding, variants, thumbnails, captions, moderation, storage/egress cost, resumable transfer, and device-performance work.
- **Context:** MVP media supports private-quarantine images and attachments. Videos must use that pipeline rather than introducing a parallel public upload path.
- **Depends on / blocked by:** Stable direct upload, quarantine, malware/moderation, signed delivery, cleanup, quotas, and measured storage costs.

## QTZ-TODO-004 — Downloadable Business reports

- **What:** Add downloadable CSV/PDF monthly reports for eligible Business plans.
- **Why:** Let Businesses archive, share, and analyse activity beyond the launch in-app summary.
- **Pros:** Strengthens Diamond/Platinum value and supports bookkeeping and operations.
- **Cons:** Adds schema/version guarantees, redaction, generation cost, private delivery, accessibility, and support for large exports.
- **Context:** Diamond and Platinum receive an in-app monthly summary at launch. Downloads must use the reviewed background-export pipeline and must not run as live synchronous joins.
- **Depends on / blocked by:** Stable monthly-summary metrics, Admin/report projections, background exports, private storage, permission snapshots, and data-retention policy.

## QTZ-TODO-005 — Repeat-customer discounts

- **What:** Let eligible Businesses define controlled discounts for returning Customers.
- **Why:** Encourage repeat bookings without misleading Customers or corrupting commission economics.
- **Pros:** Can improve retention and give higher plans a concrete growth feature.
- **Cons:** Adds eligibility, stacking, abuse, cancellation, refund, tax, receipt, commission, and price-snapshot rules.
- **Context:** This is removed from launch entitlements. Future design must state who funds the discount and snapshot the full pricing rule on the booking.
- **Depends on / blocked by:** Stable booking/payment ledger, commission snapshots, refunds, tax treatment, promotion policy, and abuse monitoring.

## QTZ-TODO-006 — Configurable Business permissions

- **What:** Extend fixed Business roles into custom roles, fine-grained permissions, and configurable approval policies.
- **Why:** Larger Businesses may need separation of duties beyond the MVP role set.
- **Pros:** Supports complex teams without sharing owner credentials or overgranting access.
- **Cons:** Expands authorization, migration, support, UI, audit, and regression-test surface substantially.
- **Context:** MVP uses fixed `owner`, `admin`, `service_provider`, and `finance` roles. Custom permissions must remain compatible with server policies, RLS, storage, realtime, and the canonical authorization matrix.
- **Depends on / blocked by:** Stable fixed-role adoption data, Business membership lifecycle, permission-case generator, audit logs, and Admin support tooling.

## QTZ-TODO-007 — Saved searches and listing alerts

- **What:** Allow Customers to save discovery filters and receive matching-listing notifications.
- **Why:** Reduce repeated search work and bring Customers back when relevant supply appears.
- **Pros:** Improves repeat discovery and may shorten time to first bid.
- **Cons:** Adds preference storage, matching jobs, deduplication, rate limits, quiet hours, unsubscribe controls, and notification load.
- **Context:** Saved searches must reference versioned normalized filter criteria and consume the `listing_discovery` projection rather than scan normalized marketplace tables.
- **Depends on / blocked by:** Stable discovery projection/cursors, notification preferences and delivery, measured query patterns, and abuse/rate controls.

## QTZ-TODO-008 — Personalised listing recommendations

- **What:** Rank listings using Customer preferences and marketplace activity in addition to explicit search filters.
- **Why:** Improve discovery and conversion once Quaotz has enough trustworthy behavioural data.
- **Pros:** Can surface relevant services without requiring Customers to construct every search.
- **Cons:** Requires privacy controls, cold-start handling, explanation/fallback behaviour, offline evaluation, bias monitoring, and ongoing ranking operations.
- **Context:** MVP uses explicit search/filter and deterministic ranking. Do not build personalised ranking before there is enough launch data to evaluate it against that baseline.
- **Depends on / blocked by:** Consent/analytics policy, reliable event contracts, sufficient production activity, discovery projection, evaluation dataset, and measurable success guardrails.
