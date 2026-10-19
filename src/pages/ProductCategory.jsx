import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import ProductCard from '../components/catalog/ProductCard'
import AskStrip from '../components/catalog/AskStrip'
import { categories, getCategory, productsByCategory, placeholderCatalog } from '../data/products'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function ProductCategory() {
  const { category: slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const category = getCategory(slug)
  const items = category ? productsByCategory(category.slug) : []

  if (!category) {
    return (
      <>
        <Seo title={`404 — ${t('catalog.category.emptyTitle')}`} path={paths.category(slug)} noindex />
        <PageHeader
          breadcrumbs={
            <Breadcrumbs
              items={[
                { label: t('common.home'), to: paths.home },
                { label: t('nav.products'), to: paths.products },
                { label: t('catalog.category.emptyTitle') },
              ]}
            />
          }
          eyebrow={t('catalog.products.eyebrow')}
          title={t('catalog.category.emptyTitle')}
        />
        <Container className="pb-section">
          <EmptyState
            title={t('catalog.category.emptyTitle')}
            body={t('catalog.category.emptyBody')}
            ctaLabel={t('catalog.category.emptyCta')}
            context={t('wa.contexts.consultation')}
            source="category_unknown"
          />
        </Container>
      </>
    )
  }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: category.name[lang],
      description: category.blurb[lang],
      url: `${shop.siteUrl}${paths.category(category.slug)}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name[lang],
          url: `${shop.siteUrl}${paths.product(category.slug, product.slug)}`,
        })),
      },
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
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name[lang],
          item: `${shop.siteUrl}${paths.category(category.slug)}`,
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${category.name[lang]} — ${t('nav.products')} | ${shop.brand.name[lang]}`}
        description={category.blurb[lang]}
        path={paths.category(category.slug)}
        jsonLd={jsonLd}
        noindex={placeholderCatalog}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: t('common.home'), to: paths.home },
              { label: t('nav.products'), to: paths.products },
              { label: category.name[lang] },
            ]}
          />
        }
        eyebrow={category.short[lang]}
        title={category.name[lang]}
        lede={category.blurb[lang]}
        aside={
          <WhatsAppButton
            source="category_header"
            context={`${category.name[lang]} — ${t('wa.contexts.consultation')}`}
            page={t('wa.pages.products')}
            label={t('common.whatsappUs')}
          />
        }
      >
        <nav
          aria-label={t('catalog.category.all')}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-5"
        >
          <Link
            to={paths.products}
            className="text-[0.8125rem] font-medium text-ink/65 transition-colors hover:text-ink"
          >
            {t('catalog.category.all')}
          </Link>
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <Link
                key={c.slug}
                to={paths.category(c.slug)}
                className="text-[0.8125rem] text-ink/65 transition-colors hover:text-ink"
              >
                {c.name[lang]}
              </Link>
            ))}
        </nav>
      </PageHeader>

      <Container className="pb-section">
        <div className="flex items-center justify-between gap-4 pb-7">
          <p className="text-[0.75rem] uppercase tracking-[0.14em] text-ink/60">
            {t('catalog.category.items', { count: items.length })}
          </p>
        </div>

        {items.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} categorySlug={category.slug} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t('catalog.category.emptyTitle')}
            body={t('catalog.category.emptyBody')}
            ctaLabel={t('catalog.category.emptyCta')}
            context={`${category.name[lang]} — ${t('wa.contexts.consultation')}`}
            page={t('wa.pages.products')}
            source="category_empty"
          />
        )}

        <AskStrip
          className="mt-16"
          title={t('catalog.products.stripTitle')}
          body={t('catalog.products.stripBody')}
          context={`${category.name[lang]} — ${t('wa.contexts.consultation')}`}
          page={t('wa.pages.products')}
          source="category_strip"
        />
      </Container>
    </>
  )
}
