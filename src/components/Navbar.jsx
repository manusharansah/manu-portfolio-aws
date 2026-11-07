import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSun, FiMoon, FiTerminal } from 'react-icons/fi'
import { useTheme } from '../App'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Built on AWS', to: '/aws' },
  { label: 'Contact', to: '/contact' },
]

const openTerminal = () => window.dispatchEvent(new Event('open-terminal'))

const iconButton =
  'flex h-10 w-10 items-center justify-center rounded-full text-body transition duration-200 hover:bg-wedge hover:text-ink'

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const linkClass = to =>
    `rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
      pathname === to ? 'bg-wedge text-brand-ink' : 'text-body hover:bg-wedge/70 hover:text-ink'
    }`

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-3 py-2 backdrop-blur-md transition duration-300 ${
          scrolled ? 'border-line bg-surface/90 shadow-soft' : 'border-transparent bg-surface/60'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 rounded-full pr-3" aria-label="Manu Sharan Kumar, home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-accent">M</span>
          <span className="hidden font-display text-lg font-semibold text-ink sm:block">Manu Sharan</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to} className={linkClass(to)} aria-current={pathname === to ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={openTerminal}
            className="hidden h-10 items-center gap-2 rounded-full border border-brand-ink/40 px-4 font-mono text-xs text-brand-ink transition duration-200 hover:bg-wedge md:flex"
          >
            <FiTerminal size={14} aria-hidden="true" /> terminal
          </button>
          <button
            onClick={openTerminal}
            aria-label="Open the secret terminal"
            className={`${iconButton} md:hidden`}
          >
            <FiTerminal size={18} aria-hidden="true" />
          </button>
          <button onClick={toggle} aria-label="Toggle theme" className={iconButton}>
            {dark ? <FiSun size={18} aria-hidden="true" /> : <FiMoon size={18} aria-hidden="true" />}
          </button>
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`${iconButton} md:hidden`}
          >
            {open ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="panel mx-auto mt-2 flex max-w-5xl flex-col gap-1 p-3 md:hidden">
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to} className={linkClass(to)} aria-current={pathname === to ? 'page' : undefined}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
