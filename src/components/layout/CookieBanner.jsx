import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { readConsent, saveConsent } from '../../lib/consent'
import { paths } from '../../lib/paths'

/**
 * A single, quiet consent row. No modal, no dark pattern: both choices are
 * equally sized, and declining is remembered just as clearly as accepting.
 */
export default function CookieBanner() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Wait a beat so the banner never competes with the page transition.
    const timer = window.setTimeout(() => setVisible(readConsent() === null), 900)
    return () => window.clearTimeout(timer)
  }, [])

  const choose = (value) => {
    saveConsent(value)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-ink/10 bg-ivory/97 backdrop-blur-md"
          role="region"
          aria-label={t('cookies.title')}
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="max-w-2xl">
              <p className="text-[0.8125rem] font-medium text-ink">{t('cookies.title')}</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink/60">
                {t('cookies.body')}{' '}
                <Link to={paths.privacy} className="link-underline text-ink/75">
                  {t('cookies.learnMore')}
                </Link>
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              <button
                type="button"
                onClick={() => choose('declined')}
                className="min-h-[2.75rem] rounded-full border border-ink/20 px-5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink/40"
              >
                {t('cookies.decline')}
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="min-h-[2.75rem] rounded-full bg-ink px-5 text-[0.8125rem] font-medium text-ivory transition-colors hover:bg-ink-2"
              >
                {t('cookies.accept')}
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
