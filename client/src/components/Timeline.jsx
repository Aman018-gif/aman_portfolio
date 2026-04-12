import { useRef } from 'react'
import { motion as Motion, useInView } from 'framer-motion'
import Section from './Section'
import { TIMELINE_ITEMS } from '../portfolioData'

function TimelineEntry({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })

  return (
    <Motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Motion.div 
        className="timeline-dot"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: (index * 0.15) + 0.1 }}
      >
        <span className="timeline-icon" aria-hidden="true" style={{ position: 'absolute', top: -5, left: -6, fontSize: '0.85rem' }}>
          {item.iconType === 'work' ? '💼' : '🎓'}
        </span>
      </Motion.div>
      <div className="timeline-content">
        <span className="timeline-time">{item.time}</span>
        <h3>{item.title}</h3>
        <p className="paragraph">{item.description}</p>
      </div>
    </Motion.div>
  )
}

export default function Timeline() {
  return (
    <Section id="timeline" title="Timeline">
      <div className="timeline">
        {TIMELINE_ITEMS.map((item, idx) => (
          <TimelineEntry key={item.title} item={item} index={idx} />
        ))}
      </div>
    </Section>
  )
}
