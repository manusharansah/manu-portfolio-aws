/** @type {import('tailwindcss').Config} */
const token = name => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        ink: token('ink'),
        body: token('body'),
        muted: token('muted'),
        line: token('line'),
        brand: token('brand'),
        'brand-ink': token('brand-ink'),
        wedge: token('wedge'),
        btn: token('btn'),
        'btn-text': token('btn-text'),
        // Fixed colours, used by the terminal window, which stays dark in every theme.
        accent: '#FF9900',
        navy: '#232F3E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgb(var(--shadow) / 0.25)',
        lift: '0 24px 50px -20px rgb(var(--shadow) / 0.35)',
      },
    },
  },
  plugins: [],
}
