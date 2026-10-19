import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import FilterChips from '../components/ui/FilterChips'
import Accordion from '../components/ui/Accordion'
import EmptyState from '../components/ui/EmptyState'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CallButton from '../components/cta/CallButton'
import ClosingBand from '../components/cta/ClosingBand'
import { faqItems, faqCategories } from '../data/faqPage'
import { paths } from '../lib/paths'
import shop from '../config/shop'

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export default function Faq() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const options = [
    { value: 'all', label: t('faqPage.all'), count: faqItems.length },
    ...faqCategories.map((item) => ({
      value: item.slug,
      label: item.label[lang],
      count: faqItems.filter((faq) => faq.category === item.slug).length,
    })),
  ]

  const visible = useMemo(() => {
    const needle = normalize(query)
    return faqItems.filter((item) => {
      if (category !== 'all' && item.category !== category) return false
      if (!needle) return true
      const haystack = normalize([item.q[lang], item.a[lang]].join(' '))
      return needle.split(' ').every((word) => haystack.includes(word))
    })
  }, [query, category, lang])

  // Group for display; when a single category is active, one group only.
  const groups = faqCategories
    .map((group) => ({ ...group, items: visible.filter((item) => item.category === group.slug) }))
    .filter((group) => group.items.length)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q[lang],
        acceptedAnswer: { '@type': 'Answer', text: item.a[lang] },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.faq'), item: `${shop.siteUrl}${paths.faq}` },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.faq')} — ${shop.brand.name[lang]}`}
        description={t('faqPage.lede')}
        path={paths.faq}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.faq') }]} />
        }
        eyebrow={t('faqPage.eyebrow')}
        title={t('faqPage.title')}
        lede={t('faqPage.lede')}
        cta={false}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <WhatsAppButton
            source="faq_hero"
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.faq')}
            label={t('common.whatsappUs')}
          />
          <CallButton source="faq_hero" label={t('common.callNow')} />
        </div>
      </PageHeader>

      <Container className="pb-section">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-7">
          <form role="search" onSubmit={(event) => event.preventDefault()} className="max-w-xl">
            <label htmlFor="faq-search" className="sr-only">
              {t('faqPage.searchLabel')}
            </label>
            <div className="relative">
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('faqPage.searchPlaceholder')}
                className="h-12 w-full rounded-full border border-ink/15 bg-transparent px-5 pe-12 text-[0.9375rem] text-ink placeholder:text-ink/65 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[0.6875rem] text-ink/65 transition-colors hover:text-ink"
                >
                  {t('faqPage.clear')}
                </button>
              ) : null}
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <FilterChips
              label={t('faqPage.categoriesLabel')}
              options={options}
              value={category}
              onChange={setCategory}
            />
            <p className="text-[0.75rem] text-ink/60" aria-live="polite">
              {t('faqPage.count', { count: visible.length })}
            </p>
          </div>
        </div>

        {groups.length ? (
          <div className="mt-10 space-y-14">
            {groups.map((group) => (
              <section key={group.slug} aria-labelledby={`faq-${group.slug}`}>
                <h2 id={`faq-${group.slug}`} className="eyebrow">
                  {group.label[lang]}
                </h2>
                <div className="mt-5">
                  <Accordion
                    key={`${group.slug}-${query}-${category}`}
                    items={group.items.map((item) => ({ q: item.q[lang], a: item.a[lang] }))}
                  />
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title={t('faqPage.emptyTitle')}
              body={t('faqPage.emptyBody')}
              ctaLabel={t('faqPage.emptyCta')}
              context={t('wa.contexts.consultation')}
              page={t('wa.pages.faq')}
              source="faq_empty"
            />
          </div>
        )}
      </Container>

      <ClosingBand
        eyebrow={t('faqPage.closing.eyebrow')}
        title={t('faqPage.closing.title')}
        body={t('faqPage.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.faq')}
        source="faq_closing"
        primaryLabel={t('faqPage.closing.primary')}
        note={t('faqPage.closing.note')}
      />
    </>
  )
}
