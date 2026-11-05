import PageTitle from './PageTitle.jsx'
import Section from './Section.jsx'
import './Placeholder.css'

export default function Placeholder({ title, eyebrow = 'Coming soon' }) {
  return (
    <>
      <PageTitle title={title === 'Home' ? undefined : title} />
      <Section className="placeholder">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="placeholder__title fade-up">{title}</h1>
      </Section>
    </>
  )
}
