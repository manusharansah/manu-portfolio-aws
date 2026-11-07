import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { createContext, useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Terminal from './components/Terminal'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import BuiltOnAws from './pages/BuiltOnAws'
import NotFound from './pages/NotFound'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

function initialDark() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
  } catch {
    /* storage unavailable: fall back to the system preference */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const PAGES = {
  '/': {
    title: 'Manu Sharan Kumar — Portfolio',
    description: 'Manu Sharan Kumar — Computer Engineer, Backend Developer and ML Explorer from Kathmandu. Skills, projects and a secret terminal. Hosted on AWS Amplify.',
  },
  '/projects': {
    title: 'Projects — Manu Sharan Kumar',
    description: 'Selected projects by Manu Sharan Kumar: ML and speech AI services, route planning for Nepal, blockchain credential verification, a voice assistant for e-governance and full-stack apps.',
  },
  '/aws': {
    title: 'Built on AWS — Manu Sharan Kumar',
    description: 'How this portfolio is hosted on AWS Amplify Hosting in ap-southeast-2: the architecture, the AWS pieces used and the lessons learned.',
  },
  '/contact': {
    title: 'Contact — Manu Sharan Kumar',
    description: 'Get in touch with Manu Sharan Kumar about research collaborations, internships and open source projects.',
  },
}

const NOT_FOUND = {
  title: 'Page not found — Manu Sharan Kumar',
  description: 'This page does not exist. Head back to the portfolio of Manu Sharan Kumar.',
}

const setAttr = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value)

// Keeps the scroll position, title and sharing metadata in step with the current page.
function PageEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const page = PAGES[pathname] ?? NOT_FOUND
    const url = window.location.origin + pathname
    document.title = page.title
    setAttr('meta[name="description"]', 'content', page.description)
    setAttr('meta[property="og:title"]', 'content', page.title)
    setAttr('meta[property="og:description"]', 'content', page.description)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('link[rel="canonical"]', 'href', url)
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const [dark, setDark] = useState(initialDark)
  const [retro, setRetro] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch { /* storage unavailable */ }
  }, [dark])

  // Retro is a whole-site CRT look switched on by the terminal's `theme retro`.
  useEffect(() => {
    document.documentElement.classList.toggle('retro', retro)
  }, [retro])

  return (
    <ThemeContext.Provider value={{ dark, retro, setRetro, toggle: () => { setRetro(false); setDark(d => !d) } }}>
      <div className="min-h-screen flex flex-col bg-canvas transition-colors duration-300">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-btn focus:text-btn-text focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to content
        </a>
        <PageEffects />
        <Navbar />
        <main id="main" className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/aws" element={<BuiltOnAws />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Terminal />
      </div>
    </ThemeContext.Provider>
  )
}
