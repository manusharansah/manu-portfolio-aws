import { motion } from 'framer-motion'
import { FiGithub, FiTerminal } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import { profile } from '../data'

const pipeline = [
  { step: '1', title: 'Write', text: 'A React + Vite app, built with a coding agent connected to AWS through the Agent Toolkit for AWS.' },
  { step: '2', title: 'Commit', text: 'Source lives in a GitHub repository, manusharansah/manu-portfolio-aws.' },
  { step: '3', title: 'Build', text: 'npm run build turns the app into a handful of static files in dist/.' },
  { step: '4', title: 'Deploy', text: 'I zip dist/ and upload it to AWS Amplify Hosting with the AWS API. The repo already has an amplify.yml, so connecting GitHub for automatic builds is the next step.' },
]

const services = [
  { name: 'AWS Amplify Hosting', role: 'Hosts the built site and serves it over HTTPS on an amplifyapp.com address, with a rewrite rule for single-page routing and security headers.' },
  { name: 'AWS MCP Server', role: 'Gave the coding agent access to current AWS documentation and to my project while I built, using my own permissions.' },
  { name: 'AWS CLI sign-in (aws login)', role: 'Temporary browser-based credentials, so no access keys were created or stored.' },
]

const numbers = [
  { value: 'ap-southeast-2', label: 'AWS Region (Sydney)' },
  { value: '6 files', label: 'deployed to Amplify' },
  { value: '≈111 KB', label: 'gzipped JavaScript' },
  { value: '0', label: 'access keys created' },
]

const notes = [
  { title: 'Single-page routing needs a rewrite on a static host', text: 'Pages like /projects and /aws only exist inside the React app. Amplify serves index.html for those paths with a rewrite rule, otherwise a refresh returns a 404.' },
  { title: 'A static host has no backend', text: 'The first version of the contact form posted to a Django API. On static hosting that call has nowhere to go, so the form now opens the visitor’s email app instead of failing silently.' },
  { title: 'A strict Content-Security-Policy needs testing on the live site', text: 'My first policy blocked a Google Fonts request on every page. A browser test against the deployed URL caught it, and I loosened only that directive.' },
  { title: 'Keep everything in one Region', text: 'My project is assigned to ap-southeast-2 (Sydney), and the hosting app lives there too.' },
]

const box = 'fill-surface stroke-line'
const label = 'fill-ink font-semibold'
const sub = 'fill-muted'
const arrow = 'stroke-brand-ink'

function Diagram() {
  return (
    <svg
      viewBox="0 0 900 230"
      role="img"
      aria-label="Architecture: source code in GitHub and a build on my laptop produce static files. They are uploaded to AWS Amplify Hosting in ap-southeast-2, which serves them over HTTPS through a content delivery network to the visitor's browser."
      className="hidden h-auto w-full md:block"
    >
      <defs>
        <marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" className="fill-brand-ink" />
        </marker>
      </defs>

      <rect x="10" y="20" width="190" height="80" rx="14" className={box} strokeWidth="1.5" />
      <text x="105" y="55" textAnchor="middle" fontSize="17" className={label}>My laptop</text>
      <text x="105" y="78" textAnchor="middle" fontSize="13" className={sub}>React + Vite, npm run build</text>

      <rect x="10" y="140" width="190" height="70" rx="14" className={box} strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="105" y="170" textAnchor="middle" fontSize="17" className={label}>GitHub</text>
      <text x="105" y="192" textAnchor="middle" fontSize="13" className={sub}>source repository</text>
      <line x1="105" y1="140" x2="105" y2="102" className={arrow} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#head)" markerStart="url(#head)" />

      <line x1="202" y1="175" x2="318" y2="175" className={arrow} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#head)" />
      <text x="260" y="163" textAnchor="middle" fontSize="12" className={sub}>next: auto-build</text>

      <line x1="202" y1="60" x2="318" y2="60" className={arrow} strokeWidth="2.5" markerEnd="url(#head)" />
      <text x="260" y="48" textAnchor="middle" fontSize="12" className={sub}>zip of dist/</text>

      <rect x="320" y="20" width="270" height="190" rx="14" className={box} strokeWidth="1.5" />
      <text x="455" y="52" textAnchor="middle" fontSize="17" className={label}>AWS Amplify Hosting</text>
      <text x="455" y="74" textAnchor="middle" fontSize="13" className={sub}>ap-southeast-2 (Sydney)</text>
      <text x="455" y="110" textAnchor="middle" fontSize="13" className={sub}>• single-page rewrite rule</text>
      <text x="455" y="132" textAnchor="middle" fontSize="13" className={sub}>• security headers (HSTS, CSP)</text>
      <text x="455" y="154" textAnchor="middle" fontSize="13" className={sub}>• HTTPS on amplifyapp.com</text>
      <text x="455" y="188" textAnchor="middle" fontSize="12" className={sub}>amplify.yml ready for GitHub builds</text>

      <line x1="592" y1="115" x2="708" y2="115" className={arrow} strokeWidth="2.5" markerEnd="url(#head)" />
      <text x="650" y="103" textAnchor="middle" fontSize="12" className={sub}>CDN, HTTPS</text>

      <rect x="710" y="75" width="180" height="80" rx="14" className={box} strokeWidth="1.5" />
      <text x="800" y="110" textAnchor="middle" fontSize="17" className={label}>Visitor</text>
      <text x="800" y="132" textAnchor="middle" fontSize="13" className={sub}>browser or phone</text>
    </svg>
  )
}

export default function BuiltOnAws() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative overflow-hidden px-6 pb-8 pt-32 sm:pt-40">
        <div aria-hidden="true" className="wedge-tl pointer-events-none absolute -left-20 top-0 h-[26rem] w-[26rem] bg-wedge/80" />
        <div className="relative mx-auto max-w-5xl">
          <AnimatedSection>
            <h1 className="font-display text-5xl font-bold leading-tight">Built on AWS</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-body">
              The source is in a GitHub repository and the site is hosted on AWS Amplify Hosting. Here is how it gets
              from my laptop to your browser, and what I ran into on the way.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {numbers.map(n => (
                <div key={n.label} className="panel p-5 text-center">
                  <dd className="break-words font-display text-2xl font-semibold text-ink">{n.value}</dd>
                  <dt className="mt-1 text-xs text-muted">{n.label}</dt>
                </div>
              ))}
            </dl>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mb-5 mt-16 font-display text-2xl font-semibold">Architecture</h2>
            <div className="panel p-4 md:p-6">
              <Diagram />
              <p className="text-sm leading-relaxed text-body md:hidden">
                Source is kept in GitHub. A build on my laptop produces static files, which are uploaded to AWS Amplify
                Hosting in ap-southeast-2. Amplify serves them to visitors over HTTPS through a content delivery network.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mb-6 mt-16 font-display text-2xl font-semibold">From code to live site</h2>
            <ol className="grid gap-5 md:grid-cols-4">
              {pipeline.map(p => (
                <li key={p.step} className="panel relative p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-btn font-display text-base font-bold text-btn-text">{p.step}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 break-words text-sm leading-relaxed text-body">{p.text}</p>
                </li>
              ))}
            </ol>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mb-5 mt-16 font-display text-2xl font-semibold">AWS pieces used</h2>
            <dl className="grid gap-5 md:grid-cols-3">
              {services.map(s => (
                <div key={s.name} className="panel p-6">
                  <dt className="font-display text-lg font-semibold text-ink">{s.name}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-body">{s.role}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mb-5 mt-16 font-display text-2xl font-semibold">Challenges and lessons</h2>
            <ul className="grid gap-5 md:grid-cols-2">
              {notes.map(n => (
                <li key={n.title} className="panel p-6">
                  <h3 className="font-display text-lg font-semibold">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{n.text}</p>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-14 flex flex-wrap gap-3">
              <a href={`${profile.github}/manu-portfolio-aws`} target="_blank" rel="noreferrer" className="btn-ghost">
                <FiGithub aria-hidden="true" /> View the source
              </a>
              <button type="button" onClick={() => window.dispatchEvent(new Event('open-terminal'))} className="btn-ghost">
                <FiTerminal aria-hidden="true" /> Try the terminal
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
