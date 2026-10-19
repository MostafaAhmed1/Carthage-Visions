import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckIcon, WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'
import { absolute, paths } from '../../lib/paths'
import shop from '../../config/shop'

/** One tier. The recommended tier gets a brass hairline, nothing louder. */
export default function PackageCard({ pkg, index = 0 }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const name = pkg.name[lang]
  const url = absolute(`${paths.packages}#${pkg.slug}`, shop.siteUrl)

  const message =
    lang === 'ar'
      ? `أرغب بمعرفة المزيد عن باقة: ${name}\n${url}`
      : `I'd like to know more about the package: ${name}\n${url}`

  const href = buildWhatsAppLink({ rawText: message, lang, page: t('wa.pages.packages') })

  const rows = [
    { label: t('catalog.packages.cameras'), value: String(pkg.cameras) },
    { label: t('catalog.packages.storage'), value: pkg.storage[lang] },
    { label: t('catalog.packages.installation'), value: pkg.installation[lang] },
    { label: t('catalog.packages.warranty'), value: pkg.warranty[lang] },
  ]

  return (
    <motion.article
      id={pkg.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full scroll-mt-header flex-col rounded-card border bg-ivory p-6 md:p-7 ${
        pkg.recommended ? 'border-brass/60 shadow-[0_24px_60px_-48px_rgb(20_17_14_/_0.6)]' : 'border-ink/10'
      }`}
    >
      {pkg.recommended ? (
        <span className="absolute -top-3 start-6 rounded-full bg-brass px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ink">
          {t('catalog.packages.recommended')}
        </span>
      ) : null}

      <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-brass-deep">{pkg.kicker[lang]}</p>
      <h2 className="mt-3 text-display-sm">{name}</h2>
      <p className="mt-3 text-[0.875rem] leading-relaxed text-ink/60">{pkg.summary[lang]}</p>

      <div className="mt-6 flex items-baseline gap-2 border-t border-ink/10 pt-5">
        <span className="font-display text-[2rem] leading-none text-ink">
          {t('common.from', { price: pkg.priceFrom })}
        </span>
      </div>
      <p className="mt-2 text-[0.6875rem] text-ink/60">{t('catalog.packages.note')}</p>

      <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="text-[0.75rem] text-ink/60">{row.label}</dt>
            <dd className="text-end text-[0.8125rem] font-medium text-ink/85">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex-1">
        <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
          {t('catalog.packages.includes')}
        </p>
        <ul className="mt-3 space-y-2.5">
          {pkg.includes.map((item) => (
            <li
              key={item[lang]}
              className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink/75"
            >
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-deep" />
              {item[lang]}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { source: `package_${pkg.slug}`, context: name, lang })}
        className={`mt-7 inline-flex min-h-[3rem] w-full items-center justify-center gap-2.5 rounded-full text-[0.875rem] font-medium transition-colors ${
          pkg.recommended
            ? 'bg-green text-ivory hover:bg-green/90'
            : 'border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.03]'
        }`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {t('catalog.packages.cta')}
      </a>
    </motion.article>
  )
}
