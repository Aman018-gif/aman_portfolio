import { Router } from 'express'

const router = Router()

const projects = [
  {
    name: 'Scalable Task Queue API',
    description:
      'A distributed task queue built with Node.js and Redis, exposing REST APIs for enqueuing and processing background jobs.',
    tech: ['Node.js', 'Express', 'Redis', 'Docker'],
    github: 'https://github.com/',
    demo: '#',
  },
  {
    name: 'Contest Analytics Service',
    description:
      'Backend service that aggregates coding contest submissions and exposes metrics dashboards via APIs.',
    tech: ['Node.js', 'MongoDB', 'CRON', 'Charting APIs'],
    github: 'https://github.com/',
    demo: '#',
  },
  {
    name: 'Interview Prep Tracker',
    description:
      'API-first system to track DSA practice, with tagging, difficulty metrics, and spaced repetition scheduling.',
    tech: ['Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/',
    demo: '#',
  },
]

router.get('/', (req, res) => {
  res.json(projects)
})

export default router

