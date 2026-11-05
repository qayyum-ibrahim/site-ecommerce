export const shopPage = {
  eyebrow: 'The shop',
  title: 'Everything in the store',
  intro: 'Sixteen pieces for living, cooking, bathing and slow evenings. Made in small batches and chosen to last.',
  description: 'Shop all Kora Goods: ceramics, linen, woven pieces, candles and everyday objects. Prices in Naira.',
  searchLabel: 'Search products',
  searchPlaceholder: 'Search vases, linen, candles…',
  allLabel: 'All',
  empty: {
    title: 'Nothing matches that yet.',
    text: 'Try a shorter word, or clear the filters to see the whole shop again.',
    action: 'Clear filters',
  },
}

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
]

export const productPage = {
  addLabel: 'Add to cart',
  addedLabel: 'Added to your cart.',
  viewCart: 'View cart',
  quantityLabel: 'Quantity',
  details: [
    { title: 'Delivery', text: 'Free in Lagos on orders over ₦100,000. Two to five working days across Nigeria.' },
    { title: 'Returns', text: 'Changed your mind? Send it back unused within 14 days.' },
    { title: 'Care', text: 'Made by hand, so small marks and colour shifts are part of each piece.' },
  ],
  gallery: [
    { label: 'Front view', position: '50% 50%', zoom: 1 },
    { label: 'Close detail', position: '50% 35%', zoom: 1.6 },
    { label: 'Texture', position: '35% 65%', zoom: 2.2 },
  ],
  related: { eyebrow: 'You may also like', title: 'Goes well with' },
  notFound: {
    title: 'We could not find that piece.',
    text: 'It may have sold out or moved. The rest of the shop is still here.',
    action: 'Back to the shop',
  },
}
