import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import WhatsAppButton from '../cta/WhatsAppButton'
import CallButton from '../cta/CallButton'
import { displayPhone } from '../../lib/whatsapp'
import shop from '../../config/shop'
import { usePauseOffscreen } from '../../hooks/useMedia'

export default function CtaBand() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const sectionRef = usePauseOffscreen()

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink text-ivory">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_0%,rgb(176_141_87_/_0.18),transparent_70%)]" />
        <div className="pause-offscreen absolute inset-0 arabesque opacity-[0.045] motion-safe:animate-drift" />
        <div className="grain absolute inset-0" />
      </div>

      {/* Arched brass outline, very faint */}
      <div
        className="pointer-events-none absolute -bottom-56 start-1/2 h-[34rem] w-[26rem] -translate-x-1/2 rounded-t-full border border-brass/15 rtl:translate-x-1/2"
        aria-hidden="true"
      />

      <Container className="relative py-section">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.p
            className="eyebrow eyebrow-light"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {t('cta.eyebrow')}
          </motion.p>

          <motion.h2
            className="mt-6 text-display-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.06 }}
          >
            {t('cta.title')}
          </motion.h2>

          <motion.p
            className="mt-5 max-w-md text-lede text-ivory/65"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            {t('cta.body')}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            <WhatsAppButton
              source="cta_band"
              context={t('wa.contexts.survey')}
              label={t('cta.primary')}
              size="lg"
            />
            <CallButton source="cta_band" label={t('cta.secondary')} variant="outlineLight" size="lg" />
          </motion.div>

          <p className="mt-6 text-[0.75rem] text-ivory/55">{t('cta.note')}</p>

          <a
            href={`tel:${shop.contact.phones[0].e164}`}
            dir="ltr"
            className="mt-3 font-display text-[1.05rem] tracking-[0.08em] text-ivory/70 underline-offset-8 transition-colors hover:text-ivory"
          >
            {displayPhone()}
          </a>

          <p className="mt-10 text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/30">
            {shop.address.city[lang]} · {shop.address.country[lang]}
          </p>
        </div>
      </Container>
    </section>
  )
}
