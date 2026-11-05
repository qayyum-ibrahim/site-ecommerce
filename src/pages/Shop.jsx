import { useId, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { categories, featuredIds, products } from '../data/products.js'
import { shopPage, sortOptions } from '../data/shop.js'
import './Shop.css'

function featuredRank(product) {
  const i = featuredIds.indexOf(product.id)
  return i === -1 ? featuredIds.length : i
}

export default function Shop() {
  const id = useId()
  const [params, setParams] = useSearchParams()
  const category = categories.some((c) => c.id === params.get('category')) ? params.get('category') : 'all'
  const sort = sortOptions.some((o) => o.id === params.get('sort')) ? params.get('sort') : 'featured'
  const query = params.get('q') || ''

  function update(key, value, fallback) {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    const list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (!term) return true
      const cat = categories.find((c) => c.id === p.category)
      return `${p.name} ${p.description} ${cat?.label}`.toLowerCase().includes(term)
    })
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price)
    return [...list].sort((a, b) => featuredRank(a) - featuredRank(b))
  }, [category, sort, query])

  const activeCategory = categories.find((c) => c.id === category)
  const countText = `${results.length} ${results.length === 1 ? 'product' : 'products'}`

  return (
    <>
      <PageTitle title={activeCategory ? activeCategory.label : 'Shop'} description={shopPage.description} />

      <section className="shop-hero">
        <div className="container">
          <p className="eyebrow fade-up">{shopPage.eyebrow}</p>
          <h1 className="shop-hero__title fade-up">{activeCategory ? activeCategory.label : shopPage.title}</h1>
          <p className="shop-hero__intro fade-up">{activeCategory ? activeCategory.blurb : shopPage.intro}</p>
        </div>
      </section>

      <section className="shop" aria-labelledby={`${id}-results`}>
        <div className="container">
          <div className="shop-bar">
            <div className="shop-search">
              <label htmlFor={`${id}-search`} className="visually-hidden">{shopPage.searchLabel}</label>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                id={`${id}-search`}
                type="search"
                placeholder={shopPage.searchPlaceholder}
                value={query}
                onChange={(e) => update('q', e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="shop-sort">
              <label htmlFor={`${id}-sort`}>Sort</label>
              <select id={`${id}-sort`} value={sort} onChange={(e) => update('sort', e.target.value, 'featured')}>
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="shop-chips" role="group" aria-label="Filter by category">
              {[{ id: 'all', label: shopPage.allLabel }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={category === c.id}
                  onClick={() => update('category', c.id, 'all')}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <p id={`${id}-results`} className="shop-count" role="status">
            {countText}
            {query.trim() && <> for “{query.trim()}”</>}
          </p>

          {results.length > 0 ? (
            <ul className="product-grid">
              {results.map((product, i) => (
                <Reveal as="li" key={product.id} delay={(i % 4) * 60}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="shop-empty">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="28" cy="28" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M40 40l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 28h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h2 className="shop-empty__title">{shopPage.empty.title}</h2>
              <p className="shop-empty__text">{shopPage.empty.text}</p>
              <Button variant="outline" onClick={() => setParams({}, { replace: true })}>
                {shopPage.empty.action}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
