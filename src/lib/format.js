const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

export function formatPrice(value) {
  return naira.format(value).replace('NGN', '₦').replace(/\s/g, '')
}
