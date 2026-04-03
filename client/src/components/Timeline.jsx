import Section from './Section'
import { TIMELINE_ITEMS } from '../portfolioData'

export default function Timeline() {
  return (
    <Section id="timeline" title="Timeline">
      <div className="timeline">
        {TIMELINE_ITEMS.map((item) => (
          <div key={item.title} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="timeline-time">{item.time}</span>
              <h3>{item.title}</h3>
              <p className="paragraph">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

