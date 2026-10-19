import { useTranslation } from 'react-i18next'
import ClosingBand from '../cta/ClosingBand'

/** Home page closing band — same component, home copy. */
export default function CtaBand() {
  const { t } = useTranslation()

  return (
    <ClosingBand
      eyebrow={t('cta.eyebrow')}
      title={t('cta.title')}
      body={t('cta.body')}
      context={t('wa.contexts.survey')}
      source="cta_band"
      primaryLabel={t('cta.primary')}
      secondaryLabel={t('cta.secondary')}
      note={t('cta.note')}
    />
  )
}
