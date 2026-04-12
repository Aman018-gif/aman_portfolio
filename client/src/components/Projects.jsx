import { useState } from 'react'
import Section from './Section'
import { PROJECTS_FALLBACK } from '../portfolioData'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const DemoIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
  </svg>
)

export default function Projects({ projects }) {
  const safeProjects = projects && projects.length ? projects : PROJECTS_FALLBACK
  const [flipped, setFlipped] = useState({})
  const [selectedProject, setSelectedProject] = useState(null)

  const toggleFlip = (name) => {
    setFlipped((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleReadMore = (e, project) => {
    e.stopPropagation() // Prevent card flip
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  // Ensure grid always shows a multiple of 2 cards (at least 4) to fill the grid neatly
  const totalSlots = Math.max(4, Math.ceil(safeProjects.length / 2) * 2)
  const placeholders = Array.from({ length: Math.max(0, totalSlots - safeProjects.length) })

  const MAX_CHARS = 100

  return (
    <Section id="projects" title="Projects">
      <div className={`projects-grid ${safeProjects.length > 4 ? 'scrollable-grid' : ''}`}>
        {safeProjects.map((project) => {
          const isLongText = project.description?.length > MAX_CHARS;
          return (
            <article
              key={project.name}
              className={`flip-card ${flipped[project.name] ? 'flipped' : ''}`}
              onClick={() => toggleFlip(project.name)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h3>{project.name}</h3>
                  <div className="description-container">
                    <p className="paragraph" style={{ display: 'block', display: '-webkit-box', WebkitLineClamp: isLongText ? 2 : 'unset', WebkitBoxOrient: 'vertical', overflow: isLongText ? 'hidden' : 'visible' }}>
                      {project.description}
                    </p>
                    {isLongText && (
                      <span className="read-more-text" onClick={(e) => handleReadMore(e, project)}>Read more...</span>
                    )}
                  </div>
                  <div className="tech-badges">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="badge">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="badge">+{project.tech.length - 3}</span>
                    )}
                  </div>
                  <span className="flip-hint">Click to see links &rarr;</span>
                </div>

                <div className="flip-card-back">
                  <h3>{project.name}</h3>
                  <div className="project-links">
                    {project.github && project.github.trim() !== '' && (
                      <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        <GithubIcon /> GitHub Repository
                      </a>
                    )}
                    {project.demo && project.demo.trim() !== '' && (
                      <a href={project.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        <DemoIcon /> Live Deployment
                      </a>
                    )}
                    {(!project.github || project.github.trim() === '') && (!project.demo || project.demo.trim() === '') && (
                      <span className="no-links">Links taking a nap...</span>
                    )}
                  </div>
                  <span className="flip-hint">&larr; Go back</span>
                </div>
              </div>
            </article>
          )
        })}
        {placeholders.map((_, idx) => (
          <div key={`empty-${idx}`} className="project-placeholder">
            + Add Project
          </div>
        ))}
      </div>

      {/* Modal for Read More */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>&times;</button>
            <h2 className="modal-title">{selectedProject.name}</h2>
            <div className="modal-badges">
              {selectedProject.tech.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
            <p className="modal-description">{selectedProject.description}</p>
            <div className="modal-actions">
              {selectedProject.github && selectedProject.github.trim() !== '' && (
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  <GithubIcon /> GitHub
                </a>
              )}
              {selectedProject.demo && selectedProject.demo.trim() !== '' && (
                <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <DemoIcon /> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

