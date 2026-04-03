import Section from './Section'
import { ABOUT_PARAGRAPHS } from '../portfolioData'

export default function About() {
  return (
    <Section id="about" title="About">
      {ABOUT_PARAGRAPHS.map((p, idx) => (
        <p key={idx} className={idx === 1 ? 'paragraph' : undefined}>
          {p}
        </p>
      ))}
    </Section>
  )
}

