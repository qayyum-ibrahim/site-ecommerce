import './Section.css'

export default function Section({ as: Tag = 'section', tone, eyebrow, title, intro, action, className = '', children, ...rest }) {
  const cls = ['section', tone && `section--${tone}`, className].filter(Boolean).join(' ')
  const hasHead = eyebrow || title || intro || action
  return (
    <Tag className={cls} {...rest}>
      <div className="container">
        {hasHead && (
          <header className="section__head">
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h2 className="section__title">{title}</h2>}
              {intro && <p className="section__intro">{intro}</p>}
            </div>
            {action && <div className="section__action">{action}</div>}
          </header>
        )}
        {children}
      </div>
    </Tag>
  )
}
