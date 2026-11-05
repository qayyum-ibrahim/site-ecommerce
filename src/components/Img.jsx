import { useState } from 'react'
import './Img.css'

const tones = ['clay', 'sand', 'linen', 'ember']

export default function Img({ src, alt, ratio = '1 / 1', tone, label, className = '', eager = false }) {
  const [failed, setFailed] = useState(!src)
  const pick = tone || tones[(alt || '').length % tones.length]

  return (
    <div className={`img img--${pick} ${className}`} style={{ aspectRatio: ratio }}>
      {failed ? (
        <div className="img__fallback" role="img" aria-label={alt}>
          <svg className="img__mark" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M24 18v28M24 33l15-15M29 29l12 17" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {label && <span className="img__label">{label}</span>}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
