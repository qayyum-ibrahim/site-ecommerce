import { useEffect } from 'react'
import { site } from '../data/site.js'

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

export default function PageTitle({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
    const desc = description || site.description
    document.title = full
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', full)
    setMeta('meta[property="og:description"]', 'content', desc)
  }, [title, description])

  return null
}
