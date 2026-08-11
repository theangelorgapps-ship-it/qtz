# QUOATZ landing page reference

The QUOATZ landing page is a static Vite site. It uses `index.html` for content, `styles.css` for the Steadyflow-inspired light visual system, and `script.js` for lightweight navigation, modal, reveal, count, and marquee interactions.

## Public files

| File | Purpose |
|---|---|
| `index.html` | Defines the full landing page content and accessible structure. |
| `styles.css` | Defines the light page background, fixed pill navigation, video hero, glass phone mockup, results cards, counter visual, responsive layout, and motion styles. |
| `script.js` | Runs navbar scroll state, mobile menu locking, video modal toggling, marquee duplication, count cycling, and scroll reveal behavior. |
| `vite.config.js` | Uses default Vite configuration. |
| `postcss.config.js` | Keeps Vite from inheriting unrelated parent PostCSS settings. |
| `Dockerfile` | Serves the static files through `nginx:alpine`. |
| `docker-compose.yml` | Builds and exposes the Docker service on port `9988`. |

## Page sections

| Section | Anchor | Description |
|---|---|---|
| Navbar | fixed | White rounded pill navigation with QUOATZ logo, page links, store buttons, and mobile hamburger menu. |
| Hero | `#hero` | Full-screen video hero with frosted announcement pill, QUOATZ headline, CTAs, glass phone marketplace mockup, and curved page transition. |
| Results | `#results` | Social-proof header, avatar count chip, star asset, and looping photo-card marquee with QUOATZ outcomes. |
| Counter | `#counter` | Marketplace-progress metric, video visual, cloud overlay, and bottom fade. |
| Video modal | none | Full-screen modal containing the supplied demo iframe. |

## JavaScript behavior

### Navbar and mobile menu

Selectors:

- `[data-navbar]`
- `[data-menu-toggle]`
- `[data-mobile-panel]`
- `[data-menu-backdrop]`

The navbar receives `.is-scrolled` after 50px of page scroll. The mobile menu toggles `body.menu-open`, updates `aria-expanded`, closes from the backdrop or menu links, and locks body scroll while open.

### Video modal

Selectors:

- `[data-open-video]`
- `[data-video-overlay]`
- `[data-close-video]`

The modal toggles `.is-open`, updates `aria-hidden`, locks body scroll, and closes on the close button, backdrop click, or Escape.

### Results marquee

Selector: `[data-marquee-track]`

The six result cards are cloned twice so the CSS marquee can animate three full sets across the screen.

### Avatar count

Selector: `[data-count-chip]`

The count cycles through `51+`, `52+`, `53+`, and `54+` every two seconds with a small scale pop.

### Scroll reveal

Selector: `.reveal-on-scroll`

An `IntersectionObserver` adds `.is-visible` once each section block enters the viewport.

## Design tokens

The main tokens live in `:root` in `styles.css`.

| Token | Use |
|---|---|
| `--page` | Light page background and curve fill. |
| `--ink` | Near-black text, buttons, overlays, and hero fallback. |
| `--muted` | Secondary text. |
| `--soft` | Soft gray card labels. |
| `--blue` | Primary QUOATZ action and progress accent. |
| `--logo` | QUOATZ logo fill. |
| `--pill-shadow` | Rounded navbar and panel shadow. |
| `--font-headline` | Brand headlines, big numbers, and phone greeting. |
| `--font-body` | Body copy, UI labels, navigation, and CTAs. |

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
