import PageTitle from '../components/PageTitle.jsx'
import Button from '../components/Button.jsx'
import { notFoundCopy } from '../data/cart.js'
import './NotFound.css'

export default function NotFound() {
  return (
    <>
      <PageTitle title="Page not found" description={notFoundCopy.description} />
      <section className="not-found">
        <div className="container not-found__inner">
          <p className="not-found__code" aria-hidden="true">
            4<span className="not-found__o" />4
          </p>
          <div className="not-found__copy fade-up">
            <p className="eyebrow">{notFoundCopy.eyebrow}</p>
            <h1 className="not-found__title">{notFoundCopy.title}</h1>
            <p className="not-found__text">{notFoundCopy.text}</p>
            <div className="not-found__actions">
              <Button to="/shop" variant="accent" size="lg">{notFoundCopy.primary}</Button>
              <Button to="/" variant="outline" size="lg">{notFoundCopy.secondary}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
