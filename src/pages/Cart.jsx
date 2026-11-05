import PageTitle from '../components/PageTitle.jsx'
import Button from '../components/Button.jsx'
import CartLine from '../components/CartLine.jsx'
import EmptyState from '../components/EmptyState.jsx'
import FreeDelivery from '../components/FreeDelivery.jsx'
import { useCart } from '../context/CartContext.jsx'
import { cartCopy, delivery } from '../data/cart.js'
import { formatPrice } from '../lib/format.js'
import './Cart.css'

export default function Cart() {
  const { lines, count, subtotal } = useCart()

  return (
    <>
      <PageTitle title="Cart" description={cartCopy.description} />

      <section className="cart-page">
        <div className="container">
          {lines.length === 0 ? (
            <EmptyState eyebrow={cartCopy.pageEyebrow} title={cartCopy.empty.title} text={cartCopy.empty.text} action={cartCopy.empty.action} />
          ) : (
            <>
              <header className="cart-page__head fade-up">
                <p className="eyebrow">{cartCopy.pageEyebrow}</p>
                <h1 className="cart-page__title">{cartCopy.pageTitle}</h1>
                <p className="cart-page__count">
                  {count} {count === 1 ? 'item' : 'items'}
                </p>
              </header>

              <div className="cart-page__grid">
                <ul className="cart-page__lines" aria-label="Items in your cart">
                  {lines.map((line) => (
                    <CartLine key={line.key} line={line} />
                  ))}
                </ul>

                <aside className="summary" aria-labelledby="cart-summary-title">
                  <h2 id="cart-summary-title" className="summary__title">Summary</h2>
                  <FreeDelivery subtotal={subtotal} />
                  <dl className="summary__rows">
                    <div>
                      <dt>{cartCopy.subtotal}</dt>
                      <dd>{formatPrice(subtotal)}</dd>
                    </div>
                  </dl>
                  <p className="summary__note">{delivery.note}</p>
                  <Button to="/checkout" variant="accent" size="lg" className="btn--block">{cartCopy.checkout}</Button>
                  <Button to="/shop" variant="ghost" className="summary__link">{cartCopy.keepShopping}</Button>
                  <ul className="summary__trust">
                    {cartCopy.reassurance.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
