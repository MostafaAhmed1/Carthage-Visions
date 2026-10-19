import { useTranslation } from 'react-i18next'
import LegalPage from '../components/legal/LegalPage'
import { privacySections } from '../data/legal'
import { paths } from '../lib/paths'

export default function Privacy() {
  const { t } = useTranslation()
  return (
    <LegalPage
      kind="privacy"
      title={t('legal.privacyTitle')}
      lede={t('legal.privacyLede')}
      sections={privacySections}
      path={paths.privacy}
    />
  )
}
