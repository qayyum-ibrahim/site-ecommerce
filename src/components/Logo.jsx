import { Link } from 'react-router-dom'

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label="Kora Goods, home">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
        <path d="M11 8v16M11 16.5l9-8.5M14 14l7 10" stroke="#faf8f5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <span>Kora Goods</span>
    </Link>
  )
}
