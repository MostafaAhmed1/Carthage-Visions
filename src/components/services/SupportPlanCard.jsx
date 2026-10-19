import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckIcon, WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/** A support plan. Response times come from data and are flagged as provisional. */
export default function SupportPlanCard({ plan, index = 0 }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const name = plan.name[lang]

  const href = buildWhatsAppLink({
    context: `${t('support.plansTitle')} — ${name}`,
    lang,
    page: t('wa.pages.support'),
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full flex-col rounded-card border bg-ivory p-6 md:p-7 ${
        plan.recommended ? 'border-brass/60' : 'border-ink/10'
      }`}
    >
      {plan.recommended ? (
        <span className="absolute -top-3 start-6 rounded-full bg-brass px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-ink">
          {t('support.recommended')}
        </span>
      ) : null}

      <h2 className="mt-1 text-display-sm">{name}</h2>
      <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60">{plan.summary[lang]}</p>

      <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-[0.75rem] text-ink/60">{t('support.labels.visits')}</dt>
          <dd className="text-end text-[0.8125rem] font-medium text-ink/85">{plan.visits[lang]}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-[0.75rem] text-ink/60">{t('support.labels.response')}</dt>
          <dd className="text-end text-[0.8125rem] font-medium text-ink/85">{plan.response[lang]}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-[0.75rem] text-ink/60">{t('support.labels.price')}</dt>
          <dd className="text-end text-[0.8125rem] font-medium text-ink/85">
            {plan.price ? plan.price[lang] : t('support.customPrice')}
          </dd>
        </div>
      </dl>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.includes.map((item) => (
          <li
            key={item[lang]}
            className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink/75"
          >
            <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-deep" />
            {item[lang]}
          </li>
        ))}
      </ul>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { source: `support_plan_${plan.slug}`, context: name, lang })}
        className={`mt-7 inline-flex min-h-[2.9rem] items-center justify-center gap-2 rounded-full border text-[0.8125rem] font-medium transition-colors ${
          plan.recommended
            ? 'border-transparent bg-green text-ivory hover:bg-green/90'
            : 'border-ink/20 text-ink hover:border-ink/40'
        }`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {t('support.planCta')}
      </a>
    </motion.article>
  )
}
