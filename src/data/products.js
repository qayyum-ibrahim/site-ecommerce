// Names and order match IMAGE-PROMPTS.md "Fixed content". product-N.jpg belongs to product N.

export const categories = [
  { id: 'living', label: 'Living', blurb: 'Vases, baskets, throws and soft things for the lounge.', image: '/images/product-1.jpg', tone: 'clay' },
  { id: 'kitchen', label: 'Kitchen & Dining', blurb: 'Stoneware, glass and wood for long tables.', image: '/images/product-5.jpg', tone: 'sand' },
  { id: 'scent', label: 'Scent & Light', blurb: 'Candles, brass and quiet fragrance for evenings.', image: '/images/product-3.jpg', tone: 'ember' },
  { id: 'everyday', label: 'Bath & Everyday', blurb: 'Towels, soap and the bag you carry every day.', image: '/images/product-11.jpg', tone: 'linen' },
]

export const products = [
  {
    id: 'terracotta-ceramic-vase',
    name: 'Terracotta ceramic vase',
    category: 'living',
    price: 38500,
    badge: 'Bestseller',
    description: 'A wide-shouldered vase thrown by hand and left matte on the outside. Holds dried stems or a single branch.',
    options: { label: 'Size', values: ['Small', 'Medium', 'Large'] },
  },
  {
    id: 'handwoven-raffia-basket',
    name: 'Handwoven raffia basket',
    category: 'living',
    price: 24000,
    description: 'Tightly woven raffia with soft handles. For throws, plants or the things that collect by the door.',
    options: { label: 'Size', values: ['Medium', 'Large'] },
  },
  {
    id: 'soy-candle-amber-jar',
    name: 'Soy candle in an amber glass jar',
    category: 'scent',
    price: 15500,
    badge: 'New',
    description: 'Clean-burning soy wax with a cotton wick. Around 45 hours of slow, even light.',
    options: { label: 'Scent', values: ['Cedar & clove', 'Fig leaf', 'Shea & amber'] },
  },
  {
    id: 'linen-throw-blanket',
    name: 'Linen throw blanket',
    category: 'living',
    price: 62000,
    description: 'Stonewashed linen, soft from the first use, with a hand-knotted fringe. Light enough for warm nights.',
    options: { label: 'Color', values: ['Oat', 'Terracotta', 'Charcoal'] },
  },
  {
    id: 'stoneware-dinner-plate-set',
    name: 'Stoneware dinner plate set',
    category: 'kitchen',
    price: 54000,
    description: 'Four 27 cm plates in a speckled reactive glaze. Each one is a little different. Dishwasher safe.',
    options: { label: 'Glaze', values: ['Sand', 'Clay'] },
  },
  {
    id: 'hand-carved-wooden-serving-board',
    name: 'Hand-carved wooden serving board',
    category: 'kitchen',
    price: 29500,
    description: 'Carved from a single piece of hardwood and finished with food-safe oil. For bread, fruit and small plates.',
    options: { label: 'Size', values: ['Medium', 'Large'] },
  },
  {
    id: 'ceramic-mug-set-of-two',
    name: 'Ceramic mug set of two',
    category: 'kitchen',
    price: 21000,
    description: 'Two 350 ml mugs with a raw clay foot and a comfortable handle. Made for long mornings.',
    options: { label: 'Color', values: ['Cream', 'Terracotta'] },
  },
  {
    id: 'woven-wall-hanging',
    name: 'Woven wall hanging',
    category: 'living',
    price: 46000,
    description: 'Cotton and wool woven on a hardwood rod. Adds texture and warmth to a bare wall.',
    options: { label: 'Size', values: ['60 cm', '90 cm'] },
  },
  {
    id: 'brass-candle-holder-pair',
    name: 'Brass candle holder pair',
    category: 'scent',
    price: 33000,
    description: 'Two solid brass holders in different heights. They darken gently with time.',
    options: { label: 'Finish', values: ['Polished', 'Brushed'] },
  },
  {
    id: 'cotton-bath-towel-set',
    name: 'Cotton bath towel set',
    category: 'everyday',
    price: 41500,
    description: 'Two bath towels and two hand towels in heavy, absorbent cotton with a simple woven border.',
    options: { label: 'Color', values: ['White', 'Clay', 'Stone'] },
  },
  {
    id: 'leather-tote-bag',
    name: 'Leather tote bag',
    category: 'everyday',
    price: 89000,
    badge: 'Bestseller',
    description: 'Full-grain leather, unlined, with an inside pocket. Fits a laptop and the rest of your day.',
    options: { label: 'Color', values: ['Tan', 'Cognac', 'Black'] },
  },
  {
    id: 'glass-carafe-and-tumbler-set',
    name: 'Glass carafe and tumbler set',
    category: 'kitchen',
    price: 27500,
    description: 'A one-litre carafe with a tumbler that sits on top as a lid. For the bedside or the table.',
    options: { label: 'Glass', values: ['Clear', 'Amber'] },
  },
  {
    id: 'handmade-soap-trio',
    name: 'Handmade soap trio',
    category: 'everyday',
    price: 12500,
    badge: 'New',
    description: 'Three cold-process bars with shea butter and black soap. Wrapped in paper, no plastic.',
    options: { label: 'Scent', values: ['Unscented', 'Lemongrass', 'Mixed'] },
  },
  {
    id: 'linen-cushion-covers-set-of-two',
    name: 'Linen cushion covers set of two',
    category: 'living',
    price: 35000,
    description: 'Two 50 x 50 cm covers in washed linen with a hidden zip. Inserts not included.',
    options: { label: 'Color', values: ['Oat', 'Rust', 'Olive'] },
  },
  {
    id: 'cast-iron-skillet',
    name: 'Cast iron skillet',
    category: 'kitchen',
    price: 48000,
    description: 'A pre-seasoned 26 cm skillet that goes from stove to oven to table. It gets better with use.',
    options: { label: 'Size', values: ['20 cm', '26 cm'] },
  },
  {
    id: 'scented-reed-diffuser',
    name: 'Scented reed diffuser',
    category: 'scent',
    price: 18500,
    description: 'A 200 ml diffuser with rattan reeds. Fills a room softly for around three months.',
    options: { label: 'Scent', values: ['Cedar & clove', 'Fig leaf', 'Shea & amber'] },
  },
].map((product, i) => ({ ...product, image: `/images/product-${i + 1}.jpg` }))

export const featuredIds = [
  'terracotta-ceramic-vase',
  'linen-throw-blanket',
  'soy-candle-amber-jar',
  'leather-tote-bag',
]

export function getProduct(id) {
  return products.find((p) => p.id === id)
}

export function getCategory(id) {
  return categories.find((c) => c.id === id)
}
