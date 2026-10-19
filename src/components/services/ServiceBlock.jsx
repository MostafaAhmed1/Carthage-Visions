import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowIcon, WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/** One service: number, name, a single benefit line, a short paragraph, one CTA. */
export default function ServiceBlock({ service, index = 0 }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const name = service.name[lang]

  const href = buildWhatsAppLink({
    context: `${name} — ${t('wa.contexts.consultation')}`,
    lang,
    page: t('wa.pages.services'),
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.2), ease: [0.22, 1, 0.36, 1] }}
      className="group grid gap-5 border-b border-ink/10 py-9 md:grid-cols-12 md:gap-8 md:py-11"
    >
      <div className="md:col-span-1">
        <span className="font-display text-[1.75rem] leading-none text-brass/70" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="md:col-span-4">
        <h2 className="font-body text-[1.125rem] font-medium leading-snug text-ink">{name}</h2>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-brass-deep">{service.benefit[lang]}</p>
      </div>

      <div className="md:col-span-5">
        <p className="max-w-reading text-[0.9375rem] leading-relaxed text-ink/65">{service.body[lang]}</p>
      </div>

      <div className="flex items-start gap-4 md:col-span-2 md:justify-end">
        {service.link ? (
          <Link
            to={service.link}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/70 transition-colors hover:text-ink"
          >
            {t('services.ask')}
            <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </Link>
        ) : null}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { source: `service_${service.slug}`, context: name, lang })}
          aria-label={`${service.cta[lang]} — ${t('common.whatsapp')}`}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-green transition-opacity hover:opacity-80"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          {service.cta[lang]}
        </a>
      </div>
    </motion.article>
  )
}
