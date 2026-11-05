# Brief: E-commerce Website

**Name:** Kora Goods. A lifestyle and home goods store, fictional.
**Mood:** warm minimal retail. Product photos on clean backgrounds, terracotta accents.
**Colors:** background #faf8f5, surface #ffffff, text #1a1a1a, muted #6f6a64, accent terracotta #c4572f.
**Fonts:** `@fontsource/syne` (headings), `@fontsource/inter` (body).
**Pages:**
- Home: hero, category tiles, featured products, a promo banner, newsletter form.
- Shop: 16 products in `src/data/products.js`. Category filter, sort by price, search.
- Product detail (`/product/:id`): images, price, size or color options, quantity, add to cart, related products.
- Cart: slide-in drawer plus a full cart page. Change quantity, remove item, subtotal.
- Checkout: mock form (contact, address, payment fields that are not real), order summary, then an order confirmation page. No payment is processed and no data is sent.
**Features:** cart in React context saved to localStorage, totals in ₦, empty states, a header cart count.
**Images:** `hero.jpg`, `product-1.jpg` to `product-16.jpg`, `promo.jpg`.
**Fixed content:** `IMAGE-PROMPTS.md` in this site folder has a "Fixed content" section. Use those exact names, order, categories and genres in the data files, so the images match.

