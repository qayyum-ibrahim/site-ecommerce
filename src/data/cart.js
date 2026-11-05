// Copy for the cart drawer, cart page, checkout, confirmation and not-found page.

export const delivery = {
  freeOver: 100000,
  lagos: 3500,
  elsewhere: 6500,
  note: 'Delivery is worked out at checkout.',
  freeProgress: (amount) => `You are ${amount} away from free delivery in Lagos.`,
  freeReached: 'Your order qualifies for free delivery in Lagos.',
}

export const cartCopy = {
  drawerTitle: 'Your cart',
  pageEyebrow: 'Your cart',
  pageTitle: 'Ready when you are',
  description: 'Review the pieces in your Kora Goods cart, change quantities and continue to checkout.',
  subtotal: 'Subtotal',
  checkout: 'Go to checkout',
  viewCart: 'View full cart',
  keepShopping: 'Keep shopping',
  remove: 'Remove',
  empty: {
    title: 'Your cart is empty.',
    text: 'Nothing here yet. Start with a vase, a throw or a candle for slow evenings.',
    action: 'Browse the shop',
  },
  reassurance: ['Secure checkout (demo)', '14-day returns', 'Packed by hand in Lagos'],
}

export const nigerianStates = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers',
  'Oyo',
  'Ogun',
  'Kano',
  'Enugu',
  'Kaduna',
  'Edo',
  'Delta',
  'Anambra',
  'Kwara',
]

export const checkoutCopy = {
  eyebrow: 'Checkout',
  title: 'Almost yours',
  description: 'Mock checkout for the Kora Goods demo store. No payment is processed and no data is sent.',
  demoNote: 'This is a demo store. Nothing is charged and nothing you type leaves this page. Any card number with 16 digits works.',
  sections: {
    contact: 'Contact',
    address: 'Delivery address',
    payment: 'Payment',
  },
  summaryTitle: 'Order summary',
  deliveryLabel: 'Delivery',
  deliveryFree: 'Free',
  deliveryPending: 'Choose a state',
  totalLabel: 'Total',
  submit: 'Place order',
  submitting: 'Placing order…',
  errorSummary: 'Please check the highlighted fields.',
  backToCart: 'Edit cart',
  empty: {
    title: 'There is nothing to check out yet.',
    text: 'Your cart is empty. Add a piece or two and come back here.',
    action: 'Browse the shop',
  },
}

export const confirmationCopy = {
  eyebrow: 'Order confirmed',
  title: 'Thank you. Your order is in.',
  description: 'Your Kora Goods demo order is confirmed.',
  text: (email) => `We have sent a receipt to ${email}. Your pieces will be packed by hand and sent within two to five working days.`,
  demoNote: 'Demo order: no payment was taken and no email was sent.',
  numberLabel: 'Order number',
  dateLabel: 'Date',
  shipTo: 'Delivering to',
  itemsTitle: 'What you ordered',
  continue: 'Continue shopping',
  home: 'Back to home',
  missing: {
    title: 'No recent order to show.',
    text: 'Order details live only in this browser tab. Place an order and the confirmation will appear here.',
    action: 'Go to the shop',
  },
}

export const notFoundCopy = {
  eyebrow: 'Error 404',
  title: 'This shelf is empty.',
  text: 'The page you are looking for has moved or never existed. Try the shop, or head back home.',
  primary: 'Browse the shop',
  secondary: 'Back to home',
  description: 'Page not found at Kora Goods.',
}
