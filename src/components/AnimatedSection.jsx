import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Content must never stay hidden. Sections reveal as they scroll into view, but they show
// immediately for reduced-motion visitors, and for anything that loads the page without
// scrolling (screenshots, previews, crawlers) once this delay has passed.
const UNSCROLLED_REVEAL_MS = 2500

export default function AnimatedSection({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true, rootMargin: '0px 0px 120px 0px' })
  const [revealAnyway, setRevealAnyway] = useState(false)

  useEffect(() => {
    let scrolled = false
    const onScroll = () => { scrolled = true }
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    const timer = setTimeout(() => { if (!scrolled) setRevealAnyway(true) }, UNSCROLLED_REVEAL_MS)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const visible = reduceMotion || inView || revealAnyway

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
