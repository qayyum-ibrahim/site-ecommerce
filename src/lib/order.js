import { delivery } from '../data/cart.js'

const ORDER_KEY = 'kora-goods-last-order'

// Free in Lagos over the threshold, flat rates otherwise. Null until a state is picked.
export function deliveryFee(subtotal, state) {
  if (!state) return null
  if (state === 'Lagos') return subtotal >= delivery.freeOver ? 0 : delivery.lagos
  return delivery.elsewhere
}

export function makeOrderNumber() {
  return `KG-${Math.floor(100000 + Math.random() * 900000)}`
}

export function saveOrder(order) {
  try {
    window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(order))
  } catch {
    // Router state still carries the order for this visit.
  }
}

export function loadOrder() {
  try {
    const raw = window.sessionStorage.getItem(ORDER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
