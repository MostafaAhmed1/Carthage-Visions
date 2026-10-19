import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import ClosingBand from '../components/cta/ClosingBand'
import PackageCard from '../components/catalog/PackageCard'
import { ArrowIcon } from '../components/ui/Icons'
import { packages, placeholderPackages } from '../data/packages'
import { useQuote } from '../lib/quoteContext'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function Packages() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const { openQuote } = useQuote()

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: t('nav.packages'),
      url: `${shop.siteUrl}${paths.packages}`,
      itemListElement: packages.map((pkg) => ({
        '@type': 'Offer',
        name: pkg.name[lang],
        description: pkg.summary[lang],
        priceCurrency: 'OMR',
        price: pkg.priceFrom,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'OMR',
          price: pkg.priceFrom,
          valueAddedTaxIncluded: false,
        },
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: shop.brand.name[lang] },
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
          name: t('nav.packages'),
          item: `${shop.siteUrl}${paths.packages}`,
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.packages')} — ${shop.brand.name[lang]}`}
        description={t('catalog.packages.lede')}
        path={paths.packages}
        jsonLd={jsonLd}
        noindex={placeholderPackages}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.packages') }]} />
        }
        eyebrow={t('catalog.packages.eyebrow')}
        title={t('catalog.packages.title')}
        lede={t('catalog.packages.lede')}
      />

      <Container className="pb-section">
        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-6">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.slug} pkg={pkg} index={index} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-[0.8125rem] leading-relaxed text-ink/65">
          {t('catalog.packages.compare')}
        </p>

        <div className="relative mt-14 overflow-hidden rounded-card border border-ink/10 bg-sand/40 p-7 md:p-10">
          <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.04]" aria-hidden="true" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <h2 className="text-display-sm">{t('catalog.packages.customTitle')}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/60">
                {t('catalog.packages.customBody')}
              </p>
            </div>
            <Button
              type="button"
              variant="ink"
              size="lg"
              onClick={() => openQuote('packages_custom')}
              iconEnd={<ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />}
            >
              {t('catalog.packages.customCta')}
            </Button>
          </div>
        </div>
      </Container>

      <ClosingBand
        eyebrow={t('cta.eyebrow')}
        title={t('cta.title')}
        body={t('cta.body')}
        context={t('wa.contexts.general')}
        page={t('wa.pages.packages')}
        source="packages_closing"
        primaryLabel={t('cta.primary')}
        secondaryLabel={t('cta.secondary')}
        note={t('cta.note')}
      />
    </>
  )
}
