import { useRef } from 'react'
import { motion as Motion, useInView } from 'framer-motion'
import Section from './Section'

function AchievementCard({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" })

  return (
    <Motion.article
      ref={ref}
      className="achievements-card glitch-enter"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: index * 0.15, duration: 0.1 }}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <h3 style={{ textDecoration: 'underline', textDecorationColor: '#22c55e', textUnderlineOffset: 4, marginBottom: '0.5rem' }}>
        {item.title}
      </h3>
      <p className="paragraph" style={{ marginBottom: '1rem' }}>{item.description}</p>

    </Motion.article>
  )
}

export default function Achievements() {
  const items = [
    {
      title: 'GATE 2026 Qualified (AIR 7798)',
      description: 'Secured AIR 7798 with a score of 496 in GATE 2026, demonstrating strong fundamentals in core computer science subjects.',
      link: '#',
      linkText: 'View Details',
    },
    {
      title: 'JKLU Honors List – Feb 2025',
      description: 'Recognized among top-performing students for maintaining a CGPA of 8.5+ with strong academic performance.',
      link: '#',
      linkText: 'View Certificate',
    },
    {
      title: 'JKLU Honors List – Sep 2024',
      description: 'Awarded for consistent academic excellence and inclusion in the university Honors List.',
      link: '#',
      linkText: 'View Certificate',
    },
    {
      title: 'JKLU Honors List – Mar 2024',
      description: 'Recognized for outstanding academic performance and maintaining high CGPA in early semesters.',
      link: '#',
      linkText: 'View Certificate',
    },
    {
      title: 'Honors List – Academic Year 2023–24',
      description: 'Awarded for outstanding academic performance in the B.Tech program (Odd Semester).',
      link: '#',
      linkText: 'View Certificate',
    },
  ];

  return (
    <Section id="achievements" title="Achievements">
      <div className="projects-grid">
        {items.map((item, idx) => (
          <AchievementCard key={idx} item={item} index={idx} />
        ))}
      </div>
    </Section>
  )
}

