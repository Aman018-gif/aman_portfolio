import Section from './Section'

export default function Achievements() {
  const items = [
    'Scholarship for academic excellence in Computer Science.',
    'Solved 400+ DSA problems across platforms (LeetCode, CodeStudio, GFG).',
    'Top performer in university-level coding contests and hackathons.',
    'Completed certifications in backend development and system design fundamentals.',
  ]

  return (
    <Section id="achievements" title="Achievements">
      <ul className="achievements-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  )
}

