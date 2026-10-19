import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CallButton from '../components/cta/CallButton'
import OpenNowBadge from '../components/cta/OpenNowBadge'
import ProductGallery from '../components/catalog/ProductGallery'
import SpecList from '../components/catalog/SpecList'
import ProductCard from '../components/catalog/ProductCard'
import ProductStickyBar from '../components/catalog/ProductStickyBar'
import AskStrip from '../components/catalog/AskStrip'
import { CheckIcon, ArrowIcon } from '../components/ui/Icons'
import { getCategory, getProduct, relatedProducts, placeholderCatalog } from '../data/products'
import { getImage } from '../config/media'
import shop from '../config/shop'
import { paths, absolute } from '../lib/paths'
import { buildWhatsAppLink } from '../lib/whatsapp'

export default function ProductDetail() {
  const { category: categorySlug, slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const category = getCategory(categorySlug)
  const product = category ? getProduct(categorySlug, slug) : null

  if (!category || !product) {
    return (
      <>
        <Seo title={`404 — ${t('catalog.product.notFoundTitle')}`} noindex />
        <Container className="pb-section pt-[calc(var(--header-h)+4rem)]">
          <EmptyState
            title={t('catalog.product.notFoundTitle')}
            body={t('catalog.product.notFoundBody')}
            ctaLabel={t('catalog.category.ask')}
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.products')}
            source="product_unknown"
          >
            <div className="mt-5">
              <Button as={Link} to={paths.products} variant="ghost" size="sm">
                {t('catalog.category.all')}
              </Button>
            </div>
          </EmptyState>
        </Container>
      </>
    )
  }

  const heroImage = getImage(product.images[0])
  const productUrl = absolute(paths.product(category.slug, product.slug), shop.siteUrl)
  const name = product.name[lang]
  const related = relatedProducts(product, 3)

  // The message carries the product name and its URL, so a reply is instant.
  const rawMessage =
    lang === 'ar'
      ? `أرغب بمعرفة المزيد عن: ${name}\n${productUrl}`
      : `I'd like to know more about: ${name}\n${productUrl}`

  const waHref = buildWhatsAppLink({
    rawText: rawMessage,
    lang,
    page: `${category.name[lang]} — ${t('nav.products')}`,
  })

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name,
      description: product.description[lang],
      image: `${shop.siteUrl}${heroImage.src}`,
      category: category.name[lang],
      url: productUrl,
      ...(product.priceFrom
        ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'OMR',
              price: product.priceFrom,
              priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: shop.brand.name[lang] },
            },
          }
        : null),
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
        { '@type': 'ListItem', position: 4, name, item: productUrl },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${name} | ${shop.brand.name[lang]}`}
        description={product.summary[lang]}
        path={paths.product(category.slug, product.slug)}
        image={heroImage.src}
        type="product"
        jsonLd={jsonLd}
        noindex={placeholderCatalog}
      />

      <article className="bg-ivory">
        <Container className="pb-16 pt-[calc(var(--header-h)+2rem)] md:pb-24">
          <Breadcrumbs
            items={[
              { label: t('common.home'), to: paths.home },
              { label: t('nav.products'), to: paths.products },
              { label: category.name[lang], to: paths.category(category.slug) },
              { label: name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Gallery */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductGallery images={product.images} name={name} />
            </motion.div>

            {/* Summary + sticky CTA */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={paths.category(category.slug)}
                    className="eyebrow inline-block transition-colors hover:text-ink"
                  >
                    {category.name[lang]}
                  </Link>

                  <h1 className="mt-4 text-display-md">{name}</h1>
                  <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-ink/60">
                    {product.description[lang]}
                  </p>

                  <div className="mt-7 flex items-baseline gap-3 border-t border-ink/10 pt-5">
                    <span className="font-display text-[1.75rem] leading-none text-ink">
                      {product.priceFrom
                        ? t('common.from', { price: product.priceFrom })
                        : t('catalog.product.requestPrice')}
                    </span>
                    <span className="text-[0.6875rem] text-ink/60">{t('catalog.product.priceNote')}</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5">
                    <WhatsAppButton
                      source="product_detail"
                      context={name}
                      label={t('catalog.product.ask')}
                      rawText={rawMessage}
                      page={t('wa.pages.product')}
                      size="lg"
                      className="w-full"
                    />
                    <CallButton
                      source="product_detail"
                      label={t('catalog.product.call')}
                      variant="outline"
                      size="lg"
                      className="w-full"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <OpenNowBadge />
                    <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
                    <span className="text-[0.75rem] text-ink/65">{t('common.freeSurvey')}</span>
                  </div>

                  <div className="mt-8">
                    <SpecList specs={product.specs} lang={lang} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Who it suits + what's included */}
          <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-2 md:gap-16">
            <section aria-labelledby="best-for">
              <h2 id="best-for" className="eyebrow">
                {t('catalog.product.bestFor')}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.bestFor[lang].map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/15 px-4 py-2 text-[0.8125rem] text-ink/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="included">
              <h2 id="included" className="eyebrow">
                {t('catalog.product.included')}
              </h2>
              <ul className="mt-5 space-y-3">
                {product.included.map((item) => (
                  <li key={item[lang]} className="flex items-start gap-3 text-[0.9375rem] text-ink/75">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brass-deep" />
                    {item[lang]}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] text-ink/60">{t('catalog.product.includedNote')}</p>
            </section>
          </div>

          {/* Related */}
          {related.length ? (
            <section aria-labelledby="related" className="mt-16 border-t border-ink/10 pt-12">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <h2 id="related" className="text-display-sm">
                  {t('catalog.product.related')}
                </h2>
                <Link
                  to={paths.category(category.slug)}
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/60 transition-colors hover:text-ink"
                >
                  {t('catalog.product.back', { category: category.name[lang] })}
                  <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item, index) => (
                  <ProductCard key={item.slug} product={item} index={index} categorySlug={item.category} />
                ))}
              </div>
            </section>
          ) : null}

          <AskStrip
            className="mt-16"
            title={t('catalog.product.relatedCta')}
            body={t('catalog.products.stripBody')}
            context={`${name} — ${t('wa.contexts.consultation')}`}
            page={t('wa.pages.product')}
            source="product_strip"
          />
        </Container>
      </article>

      <ProductStickyBar whatsappHref={waHref} context={name} />
    </>
  )
}
