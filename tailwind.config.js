/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--c-ink-3) / <alpha-value>)',
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',
        'sand-deep': 'rgb(var(--c-sand-deep) / <alpha-value>)',
        brass: 'rgb(var(--c-brass) / <alpha-value>)',
        'brass-soft': 'rgb(var(--c-brass-soft) / <alpha-value>)',
        'brass-deep': 'rgb(var(--c-brass-deep) / <alpha-value>)',
        green: 'rgb(var(--c-green) / <alpha-value>)',
        terracotta: 'rgb(var(--c-terracotta) / <alpha-value>)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        arabic: 'var(--font-arabic-body)',
        naskh: 'var(--font-arabic-display)',
      },
      fontSize: {
        // Fluid type scale — one step per intent, no in-between noise.
        'display-xl': ['clamp(2.75rem, 6.2vw, 5.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 4.25rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.875rem, 3.2vw, 2.9rem)', { lineHeight: '1.14', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 2.3vw, 2rem)', { lineHeight: '1.2' }],
        lede: ['clamp(1.0625rem, 1.35vw, 1.25rem)', { lineHeight: '1.75' }],
        body: ['1rem', { lineHeight: '1.75' }],
        small: ['0.875rem', { lineHeight: '1.65' }],
        micro: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.16em' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8.5rem)',
        gutter: 'clamp(1.25rem, 5vw, 4.5rem)',
      },
      maxWidth: {
        shell: '78rem',
        prose: '38rem',
        reading: '46rem',
      },
      borderRadius: {
        arch: '999px 999px 0 0',
        card: '1.25rem',
      },
      boxShadow: {
        lift: '0 30px 80px -40px rgb(18 15 12 / 0.45)',
        ring: '0 0 0 1px rgb(18 15 12 / 0.08)',
      },
      transitionTimingFunction: {
        calm: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        marqueeRtl: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(50%,0,0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(-2%, -1%, 0) scale(1.08) rotate(0deg)' },
          '100%': { transform: 'translate3d(2%, 1%, 0) scale(1.12) rotate(1.5deg)' },
        },
        haze: {
          '0%, 100%': { opacity: '0.35', transform: 'translate3d(0,0,0)' },
          '50%': { opacity: '0.65', transform: 'translate3d(0,-2%,0)' },
        },
        scan: {
          '0%': { transform: 'translate3d(-130%, 0, 0)', opacity: '0' },
          '14%': { opacity: '0.7' },
          '86%': { opacity: '0.7' },
          '100%': { transform: 'translate3d(330%, 0, 0)', opacity: '0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.45' },
          '70%': { transform: 'scale(1.55)', opacity: '0' },
          '100%': { transform: 'scale(1.55)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 46s) linear infinite',
        'marquee-rtl': 'marqueeRtl var(--marquee-duration, 46s) linear infinite',
        drift: 'drift 68s ease-in-out infinite alternate',
        haze: 'haze 18s ease-in-out infinite',
        scan: 'scan 11s ease-in-out infinite',
        'pulse-ring': 'pulseRing 3.4s ease-out infinite',
        float: 'float 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
