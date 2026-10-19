import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import BrandMark from '../components/brands/BrandMark'
import AskStrip from '../components/catalog/AskStrip'
import { brands, placeholderBrands } from '../data/brands'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function Brands() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('nav.brands'),
      description: t('catalog.brands.lede'),
      url: `${shop.siteUrl}${paths.brands}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.brands'), item: `${shop.siteUrl}${paths.brands}` },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.brands')} — ${shop.brand.name[lang]}`}
        description={t('catalog.brands.lede')}
        path={paths.brands}
        jsonLd={jsonLd}
        noindex={placeholderBrands}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.brands') }]} />
        }
        eyebrow={t('catalog.brands.eyebrow')}
        title={t('catalog.brands.title')}
        lede={t('catalog.brands.lede')}
      />

      <Container className="pb-section">
        {brands.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand, index) => (
              <motion.article
                key={brand.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col justify-between rounded-card border border-ink/10 bg-ivory p-6 md:p-7"
              >
                <div>
                  <div className="text-ink/70 transition-colors duration-500 hover:text-ink">
                    <BrandMark brand={brand} />
                  </div>
                  <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink/65">{brand.note[lang]}</p>
                </div>
                <p className="mt-5 border-t border-ink/10 pt-4 text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
                  {t('catalog.brands.specialties')} — {brand.specialties[lang]}
                </p>
              </motion.article>
            ))}
          </div>
        ) : (
          <EmptyState
            title={t('catalog.brands.emptyTitle')}
            body={t('catalog.brands.emptyBody')}
            ctaLabel={t('catalog.brands.cta')}
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.brands')}
            source="brands_empty"
          />
        )}

        {placeholderBrands ? (
          <p className="mt-6 text-[0.6875rem] text-ink/60">{t('catalog.brands.placeholderNote')}</p>
        ) : null}

        <AskStrip
          className="mt-14"
          title={t('catalog.brands.ctaTitle')}
          body={t('catalog.brands.ctaBody')}
          context={t('wa.contexts.consultation')}
          page={t('wa.pages.brands')}
          source="brands_strip"
          ctaLabel={t('catalog.brands.cta')}
        />
      </Container>
    </>
  )
}
