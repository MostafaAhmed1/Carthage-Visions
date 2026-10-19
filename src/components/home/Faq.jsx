import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import Accordion from '../ui/Accordion'
import WhatsAppButton from '../cta/WhatsAppButton'
import CallButton from '../cta/CallButton'
import OpenNowBadge from '../cta/OpenNowBadge'

const KEYS = ['one', 'two', 'three', 'four', 'five']

export default function Faq() {
  const { t } = useTranslation()
  const items = KEYS.map((key) => ({
    q: t(`faq.items.${key}.q`),
    a: t(`faq.items.${key}.a`),
  }))

  return (
    <Section id="faq" className="scroll-mt-header" containerClassName="py-section">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <p className="eyebrow">{t('faq.eyebrow')}</p>
            <h2 className="mt-5 text-display-md">{t('faq.title')}</h2>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-ink/60">{t('faq.more')}</p>

            <div className="mt-7 flex flex-col items-start gap-3">
              <WhatsAppButton
                source="faq"
                context={t('wa.contexts.consultation')}
                label={t('common.whatsappUs')}
                size="md"
              />
              <CallButton source="faq" variant="ghost" size="sm" className="ps-0" />
            </div>

            <div className="mt-8 border-t border-ink/10 pt-5">
              <OpenNowBadge />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={items} defaultOpen={0} />
        </div>
      </div>
    </Section>
  )
}
