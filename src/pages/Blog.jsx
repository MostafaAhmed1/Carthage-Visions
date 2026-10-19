import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import FilterChips from '../components/ui/FilterChips'
import EmptyState from '../components/ui/EmptyState'
import ClosingBand from '../components/cta/ClosingBand'
import BlogCard from '../components/blog/BlogCard'
import { posts, blogCategories } from '../data/blog'
import { paths } from '../lib/paths'
import shop from '../config/shop'

/** Case/space-insensitive, diacritic-tolerant search across the visible language. */
const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u0652\u0670]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export default function Blog() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const options = [
    { value: 'all', label: t('blog.all'), count: posts.length },
    ...blogCategories.map((item) => ({
      value: item.slug,
      label: item.name[lang],
      count: posts.filter((post) => post.category === item.slug).length,
    })),
  ]

  const visible = useMemo(() => {
    const needle = normalize(query)
    return posts.filter((post) => {
      if (category !== 'all' && post.category !== category) return false
      if (!needle) return true
      const haystack = normalize(
        [post.title[lang], post.excerpt[lang], ...post.sections.map((s) => s.heading[lang])].join(' '),
      )
      return needle.split(' ').every((word) => haystack.includes(word))
    })
  }, [query, category, lang])

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: t('blog.eyebrow'),
      description: t('blog.lede'),
      url: `${shop.siteUrl}${paths.blog}`,
      inLanguage: lang,
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title[lang],
        description: post.excerpt[lang],
        datePublished: post.date,
        url: `${shop.siteUrl}${paths.post(post.slug)}`,
        author: { '@type': 'Organization', name: shop.brand.name[lang] },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.blog'), item: `${shop.siteUrl}${paths.blog}` },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('blog.eyebrow')} — ${shop.brand.name[lang]}`}
        description={t('blog.lede')}
        path={paths.blog}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.blog') }]} />
        }
        eyebrow={t('blog.eyebrow')}
        title={t('blog.title')}
        lede={t('blog.lede')}
      />

      <Container className="pb-section">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-7">
          <form role="search" onSubmit={(event) => event.preventDefault()} className="max-w-xl">
            <label htmlFor="blog-search" className="sr-only">
              {t('blog.searchLabel')}
            </label>
            <div className="relative">
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="h-12 w-full rounded-full border border-ink/15 bg-transparent px-5 pe-12 text-[0.9375rem] text-ink placeholder:text-ink/65 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass/40"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[0.6875rem] text-ink/65 transition-colors hover:text-ink"
                >
                  {t('blog.clear')}
                </button>
              ) : null}
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <FilterChips
              label={t('blog.categoriesLabel')}
              options={options}
              value={category}
              onChange={setCategory}
            />
            <p className="text-[0.75rem] text-ink/60" aria-live="polite">
              {t('blog.count', { count: visible.length })}
            </p>
          </div>
        </div>

        {visible.length ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title={t('blog.emptyTitle')}
              body={t('blog.emptyBody')}
              ctaLabel={t('blog.emptyCta')}
              context={t('wa.contexts.consultation')}
              page={t('wa.pages.blog')}
              source="blog_empty"
            />
          </div>
        )}

        <p className="mt-8 text-[0.6875rem] text-ink/60">{t('blog.note')}</p>
      </Container>

      <ClosingBand
        eyebrow={t('blog.closing.eyebrow')}
        title={t('blog.closing.title')}
        body={t('blog.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.blog')}
        source="blog_closing"
        primaryLabel={t('blog.closing.primary')}
        note={t('blog.closing.note')}
      />
    </>
  )
}
