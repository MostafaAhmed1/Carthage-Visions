import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import ClosingBand from '../components/cta/ClosingBand'
import SolutionCard from '../components/solutions/SolutionCard'
import { solutions } from '../data/solutions'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function Solutions() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('nav.solutions'),
      description: t('solutionsPage.lede'),
      url: `${shop.siteUrl}${paths.solutions}`,
      hasPart: solutions.map((s) => ({
        '@type': 'WebPage',
        name: s.name[lang],
        url: `${shop.siteUrl}${paths.solution(s.slug)}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('nav.solutions'),
          item: `${shop.siteUrl}${paths.solutions}`,
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.solutions')} — ${shop.brand.name[lang]}`}
        description={t('solutionsPage.lede')}
        path={paths.solutions}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.solutions') }]} />
        }
        eyebrow={t('solutionsPage.eyebrow')}
        title={t('solutionsPage.title')}
        lede={t('solutionsPage.lede')}
      />

      <Container className="pb-section">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} index={index} />
          ))}
        </div>
      </Container>

      <ClosingBand
        eyebrow={t('solutionsPage.closing.eyebrow')}
        title={t('solutionsPage.closing.title')}
        body={t('solutionsPage.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.solutions')}
        source="solutions_closing"
        primaryLabel={t('solutionsPage.closing.primary')}
        note={t('solutionsPage.closing.note')}
      />
    </>
  )
}
