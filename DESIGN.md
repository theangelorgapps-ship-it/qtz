# Design System: QUOATZ Black Gold Marketplace

## 1. Visual Theme & Atmosphere

A premium off-black marketplace interface with controlled metallic-gold interaction points. Density is Daily App Balanced (6), variance is Steady Asymmetric (5), and motion is Fluid CSS (6). The mood should feel like a polished service marketplace command surface: calm, expensive, legible, and operational.

## 2. Color Palette & Roles

- **Off-Black Canvas** (#070808): Primary page background, hero curve fill, modal backdrop, and section base.
- **Charcoal Surface** (#111211): Navigation pills, mobile menu, glass overlays, and elevated panels.
- **Deep Metal Surface** (#191916): Secondary surface for layered controls and mockup depth.
- **Warm Ivory Ink** (#F7F1E4): Primary text on dark backgrounds.
- **Muted Champagne** (#C9BEA8): Secondary text, helper labels, and supporting copy.
- **Soft Graphite Gold** (#8F8778): Card metadata and low-priority labels.
- **Metallic Gold** (#D8B35F): Single accent for primary CTAs, active controls, progress, and focus states.
- **Bright Gold Highlight** (#F5DC99): Metallic top edge, hover brightness, and focus clarity.
- **Deep Gold Shadow** (#80602B): Metallic depth and bottom-edge shading.

## 3. Typography Rules

- **Display:** Stack Sans Headline with Geist fallback. Use controlled `clamp()` sizing, tight line-height, and warm ivory color. Keep hero type below the previous oversized scale across desktop, tablet, and mobile.
- **Body:** Google Sans Flex with Geist fallback. Keep body copy relaxed, readable, and below 65 characters where possible.
- **Numbers and state labels:** Use the display face in product mockups. Avoid invented platform metrics until real data exists.
- **Banned:** Inter as a premium-context fallback, generic serif fonts, pure black, neon glows, and oversized typography that creates mobile overflow.

## 4. Component Stylings

* **Buttons:** Metallic-gold fill for primary, store, menu, close, and active phone controls. Use inset highlights, deep gold shadowing, and tactile active translation. No neon outer glow.
* **Secondary Buttons:** Dark glass fill with gold border and gold text. Keep the same 44px minimum touch target.
* **Navigation Pills:** Dark translucent charcoal, gold hairline border, soft shadow, and compact typography.
* **Phone Mockup:** Dark glass panel with gold-tinted border and gold active indicators. Text must truncate inside rows instead of pushing width.
* **Cards:** Use elevation only for photo result cards and major video frames. Shadows stay black-tinted, not colorful.

## 5. Layout Principles

Use max-width containment and mobile-first clamps. No horizontal overflow on mobile. Keep all actions in stable columns at small widths, with full-width CTAs under 640px. Avoid overlapping text and images; every component must occupy a clear zone.

## 6. Motion & Interaction

Use transform and opacity only. Hero and rows reveal in a staggered cascade. Buttons use weighty scale/translate feedback with metallic shimmer. The phone preview uses subtle vertical drift, bars pulse as live activity, and result cards lift on hover. Marquee motion can run continuously but must pause on hover and respect reduced-motion settings.

## 7. Anti-Patterns

No emojis, no pure black, no blue/purple neon, no generic fake stats, no fabricated platform counts, no 3-column equal-card feature rows, no custom cursor, no broken image links, no scroll-arrow filler, and no copywriting clichés such as “elevate,” “unleash,” or “next-gen.”
