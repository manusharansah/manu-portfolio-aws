import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden px-6 pb-16 pt-32">
        <div aria-hidden="true" className="wedge-tl pointer-events-none absolute -left-16 top-0 h-96 w-96 bg-wedge/80" />
        <div aria-hidden="true" className="wedge-br pointer-events-none absolute -right-16 bottom-0 h-96 w-96 bg-wedge/80" />
        <div className="relative mx-auto max-w-xl text-center">
          <p className="font-display text-8xl font-bold text-brand-ink">404</p>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Nothing lives at this address</h1>
          <p className="mt-4 leading-relaxed text-body">
            The page you were after does not exist, or it moved. Head back to the portfolio, or open the terminal and
            type <code className="font-mono text-brand-ink">help</code> to find your way.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn">Back to home <FiArrowRight aria-hidden="true" /></Link>
            <Link to="/projects" className="btn-ghost">See projects</Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
