# QUOATZ flow and stack explanation

QUOATZ is a marketplace for service requests, Business Owner bids, reverse auctions, subscription permissions, account verification, media-rich profiles, payments, and reporting. The landing page now uses a Steadyflow-inspired marketing design to make that product story feel calmer, brighter, and easier to scan.

## The problem

A service marketplace can lose trust when important rules are hidden. If countdowns only appear on detail pages, bidders miss deadlines. If reverse bidding is buried in settings, Users do not understand why the lowest qualified bid matters. If subscription permissions are not visible, account tiers feel arbitrary. If payment states happen in the background, Users learn they are blocked only after trying to post.

The landing page addresses that by making the core operating model visible:

- Users create verified service requests.
- Business Owners bid with proof, ratings, and portfolio context.
- Timers and reverse-bidding states are visible in the product mockup.
- Secure payment and matching states are part of the homepage copy.
- Social proof and marketplace volume are expressed through results cards and the counter section.

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

1. The fixed pill navbar introduces QUOATZ as a polished app-style marketplace.
2. The hero gives the promise: service requests should keep moving instead of stalling across calls, texts, and untracked bids.
3. The phone mockup shows active bids, weekly request activity, reverse auction timing, matched requests, and request creation.
4. The results marquee turns marketplace outcomes into repeated proof cards.
5. The counter section gives the page a marketplace pulse and frames QUOATZ as an operating system for service work.

## Trade-offs

The landing page uses plain HTML, CSS, and JavaScript instead of converting the repo to React, TypeScript, Tailwind, Framer Motion, and Lucide. That keeps the current Vite project fast and low-cost while still matching the supplied Steadyflow layout, motion, and asset direction.

The hero and counter use remote video assets from the design brief. They make the page feel much closer to the supplied design, but production should eventually replace those URLs with QUOATZ-owned media.

The page does not implement real marketplace data. The phone UI, cards, and metrics are marketing representations that should later connect to real User, Business Owner, plan, bid, and payment data from the production app.

## Alternatives considered

The repo could be converted to React immediately. That would make sense if the landing page needed reusable product components, CMS content, or app-like state now. For this request, the cheaper and faster path is to keep Vite static and ship the visual redesign quickly.

The production marketplace should still use a scalable architecture: Expo for mobile, Next.js for web, a TypeScript API/BFF, Postgres for core relational data, Redis for sessions and rate limits, queues for email/jobs, R2 for cost-effective media storage, and payment integrations for cards, PayPal, and Bitcoin.

## Related

- [QUOATZ landing page reference](reference-landing-page.md)
- [How to run and review the landing page](how-to-run-landing-page.md)
