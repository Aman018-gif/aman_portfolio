import { motion as Motion } from 'framer-motion'

export default function Section({ id, title, children }) {
  return (
    <Motion.section
      id={id}
      className="content-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{title}</h2>
      {children}
    </Motion.section>
  )
}

