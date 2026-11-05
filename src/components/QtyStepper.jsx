import { useId } from 'react'
import './QtyStepper.css'

export default function QtyStepper({ value, min = 1, max, label = 'Quantity', size, onChange }) {
  const id = useId()
  return (
    <div className={`qty${size ? ` qty--${size}` : ''}`} role="group" aria-labelledby={id}>
      <span id={id} className="visually-hidden">{label}</span>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12h12M12 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
      </button>
    </div>
  )
}
