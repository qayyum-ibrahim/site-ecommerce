import { useId, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { getCategory, getProduct, products } from '../data/products.js'
import { productPage } from '../data/shop.js'
import { formatPrice } from '../lib/format.js'
import { useCart } from '../context/CartContext.jsx'
import './Product.css'

const galleryTones = ['clay', 'sand', 'linen']

function relatedTo(product) {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id)
  const others = products.filter((p) => p.category !== product.category)
  return [...same, ...others].slice(0, 4)
}

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)

  if (!product) {
    return (
      <>
        <PageTitle title="Product not found" />
        <Section className="product-missing">
          <p className="eyebrow">Shop</p>
          <h1 className="product-missing__title">{productPage.notFound.title}</h1>
          <p className="product-missing__text">{productPage.notFound.text}</p>
          <Button to="/shop">{productPage.notFound.action}</Button>
        </Section>
      </>
    )
  }

  // Keyed so view state resets when moving between products.
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const uid = useId()
  const { addItem, maxQty } = useCart()
  const [view, setView] = useState(0)
  const [option, setOption] = useState(product.options?.values[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(0)
  const category = getCategory(product.category)

  function handleAdd(event) {
    event.preventDefault()
    addItem(product.id, option, qty)
    setAdded((n) => n + 1)
  }

  const current = productPage.gallery[view]

  return (
    <>
      <PageTitle title={product.name} description={`${product.name}. ${product.description}`} />

      <section className="product">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to={`/shop?category=${category.id}`}>{category.label}</Link></li>
              <li aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <div className="product__grid">
            <div className="product__gallery">
              <div className="product__stage">
                <Img
                  key={view}
                  src={product.image}
                  alt={`${product.name}, ${current.label.toLowerCase()}`}
                  label={product.name}
                  tone={galleryTones[view]}
                  ratio="4 / 5"
                  eager
                  className="product__main fade-in"
                  imgStyle={{ objectPosition: current.position, transform: `scale(${current.zoom})`, transformOrigin: current.position }}
                />
                {product.badge && <span className="product-card__badge">{product.badge}</span>}
              </div>

              <div className="product__thumbs" role="group" aria-label="Product images">
                {productPage.gallery.map((g, i) => (
                  <button
                    key={g.label}
                    type="button"
                    className="product__thumb"
                    aria-pressed={view === i}
                    aria-label={`Show ${g.label.toLowerCase()}`}
                    onClick={() => setView(i)}
                  >
                    <Img
                      src={product.image}
                      alt=""
                      tone={galleryTones[i]}
                      ratio="1 / 1"
                      imgStyle={{ objectPosition: g.position, transform: `scale(${g.zoom})`, transformOrigin: g.position }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="product__info">
              <p className="eyebrow">{category.label}</p>
              <h1 className="product__title">{product.name}</h1>
              <p className="product__price">{formatPrice(product.price)}</p>
              <p className="product__desc">{product.description}</p>

              <form className="product__form" onSubmit={handleAdd}>
                {product.options && (
                  <fieldset className="product__options">
                    <legend>
                      {product.options.label}: <span>{option}</span>
                    </legend>
                    <div className="product__swatches">
                      {product.options.values.map((value) => (
                        <label key={value} className="swatch">
                          <input
                            type="radio"
                            name={`${uid}-option`}
                            value={value}
                            checked={option === value}
                            onChange={() => setOption(value)}
                          />
                          <span>{value}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                <div className="product__buy">
                  <div className="qty" role="group" aria-labelledby={`${uid}-qty`}>
                    <span id={`${uid}-qty`} className="visually-hidden">{productPage.quantityLabel}</span>
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </button>
                    <output aria-live="polite">{qty}</output>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty}>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12M12 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </button>
                  </div>

                  <button type="submit" className="btn btn--accent btn--lg product__add">
                    {productPage.addLabel}
                    <span aria-hidden="true">·</span>
                    {formatPrice(product.price * qty)}
                  </button>
                </div>

                <div className="product__added" role="status">
                  {added > 0 && (
                    <p key={added} className="fade-up">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {productPage.addedLabel}
                      <Link to="/cart">{productPage.viewCart}</Link>
                    </p>
                  )}
                </div>
              </form>

              <dl className="product__details">
                {productPage.details.map((d) => (
                  <div key={d.title}>
                    <dt>{d.title}</dt>
                    <dd>{d.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Section tone="surface" eyebrow={productPage.related.eyebrow} title={productPage.related.title}>
        <ul className="product-grid">
          {relatedTo(product).map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  )
}
