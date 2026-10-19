import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronIcon } from '../ui/Icons'
import { moreNav } from '../../config/nav'

/**
 * The desktop overflow menu ("More").
 * Keeps the header to five visible links so it never crowds in Arabic, while
 * everything else stays one click away. Closes on route change, Escape,
 * an outside click, or when focus leaves the panel.
 */
export default function MoreMenu({ transparent = false }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  const triggerClass = `flex items-center gap-1.5 text-[0.8125rem] font-medium transition-colors duration-300 ${
    transparent ? 'text-ivory/80 hover:text-ivory' : 'text-ink/70 hover:text-ink'
  }`

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="more-menu"
        onClick={() => setOpen((value) => !value)}
        className={triggerClass}
      >
        {t('nav.more')}
        <ChevronIcon
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="more-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute end-0 top-[calc(100%+1rem)] w-56 overflow-hidden rounded-2xl border border-ink/10 bg-ivory p-2 shadow-lift"
          >
            {moreNav.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3.5 py-2.5 text-[0.8125rem] transition-colors ${
                    isActive ? 'bg-sand/60 text-ink' : 'text-ink/70 hover:bg-sand/40 hover:text-ink'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
