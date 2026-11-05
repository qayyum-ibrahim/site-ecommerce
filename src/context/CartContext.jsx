import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products.js'

const STORAGE_KEY = 'kora-goods-cart'
const MAX_QTY = 10

const CartContext = createContext(null)

function loadItems() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item) => getProduct(item.id)) : []
  } catch {
    return []
  }
}

function lineKey(id, option) {
  return option ? `${id}::${option}` : id
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage can be full or blocked. The cart still works for this visit.
    }
  }, [items])

  const addItem = useCallback((id, option, qty = 1) => {
    const key = lineKey(id, option)
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: Math.min(MAX_QTY, item.qty + qty) } : item,
        )
      }
      return [...prev, { key, id, option, qty: Math.min(MAX_QTY, qty) }]
    })
  }, [])

  const updateQty = useCallback((key, qty) => {
    setItems((prev) =>
      qty < 1
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, qty: Math.min(MAX_QTY, qty) } : item)),
    )
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setDrawerOpen(true), [])
  const closeCart = useCallback(() => setDrawerOpen(false), [])

  const value = useMemo(() => {
    const lines = items.map((item) => {
      const product = getProduct(item.id)
      return { ...item, product, lineTotal: product.price * item.qty }
    })
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      maxQty: MAX_QTY,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      drawerOpen,
      openCart,
      closeCart,
    }
  }, [items, drawerOpen, addItem, updateQty, removeItem, clearCart, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
