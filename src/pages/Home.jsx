import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle.jsx'
import Section from '../components/Section.jsx'
import Button from '../components/Button.jsx'
import Img from '../components/Img.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { categories, featuredIds, getProduct, products } from '../data/products.js'
import { hero, perks, categorySection, featuredSection, promo, newsletter } from '../data/home.js'
import './Home.css'

const featured = featuredIds.map(getProduct)

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <>
      <PageTitle />

      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__media fade-up">
            <Img src={hero.image} alt={hero.imageAlt} ratio="16 / 10" tone="sand" eager />
            <p className="hero__note">
              <span>{hero.note.label}</span>
              {hero.note.text}
            </p>
          </div>
          <div className="hero__copy">
            <p className="eyebrow fade-up">{hero.eyebrow}</p>
            <h1 className="hero__title fade-up" style={{ animationDelay: '80ms' }}>{hero.title}</h1>
            <p className="hero__intro fade-up" style={{ animationDelay: '160ms' }}>{hero.intro}</p>
            <div className="hero__actions fade-up" style={{ animationDelay: '240ms' }}>
              <Button to={hero.primary.to} variant="accent" size="lg">{hero.primary.label}</Button>
              <Button to={hero.secondary.to} variant="ghost">{hero.secondary.label}</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="perks">
        <ul className="container perks__list">
          {perks.map((perk) => (
            <li key={perk.title} className="perks__item">
              <strong>{perk.title}</strong>
              <span>{perk.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <Section eyebrow={categorySection.eyebrow} title={categorySection.title} intro={categorySection.intro}>
        <ul className="cat-grid">
          {categories.map((cat, i) => {
            const count = products.filter((p) => p.category === cat.id).length
            return (
              <Reveal as="li" key={cat.id} delay={i * 80}>
                <Link to={`/shop?category=${cat.id}`} className="cat-tile">
                  <Img src={cat.image} alt="" tone={cat.tone} ratio="4 / 5" />
                  <div className="cat-tile__body">
                    <h3 className="cat-tile__title">{cat.label}</h3>
                    <p className="cat-tile__blurb">{cat.blurb}</p>
                    <span className="cat-tile__more">
                      {count} pieces <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </Section>

      <Section
        tone="surface"
        eyebrow={featuredSection.eyebrow}
        title={featuredSection.title}
        action={
          <Button to={featuredSection.action.to} variant="outline">
            {featuredSection.action.label}
          </Button>
        }
      >
        <ul className="product-grid">
          {featured.map((product, i) => (
            <Reveal as="li" key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="promo-section">
        <Reveal className="promo">
          <div className="promo__media">
            <Img src={promo.image} alt={promo.imageAlt} tone="clay" ratio="3 / 2" />
          </div>
          <div className="promo__copy">
            <p className="eyebrow promo__eyebrow">{promo.eyebrow}</p>
            <h2 className="promo__title">{promo.title}</h2>
            <p className="promo__text">{promo.text}</p>
            <Button to={promo.cta.to} variant="primary" size="lg" className="promo__cta">
              {promo.cta.label} <Arrow />
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="sand" className="newsletter">
        <Reveal className="newsletter__inner">
          <div>
            <p className="eyebrow">{newsletter.eyebrow}</p>
            <h2 className="newsletter__title">{newsletter.title}</h2>
            <p className="newsletter__text">{newsletter.text}</p>
          </div>
          <NewsletterForm success={newsletter.success} />
        </Reveal>
      </Section>
    </>
  )
}
