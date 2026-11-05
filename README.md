# Kora Goods

A front-end demo of a warm, minimal home goods store. Fictional business: no backend, no real payments, no data is sent anywhere.

Built with Vite, React and React Router. Plain CSS with CSS variables.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build
```

Every push to `main` deploys on Vercel. `vercel.json` sends every path to `index.html` so deep links work.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Shop (filters live in the URL: `?category=`, `?sort=`, `?q=`) |
| `/product/:id` | Product detail |
| `/cart` | Cart page (the header bag icon opens the cart drawer) |
| `/checkout` | Mock checkout |
| `/checkout/confirmation` | Order confirmation |
| anything else | Not found |

## Add the real photos

Put the files in `public/images/` with these exact names:

- `hero.jpg` (landscape 16:9)
- `product-1.jpg` to `product-16.jpg` (square 1:1, same order as the products in `IMAGE-PROMPTS.md`)
- `promo.jpg` (landscape 3:2)

No code change is needed. Until a file exists, the site shows a branded gradient block in its place, so nothing breaks or shifts. Prompts for each image are in `IMAGE-PROMPTS.md`.

## Edit the content

All copy and data live in `src/data/`:

- `site.js`: store name, tagline, meta description, contact details, nav and footer links.
- `home.js`: hero, perks strip, category and featured section headings, promo banner, newsletter.
- `products.js`: categories, the 16 products (name, price in naira, category, options, description, badge) and the featured list.
- `shop.js`: shop and product page copy, sort options.
- `cart.js`: delivery fees, cart, checkout, confirmation and not-found copy, the list of states.

Design tokens (colors, fonts, spacing, radius, shadows) are in `src/styles/tokens.css`.

## Notes

- The cart is saved in the browser's localStorage (`kora-goods-cart`).
- Checkout only validates the form on the page. Use any made-up card details; nothing is processed.
