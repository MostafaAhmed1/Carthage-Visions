import { useTranslation } from 'react-i18next'
import LegalPage from '../components/legal/LegalPage'
import { termsSections } from '../data/legal'
import { paths } from '../lib/paths'

export default function Terms() {
  const { t } = useTranslation()
  return (
    <LegalPage
      kind="terms"
      title={t('legal.termsTitle')}
      lede={t('legal.termsLede')}
      sections={termsSections}
      path={paths.terms}
    />
  )
}
