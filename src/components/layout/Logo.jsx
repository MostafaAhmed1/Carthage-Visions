import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import shop from '../../config/shop'

/**
 * Typographic lockup: a small carved-arch mark + the brand name.
 * Drop a file at /public/logo.svg and set brand.logoImage in shop.js to swap it.
 */
export default function Logo({ tone = 'light', className = '', compact = false }) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const name = shop.brand.name[lang] ?? shop.brand.name.ar
  const dark = tone === 'dark'

  return (
    <Link
      to="/"
      aria-label={t('header.logoAlt', { name })}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      {shop.brand.logoImage ? (
        <img
          src={shop.brand.logoImage}
          alt={name}
          className="h-10 w-auto"
          width="160"
          height="40"
        />
      ) : (
        <>
          <span
            className={`grid h-10 w-10 place-items-center rounded-[0.7rem] border ${
              dark ? 'border-ivory/20' : 'border-ink/15'
            }`}
          >
            <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
              <path
                d="M16 4.5c5 0 8.6 3.9 8.6 9.3V27H7.4V13.8C7.4 8.4 11 4.5 16 4.5Z"
                stroke={dark ? '#c9a86a' : '#6a4e25'}
                strokeWidth="1.2"
              />
              <circle cx="16" cy="15.6" r="3.4" stroke={dark ? '#c9a86a' : '#6a4e25'} strokeWidth="1" />
              <circle cx="16" cy="15.6" r="1.2" fill={dark ? '#c9a86a' : '#6a4e25'} />
            </svg>
          </span>

          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-[1.35rem] leading-[1.1] tracking-tight ${
                dark ? 'text-ivory' : 'text-ink'
              } ${lang === 'ar' ? 'text-[1.5rem]' : ''}`}
            >
              {name}
            </span>
            {!compact ? (
              <span
                className={`mt-1 font-body text-[0.5625rem] uppercase tracking-[0.22em] ${
                  dark ? 'text-ivory/55' : 'text-ink/55'
                }`}
              >
                {lang === 'ar' ? 'أنظمة مراقبة · عُمان' : 'Security systems · Oman'}
              </span>
            ) : null}
          </span>
        </>
      )}
    </Link>
  )
}
