import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { applyLang, SUPPORTED } from '../../i18n'

const LABELS = { ar: 'العربية', en: 'English' }

export default function LanguageSwitch({ tone = 'light', className = '' }) {
  const { i18n, t } = useTranslation()
  const current = i18n.language === 'en' ? 'en' : 'ar'
  const dark = tone === 'dark'

  const change = (lang) => {
    if (lang === current) return
    applyLang(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full p-1 ${
        dark ? 'bg-ivory/[0.06]' : 'bg-ink/[0.04]'
      } ${className}`}
      role="group"
      aria-label={t('a11y.languageSwitch')}
    >
      {SUPPORTED.map((lang) => {
        const active = lang === current
        return (
          <button
            key={lang}
            type="button"
            lang={lang}
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            onClick={() => change(lang)}
            aria-pressed={active}
            className={`relative rounded-full px-3 py-1.5 text-[0.75rem] font-medium transition-colors duration-300 ${
              active
                ? dark
                  ? 'text-ink'
                  : 'text-ivory'
                : dark
                  ? 'text-ivory/60 hover:text-ivory'
                  : 'text-ink/55 hover:text-ink'
            }`}
          >
            {active ? (
              <motion.span
                layoutId={`lang-pill-${tone}`}
                className={`absolute inset-0 rounded-full ${dark ? 'bg-ivory' : 'bg-ink'}`}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
            <span className="relative">{LABELS[lang]}</span>
          </button>
        )
      })}
    </div>
  )
}
