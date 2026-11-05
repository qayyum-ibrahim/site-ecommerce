import './Field.css'

export default function Field({ name, label, error, hint, as = 'input', className = '', children, ...rest }) {
  const id = `field-${name}`
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined
  const Control = as
  return (
    <div className={`field${error ? ' has-error' : ''} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <Control id={id} name={name} aria-invalid={error ? 'true' : undefined} aria-describedby={describedBy} {...rest}>
        {children}
      </Control>
      {hint && !error && <p id={`${id}-hint`} className="field__hint">{hint}</p>}
      {error && <p id={`${id}-error`} className="field__error">{error}</p>}
    </div>
  )
}
