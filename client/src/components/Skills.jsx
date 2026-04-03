import Section from './Section'
import { SKILLS_DATA } from '../portfolioData'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="skills-grid">
        {SKILLS_DATA.map((group) => (
          <div key={group.label} className="skill-card">
            <h3>{group.label}</h3>
            <div className="skill-list">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="skill-meter"
                  title={`${item.name} · ${item.level}%`}
                >
                  <div className="skill-meter-head">
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-level">{item.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

