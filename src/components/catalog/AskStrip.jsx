import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import WhatsAppButton from '../cta/WhatsAppButton'
import CallButton from '../cta/CallButton'

/**
 * The recurring calm interruption: "not sure which one?".
 * One sentence, one WhatsApp action, an optional call.
 */
export default function AskStrip({
  title,
  body,
  context,
  page,
  source,
  ctaLabel,
  tone = 'sand',
  className = '',
}) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-card border p-7 md:p-9 ${
        tone === 'ink' ? 'border-ivory/10 bg-ink text-ivory' : 'border-ink/10 bg-sand/45'
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.04]" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className={`text-display-sm ${tone === 'ink' ? 'text-ivory' : ''}`}>{title}</h2>
          <p
            className={`mt-2.5 text-[0.9375rem] leading-relaxed ${tone === 'ink' ? 'text-ivory/65' : 'text-ink/60'}`}
          >
            {body}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <WhatsAppButton
            source={source}
            context={context}
            page={page}
            label={ctaLabel ?? t('catalog.products.stripCta')}
            variant="whatsapp"
          />
          <CallButton source={source} variant={tone === 'ink' ? 'outlineLight' : 'outline'} />
        </div>
      </div>
    </motion.div>
  )
}
