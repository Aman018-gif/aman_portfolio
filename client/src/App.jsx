import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import './App.css'

import {
  ABOUT_PARAGRAPHS,
  HERO_NAME,
  HERO_ROLE,
  HERO_SUBTITLE,
  PROJECTS_FALLBACK,
  SECTION_KEYS,
  SKILLS_DATA,
  TIMELINE_ITEMS,
} from './portfolioData'

import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let index = 0
    // Avoid syncing setState directly inside an effect.
    if (typeof queueMicrotask === 'function') {
      queueMicrotask(() => setDisplayed(''))
    } else {
      setTimeout(() => setDisplayed(''), 0)
    }
    const id = setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return displayed
}

function Navbar({ onNav }) {
  const items = ['about', 'projects', 'skills', 'timeline', 'contact']
  return (
    <header className="nav">
      <div className="nav-left">
        <span className="nav-brand">{HERO_NAME}</span>
        <span className="nav-role">{HERO_ROLE}</span>
      </div>
      <nav className="nav-links">
        {items.map((item) => (
          <button
            key={item}
            className="nav-link"
            onClick={() => onNav(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  )
}

function SystemStatus() {
  return (
    <div className="system-status">
      <span className="status-dot" />
      <span>Server Running · API healthy · DB connected</span>
    </div>
  )
}

function LeftPanel({ onViewProjects }) {
  const subtitle = useTypewriter(HERO_SUBTITLE)
  return (
    <div className="left-panel">
      <Motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="avatar-circle">AK</div>
        <h1 className="hero-name">{HERO_NAME}</h1>
        <p className="hero-role">{HERO_ROLE}</p>
        <p className="hero-subtitle">{subtitle}</p>
        <SystemStatus />
        <div className="hero-meta">
          <div>
            <span className="meta-label">Location</span>
            <span className="meta-value">India (IST)</span>
          </div>
          <div>
            <span className="meta-label">Education</span>
            <span className="meta-value">B.Tech · Computer Science</span>
          </div>
          <div>
            <span className="meta-label">Focus</span>
            <span className="meta-value">APIs · Systems · Problem Solving</span>
          </div>
        </div>
        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onViewProjects}
          >
            View Projects
          </button>
          <a href="/api/download/resume/pdf" className="btn btn-secondary">
            Download CV
          </a>
        </div>
      </Motion.div>
    </div>
  )
}

const Terminal = forwardRef(function Terminal(
  { onNavigateRoute, aboutParagraphs, projects, skillsData, timelineItems },
  ref,
) {
  const allowed = SECTION_KEYS
  const lsItems = ['about', 'projects', 'skills', 'contact']

  const [history, setHistory] = useState([
    { type: 'text', text: 'Welcome to Aman’s portfolio terminal.' },
    { type: 'text', text: 'Type `help` to see available commands.' },
  ])
  const [cwd, setCwd] = useState('about')
  const [input, setInput] = useState('')
  const [isDelaying, setIsDelaying] = useState(false)

  const feedRef = useRef(null)
  const userAtBottomRef = useRef(true)
  const delayTimeoutRef = useRef(null)

  const commands = [
    'help',
    'ls',
    'cd about',
    'cd projects',
    'cd skills',
    'cd timeline',
    'cd contact',
    'clear',
  ]

  function appendRows(rows) {
    setHistory((h) => [...h, ...rows])
  }

  function normalizeSection(target) {
    return allowed.includes(target) ? target : null
  }

  function handleFeedScroll() {
    const el = feedRef.current
    if (!el) return
    const threshold = 60
    userAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
  }

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    if (!userAtBottomRef.current) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    return () => {
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
    }
  }, [])

  function syncFromNavbar(target) {
    const normalized = normalizeSection(target)
    if (!normalized) return
    setCwd(normalized)
    appendRows([
      { type: 'text', text: `$ cd ${normalized}` },
      { type: 'text', text: `navigated to /${normalized}` },
    ])
  }

  function navigateInstant(target) {
    const normalized = normalizeSection(target)
    if (!normalized) {
      appendRows([{ type: 'text', text: `cd: no such section: ${target}` }])
      return
    }
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
    setIsDelaying(false)
    setCwd(normalized)
    appendRows([
      { type: 'text', text: `$ cd ${normalized}` },
      { type: 'text', text: `navigated to /${normalized}` },
    ])
    onNavigateRoute(normalized)
  }

  function cdDelayed(target) {
    const normalized = normalizeSection(target)
    if (!normalized) {
      appendRows([{ type: 'text', text: `cd: no such section: ${target}` }])
      return
    }
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
    setCwd(normalized)

    setIsDelaying(true)
    appendRows([
      { type: 'text', text: `$ cd ${normalized}` },
      { type: 'text', text: `Navigating to /${normalized}...` },
      { type: 'text', text: `Loading ${normalized}...` },
    ])

    delayTimeoutRef.current = setTimeout(() => {
      // User wants: for `cd about`, show ONLY the about text inside terminal.
      let contentRows = []

      if (normalized === 'about') {
        contentRows = aboutParagraphs.map((p) => ({ type: 'text', text: p }))
      } else if (normalized === 'projects') {
        const names =
          projects && projects.length
            ? projects.slice(0, 4).map((p) => p.name)
            : ['(projects not loaded)']
        contentRows = [
          { type: 'text', text: 'Projects:' },
          ...names.map((n) => ({ type: 'text', text: `- ${n}` })),
        ]
      } else if (normalized === 'skills') {
        contentRows = skillsData.flatMap((group) => [
          { type: 'text', text: group.label },
          ...group.items.map((it) => ({ type: 'text', text: `- ${it.name}` })),
        ])
      } else if (normalized === 'timeline') {
        contentRows = timelineItems.flatMap((t) => [
          { type: 'text', text: `${t.title} (${t.time})` },
          { type: 'text', text: t.description },
          { type: 'text', text: '' },
        ])
      } else if (normalized === 'contact') {
        contentRows = [
          { type: 'text', text: 'Contact form is available on the Contact page.' },
          { type: 'text', text: 'Fill it in and we store your message in MongoDB.' },
        ]
      }

      appendRows([
        ...contentRows,
        {
          type: 'action',
          label: `Navigate to /${normalized}`,
          target: normalized,
        },
      ])
      setIsDelaying(false)
    }, 900)
  }

  useImperativeHandle(ref, () => ({
    syncFromNavbar,
  }))

  function runCommand(raw) {
    const cmd = raw.trim()
    if (!cmd) return

    if (cmd === 'help') {
      appendRows([
        { type: 'text', text: `$ ${cmd}` },
        { type: 'text', text: 'Available commands:' },
        { type: 'text', text: '  help            - show available commands' },
        { type: 'text', text: '  ls              - list sections (clickable)' },
        { type: 'text', text: '  cd <section>   - show section in terminal, then navigate (delayed)' },
        { type: 'text', text: '  clear           - clear the terminal' },
      ])
      return
    }

    if (cmd === 'ls') {
      appendRows([{ type: 'text', text: `$ ${cmd}` }, { type: 'ls', items: lsItems }])
      return
    }

    if (cmd === 'clear') {
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current)
      setIsDelaying(false)
      setHistory([
        { type: 'text', text: 'Welcome to Aman’s portfolio terminal.' },
        { type: 'text', text: 'Type `help` to see available commands.' },
      ])
      return
    }

    if (cmd.startsWith('cd ')) {
      const target = cmd.slice(3).trim()
      cdDelayed(target)
      return
    }

    appendRows([
      { type: 'text', text: `$ ${cmd}` },
      { type: 'text', text: `command not found: ${cmd}` },
    ])
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (isDelaying) return
    runCommand(input)
    setInput('')
  }

  return (
    <div className="terminal-wrapper">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="terminal-title">
            aman@portfolio: /home/aman/{cwd}
          </span>
        </div>

        <div className="terminal-body">
          <div
            className="terminal-feed"
            ref={feedRef}
            onScroll={handleFeedScroll}
          >
            {history.map((row, idx) => {
              if (row.type === 'ls') {
                return (
                  <div key={idx} className="terminal-line">
                    {row.items.map((item, i) => (
                      <button
                        key={item}
                        type="button"
                        className="terminal-link"
                        onClick={() => navigateInstant(item)}
                      >
                        {item}
                        {i < row.items.length - 1 ? ' ' : ''}
                      </button>
                    ))}
                  </div>
                )
              }

              if (row.type === 'action') {
                return (
                  <div key={idx} className="terminal-line">
                    <button
                      type="button"
                      className="terminal-action"
                      onClick={() => {
                        if (!row.target) return
                        appendRows([{ type: 'text', text: `opened /${row.target}` }])
                        onNavigateRoute(row.target)
                      }}
                    >
                      {row.label}
                    </button>
                  </div>
                )
              }

              return (
                <div key={idx} className="terminal-line">
                  {row.text}
                </div>
              )
            })}
          </div>

          <form className="terminal-prompt-row" onSubmit={handleSubmit}>
            <span className="terminal-path">
              aman@portfolio:~/${cwd}$
            </span>
            <span className="terminal-dollar">$</span>
            <input
              className="terminal-input-inline"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck="false"
              placeholder={`Try: ${commands.join(' | ')}`}
              disabled={isDelaying}
              aria-label="terminal command"
            />
            <span className="terminal-caret" aria-hidden="true" />
          </form>
        </div>
      </div>
    </div>
  )
})

function Layout() {
  const params = useParams()
  const sectionParam = params.section
  const currentSection = SECTION_KEYS.includes(sectionParam) ? sectionParam : 'about'

  const navigate = useNavigate()
  const terminalRef = useRef(null)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
  }, [])

  function navigateRoute(key) {
    navigate(`/${key}`)
  }

  function handleNavbarNav(key) {
    navigateRoute(key)
    terminalRef.current?.syncFromNavbar?.(key)
  }

  return (
    <div className="app-root">
      <Navbar onNav={handleNavbarNav} />
      <main className="main">
        <div className="split">
          <div className="left-stack">
            <LeftPanel onViewProjects={() => handleNavbarNav('projects')} />

            <div className="left-page">
              {currentSection === 'about' && <About />}
              {currentSection === 'projects' && <Projects projects={projects} />}
              {currentSection === 'skills' && <Skills />}
              {currentSection === 'timeline' && (
                <>
                  <Timeline />
                  <Achievements />
                </>
              )}
              {currentSection === 'contact' && <Contact />}
            </div>
          </div>

          <Terminal
            ref={terminalRef}
            onNavigateRoute={navigateRoute}
            aboutParagraphs={ABOUT_PARAGRAPHS}
            projects={projects}
            skillsData={SKILLS_DATA}
            timelineItems={TIMELINE_ITEMS}
          />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/about" replace />} />
      <Route path="/:section" element={<Layout />} />
      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
  )
}

export default App
