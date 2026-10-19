import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import WhatsAppButton from '../cta/WhatsAppButton'
import CallButton from '../cta/CallButton'

/**
 * Calm inner-page opening: breadcrumbs, eyebrow, one headline, one paragraph.
 * No imagery by default — the catalogue pages let the products be the picture.
 */
export default function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  aside,
  children,
  cta = true,
  ctaSource = 'page_header',
}) {
  const { t } = useTranslation()

  return (
    <header className="relative isolate overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.03]" aria-hidden="true" />
      <Container className="relative pb-12 pt-[calc(var(--header-h)+2.75rem)] md:pb-16 md:pt-[calc(var(--header-h)+4rem)]">
        {breadcrumbs ? <div className="mb-8">{breadcrumbs}</div> : null}

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow}
              </motion.p>
            ) : null}
            <motion.h1
              className="mt-4 text-display-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            {lede ? (
              <motion.p
                className="mt-5 max-w-reading text-lede text-ink/60"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {lede}
              </motion.p>
            ) : null}

            {cta ? (
              <motion.div
                className="mt-7 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <WhatsAppButton
                  source={ctaSource}
                  context={t('wa.contexts.general')}
                  label={t('common.whatsappUs')}
                />
                <CallButton source={ctaSource} label={t('common.callNow')} />
              </motion.div>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>

        {children}
      </Container>
    </header>
  )
}
