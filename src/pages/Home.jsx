import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCpu, FiGithub, FiLinkedin, FiServer, FiShield } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import ProjectLinks from '../components/ProjectLinks'
import { profile, skills, projects } from '../data'

// Brand icons come from Simple Icons. A null slug means no brand icon exists, so a monogram is shown.
const ICON_SLUGS = {
  'Python': 'python', 'C': 'c', 'C++': 'cplusplus', 'JavaScript': 'javascript',
  'FastAPI': 'fastapi', 'Django': 'django',
  'scikit-learn': 'scikitlearn', 'TensorFlow': 'tensorflow', 'Pandas': 'pandas', 'NumPy': 'numpy',
  'MySQL': 'mysql', 'MongoDB': 'mongodb',
  'Docker': 'docker', 'Git': 'git', 'GitHub': 'github',
  'React': 'react', 'Streamlit': 'streamlit',
}

const focus = [
  {
    icon: FiServer,
    title: 'Backend systems',
    text: 'Designing reliable APIs and services with clean structure, sensible data models and containerised deployment.',
  },
  {
    icon: FiCpu,
    title: 'Machine learning',
    text: 'Turning raw data into working models: cleaning, exploration, feature engineering, evaluation and serving.',
  },
  {
    icon: FiShield,
    title: 'Secure, verifiable systems',
    text: 'Building software people can trust, with authentication, integrity checks and designs that resist tampering.',
  },
]

const SPOTLIGHT = [2, 5, 6]

function SkillBubble({ name }) {
  const slug = ICON_SLUGS[name] ?? null
  return (
    <li className="flex w-20 flex-col items-center gap-2 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-white shadow-soft">
        {slug ? (
          <img
            src={`https://cdn.simpleicons.org/${slug}`}
            alt=""
            className="h-8 w-8 object-contain"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <span aria-hidden="true" className="font-display text-sm font-bold text-navy">{name.slice(0, 2).toUpperCase()}</span>
        )}
      </span>
      <span className="text-xs font-medium leading-tight text-body">{name}</span>
    </li>
  )
}

const stats = [
  { value: '#1', label: 'IOE entrance, nationwide' },
  { value: '4.00', label: 'GPA, semester I' },
  { value: String(projects.length), label: 'projects built' },
  { value: '2', label: 'educational books authored' },
]

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[21.6rem] lg:max-w-[25.2rem]">
      <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] bg-brand" />
      <div aria-hidden="true" className="wedge-tl absolute -left-6 -top-6 h-28 w-28 bg-navy dark:bg-wedge" />
      <div className="relative overflow-hidden rounded-[2rem] border-4 border-surface bg-surface shadow-lift">
        <img
          src="/profile.jpg"
          width="576"
          height="576"
          alt="Portrait of Manu Sharan Kumar in a grey suit, outdoors"
          fetchpriority="high"
          className="aspect-[4/5] w-full object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent px-6 pb-5 pt-14 text-white">
          <p className="font-display text-lg font-semibold !text-white">Manu Sharan Kumar</p>
          <p className="text-sm text-white/85">B.E. Computer Engineering, ACEM</p>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const spotlight = SPOTLIGHT.map(id => projects.find(p => p.id === id)).filter(Boolean)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-40">
        <div aria-hidden="true" className="wedge-tl pointer-events-none absolute -left-20 top-0 h-[34rem] w-[34rem] bg-wedge/80" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
              Manu Sharan <span className="text-brand-ink">Kumar</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
              I build backend systems and machine learning tools that solve real problems, from containerised ML
              APIs to blockchain-verified certificates. IOE entrance topper, 2080.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className="btn">View projects <FiArrowRight aria-hidden="true" /></Link>
              <Link to="/contact" className="btn-ghost">Get in touch</Link>
            </div>
            <div className="mt-9 flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-body transition duration-200 hover:border-brand-ink hover:text-brand-ink">
                <FiGithub size={19} aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-body transition duration-200 hover:border-brand-ink hover:text-brand-ink">
                <FiLinkedin size={19} aria-hidden="true" />
              </a>
              <span className="ml-2 text-sm text-muted">Open to research, internships and open source</span>
            </div>
          </div>
          <Portrait />
        </div>
      </section>

      {/* STATS */}
      <section aria-label="At a glance" className="px-6">
        <dl className="panel mx-auto grid max-w-5xl grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {stats.map((st, i) => (
            <div key={st.label} className={`px-6 py-6 text-center ${i > 1 ? 'border-t border-line md:border-t-0' : ''} ${i % 2 ? 'border-l border-line md:border-l-0' : ''}`}>
              <dd className="font-display text-3xl font-bold text-brand-ink">{st.value}</dd>
              <dt className="mt-1 text-sm text-body">{st.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* FOCUS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="max-w-xl">
            <h2 className="section-title">Three things I care about building well</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {focus.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.08} className="h-full">
                <article className="panel h-full p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-wedge text-brand-ink">
                    <f.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-xl font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{f.text}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <h2 className="section-title mb-6">Engineer first, curious about everything</h2>
            <div className="space-y-4 text-lg leading-relaxed text-body">
              <p>
                I&apos;m a Computer Engineering undergraduate at ACEM, Tribhuvan University. I ranked{' '}
                <strong className="font-semibold text-ink">1st nationwide</strong> in the IOE entrance examination.
                With a strong academic record, I have hands-on experience in backend systems, ML pipelines and
                hackathon-grade projects, and I build systems that bridge theory and real-world impact.
              </p>
              <p>
                My work spans deploying containerised ML APIs with FastAPI and Docker, building blockchain-based
                systems that tackle certificate fraud, and creating a voice-enabled e-governance assistant that gives
                instant guidance on passport services in Nepali and English.
              </p>
              <p>
                Beyond code, I have authored two educational books for underserved students and facilitate
                national-level IT quiz events. I believe engineers are among the greatest levers for change, and I
                intend to be one of them.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <figure className="mt-10 rounded-3xl bg-navy p-7 text-white">
              <blockquote className="font-display text-xl leading-snug">&ldquo;{profile.philosophy}&rdquo;</blockquote>
            </figure>
          </AnimatedSection>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="max-w-xl">
            <h2 className="section-title">Skills and tools</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {skills.map((s, i) => (
              <AnimatedSection key={s.category} delay={i * 0.05}>
                <h3 className="mb-5 border-b border-line pb-3 font-display text-lg font-semibold">{s.category}</h3>
                <ul className="flex flex-wrap gap-5">
                  {s.items.map(item => <SkillBubble key={item} name={item} />)}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT PROJECTS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="max-w-xl">
            <h2 className="section-title">Projects worth a closer look</h2>
          </AnimatedSection>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {spotlight.map((p, i) => (
              <AnimatedSection key={p.id}>
                <article className="grid gap-4 py-10 md:grid-cols-[6rem_1fr_auto] md:gap-8">
                  <p aria-hidden="true" data-n={`0${i + 1}`} className="ghost-num text-6xl" />
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-snug sm:text-3xl">{p.title}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-body">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map(t => <li key={t} className="chip">{t}</li>)}
                    </ul>
                  </div>
                  <div className="md:self-end"><ProjectLinks project={p} /></div>
                </article>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/projects" className="btn">See all {projects.length} projects <FiArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="px-6 pt-8">
        <AnimatedSection>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-navy px-8 py-14 text-center sm:px-14">
            <div aria-hidden="true" className="wedge-tl absolute -left-6 -top-6 h-40 w-40 bg-white/5" />
            <div aria-hidden="true" className="wedge-br absolute -bottom-6 -right-6 h-48 w-48 bg-white/5" />
            <h2 className="relative mt-4 font-display text-3xl font-semibold !text-white sm:text-4xl">Let&apos;s build something together</h2>
            <Link to="/contact" className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-navy transition duration-200 hover:-translate-y-0.5">
              Get in touch <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </motion.div>
  )
}
