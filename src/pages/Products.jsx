import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import FilterChips from '../components/ui/FilterChips'
import EmptyState from '../components/ui/EmptyState'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CategoryCard from '../components/catalog/CategoryCard'
import AskStrip from '../components/catalog/AskStrip'
import { categories, countByCategory, placeholderCatalog } from '../data/products'
import { paths } from '../lib/paths'
import shop from '../config/shop'

const FAMILIES = {
  all: null,
  cameras: ['cctv', 'ip-ptz'],
  recording: ['nvr-dvr', 'accessories'],
  access: ['access-control', 'intercom'],
  safety: ['alarms'],
}

export default function Products() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [family, setFamily] = useState('all')

  const familyLabel = (slug) =>
    Object.entries(FAMILIES).find(([, list]) => list?.includes(slug))?.[0] ?? 'cameras'

  const visible = useMemo(() => {
    const allowed = FAMILIES[family]
    return allowed ? categories.filter((c) => allowed.includes(c.slug)) : categories
  }, [family])

  const options = Object.keys(FAMILIES).map((key) => ({
    value: key,
    label: t(`catalog.products.families.${key}`),
    count: FAMILIES[key] ? FAMILIES[key].length : categories.length,
  }))

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('nav.products'),
      description: t('catalog.products.lede'),
      url: `${shop.siteUrl}${paths.products}`,
      hasPart: categories.map((c) => ({
        '@type': 'CollectionPage',
        name: c.name[lang],
        url: `${shop.siteUrl}${paths.category(c.slug)}`,
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
          name: t('nav.products'),
          item: `${shop.siteUrl}${paths.products}`,
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={
          lang === 'ar'
            ? 'الأجهزة — كاميرات مراقبة وأنظمة أمن | قرطاج فيجن'
            : 'Equipment — cameras, recorders and access | Carthage Visions'
        }
        description={t('catalog.products.lede')}
        path={paths.products}
        jsonLd={jsonLd}
        noindex={placeholderCatalog}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.products') }]} />
        }
        eyebrow={t('catalog.products.eyebrow')}
        title={t('catalog.products.title')}
        lede={t('catalog.products.lede')}
        aside={
          <WhatsAppButton
            source="products_header"
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.products')}
            label={t('common.requestQuote')}
          />
        }
      />

      <Container className="pb-section">
        <div className="flex flex-col gap-5 border-b border-ink/10 pb-8 md:flex-row md:items-center md:justify-between">
          <FilterChips
            label={t('catalog.products.filterLabel')}
            options={options}
            value={family}
            onChange={setFamily}
          />
          <p className="text-[0.75rem] text-ink/60">
            {t('catalog.products.itemsCount', { count: visible.length })}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={countByCategory(category.slug)}
              familyLabel={t(`catalog.products.families.${familyLabel(category.slug)}`)}
              index={index}
            />
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title={t('catalog.products.emptyTitle')}
              body={t('catalog.products.emptyBody')}
              ctaLabel={t('catalog.products.emptyCta')}
              context={t('wa.contexts.consultation')}
              page={t('wa.pages.products')}
              source="products_empty"
            />
          </div>
        ) : null}

        <AskStrip
          className="mt-16"
          title={t('catalog.products.stripTitle')}
          body={t('catalog.products.stripBody')}
          context={t('wa.contexts.consultation')}
          page={t('wa.pages.products')}
          source="products_strip"
        />
      </Container>
    </>
  )
}
