import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiMail } from 'react-icons/fi'
import { profile } from '../data'

const socials = [
  { icon: FiGithub, label: 'GitHub', href: profile.github },
  { icon: FiLinkedin, label: 'LinkedIn', href: profile.linkedin },
  { icon: FiMail, label: 'Email', href: `mailto:${profile.email}` },
  { icon: FiFacebook, label: 'Facebook', href: profile.facebook },
  { icon: FiInstagram, label: 'Instagram', href: profile.instagram },
]

const pages = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Built on AWS', to: '/aws' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line bg-surface">
      <div aria-hidden="true" className="wedge-br pointer-events-none absolute -right-10 bottom-0 h-64 w-64 bg-wedge" />
      <div className="relative mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-accent">M</span>
            <span className="font-display text-xl font-semibold text-ink">Manu Sharan Kumar</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-body">
            Computer engineering student in Kathmandu. Learn, build, impact.
          </p>
          <ul className="mt-5 flex gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-body transition duration-200 hover:border-brand-ink hover:text-brand-ink"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-4 !font-mono">Pages</h2>
          <ul className="space-y-2.5 text-sm">
            {pages.map(p => (
              <li key={p.to}>
                <Link to={p.to} className="text-body transition duration-200 hover:text-brand-ink">{p.label}</Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-terminal'))}
                className="font-mono text-body transition duration-200 hover:text-brand-ink"
              >
                &gt;_ terminal
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4">Elsewhere</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={`${profile.github}/manu-portfolio-aws`} target="_blank" rel="noreferrer" className="text-body transition duration-200 hover:text-brand-ink">
                Source on GitHub
              </a>
            </li>
            <li>
              <Link to="/aws" className="text-body transition duration-200 hover:text-brand-ink">Hosted on AWS Amplify</Link>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="break-all text-body transition duration-200 hover:text-brand-ink">{profile.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Manu Sharan Kumar · Kathmandu, Nepal
      </div>
    </footer>
  )
}
