import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCpu, FiGithub, FiLinkedin, FiServer, FiShield, FiCloud } from 'react-icons/fi'
import AnimatedSection from '../components/AnimatedSection'
import ProjectCover from '../components/ProjectCover'
import ProjectLinks from '../components/ProjectLinks'
import { profile, skills, currently, projects } from '../data'

// Brand icons come from Simple Icons. A null slug means no brand icon exists, so a monogram is shown.
const ICON_SLUGS = {
  'Python': 'python', 'C': 'c', 'C++': 'cplusplus', 'JavaScript': 'javascript',
  'FastAPI': 'fastapi', 'Django': 'django', 'REST APIs': null,
  'scikit-learn': 'scikitlearn', 'TensorFlow': 'tensorflow', 'Pandas': 'pandas', 'NumPy': 'numpy',
  'MySQL': 'mysql', 'MongoDB': 'mongodb',
  'Docker': 'docker', 'Git': 'git', 'AWS Amplify': null, 'GitHub': 'github',
  'React': 'react', 'Streamlit': 'streamlit',
}

const focus = [
  {
    icon: FiServer,
    title: 'Backend systems',
    text: 'FastAPI and Django services, clean REST APIs and containerised deployments with Docker.',
  },
  {
    icon: FiCpu,
    title: 'Machine learning',
    text: 'scikit-learn pipelines from data cleaning and EDA to evaluation, served as working APIs.',
  },
  {
    icon: FiShield,
    title: 'Trust and verification',
    text: 'VidyaChain: blockchain-backed certificates with QR verification, built to fight certificate fraud.',
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

function HeroArt() {
  const card = 'panel absolute flex items-center gap-3 px-4 py-3'
  return (
    <div className="relative mx-auto hidden h-[30rem] w-full max-w-md lg:block" aria-hidden="true">
      <div className="wedge-tl absolute -right-10 -top-6 h-72 w-72 bg-wedge" />
      <div className="wedge-br absolute -bottom-6 -left-6 h-64 w-64 bg-wedge/70" />
      <svg viewBox="0 0 400 480" className="absolute inset-0 h-full w-full">
        <circle cx="200" cy="230" r="150" fill="none" stroke="rgb(var(--brand))" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="200" cy="230" r="108" fill="none" stroke="rgb(var(--brand))" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>
      <div className="absolute left-1/2 top-[44%] flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-navy to-[#0a6a75] shadow-lift">
        <span className="font-display text-6xl font-bold tracking-tight text-white">MK</span>
      </div>
      <div className={`${card} drift left-0 top-6`}>
        <span className="font-display text-2xl font-bold text-brand-ink">#1</span>
        <span className="text-xs leading-tight text-body">IOE entrance<br />nationwide</span>
      </div>
      <div className={`${card} drift-slow right-0 top-24`}>
        <span className="font-display text-2xl font-bold text-brand-ink">4.00</span>
        <span className="text-xs leading-tight text-body">GPA,<br />semester I</span>
      </div>
      <div className={`${card} drift bottom-24 left-2`}>
        <span className="font-display text-2xl font-bold text-brand-ink">{projects.length}</span>
        <span className="text-xs leading-tight text-body">projects<br />built</span>
      </div>
      <div className={`${card} drift-slow bottom-8 right-2`}>
        <FiCloud size={20} className="text-brand-ink" />
        <span className="font-mono text-xs text-body">ap-southeast-2</span>
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
            <p className="eyebrow mb-5">Computer engineer · Kathmandu, Nepal</p>
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
          <HeroArt />
        </div>
      </section>

      {/* FOCUS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="max-w-xl">
            <p className="eyebrow mb-3">What I do</p>
            <h2 className="section-title">Three things I care about building well</h2>
          </AnimatedSection>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {focus.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.08} className="h-full">
                <article className="panel relative h-full overflow-hidden p-7">
                  <span aria-hidden="true" data-n={`0${i + 1}`} className="ghost-num absolute -right-2 -top-4 text-8xl" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-wedge text-brand-ink">
                    <f.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 font-display text-xl font-semibold">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-body">{f.text}</p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.3fr_1fr]">
          <AnimatedSection>
            <p className="eyebrow mb-3">About</p>
            <h2 className="section-title mb-6">Engineer first, curious about everything</h2>
            <div className="space-y-4 leading-relaxed text-body">
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

          <AnimatedSection delay={0.15} className="space-y-5">
            <div className="panel p-7">
              <h3 className="eyebrow mb-5 !font-mono">Currently exploring</h3>
              <ul className="space-y-3">
                {currently.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-body">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="rounded-3xl bg-navy p-7 text-white">
              <blockquote className="font-display text-lg leading-snug">&ldquo;{profile.philosophy}&rdquo;</blockquote>
            </figure>
          </AnimatedSection>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="max-w-xl">
            <p className="eyebrow mb-3">Tech superpowers</p>
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
            <p className="eyebrow mb-3">Selected work</p>
            <h2 className="section-title">Projects worth a closer look</h2>
          </AnimatedSection>
          <div className="mt-14 space-y-20">
            {spotlight.map((p, i) => (
              <AnimatedSection key={p.id}>
                <article className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
                  <ProjectCover id={p.id} className="aspect-[4/3] w-full shadow-lift" />
                  <div>
                    <p aria-hidden="true" data-n={`0${i + 1}`} className="ghost-num text-6xl" />
                    <p className="eyebrow mt-1">{p.tag}</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">{p.title}</h3>
                    <p className="mt-3 leading-relaxed text-body">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.tech.map(t => <li key={t} className="chip">{t}</li>)}
                    </ul>
                    <div className="mt-6"><ProjectLinks project={p} /></div>
                  </div>
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
            <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-accent">Open to opportunities</p>
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
