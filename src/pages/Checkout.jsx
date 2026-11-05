import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Field from '../components/Field.jsx'
import Img from '../components/Img.jsx'
import { useCart } from '../context/CartContext.jsx'
import { checkoutCopy, nigerianStates } from '../data/cart.js'
import { formatPrice } from '../lib/format.js'
import { deliveryFee, makeOrderNumber, saveOrder } from '../lib/order.js'
import { checkoutRules, formatCardNumber, formatExpiry, validateAll } from '../lib/validate.js'
import './Cart.css'
import './Checkout.css'

const initial = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

const formatters = {
  cardNumber: formatCardNumber,
  expiry: formatExpiry,
  cvc: (v) => v.replace(/\D/g, '').slice(0, 4),
}

export default function Checkout() {
  const navigate = useNavigate()
  const { lines, subtotal, clearCart } = useCart()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showSummary, setShowSummary] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const fee = deliveryFee(subtotal, values.state)
  const total = subtotal + (fee ?? 0)

  if (lines.length === 0 && !submitting) {
    return (
      <>
        <PageTitle title="Checkout" description={checkoutCopy.description} />
        <section className="checkout">
          <div className="container">
            <EmptyState eyebrow={checkoutCopy.eyebrow} title={checkoutCopy.empty.title} text={checkoutCopy.empty.text} action={checkoutCopy.empty.action} />
          </div>
        </section>
      </>
    )
  }

  function handleChange(event) {
    const { name, value } = event.target
    const next = formatters[name] ? formatters[name](value) : value
    setValues((v) => ({ ...v, [name]: next }))
    if (touched[name] || errors[name]) {
      setErrors((e) => ({ ...e, [name]: checkoutRules[name](next) }))
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target
    setTouched((t) => ({ ...t, [name]: true }))
    if (value) setErrors((e) => ({ ...e, [name]: checkoutRules[name](value) }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (submitting) return
    const found = validateAll(values, checkoutRules)
    setErrors(found)
    const firstBad = Object.keys(initial).find((key) => found[key])
    if (firstBad) {
      setShowSummary(true)
      formRef.current?.elements[firstBad]?.focus()
      return
    }
    setShowSummary(false)
    setSubmitting(true)

    const order = {
      number: makeOrderNumber(),
      date: new Date().toISOString(),
      email: values.email.trim(),
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
      address: values.address.trim(),
      city: values.city.trim(),
      state: values.state,
      cardLast4: values.cardNumber.slice(-4),
      lines: lines.map((l) => ({
        key: l.key,
        id: l.id,
        name: l.product.name,
        image: l.product.image,
        option: l.option,
        optionLabel: l.product.options?.label,
        qty: l.qty,
        lineTotal: l.lineTotal,
      })),
      subtotal,
      delivery: fee,
      total,
    }

    // A short pause so the "placing order" state is visible. Nothing is sent anywhere.
    timer.current = setTimeout(() => {
      saveOrder(order)
      navigate('/checkout/confirmation', { replace: true, state: { order } })
      clearCart()
    }, 900)
  }

  const field = (name) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: handleChange,
    onBlur: handleBlur,
  })

  return (
    <>
      <PageTitle title="Checkout" description={checkoutCopy.description} />

      <section className="checkout">
        <div className="container">
          <header className="checkout__head fade-up">
            <p className="eyebrow">{checkoutCopy.eyebrow}</p>
            <h1 className="checkout__title">{checkoutCopy.title}</h1>
          </header>

          <div className="checkout__grid">
            <form ref={formRef} className="checkout__form" onSubmit={handleSubmit} noValidate>
              <p className="checkout__demo">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 11v6M12 7.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {checkoutCopy.demoNote}
              </p>

              {showSummary && Object.values(errors).some(Boolean) && (
                <p className="checkout__alert" role="alert">{checkoutCopy.errorSummary}</p>
              )}

              <fieldset className="checkout__set">
                <legend>{checkoutCopy.sections.contact}</legend>
                <div className="checkout__fields">
                  <Field label="Email" type="email" autoComplete="email" placeholder="you@example.com" {...field('email')} />
                  <Field label="Phone" type="tel" autoComplete="tel" placeholder="+234 800 000 0000" hint="For the courier only." {...field('phone')} />
                </div>
              </fieldset>

              <fieldset className="checkout__set">
                <legend>{checkoutCopy.sections.address}</legend>
                <div className="checkout__fields">
                  <Field label="First name" autoComplete="given-name" {...field('firstName')} />
                  <Field label="Last name" autoComplete="family-name" {...field('lastName')} />
                  <Field label="Street address" autoComplete="street-address" placeholder="House number and street" className="field--full" {...field('address')} />
                  <Field label="City or town" autoComplete="address-level2" {...field('city')} />
                  <Field label="State" as="select" autoComplete="address-level1" {...field('state')}>
                    <option value="">Select a state</option>
                    {nigerianStates.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Field>
                </div>
              </fieldset>

              <fieldset className="checkout__set">
                <legend>{checkoutCopy.sections.payment}</legend>
                <div className="checkout__fields">
                  <Field label="Name on card" autoComplete="off" className="field--full" {...field('cardName')} />
                  <Field label="Card number" inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000 0000" className="field--full" {...field('cardNumber')} />
                  <Field label="Expiry" inputMode="numeric" autoComplete="off" placeholder="MM/YY" {...field('expiry')} />
                  <Field label="Security code" inputMode="numeric" autoComplete="off" placeholder="CVC" {...field('cvc')} />
                </div>
              </fieldset>

              <button type="submit" className="btn btn--accent btn--lg btn--block checkout__submit" disabled={submitting} aria-busy={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    {checkoutCopy.submitting}
                  </>
                ) : (
                  <>
                    {checkoutCopy.submit}
                    <span aria-hidden="true">·</span>
                    {formatPrice(total)}
                  </>
                )}
              </button>
            </form>

            <aside className="summary checkout__summary" aria-labelledby="checkout-summary-title">
              <div className="checkout__summary-head">
                <h2 id="checkout-summary-title" className="summary__title">{checkoutCopy.summaryTitle}</h2>
                <Link to="/cart" className="checkout__edit">{checkoutCopy.backToCart}</Link>
              </div>
              <ul className="checkout__items">
                {lines.map((line) => (
                  <li key={line.key}>
                    <div className="checkout__thumb">
                      <Img src={line.product.image} alt="" ratio="1 / 1" />
                      <span className="checkout__qty" aria-label={`Quantity ${line.qty}`}>{line.qty}</span>
                    </div>
                    <div>
                      <p className="checkout__item-name">{line.product.name}</p>
                      {line.option && <p className="checkout__item-meta">{line.option}</p>}
                    </div>
                    <p className="checkout__item-price">{formatPrice(line.lineTotal)}</p>
                  </li>
                ))}
              </ul>
              <dl className="summary__rows">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div>
                  <dt>{checkoutCopy.deliveryLabel}</dt>
                  <dd className={fee === null ? 'checkout__pending' : undefined}>
                    {fee === null ? checkoutCopy.deliveryPending : fee === 0 ? checkoutCopy.deliveryFree : formatPrice(fee)}
                  </dd>
                </div>
                <div className="summary__total">
                  <dt>{checkoutCopy.totalLabel}</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
