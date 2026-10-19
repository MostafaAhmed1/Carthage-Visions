import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import SmartImage from '../components/ui/SmartImage'
import EmptyState from '../components/ui/EmptyState'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CallButton from '../components/cta/CallButton'
import ClosingBand from '../components/cta/ClosingBand'
import BlogCard from '../components/blog/BlogCard'
import { ArrowIcon, WhatsAppIcon } from '../components/ui/Icons'
import { getPost, relatedPosts, categoryName } from '../data/blog'
import { getImage } from '../config/media'
import { readingMinutes } from '../lib/readingTime'
import { formatDate, formatMinutes } from '../lib/format'
import { paths, absolute } from '../lib/paths'
import { buildWhatsAppLink } from '../lib/whatsapp'
import { track } from '../lib/analytics'
import shop from '../config/shop'

const ease = [0.22, 1, 0.36, 1]

export default function BlogPost() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const post = getPost(slug)

  if (!post) {
    return (
      <>
        <Seo title={`404 — ${t('blogPost.notFoundTitle')}`} noindex />
        <Container className="pb-section pt-[calc(var(--header-h)+4rem)]">
          <EmptyState
            title={t('blogPost.notFoundTitle')}
            body={t('blogPost.notFoundBody')}
            ctaLabel={t('blogPost.notFoundCta')}
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.blog')}
            source="post_unknown"
          >
            <div className="mt-5">
              <Button as={Link} to={paths.blog} variant="ghost" size="sm">
                {t('blogPost.back')}
              </Button>
            </div>
          </EmptyState>
        </Container>
      </>
    )
  }

  const cover = getImage(post.cover)
  const minutes = readingMinutes(post, lang)
  const related = relatedPosts(post.slug, 3)
  const url = absolute(paths.post(post.slug), shop.siteUrl)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title[lang],
      description: post.excerpt[lang],
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: lang,
      image: `${shop.siteUrl}${cover.src}`,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
      publisher: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
      articleSection: categoryName(post.category, lang),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.blog'), item: `${shop.siteUrl}${paths.blog}` },
        { '@type': 'ListItem', position: 3, name: post.title[lang], item: url },
      ],
    },
  ]

  const inlineHref = buildWhatsAppLink({
    context: `${post.title[lang]} — ${t('wa.contexts.consultation')}`,
    lang,
    page: t('wa.pages.post'),
  })

  // Arabic long-form needs a little more leading and a slightly larger size
  // than the Latin setting; both stay on the same measure.
  const bodyClass =
    lang === 'ar'
      ? 'text-[1.125rem] leading-[2.05] text-ink/80'
      : 'text-[1.0625rem] leading-[1.85] text-ink/75'

  return (
    <>
      <Seo
        title={`${post.title[lang]} — ${shop.brand.name[lang]}`}
        description={post.excerpt[lang]}
        path={paths.post(post.slug)}
        image={cover.src}
        jsonLd={jsonLd}
        type="article"
      />

      <article className="bg-ivory">
        <Container className="pb-14 pt-[calc(var(--header-h)+2.25rem)] md:pb-20">
          <Breadcrumbs
            items={[
              { label: t('common.home'), to: paths.home },
              { label: t('nav.blog'), to: paths.blog },
              { label: post.title[lang] },
            ]}
          />

          <div className="mx-auto mt-8 max-w-reading">
            <motion.p
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] uppercase tracking-[0.14em] text-ink/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <Link to={paths.blog} className="text-brass-deep transition-colors hover:text-ink">
                {categoryName(post.category, lang)}
              </Link>
              <span aria-hidden="true">·</span>
              <span>{formatMinutes(minutes, lang, t)}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            </motion.p>

            <motion.h1
              className="mt-4 text-display-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.05, ease }}
            >
              {post.title[lang]}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-reading text-lede text-ink/60"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              {post.excerpt[lang]}
            </motion.p>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4">
              <p className="text-[0.8125rem] text-ink/65">{t('blogPost.writtenBy')}</p>
              <div className="flex items-center gap-2">
                <WhatsAppButton
                  source="post_header"
                  context={`${post.title[lang]} — ${t('wa.contexts.consultation')}`}
                  page={t('wa.pages.post')}
                  label={t('common.whatsapp')}
                  size="sm"
                />
                <CallButton source="post_header" size="sm" variant="outline" label={t('common.call')} />
              </div>
            </div>
          </div>

          <motion.figure
            className="mx-auto mt-10 max-w-reading overflow-hidden rounded-card bg-sand"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            <div className="aspect-[16/9]">
              <SmartImage
                src={cover.src}
                alt={cover.alt[lang]}
                sizes="(min-width: 1024px) 62rem, 94vw"
                priority
              />
            </div>
          </motion.figure>
        </Container>

        {/* Reading body */}
        <Container className="pb-section">
          <div className="mx-auto max-w-reading">
            <div className={`${bodyClass} space-y-8`}>
              {post.sections.map((section, index) => (
                <section key={section.heading.en} className="scroll-mt-header">
                  <h2 className="text-display-sm text-ink">{section.heading[lang]}</h2>

                  {section.body.map((paragraph) => (
                    <p key={paragraph.en.slice(0, 40)} className="mt-4">
                      {paragraph[lang]}
                    </p>
                  ))}

                  {section.list ? (
                    <ul className="mt-5 space-y-3">
                      {section.list.map((item) => (
                        <li key={item.en.slice(0, 40)} className="flex items-start gap-3.5">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass"
                          />
                          <span>{item[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* One calm inline interruption, roughly a third of the way in */}
                  {index === 1 ? (
                    <aside className="mt-9 rounded-card border border-ink/10 bg-sand/40 p-6 md:p-7">
                      <p className="eyebrow">{t('blogPost.askTitle')}</p>
                      <p className="mt-2.5 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink/65">
                        {t('blogPost.askBody')}
                      </p>
                      <a
                        href={inlineHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          track('whatsapp_click', { source: 'post_inline', context: post.slug, lang })
                        }
                        className="mt-4 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-green px-5 text-[0.8125rem] font-medium text-ivory transition-colors hover:bg-green/90"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        {t('blogPost.askCta')}
                      </a>
                    </aside>
                  ) : null}
                </section>
              ))}

              <div className="rounded-card border-s-2 border-brass bg-sand/30 p-6">
                <p className="eyebrow">{t('blogPost.takeaways')}</p>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink/80">{post.takeaway[lang]}</p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-8">
              <Link
                to={paths.blog}
                className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink/65 transition-colors hover:text-ink"
              >
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                {t('blogPost.back')}
              </Link>
            </div>
          </div>
        </Container>
      </article>

      {/* Related */}
      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-ink/10 bg-sand/25">
          <Container className="py-section">
            <h2 id="related-title" className="text-display-sm">
              {t('blogPost.related')}
            </h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <BlogCard key={item.slug} post={item} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ClosingBand
        eyebrow={t('blog.closing.eyebrow')}
        title={t('blog.closing.title')}
        body={t('blog.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.blog')}
        source="post_closing"
        primaryLabel={t('blog.closing.primary')}
        note={t('blog.closing.note')}
      />
    </>
  )
}
