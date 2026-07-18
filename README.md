# Quaotz

Quaotz is a two-sided local services marketplace. Businesses publish service availability and Customers bid upward to book it. The Business can accept the highest bid or choose the Customer whose booking best fits.

## Current milestone

The web application is implemented in `apps/web` with Next.js 16, React 19, TypeScript, App Router, semantic CSS design tokens, and Phosphor icons.

Included routes:

- `/` marketing home
- `/sign-in` authentication entry
- `/protection` standard and protected payment routes
- `/app/discover` responsive marketplace and filters
- `/app/listings/[listingId]` service detail and bid submission
- `/app/proposals`, `/app/contracts`, `/app/messages`, `/app/profile`
- `/admin` operations overview

Dark mode is the default. Users can switch to the purpose-designed light theme, and the selection is persisted locally.

## Run locally

From this directory:

```bash
npm install
npm run dev:web
```

Then open `http://localhost:3000`.

## Verification

```bash
npm run typecheck:web
npm run lint:web
npm run build:web
npm run test:e2e:web
```

The Playwright suite covers the dark default, theme switching, use-case transitions, plan billing, Protection, discovery, listing navigation, bid submission, confirmation, and mobile navigation.

## Design reference policy

The implementation uses the supplied Quaotz Figma file as the brand and product-flow source of truth. Mobbin references inform marketplace interaction patterns and responsive information architecture. No third-party brand assets or proprietary product copy are included.

## Next phase

The Expo app should share the same terminology, domain states, API contracts, and design tokens. The next implementation milestone is the backend contract and authentication layer, followed by the Expo shell and the native Customer bidding flow.
