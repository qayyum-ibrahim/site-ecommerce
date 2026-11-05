import { useLocation } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Img from '../components/Img.jsx'
import { checkoutCopy, confirmationCopy } from '../data/cart.js'
import { formatPrice } from '../lib/format.js'
import { loadOrder } from '../lib/order.js'
import './Cart.css'
import './Confirmation.css'

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Confirmation() {
  const { state } = useLocation()
  const order = state?.order || loadOrder()

  if (!order) {
    return (
      <>
        <PageTitle title="Order confirmation" description={confirmationCopy.description} />
        <section className="confirm">
          <div className="container">
            <EmptyState title={confirmationCopy.missing.title} text={confirmationCopy.missing.text} action={confirmationCopy.missing.action} />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageTitle title="Order confirmed" description={confirmationCopy.description} />

      <section className="confirm">
        <div className="container confirm__inner">
          <header className="confirm__head">
            <svg className="confirm__check" viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="30" fill="var(--color-accent)" />
              <path d="M20 33l8 8 16-17" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="eyebrow">{confirmationCopy.eyebrow}</p>
            <h1 className="confirm__title">{confirmationCopy.title}</h1>
            <p className="confirm__text">{confirmationCopy.text(order.email)}</p>
            <p className="confirm__demo">{confirmationCopy.demoNote}</p>
          </header>

          <div className="confirm__card fade-up">
            <dl className="confirm__facts">
              <div>
                <dt>{confirmationCopy.numberLabel}</dt>
                <dd>{order.number}</dd>
              </div>
              <div>
                <dt>{confirmationCopy.dateLabel}</dt>
                <dd>{dateFormat.format(new Date(order.date))}</dd>
              </div>
              <div>
                <dt>{confirmationCopy.shipTo}</dt>
                <dd>
                  {order.name}
                  <br />
                  {order.address}, {order.city}, {order.state}
                </dd>
              </div>
              <div>
                <dt>Paid with</dt>
                <dd>Card ending {order.cardLast4} (demo)</dd>
              </div>
            </dl>

            <h2 className="confirm__items-title">{confirmationCopy.itemsTitle}</h2>
            <ul className="confirm__items">
              {order.lines.map((line) => (
                <li key={line.key}>
                  <Img src={line.image} alt="" ratio="1 / 1" className="confirm__thumb" />
                  <div>
                    <p className="confirm__name">{line.name}</p>
                    <p className="confirm__meta">
                      {line.option && `${line.optionLabel}: ${line.option} · `}Qty {line.qty}
                    </p>
                  </div>
                  <p className="confirm__price">{formatPrice(line.lineTotal)}</p>
                </li>
              ))}
            </ul>

            <dl className="summary__rows">
              <div>
                <dt>Subtotal</dt>
                <dd>{formatPrice(order.subtotal)}</dd>
              </div>
              <div>
                <dt>{checkoutCopy.deliveryLabel}</dt>
                <dd>{order.delivery === 0 ? checkoutCopy.deliveryFree : formatPrice(order.delivery)}</dd>
              </div>
              <div className="summary__total">
                <dt>{checkoutCopy.totalLabel}</dt>
                <dd>{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </div>

          <div className="confirm__actions">
            <Button to="/shop" variant="accent" size="lg">{confirmationCopy.continue}</Button>
            <Button to="/" variant="outline" size="lg">{confirmationCopy.home}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
