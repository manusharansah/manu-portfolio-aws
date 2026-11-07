import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import { profile } from '../data'

const contactLinks = [
  { icon: FiMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'manusharansah', href: profile.linkedin },
  { icon: FiGithub, label: 'GitHub', value: 'manusharansah', href: profile.github },
]

const fieldClass =
  'w-full rounded-2xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder-muted transition duration-200 focus:border-brand-ink focus:outline-none focus:ring-2 focus:ring-brand/30'

const labelClass = 'mb-2 block text-sm font-medium text-ink'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [opened, setOpened] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  // This site is static, so the form hands the message to the visitor's own email app.
  const handleSubmit = e => {
    e.preventDefault()
    const subject = form.subject || `Hello from ${form.name}`
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href =
      `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative overflow-hidden px-6 pb-8 pt-32 sm:pt-40">
        <div aria-hidden="true" className="wedge-tl pointer-events-none absolute -left-20 top-0 h-[26rem] w-[26rem] bg-wedge/80" />
        <div className="relative mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <AnimatedSection>
            <h1 className="font-display text-5xl font-bold leading-tight">Let&apos;s connect</h1>
            <p className="mt-4 text-lg leading-relaxed text-body">
              Open to research collaborations, internship opportunities and open source projects. Drop a message.
            </p>
            <ul className="mt-8 space-y-3">
              {contactLinks.map(c => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="panel flex items-center gap-4 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand-ink"
                  >
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-wedge text-brand-ink">
                      <c.icon size={20} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-ink">{c.label}</span>
                      <span className="block break-all text-sm text-body">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <form onSubmit={handleSubmit} className="panel space-y-5 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Name <span className="text-brand-ink" aria-hidden="true">*</span></label>
                  <input id="name" type="text" name="name" required autoComplete="name" value={form.name} onChange={handleChange} placeholder="Your name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email <span className="text-brand-ink" aria-hidden="true">*</span></label>
                  <input id="email" type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className={labelClass}>Subject</label>
                <input id="subject" type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>Message <span className="text-brand-ink" aria-hidden="true">*</span></label>
                <textarea id="message" name="message" required rows={7} value={form.message} onChange={handleChange} placeholder="Tell me about the opportunity, collaboration, or just say hi..." className={`${fieldClass} resize-none`} />
              </div>
              <button type="submit" className="btn w-full !py-3.5 text-base">
                <FiSend size={18} aria-hidden="true" /> Open in my email app
              </button>
              <p className="text-sm text-muted" role="status">
                {opened
                  ? `If nothing opened, write to ${profile.email} directly.`
                  : 'This sends nothing by itself: it opens your email app with the message ready to send.'}
              </p>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  )
}
