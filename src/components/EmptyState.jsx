import Button from './Button.jsx'
import './EmptyState.css'

export default function EmptyState({ eyebrow, title, text, action, to = '/shop', secondary, headingLevel = 1 }) {
  const Heading = `h${headingLevel}`
  return (
    <div className="empty-state fade-up">
      <svg className="empty-state__art" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="var(--color-accent-soft)" />
        <path d="M36 50h48l-4 36a5 5 0 0 1-5 4.5H45a5 5 0 0 1-5-4.5L36 50Z" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M48 56v-9a12 12 0 0 1 24 0v9" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Heading className="empty-state__title">{title}</Heading>
      <p className="empty-state__text">{text}</p>
      <div className="empty-state__actions">
        <Button to={to}>{action}</Button>
        {secondary}
      </div>
    </div>
  )
}
