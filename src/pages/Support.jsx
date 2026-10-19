import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import ClosingBand from '../components/cta/ClosingBand'
import SupportPlanCard from '../components/services/SupportPlanCard'
import AskStrip from '../components/catalog/AskStrip'
import { CheckIcon, CloseIcon } from '../components/ui/Icons'
import { supportPlans } from '../data/services'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function Support() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const covered = t('support.covered', { returnObjects: true })
  const notCovered = t('support.notCovered', { returnObjects: true })

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('nav.support'),
      description: t('support.lede'),
      serviceType: t('support.eyebrow'),
      url: `${shop.siteUrl}${paths.support}`,
      areaServed: shop.coverage.cities.map((c) => ({ '@type': 'City', name: c[lang] })),
      provider: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.support'), item: `${shop.siteUrl}${paths.support}` },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.support')} — ${shop.brand.name[lang]}`}
        description={t('support.lede')}
        path={paths.support}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.support') }]} />
        }
        eyebrow={t('support.eyebrow')}
        title={t('support.title')}
        lede={t('support.lede')}
      />

      <Container className="pb-section">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-display-sm">{t('support.plansTitle')}</h2>
          <p className="text-[0.6875rem] text-ink/60">{t('support.plansNote')}</p>
        </div>

        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
          {supportPlans.map((plan, index) => (
            <SupportPlanCard key={plan.slug} plan={plan} index={index} />
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-2 md:gap-16">
          <section aria-labelledby="covered">
            <h2 id="covered" className="eyebrow">
              {t('support.coveredTitle')}
            </h2>
            <ul className="mt-5 space-y-3">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink/75">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brass-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="not-covered">
            <h2 id="not-covered" className="eyebrow">
              {t('support.notCoveredTitle')}
            </h2>
            <ul className="mt-5 space-y-3">
              {notCovered.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-ink/65">
                  <CloseIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-ink/65" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <AskStrip
          className="mt-16"
          title={t('support.problemTitle')}
          body={t('support.problemBody')}
          context={t('wa.contexts.support')}
          page={t('wa.pages.support')}
          source="support_problem"
          ctaLabel={t('support.problemCta')}
          tone="ink"
        />
      </Container>

      <ClosingBand
        eyebrow={t('support.closing.eyebrow')}
        title={t('support.closing.title')}
        body={t('support.closing.body')}
        context={t('wa.contexts.support')}
        page={t('wa.pages.support')}
        source="support_closing"
        primaryLabel={t('support.closing.primary')}
        note={t('support.closing.note')}
      />
    </>
  )
}
