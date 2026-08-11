# How to run and review the QUOATZ landing page

This guide gets the static QUOATZ landing page running locally, verifies the build, and gives you a quick review loop for the Steadyflow-inspired marketplace homepage.

## Prerequisites

- Node.js 18 or newer.
- npm.
- A browser for visual review.

## Steps

1. Install the project dependencies.

   ```bash
   npm install
   ```

   The app uses Vite only, so install time should stay small.

2. Start the local dev server.

   ```bash
   npm run dev
   ```

   Vite prints a local URL, usually `http://localhost:5173/`.

3. Open the page and review the primary flow.

   Check the fixed pill navigation, black cinematic video hero, metallic-gold buttons, QUOATZ phone mockup, results marquee, and marketplace counter section.

4. Build the production bundle.

   ```bash
   npm run build
   ```

   Vite writes the static output to `dist/`.

5. Preview the built version.

   ```bash
   npm run preview
   ```

## Verification

Run:

```bash
npm run build
```

The command should complete without errors and produce `dist/index.html`.

Manual checks:

- The page title reads `QUOATZ - Service requests that never stall`.
- No visible legacy cloud-storage or dark dashboard-page copy remains.
- The hero headline reads `Service requests that never stall`.
- The primary hero video is darkened behind the centered copy and phone mockup.
- Buttons and active controls use the metallic-gold theme.
- The phone mockup mentions requests, active bids, reverse auction timing, and matching.
- The counter and phone UI do not present fabricated marketplace performance numbers.
- The mobile menu opens, closes, and locks body scroll.
- The video modal opens from `See it live` and closes on the X, backdrop, or Escape.
- The results marquee repeats continuously and pauses on hover.

## Troubleshooting

If `npm run dev` fails with `vite: command not found`, run `npm install` again.

If the browser shows old copy, hard-refresh the page or stop and restart the Vite server.

If Docker serves stale files, rebuild the container:

```bash
docker compose up --build -d
```
