# QUOATZ flow and stack explanation

QUOATZ is a marketplace for service requests, Business Owner bids, reverse auctions, subscription permissions, account verification, media-rich profiles, payments, and reporting. The landing page is not a generic brochure. It previews the real product states the app needs to support.

## The problem

A marketplace like QUOATZ can lose trust when important rules are hidden. If countdowns only appear on detail pages, bidders miss deadlines. If reverse bidding is buried in settings, Users do not understand why the lowest qualified bid matters. If subscription permissions are not visible, account tiers feel arbitrary. If payment grace periods happen in the background, Users learn they are blocked only after trying to post.

The landing page addresses that by making the core operating model visible:

- Users create service requests with budget, target date, media, requirements, payment preference, and liability consent.
- Business Owners bid with portfolio proof, ratings, recommendations, and partner/co-bid context.
- Timers appear as first-class marketplace objects.
- Reverse bidding is represented as a live auction mode.
- Payment and account rules are part of the product story.

## The approach

The current repo is a static Vite page. That is the right surface for a fast landing page because it is cheap to host, easy to cache, and simple to move behind a CDN.

```text
Browser
  |
  | static HTML, CSS, JS
  v
Vite build output
  |
  | deploy as static assets
  v
CDN / static host / nginx container
```

The landing page points toward the production application stack without implementing backend behavior inside the marketing site.

```text
Expo mobile app        Next.js web app
       |                    |
       +------ TypeScript API / BFF ------+
                                           |
       +-----------+-----------+-----------+-----------+
       |           |           |           |           |
   Postgres      Redis       Queue       R2/Stream   Payments
 entitlement   sessions    jobs/email    media       cards/PayPal/Bitcoin
```

## Flow represented on the page

1. The hero shows the first user promise: QUOATZ is a premium service marketplace, not a storage product.
2. The product preview shows Request, Bids, and Pay states.
3. The Marketplace section explains service request creation, countdown timers, Business Owner proof, and payment/account rules.
4. The Plans section maps Standard, Gold, Diamond, and Platinum permissions.
5. The Trust section turns account, bid, and payment rules into visible user-facing states.
6. The dashboard preview shows the product surface that later maps to User, Business Owner, and admin dashboards.
7. The Stack section names the scalable app direction: Expo, Next.js, TypeScript API, Postgres, R2, queues, payments, and audit logs.

## Trade-offs

The landing page uses plain HTML, CSS, and JavaScript instead of a component framework. That keeps cost and hosting complexity low, but it means repeated UI fragments are not componentized yet.

The page includes product mockups built with HTML and CSS instead of screenshot assets. That keeps the repo self-contained and responsive, but real app screenshots should replace or supplement the mockups once the working QUOATZ dashboards exist.

The stack section describes the target production architecture, but the repo itself remains static. That separation is intentional. The landing page can launch before the full backend is connected.

## Alternatives considered

The repo could have been converted to Next.js immediately. That would be useful if the landing page needed server-rendered marketplace listings or CMS-managed content today. For this request, the cheaper path is to keep Vite and ship the QUOATZ landing page quickly.

The repo could also use AWS S3 for static hosting and media later. The current architecture direction favors Cloudflare R2 for marketplace media because it is cost-effective for user uploads and CDN delivery. AWS remains a good later option if the whole backend moves into AWS services.

## Related

- [QUOATZ landing page reference](reference-landing-page.md)
- [How to run and review the landing page](how-to-run-landing-page.md)
