# Progress log

Claude Code: read this at the start of every session. Update it at the end of every phase.

## Current status
- Site: Kora Goods (E-commerce Website)
- Last completed phase: Phase 4
- Next phase: Phase 5 (Polish and hand-off)
- Live URL: (owner fills in after the first Vercel deploy)

## Phase checklist
- [x] Phase 1: Scaffold, deploy and design system
- [x] Phase 2: Home page
- [x] Phase 3: Main feature pages
- [x] Phase 4: Remaining pages
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
- P2: Product data written now (Home needs featured items). 16 products in IMAGE-PROMPTS order; ids are slugs; `image` is `/images/product-N.jpg` by index.
- P2: Categories: Living (1,2,4,8,14), Kitchen & Dining (5,6,7,12,15), Scent & Light (3,9,16), Bath & Everyday (10,11,13). Tiles use product-1/5/3/11 images.
- P2: Prices ₦12,500 to ₦89,000; each product has one option group (Size, Color, Scent, Glaze, Finish or Glass) and a short description.
- P2: Featured: vase, linen throw, soy candle, leather tote. Badges "Bestseller"/"New" on a few products.
- P2: Home copy (in `src/data/home.js`): hero "Warm objects for a calmer home.", perks strip (free Lagos delivery over ₦100,000, 14-day returns, small studios), promo "The Harmattan edit", newsletter "The Kora letter".
- P2: Hero is an image with an overlapping copy card on desktop, stacked on mobile.
- P3: Cart context (`src/context/CartContext.jsx`) stores `{ key, id, option, qty }` in localStorage key `kora-goods-cart`; line key is id + option; max qty 10 per line; unknown ids are dropped on load.
- P3: Shop state lives in the URL (`?category=`, `?sort=`, `?q=`) so filters are shareable; default sort "Featured" puts the 4 featured items first.
- P3: Shop/product copy in `src/data/shop.js`. Product detail delivery/returns/care notes reuse the Home perks wording.
- P3: Only one photo per product exists, so the gallery shows 3 views of the same image (front, close detail, texture) as zoomed crops; each has its own fallback tone.
- P3: "Add to cart" shows an inline success line with a "View cart" link (the drawer comes in Phase 4). Header badge pops when the count changes.
- P3: Related products = same category first, then others, 4 total. Unknown product id shows an on-brand "not found" message with a link back to the shop.
- P4: Copy for cart, checkout, confirmation and 404 lives in `src/data/cart.js`.
- P4: Delivery fee: Lagos ₦3,500 (free at ₦100,000+, matching the Home perk), other states ₦6,500. Shown as "Choose a state" until a state is picked. Cart and drawer show a free-delivery progress bar.
- P4: Header cart icon now opens the drawer (button); the "Cart" nav link goes to the full cart page. Add to cart also opens the drawer.
- P4: Drawer is a modal dialog: focus trap, Escape and overlay close, focus returns to the opener, closes on any route change.
- P4: Checkout fields: email, phone, first/last name, street, city, state (12 states list), card name, number (16 digits, auto-spaced), expiry MM/YY (not past), CVC. Payment fields use autocomplete="off" so browsers do not offer real cards.
- P4: Errors show on blur and on submit; submit focuses the first bad field and shows an alert. A 0.9s "Placing order…" state, then the order is saved to sessionStorage (`kora-goods-last-order`) and passed in router state; cart is cleared.
- P4: Order number format `KG-` + 6 random digits. Confirmation without an order shows an empty state.
- P4: 404 is a big "4◯4" with a terracotta ring for the zero, plus Shop/Home buttons.

## Blockers
(Write anything that stopped you. Say exactly what the owner must do.)

## Notes for next session
(Short. Only what the next session needs to know.)
- Shared components in `src/components/`: Header, Footer, Logo, Layout, Img (fallback tones: clay, sand, linen, ember), Button (variants primary/accent/outline/ghost, sizes sm/lg, `to`/`href`), Section (eyebrow/title/intro/action, tone surface/sand), PageTitle (title + meta), Placeholder (remove when pages are built).
- Site copy and nav live in `src/data/site.js`. `cartCount` in Header is hard-coded 0 until Phase 3.
- New shared pieces: `ProductCard`, `Reveal` (scroll fade-in), `NewsletterForm`, `src/lib/format.js` (`formatPrice` → ₦). `.product-grid` now lives in `ProductCard.css`.
- Phase 4 added: `CartDrawer`, `CartLine`, `QtyStepper` (moved `.qty` styles out of Product.css), `FreeDelivery`, `EmptyState`, `Field`, `src/lib/order.js`, `src/lib/validate.js`. `Placeholder` was removed. `.summary` card styles live in `pages/Cart.css` and are reused by Checkout and Confirmation.
- (Phase 3 note) Phase 4: use `useCart()` → `lines` (with `product`, `lineTotal`), `count`, `subtotal`, `maxQty`, `addItem`, `updateQty(key, qty)`, `removeItem(key)`, `clearCart()`. Drawer should open from the header cart button and after add to cart. `Placeholder` is still used by Cart/Checkout/Confirmation/NotFound.
