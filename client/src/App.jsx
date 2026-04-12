import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import './App.css'
import profileImage from './assets/profile_image.jpg'

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

function Navbar({ onNav, onHome, theme, onToggleTheme }) {
  const items = ['about', 'projects', 'skills', 'timeline', 'contact']
  return (
    <header className="nav">
      <div className="nav-left" onClick={onHome} style={{ cursor: 'pointer' }} title="Go to home">
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
        <button className="nav-link theme-toggle-btn" onClick={onToggleTheme} aria-label="Toggle Light/Dark Mode" title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  )
}

function SystemStatus() {
  return (
    <div className="system-status">
      <div className="status-items">
        <div className="pair">
          <span className="status-dot" />
          <span>Full-Stack</span>
        </div>
        <div className="pair">
          <span className="status-dot" />
          <span>AI/ML</span>
        </div>
        <div className="pair">
          <span className="status-dot" />
          <span>Systems</span>
        </div>


      </div>
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
        <div className="avatar-circle">
          <img src={profileImage} alt={HERO_NAME} className="avatar-img" />
        </div>
        <div className="hero-title-wrapper">
          <h1 className="hero-name">{HERO_NAME}</h1>
          <a href="https://github.com/Aman018-gif" target="_blank" rel="noopener noreferrer" title="GitHub" className="social-link github">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/aman-kaushal-889b072a7?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link linkedin">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
               <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
        <p className="hero-role">{HERO_ROLE}</p>
        <div className="subtitle-wrapper">
          <p className="hero-subtitle ghost-text" aria-hidden="true">{HERO_SUBTITLE}</p>
          <p className="hero-subtitle typing-text">{subtitle}</p>
        </div>
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
            <span className="meta-value">Full-Stack · Machine Learning · Systems </span>
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
          <a href={`${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api/download/resume/pdf`} className="btn btn-secondary">
            Resume (PDF)
          </a>
          <a href={`${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api/download/resume/docx`} className="btn btn-secondary">
            Resume (Word)
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
    { type: 'text', text: '[ BOOT ] Initializing portfolio OS...', color: 'var(--text-muted)' },
    { type: 'text', text: '[ OK   ] Kernel loaded', color: '#00dc82' },
    { type: 'text', text: '[ OK   ] Mounting /home/aman...', color: '#00dc82' },
    { type: 'text', text: '[ OK   ] Backend services started', color: '#00dc82' },
    { type: 'text', text: '[ OK   ] MongoDB connected', color: '#00dc82' },
    { type: 'text', text: '[ OK   ] API server listening on :5000', color: '#00dc82' },
    { type: 'text', text: '[ .... ] Loading portfolio data...', color: '#eab308' },
    { type: 'text', text: '[ OK   ] All systems operational', color: '#00dc82' },
    { type: 'text', text: '' },
    { type: 'text', text: '────────────────────────────────────────', color: 'var(--border-main)' },
    { type: 'text', text: '  Welcome, user. You are now logged in.', color: '#38bdf8' },
    { type: 'text', text: '  Type `help` to see available commands.', color: 'var(--text-tertiary)' },
    { type: 'text', text: '────────────────────────────────────────', color: 'var(--border-main)' },
    { type: 'text', text: '' },
  ])
  const [cwd, setCwd] = useState('~')
  const [input, setInput] = useState('')
  const [isDelaying, setIsDelaying] = useState(false)

  const feedRef = useRef(null)

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

  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [history])

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
    setCwd(normalized)
    appendRows([
      { type: 'text', text: `$ cd ${normalized}` }
    ])
    onNavigateRoute(normalized)
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
        { type: 'text', text: '  cd <section>   - show section in terminal, then navigate' },
        { type: 'text', text: '  clear           - clear the terminal' },
      ])
      return
    }

    if (cmd === 'ls') {
      appendRows([{ type: 'text', text: `$ ${cmd}` }, { type: 'ls', items: lsItems }])
      return
    }

    if (cmd === 'clear') {
      setIsDelaying(false)
      setHistory([
        { type: 'text', text: '────────────────────────', color: 'var(--border-main)' },
        { type: 'text', text: 'aman@portfolio:~$', color: '#22c55e' },
        { type: 'text', text: '' },
        { type: 'text', text: '> Terminal cleared.', color: '#38bdf8' },
        { type: 'text', text: '> Type `help` to begin.', color: 'var(--text-tertiary)' },
        { type: 'text', text: '────────────────────────', color: 'var(--border-main)' },
        { type: 'text', text: '' },
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
                <div key={idx} className="terminal-line" style={{ color: row.color || 'var(--text-primary)' }}>
                  {row.text}
                </div>
              )
            })}
          </div>

          <form className="terminal-prompt-row" onSubmit={handleSubmit}>
            <span className="terminal-path">
              aman@portfolio:~/{cwd}$
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
          </form>
        </div>
      </div>
    </div>
  )
})


function useProjects() {
  return PROJECTS_FALLBACK
}

// ─── Landing Page — / ────────────────────────────────────────────────────────
// Hero card + Terminal only. No section content below the card.
function LandingPage({ theme, onToggleTheme }) {
  const navigate = useNavigate()
  const terminalRef = useRef(null)
  const projects = useProjects()

  function navigateRoute(key) {
    navigate(`/${key}`)
  }

  function handleNavbarNav(key) {
    navigateRoute(key)
    terminalRef.current?.syncFromNavbar?.(key)
  }

  function handleHome() {
    navigate('/')
  }

  return (
    <div className="app-root">
      <div className="mesh-background">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>
      <Navbar onNav={handleNavbarNav} onHome={handleHome} theme={theme} onToggleTheme={onToggleTheme} />
      <main className="main">
        <div className="split">
          <div className="left-stack">
            <LeftPanel onViewProjects={() => handleNavbarNav('projects')} />
            {/* No left-page block here — landing page shows hero only */}
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

// ─── Section Layout — /:section ──────────────────────────────────────────────
// Terminal + section content beside it (Hero hidden).
function Layout({ theme, onToggleTheme }) {
  const { section: sectionParam } = useParams()
  const currentSection = SECTION_KEYS.includes(sectionParam) ? sectionParam : null

  const navigate = useNavigate()
  const terminalRef = useRef(null)
  const projects = useProjects()

  // Invalid section → back to home
  if (!currentSection) {
    return <Navigate to="/" replace />
  }

  function navigateRoute(key) {
    navigate(`/${key}`)
  }

  function handleNavbarNav(key) {
    navigateRoute(key)
    terminalRef.current?.syncFromNavbar?.(key)
  }

  function handleHome() {
    navigate('/')
  }

  return (
    <div className="app-root">
      <div className="mesh-background">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
        <div className="mesh-blob blob-3"></div>
      </div>
      <Navbar onNav={handleNavbarNav} onHome={handleHome} theme={theme} onToggleTheme={onToggleTheme} />
      <main className="main">
        <div className="split">
          <div className="left-stack">
            <div className="left-page">
              {currentSection === 'about' && <About />}
              {currentSection === 'projects' && <Projects projects={projects} />}
              {currentSection === 'skills' && <Skills />}
              {currentSection === 'timeline' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <Timeline />
                  <Achievements />
                </div>
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

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark'
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage theme={theme} onToggleTheme={handleToggleTheme} />} />
      <Route path="/:section" element={<Layout theme={theme} onToggleTheme={handleToggleTheme} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
