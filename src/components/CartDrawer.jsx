import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Button from './Button.jsx'
import CartLine from './CartLine.jsx'
import FreeDelivery from './FreeDelivery.jsx'
import { useCart } from '../context/CartContext.jsx'
import { cartCopy, delivery } from '../data/cart.js'
import { formatPrice } from '../lib/format.js'
import './CartDrawer.css'

const focusable = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function CartDrawer() {
  const { lines, count, subtotal, drawerOpen, closeCart } = useCart()
  const { pathname } = useLocation()
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Any navigation (a link inside the drawer, back button) closes it.
  useEffect(() => {
    closeCart()
  }, [pathname, closeCart])

  useEffect(() => {
    if (!drawerOpen) return
    const returnTo = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeCart()
        return
      }
      if (e.key !== 'Tab') return
      const items = [...panelRef.current.querySelectorAll(focusable)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      if (returnTo && document.contains(returnTo)) returnTo.focus()
    }
  }, [drawerOpen, closeCart])

  return (
    <div className={`drawer${drawerOpen ? ' is-open' : ''}`} inert={!drawerOpen}>
      <div className="drawer__overlay" onClick={closeCart} aria-hidden="true" />
      <aside
        ref={panelRef}
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className="drawer__head">
          <h2 id="cart-drawer-title" className="drawer__title">
            {cartCopy.drawerTitle}
            {count > 0 && <span className="drawer__count">{count}</span>}
          </h2>
          <button ref={closeRef} type="button" className="drawer__close" aria-label="Close cart" onClick={closeCart}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="var(--color-accent-soft)" />
              <path d="M20 26h24l-2 18a3 3 0 0 1-3 2.7H25a3 3 0 0 1-3-2.7L20 26Z" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M26 29v-4a6 6 0 0 1 12 0v4" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="drawer__empty-title">{cartCopy.empty.title}</p>
            <p className="drawer__empty-text">{cartCopy.empty.text}</p>
            <Button to="/shop">{cartCopy.empty.action}</Button>
          </div>
        ) : (
          <>
            <div className="drawer__body">
              <FreeDelivery subtotal={subtotal} />
              <ul className="drawer__lines">
                {lines.map((line) => (
                  <CartLine key={line.key} line={line} />
                ))}
              </ul>
            </div>

            <footer className="drawer__foot">
              <p className="drawer__subtotal">
                <span>{cartCopy.subtotal}</span>
                <span>{formatPrice(subtotal)}</span>
              </p>
              <p className="drawer__note">{delivery.note}</p>
              <Button to="/checkout" variant="accent" size="lg" className="btn--block">{cartCopy.checkout}</Button>
              <Button to="/cart" variant="ghost" className="drawer__view">{cartCopy.viewCart}</Button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
