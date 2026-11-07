import { FiExternalLink, FiGithub } from 'react-icons/fi'

const linkClass =
  'inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink underline-offset-4 transition duration-200 hover:underline'

// Public repositories link to the code; a private project links to its live site instead.
export default function ProjectLinks({ project }) {
  const { github, demo, title } = project
  if (!github && !demo) return null
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {github && (
        <a href={github} target="_blank" rel="noreferrer" aria-label={`View code for ${title} on GitHub`} className={linkClass}>
          <FiGithub size={15} aria-hidden="true" /> View code
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" aria-label={`Open the live demo of ${title} (opens in a new tab)`} className={linkClass}>
          <FiExternalLink size={15} aria-hidden="true" /> Live demo
        </a>
      )}
    </div>
  )
}
