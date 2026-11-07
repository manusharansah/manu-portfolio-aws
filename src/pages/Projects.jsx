import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import ProjectLinks from '../components/ProjectLinks'
import { projects } from '../data'

const AREAS = ['All', ...new Set(projects.map(p => p.area))]

export default function Projects() {
  const [area, setArea] = useState('All')
  const shown = area === 'All' ? projects : projects.filter(p => p.area === area)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative overflow-hidden px-6 pb-8 pt-32 sm:pt-40">
        <div aria-hidden="true" className="wedge-tl pointer-events-none absolute -left-20 top-0 h-[26rem] w-[26rem] bg-wedge/80" />
        <div className="relative mx-auto max-w-5xl">
          <AnimatedSection>
            <p className="eyebrow mb-3">Work</p>
            <h1 className="font-display text-5xl font-bold leading-tight">Projects</h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-body">
              A selection of things I have built, from ML services to hackathon systems.
            </p>
          </AnimatedSection>

          <div role="group" aria-label="Filter projects by area" className="mt-8 flex flex-wrap gap-2">
            {AREAS.map(a => (
              <button
                key={a}
                type="button"
                onClick={() => setArea(a)}
                aria-pressed={area === a}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                  area === a
                    ? 'border-transparent bg-btn text-btn-text shadow-soft'
                    : 'border-line bg-surface text-body hover:border-brand-ink hover:text-brand-ink'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 pt-6">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {shown.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="panel flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div aria-hidden="true" className="h-1.5 w-full bg-brand" />
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-wedge px-3 py-1 text-xs font-semibold text-brand-ink">{p.area}</span>
                </div>
                <p className="eyebrow mt-4">{p.tag}</p>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map(t => <li key={t} className="chip">{t}</li>)}
                </ul>
                <div className="mt-5 border-t border-line pt-4"><ProjectLinks project={p} /></div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
