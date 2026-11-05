const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const digits = (value) => value.replace(/\D/g, '')

export function formatCardNumber(value) {
  return digits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatExpiry(value) {
  const d = digits(value).slice(0, 4)
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d
}

function expiryError(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!match) return 'Use the format MM/YY.'
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return 'Month must be between 01 and 12.'
  const now = new Date()
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
    return 'This card has expired.'
  }
  return ''
}

// Each rule returns an error message, or '' when the value is fine.
export const checkoutRules = {
  email: (v) => (!v.trim() ? 'Enter your email address.' : emailPattern.test(v.trim()) ? '' : 'Enter a valid email, like name@example.com.'),
  phone: (v) => {
    const n = digits(v).length
    return !v.trim() ? 'Enter a phone number for the courier.' : n < 10 || n > 14 ? 'Enter a valid phone number.' : ''
  },
  firstName: (v) => (v.trim() ? '' : 'Enter your first name.'),
  lastName: (v) => (v.trim() ? '' : 'Enter your last name.'),
  address: (v) => (v.trim().length >= 5 ? '' : 'Enter a street address.'),
  city: (v) => (v.trim() ? '' : 'Enter your city or town.'),
  state: (v) => (v ? '' : 'Choose a state.'),
  cardName: (v) => (v.trim() ? '' : 'Enter the name on the card.'),
  cardNumber: (v) => (digits(v).length === 16 ? '' : 'Card number must have 16 digits.'),
  expiry: (v) => (!v ? 'Enter the expiry date.' : expiryError(v)),
  cvc: (v) => (/^\d{3,4}$/.test(v) ? '' : 'Enter the 3 or 4 digit code.'),
}

export function validateAll(values, rules) {
  const errors = {}
  for (const key of Object.keys(rules)) {
    const message = rules[key](values[key] ?? '')
    if (message) errors[key] = message
  }
  return errors
}
