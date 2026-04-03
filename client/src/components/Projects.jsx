import Section from './Section'
import { PROJECTS_FALLBACK } from '../portfolioData'

export default function Projects({ projects }) {
  const safeProjects = projects && projects.length ? projects : PROJECTS_FALLBACK

  return (
    <Section id="projects" title="Projects">
      <div className="projects-grid">
        {safeProjects.map((project) => (
          <article key={project.name} className="project-card">
            <h3>{project.name}</h3>
            <p className="paragraph">{project.description}</p>
            <div className="tech-badges">
              {project.tech.map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

