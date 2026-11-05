import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { site, footerColumns } from '../data/site.js'
import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__blurb">{site.description}</p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title} className="footer__col">
              <h2 className="footer__heading">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h2 className="footer__heading">Contact</h2>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
              <li className="muted">{site.city}</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {year} {site.name}. Prices in Naira (₦).</p>
          <p className="footer__demo">Demo project. This is not a real business.</p>
        </div>
      </div>
    </footer>
  )
}
