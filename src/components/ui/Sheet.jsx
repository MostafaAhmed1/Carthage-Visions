import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon } from './Icons'
import { setScrollLocked } from '../../hooks/useLenis'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Calm bottom sheet on mobile, centred dialog on desktop.
 * Focus-trapped, ESC to close, backdrop click to close, restores focus on close.
 */
export default function Sheet({ open, onClose, title, eyebrow, children, closeLabel = 'Close', maxWidth = '34rem' }) {
  const panelRef = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    lastFocused.current = document.activeElement
    setScrollLocked(true)

    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector(FOCUSABLE)
      first?.focus()
    }, 60)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (n) => n.offsetParent !== null,
      )
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKeyDown)
      setScrollLocked(false)
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center" role="presentation">
          <motion.button
            type="button"
            aria-label={closeLabel}
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            className="relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-ivory text-ink shadow-[0_-20px_80px_-30px_rgb(20_17_14_/_0.6)] md:max-h-[88vh] md:rounded-card md:shadow-lift"
            style={{ maxWidth }}
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Grab handle, mobile only */}
            <div className="flex justify-center pt-3 md:hidden" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-ink/15" />
            </div>

            <div className="flex items-start justify-between gap-6 px-6 pb-2 pt-5 md:px-8 md:pt-8">
              <div>
                {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
                <h2 id="sheet-title" className="text-display-sm">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 md:px-8 md:pb-8">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
