import { FiBarChart2, FiShield, FiMic, FiTrendingUp, FiMap, FiFileText, FiCalendar, FiCheckSquare } from 'react-icons/fi'

// One generated cover per project, so every card has its own visual without needing screenshots.
const COVERS = {
  1: { icon: FiBarChart2, from: '#0a6a75', to: '#12a3b0' },
  2: { icon: FiShield, from: '#06304b', to: '#0a6a75' },
  3: { icon: FiMic, from: '#0b5d8a', to: '#3aa7d9' },
  4: { icon: FiTrendingUp, from: '#0e7c86', to: '#5fd0d8' },
  5: { icon: FiMap, from: '#06304b', to: '#12a3b0' },
  6: { icon: FiFileText, from: '#0a6a75', to: '#3aa7d9' },
  7: { icon: FiCalendar, from: '#0b4f73', to: '#12a3b0' },
  8: { icon: FiCheckSquare, from: '#0e7c86', to: '#2cc4d1' },
}

export default function ProjectCover({ id, className = '' }) {
  const { icon: Icon, from, to } = COVERS[id] ?? COVERS[1]
  const gid = `cover-${id}`
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gid})`} />
        <polygon points="0,0 210,0 0,210" fill="#fff" opacity="0.10" />
        <polygon points="400,300 400,120 220,300" fill="#fff" opacity="0.12" />
        <circle cx="318" cy="70" r="64" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="318" cy="70" r="38" fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />
        <circle cx="60" cy="250" r="30" fill="#fff" opacity="0.10" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/90 text-navy shadow-lift">
          <Icon size={40} />
        </span>
      </div>
    </div>
  )
}
