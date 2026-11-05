# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Kora Goods (E-commerce Website)
- Last completed phase: Phase 1
- Next phase: Phase 2 (Home page)
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [ ] Phase 2: Home page
- [ ] Phase 3: Main feature pages
- [ ] Phase 4: Remaining pages
- [ ] Phase 5: Polish and hand-off

## Decisions
(Write each choice you made without asking. One line each, with the phase number.)
- P1: Page split. Phase 3 = Shop, Product detail. Phase 4 = Cart (drawer + page), Checkout + order confirmation, not-found page.
- P1: Feature split. Cart context + localStorage + header cart count + "add to cart" are built in Phase 3 (Product detail uses them). Cart drawer, cart page, ₦ subtotal and empty states for cart are Phase 4. Shop empty state (no search results) is Phase 3.
- P1: Routes: `/`, `/shop`, `/product/:id`, `/cart`, `/checkout`, `/checkout/confirmation`, `*` (not found).
- P1: Fonts: Syne 600/700/800 for headings, Inter 400/500/600 for body, latin subset only.
- P1: Extra tokens beyond the brief: accent-dark #a64522 (hover), accent-soft #f3e3da, sand #efe9e1, line #e6e0d8, error/success colors.
- P1: Footer is dark (#1a1a1a) to frame the warm light pages. Header nav: Home, Shop, Cart; cart icon shows a count badge only when count > 0.
- P1: Logo is an inline SVG "K" mark on a terracotta tile; same mark is the favicon and the Img fallback motif.
- P1: Contact copy: hello@koragoods.example, +234 800 000 0000, Lagos, Nigeria (fictional).
- P1: Kept the oxlint setup that `npm create vite@latest` installs.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Shared components in `src/components/`: Header, Footer, Logo, Layout, Img (fallback tones: clay, sand, linen, ember), Button (variants primary/accent/outline/ghost, sizes sm/lg, `to`/`href`), Section (eyebrow/title/intro/action, tone surface/sand), PageTitle (title + meta), Placeholder (remove when pages are built).
- Site copy and nav live in `src/data/site.js`. `cartCount` in Header is hard-coded 0 until Phase 3.
