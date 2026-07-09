# QUOATZ landing page reference

The QUOATZ landing page is a static Vite site. It uses `index.html` for content, `styles.css` for the dark metallic visual system, and `script.js` for lightweight tab, scroll, pricing-bar, and stack-cube interactions.

## Public files

| File | Purpose |
|---|---|
| `index.html` | Defines the full landing page content and accessible structure. |
| `styles.css` | Defines the QUOATZ visual system, responsive layout, dashboard previews, and motion styles. |
| `script.js` | Runs hero tabs, typed status text, scroll accordion behavior, pricing bar motion, and stack cube toggling. |
| `vite.config.js` | Uses default Vite configuration. |
| `postcss.config.js` | Keeps Vite from inheriting unrelated parent PostCSS settings. |
| `Dockerfile` | Serves the static files through `nginx:alpine`. |
| `docker-compose.yml` | Builds and exposes the Docker service on port `9988`. |

## Page sections

| Section | Anchor | Description |
|---|---|---|
| Hero | `#` | Brand-first first viewport with QUOATZ headline, marketplace copy, CTAs, mobile preview, and desktop console preview. |
| Marketplace engine | `#marketplace` | Scroll-driven accordion for service requests, timers, profiles, and payments. |
| Subscription levels | `#plans` | Standard, Gold, Diamond, and Platinum entitlement summary. |
| Trust controls | `#trust` | Account verification, bid governance, and payment reliability. |
| Dashboard preview | none | Product preview for Users, Business Owners, admins, bids, timers, and reports. |
| Build path | `#operations` | Stack direction for Expo, Next.js, TypeScript API, Postgres, R2, jobs, payments, and audit logs. |

## JavaScript behavior

### Hero console tabs

Selector: `.console-tab`

Each tab uses `data-tab`. Each pane uses matching `data-pane`. Activating a tab:

- Sets `.active` on the selected tab and pane.
- Updates `aria-selected`.
- Toggles the `hidden` attribute on panes.
- Types the pane status from `data-typed`.

### Marketplace accordion

Selectors:

- `[data-accordion-tab]`
- `[data-accordion-card]`
- `.platform-accordion`

The script reads scroll progress inside `.platform-accordion`, positions the stacked cards, clips lower cards, and activates the matching tab. Clicking an accordion tab scrolls to the matching segment.

### Pricing bars

Selector: `.pricing-bar`

The bars update `--bar-morph` from scroll progress. CSS combines that variable with each bar's static `--bar-height`.

### Stack cube

Selector: `.modal-cube-shell`

Clicking, pressing Space, or pressing Enter toggles `.is-exploded`, which expands the stack modules through CSS transforms.

## Design tokens

The main tokens live in `:root` in `styles.css`.

| Token | Use |
|---|---|
| `--bg` | Page background. |
| `--surface`, `--surface-2`, `--panel` | Dark metallic surfaces. |
| `--ink`, `--muted`, `--soft` | Text hierarchy. |
| `--line`, `--line-strong` | Borders and separators. |
| `--gold`, `--gold-strong` | Primary metallic action and timer accents. |
| `--silver` | Chrome highlights. |
| `--teal` | Live, verified, and dashboard state accents. |
| `--danger` | Reserved for negative or declined-payment states. |

## Commands

```bash
npm run dev
npm run build
npm run preview
docker compose up --build -d
```

## Related

- [How to run and review the landing page](how-to-run-landing-page.md)
- [QUOATZ flow and stack explanation](explanation-flow-and-stack.md)
