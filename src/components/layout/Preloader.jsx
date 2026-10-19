import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import shop from '../../config/shop'
import { brandName } from '../../i18n'

/**
 * Short brand reveal (<1.2s), first visit of the session only.
 * Skipped entirely for prefers-reduced-motion.
 */
export default function Preloader() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let seen = false
    try {
      seen = sessionStorage.getItem('cv.seen') === '1'
    } catch {
      seen = true
    }
    return !reduced && !seen
  })

  useEffect(() => {
    if (!visible) return undefined
    const hide = window.setTimeout(() => {
      setVisible(false)
      try {
        sessionStorage.setItem('cv.seen', '1')
      } catch {
        /* ignore */
      }
    }, 1000)
    return () => window.clearTimeout(hide)
  }, [visible])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] grid place-items-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <motion.svg
              viewBox="0 0 48 48"
              className="h-14 w-14"
              fill="none"
              initial="hidden"
              animate="show"
            >
              <motion.path
                d="M24 6c8 0 13.5 6.2 13.5 14.8V42H10.5V20.8C10.5 12.2 16 6 24 6Z"
                stroke="rgb(201 168 106)"
                strokeWidth="1.1"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1 } }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.circle
                cx="24"
                cy="24"
                r="5"
                stroke="rgb(201 168 106)"
                strokeWidth="1"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
            </motion.svg>

            <motion.span
              className="mt-5 font-display text-[1.5rem] text-ivory"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {brandName(lang)}
            </motion.span>

            <motion.span
              className="mt-3 block h-px bg-brass/60"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="sr-only">{shop.brand.tagline[lang]}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
