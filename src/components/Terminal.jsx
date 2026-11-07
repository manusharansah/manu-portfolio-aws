import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiTerminal, FiX } from 'react-icons/fi'
import { useTheme } from '../App'
import { profile, projects, skills } from '../data'

const SEEN_KEY = 'terminal-seen'
const LINE_DELAY_MS = 22
const STARTED_AT = Date.now()

const PAGES = {
  home: '/',
  projects: '/projects',
  contact: '/contact',
  aws: '/aws',
}

const FUN_FACTS = [
  'I ranked 1st nationwide in the IOE engineering entrance exam.',
  'I have authored two educational books for underserved students.',
  'VidyaChain, which began as Certichain at KU Hackfest, fights certificate fraud with blockchain.',
  'SajiloSewa answers government-service questions by voice, in Nepali and English.',
  'This portfolio is served from AWS Amplify Hosting. Try the `neofetch` command.',
]

const COMMANDS = [
  'about', 'aws', 'cat', 'certichain', 'clear', 'contact', 'date', 'exit', 'fun', 'goto', 'help',
  'ls', 'neofetch', 'projects', 'quiz', 'skills', 'theme', 'whoami',
]

const HELP = [
  'Available commands:',
  '  about          who I am',
  '  whoami         one-line summary',
  '  skills         my technical stack',
  '  projects       what I have built',
  '  neofetch       a system card for this very site',
  '  quiz           four questions: how well did you read my portfolio?',
  '  certichain <text>   see why one changed letter breaks a certificate hash',
  '  fun            a random fun fact',
  '  aws            how this site runs on AWS',
  '  contact        how to reach me',
  '  goto <page>    home | projects | contact | aws',
  '  theme [mode]   toggle, or: theme dark | light | retro',
  '  clear / exit   clean the screen / close the terminal',
  'Tip: Tab completes, ↑ ↓ browse history. There may be a secret or two.',
]

const QUICK = ['help', 'neofetch', 'quiz', 'projects', 'fun']

const BANNER = [
  `Welcome to ${profile.name}'s portfolio terminal.`,
  "Type 'help' to see what you can do, or try 'neofetch'.",
]

// Every answer below can be checked against the projects page and the /aws page.
const QUIZ = [
  { q: 'VidyaChain began as Certichain at which hackathon?', options: ['KU Hackfest 2025', 'Protobytes Hackathon 2.0', 'IIT Bombay Techfest'], answer: 'a' },
  { q: 'Which framework powers the Insurance Premium Predictor API?', options: ['Flask', 'FastAPI', 'Express'], answer: 'b' },
  { q: 'How does SajiloSewa talk to citizens?', options: ['By voice', 'By email', 'By augmented reality'], answer: 'a' },
  { q: 'Which AWS Region hosts this site?', options: ['us-east-1', 'ap-southeast-2', 'eu-north-1'], answer: 'b' },
]

const ART = [
  '  __  __ ____  ',
  ' |  \\/  / ___| ',
  ' | |\\/| \\___ \\ ',
  ' |_|  |_|____/ ',
  '               ',
]

const askQuestion = n => [
  `Question ${n + 1} of ${QUIZ.length}: ${QUIZ[n].q}`,
  ...QUIZ[n].options.map((o, i) => `  ${'abc'[i]}) ${o}`),
  "Answer with a, b or c ('q' to quit).",
]

const out = text => ({ kind: 'out', text })

export default function Terminal() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { dark, toggle, retro, setRetro } = useTheme()
  const [open, setOpen] = useState(false)
  const [seen, setSeen] = useState(() => {
    try {
      return localStorage.getItem(SEEN_KEY) === '1'
    } catch {
      return false
    }
  })
  const [lines, setLines] = useState(() => BANNER.map(out))
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  const [factIndex, setFactIndex] = useState(0)
  const [nearTop, setNearTop] = useState(true)
  const [hintExpired, setHintExpired] = useState(false)

  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const quizRef = useRef(null)
  const chainRef = useRef(Promise.resolve())
  const reduceMotionRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const openTerminal = useCallback(() => {
    setOpen(true)
    setSeen(true)
    try {
      localStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* storage unavailable: the hint simply stays visible */
    }
  }, [])

  const closeTerminal = useCallback(() => setOpen(false), [])

  // While the dialog is open the page behind it is inert, and focus returns to the trigger afterwards.
  useEffect(() => {
    if (!open) return undefined
    const background = [...document.querySelectorAll('nav, main#main, footer, aside[aria-label="Secret terminal"]')]
    background.forEach(el => el.setAttribute('inert', ''))
    return () => {
      background.forEach(el => el.removeAttribute('inert'))
      triggerRef.current?.focus()
    }
  }, [open])

  // Backtick opens the terminal from anywhere except while typing in a field.
  useEffect(() => {
    const onKey = e => {
      if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return
      const t = e.target
      const typing = t instanceof HTMLElement &&
        (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
      if (typing) return
      e.preventDefault()
      openTerminal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openTerminal])

  // The hint is a first-impression nudge: it fades away so it never lingers over content.
  useEffect(() => {
    const t = setTimeout(() => setHintExpired(true), 12000)
    return () => clearTimeout(t)
  }, [])

  // The hint only shows near the top of a page so it never covers content while reading.
  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The navbar button and the footer hint open it through a custom event.
  useEffect(() => {
    window.addEventListener('open-terminal', openTerminal)
    return () => window.removeEventListener('open-terminal', openTerminal)
  }, [openTerminal])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines, open])

  const answerQuiz = useCallback(raw => {
    const state = quizRef.current
    const choice = raw.trim().toLowerCase()
    if (choice === 'q') {
      quizRef.current = null
      return { lines: [out('Quiz cancelled.')] }
    }
    if (!['a', 'b', 'c'].includes(choice)) {
      return { lines: [out("Please answer with a, b or c ('q' to quit).")] }
    }
    const right = choice === QUIZ[state.n].answer
    const score = state.score + (right ? 1 : 0)
    const feedback = out(right ? 'Correct.' : `Not quite: the answer was ${QUIZ[state.n].answer}) ${QUIZ[state.n].options['abc'.indexOf(QUIZ[state.n].answer)]}.`)
    if (state.n + 1 < QUIZ.length) {
      quizRef.current = { n: state.n + 1, score }
      return { lines: [feedback, ...askQuestion(state.n + 1).map(out)] }
    }
    quizRef.current = null
    const verdict = score === QUIZ.length
      ? "Perfect score. You read everything. Try 'sudo hire-me'."
      : score >= 2
        ? "Solid. There is more to find: try 'neofetch' and 'projects'."
        : "Plenty left to explore. Try 'projects' and 'skills', then take the quiz again."
    return { lines: [feedback, out(`Final score: ${score}/${QUIZ.length}. ${verdict}`)] }
  }, [])

  const execute = useCallback(async raw => {
    const [name = '', ...args] = raw.trim().split(/\s+/)
    const cmd = name.toLowerCase()

    switch (cmd) {
      case '':
        return { lines: [] }
      case 'help':
        return { lines: HELP.map(out) }
      case 'about':
        return { lines: profile.bio.split('\n').map(s => s.trim()).filter(Boolean).map(out) }
      case 'whoami':
        return { lines: [out(`${profile.name} · ${profile.title} · ${profile.location}`), out(profile.tagline)] }
      case 'skills':
        return { lines: skills.map(s => out(`${s.category.padEnd(16)} ${s.items.join(', ')}`)) }
      case 'projects':
        return {
          lines: [
            ...projects.map(p => out(`• ${p.title}  (${p.tech.join(', ')})`)),
            out("Type 'goto projects' to open the full page."),
          ],
        }
      case 'fun':
        setFactIndex(i => (i + 1) % FUN_FACTS.length)
        return { lines: [out(FUN_FACTS[factIndex])] }
      case 'aws':
        return {
          lines: [
            'This site is hosted on AWS Amplify Hosting in ap-southeast-2 (Sydney).',
            'The production build is published to Amplify and served over HTTPS',
            "through Amplify's CDN. Type 'goto aws' for the full story.",
          ].map(out),
        }
      case 'neofetch': {
        const seconds = Math.round((Date.now() - STARTED_AT) / 1000)
        const info = [
          `${profile.name.split(' ')[0].toLowerCase()}@portfolio`,
          '-------------------',
          'Host    Amplify Hosting',
          'Region  ap-southeast-2',
          'Stack   React, Vite, Tailwind',
          `Theme   ${retro ? 'retro' : dark ? 'dark' : 'light'}`,
          `On page ${seconds}s`,
        ]
        // The ASCII logo only fits on wider screens; on a phone the facts are listed on their own.
        if (window.innerWidth < 520) return { lines: info.map(text => ({ kind: 'pre', text })) }
        const rows = Math.max(ART.length, info.length)
        return {
          lines: Array.from({ length: rows }, (_, i) => ({ kind: 'pre', text: `${ART[i] ?? ' '.repeat(ART[0].length)} ${info[i] ?? ''}` })),
        }
      }
      case 'certichain': {
        const text = args.join(' ')
        if (!text) return { lines: [out('Usage: certichain <any text>, for example: certichain Manu finished the course')] }
        if (!window.crypto?.subtle) return { lines: [out('Hashing needs a secure (https) page.')] }
        const sha = async s => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))]
          .map(b => b.toString(16).padStart(2, '0')).join('')
        const chars = Array.from(text)
        const tweaked = chars.slice(0, -1).join('') + String.fromCodePoint(chars[chars.length - 1].codePointAt(0) + 1)
        const [a, b] = await Promise.all([sha(text), sha(tweaked)])
        const differ = [...a].filter((c, i) => c !== b[i]).length
        return {
          lines: [
            { kind: 'pre', text: `"${text}"` },
            { kind: 'pre', text: `  sha256 ${a.slice(0, 32)}` },
            { kind: 'pre', text: `         ${a.slice(32)}` },
            { kind: 'pre', text: `last character changed: "${tweaked}"` },
            { kind: 'pre', text: `  sha256 ${b.slice(0, 32)}` },
            { kind: 'pre', text: `         ${b.slice(32)}` },
            out(`One character changed and ${differ} of 64 hex digits differ. That is why a fingerprint makes a certificate tamper-evident, the idea behind my VidyaChain project (first built as Certichain).`),
          ],
        }
      }
      case 'quiz':
        quizRef.current = { n: 0, score: 0 }
        return { lines: [out('A quick quiz on this portfolio.'), ...askQuestion(0).map(out)] }
      case 'contact':
        return {
          lines: [
            out(`Email    ${profile.email}`),
            out(`GitHub   ${profile.github}`),
            out(`LinkedIn ${profile.linkedin}`),
          ],
        }
      case 'goto': {
        const dest = PAGES[(args[0] || '').toLowerCase()]
        if (!dest) return { lines: [out(`Usage: goto <${Object.keys(PAGES).join(' | ')}>`)] }
        return { lines: [out(`Opening ${args[0].toLowerCase()}…`)], navigate: dest, close: true }
      }
      case 'theme': {
        const mode = (args[0] || 'toggle').toLowerCase()
        if (!['toggle', 'dark', 'light', 'retro'].includes(mode)) {
          return { lines: [out('Usage: theme [dark | light | retro]')] }
        }
        if (mode === 'retro') {
          if (!dark) toggle()
          setRetro(true)
          return { lines: [out('Retro mode on: green phosphor, scanlines. Type "theme dark" or "theme light" to leave.')] }
        }
        setRetro(false)
        const wantDark = mode === 'toggle' ? !dark : mode === 'dark'
        if (wantDark !== dark) toggle()
        return { lines: [out(`Theme set to ${wantDark ? 'dark' : 'light'}.`)] }
      }
      case 'ls':
        return { lines: [out(Object.keys(PAGES).join('  ') + '  secret.txt')] }
      case 'cat':
        return args[0] === 'secret.txt'
          ? { lines: [out(`"${profile.philosophy}"`)] }
          : { lines: [out(`cat: ${args[0] || '(missing file)'}: No such file`)] }
      case 'date':
        return { lines: [out(new Date().toString())] }
      case 'sudo':
        if (args.join(' ').toLowerCase() === 'hire-me') {
          return {
            lines: ['[sudo] password for recruiter: ********', 'Access granted. Opening the contact page…'].map(out),
            navigate: PAGES.contact,
            close: true,
          }
        }
        return { lines: [out(`${profile.name.split(' ')[0].toLowerCase()} is not in the sudoers file. This incident will be reported.`)] }
      case 'clear':
        return { clear: true }
      case 'exit':
        return { close: true }
      default:
        return { lines: [out(`command not found: ${cmd}. Type 'help' for a list.`)] }
    }
  }, [dark, toggle, factIndex, retro])

  const submit = useCallback(raw => {
    setHistory(h => (raw.trim() ? [...h, raw] : h))
    setCursor(-1)
    setInput('')
    const echo = { kind: 'in', text: raw }

    // Commands run in order, so slow ones (a network call) never reorder the output.
    chainRef.current = chainRef.current.then(async () => {
      const result = quizRef.current ? answerQuiz(raw) : await execute(raw)
      if (result.clear) {
        setLines([])
      } else {
        setLines(prev => [...prev, echo])
        for (const item of result.lines || []) {
          setLines(prev => [...prev, item])
          if (!reduceMotionRef.current) await new Promise(r => setTimeout(r, LINE_DELAY_MS))
        }
      }
      if (result.navigate) navigate(result.navigate)
      if (result.close) closeTerminal()
    })
  }, [answerQuiz, execute, navigate, closeTerminal])

  const onInputKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1)
      setCursor(next)
      setInput(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor === -1) return
      const next = cursor + 1
      if (next >= history.length) {
        setCursor(-1)
        setInput('')
      } else {
        setCursor(next)
        setInput(history[next])
      }
    } else if (e.key === 'Tab' && input && !e.shiftKey) {
      const matches = COMMANDS.filter(c => c.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        e.preventDefault()
        setInput(matches[0] + ' ')
      }
    }
  }

  // Keep Tab cycling through every control in the dialog, and let Escape close it.
  const onDialogKey = e => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      closeTerminal()
    } else if (e.key === 'Tab' && !e.defaultPrevented) {
      const controls = [...dialogRef.current.querySelectorAll('button, input')]
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const showHint = !seen && nearTop && !hintExpired && pathname === '/'

  return (
    <>
      {/* Visible hint + trigger: always reachable, never covers the page content. */}
      <aside aria-label="Secret terminal" className="fixed bottom-4 right-4 z-40 flex items-center gap-3">
        {showHint && (
          <span className="hidden sm:block bg-navy text-white text-sm font-mono px-3 py-2 rounded-xl shadow-lg border border-accent/40">
            Psst! Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-accent">`</kbd> or click for a secret terminal
          </span>
        )}
        {showHint && (
          <span className="sm:hidden bg-navy text-white text-xs font-mono px-3 py-2 rounded-xl shadow-lg border border-accent/40">
            Try the terminal
          </span>
        )}
        <span className="relative flex">
          {showHint && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-accent/40 motion-safe:animate-ping"
            />
          )}
          <button
            ref={triggerRef}
            type="button"
            onClick={openTerminal}
            aria-label="Open the secret terminal (shortcut: backtick key)"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="w-12 h-12 rounded-full bg-navy text-accent border border-accent/50 shadow-lg flex items-center justify-center hover:bg-accent hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors duration-200"
          >
            <FiTerminal size={20} aria-hidden="true" />
          </button>
        </span>
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={e => { if (e.target === e.currentTarget) closeTerminal() }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio terminal"
              onKeyDown={onDialogKey}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="w-full max-w-2xl h-[75vh] sm:h-[30rem] bg-gray-950 border border-accent/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-sm"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-navy border-b border-white/10">
                <span className="text-accent">manu@portfolio ~ $</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeTerminal}
                  aria-label="Close terminal"
                  className="w-8 h-8 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <FiX size={16} aria-hidden="true" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5 text-gray-200"
                role="log"
                aria-live="polite"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((l, i) => (
                  <div key={i} className={l.kind === 'pre' ? 'whitespace-pre-wrap break-all' : 'whitespace-pre-wrap break-words'}>
                    {l.kind === 'in' ? (
                      <><span className="text-accent">$ </span>{l.text}</>
                    ) : (
                      l.text
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 pt-2 flex flex-wrap gap-2">
                {QUICK.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { submit(c); inputRef.current?.focus() }}
                    className="px-2.5 py-1 rounded-lg border border-white/15 text-gray-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {c}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 px-4 py-3 border-t border-white/10 mt-2">
                <span className="text-accent" aria-hidden="true">$</span>
                <span className="sr-only">Terminal command</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onInputKey}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder={quizRef.current ? 'answer a, b or c' : 'type a command, e.g. help'}
                  className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-500"
                />
              </label>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
