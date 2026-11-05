import { useId, useState } from 'react'
import './NewsletterForm.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function NewsletterForm({ success }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const value = email.trim()
    if (!value) return setError('Please enter your email address.')
    if (!emailPattern.test(value)) return setError('Please enter a valid email, like name@example.com.')
    setError('')
    setDone(true)
  }

  if (done) {
    return (
      <p className="newsletter-form__success" role="status">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {success}
      </p>
    )
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="visually-hidden">Email address</label>
      <div className={`newsletter-form__row ${error ? 'has-error' : ''}`}>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button type="submit" className="btn btn--accent">Subscribe</button>
      </div>
      {error && (
        <p id={`${id}-error`} className="newsletter-form__error" role="alert">{error}</p>
      )}
    </form>
  )
}
