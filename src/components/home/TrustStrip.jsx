import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import shop from '../../config/shop'

export default function TrustStrip() {
  const { t } = useTranslation()

  const items = [
    shop.reassurances.freeSurvey && t('trust.items.survey'),
    shop.reassurances.replyWithinMinutes && t('trust.items.reply'),
    shop.reassurances.installationAndWarranty && t('trust.items.warranty'),
    t('trust.items.coverage'),
  ].filter(Boolean)

  return (
    <section id="trust" aria-label={t('trust.label')} className="border-b border-ivory/10 bg-ink-2">
      <Container>
        <ul className="grid grid-cols-2 gap-y-4 py-6 lg:flex lg:items-center lg:justify-between lg:py-5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-[0.75rem] font-medium tracking-wide text-ivory/60 lg:text-[0.8125rem]"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
