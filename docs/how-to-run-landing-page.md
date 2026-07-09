# How to run and review the QUOATZ landing page

This guide gets the static QUOATZ landing page running locally, verifies the build, and gives you a quick review loop for the marketplace flow.

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

   Check the first screen, then scroll through Marketplace, Plans, Trust, dashboard preview, and Stack.
   The hero preview tabs should switch between Request, Bids, and Pay.

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

- The page title reads `QUOATZ Marketplace`.
- No visible legacy product copy remains.
- The hero H1 is `QUOATZ`.
- The Request, Bids, and Pay tabs animate typed status text.
- The Marketplace section switches active panels on scroll and tab click.
- The Stack cube toggles open on click, Space, or Enter.

## Troubleshooting

If `npm run dev` fails with `vite: command not found`, run `npm install` again.

If the browser shows old copy, hard-refresh the page or stop and restart the Vite server.

If Docker serves stale files, rebuild the container:

```bash
docker compose up --build -d
```
