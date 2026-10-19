import { useTranslation } from 'react-i18next'
import Seo from '../layout/Seo'
import PageHeader from '../layout/PageHeader'
import Breadcrumbs from '../layout/Breadcrumbs'
import Container from '../ui/Container'
import WhatsAppButton from '../cta/WhatsAppButton'
import CallButton from '../cta/CallButton'
import OpenNowBadge from '../cta/OpenNowBadge'
import { ArrowDownIcon } from '../ui/Icons'
import { reviewRequired, updated } from '../../data/legal'
import { paths } from '../../lib/paths'
import shop from '../../config/shop'

const slugify = (value, index) => `legal-${index}-${value.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 40)}`

/**
 * Shared shell for /privacy and /terms: static, readable, no forms.
 * The review banner is part of the design until the owner signs the text off.
 */
export default function LegalPage({ kind, title, lede, sections, path }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: lede,
    url: `${shop.siteUrl}${path}`,
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', name: shop.brand.name[lang], url: shop.siteUrl },
  }

  return (
    <>
      <Seo
        title={`${title} — ${shop.brand.name[lang]}`}
        description={lede}
        path={path}
        jsonLd={jsonLd}
        noindex={reviewRequired}
      />

      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: title }]} />}
        eyebrow={t(`legal.${kind}Title`)}
        title={title}
        lede={lede}
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.75rem] text-ink/60">
          <span>
            {t('legal.updatedLabel')}: {updated[lang]}
          </span>
          <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
          <span>{kind === 'privacy' ? t('nav.privacy') : t('nav.terms')}</span>
        </div>
      </PageHeader>

      <Container className="pb-section">
        {reviewRequired ? (
          <div className="rounded-card border border-brass/50 bg-brass/[0.07] p-5 md:p-6">
            <p className="text-[0.875rem] leading-relaxed text-ink/75">
              <span className="me-2 inline-block rounded-full bg-brass/20 px-2.5 py-0.5 text-[0.625rem] uppercase tracking-[0.14em] text-brass-deep">
                {t('legal.reviewBadge')}
              </span>
              {t('legal.reviewNote')}
            </p>
          </div>
        ) : null}

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Contents */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <p className="eyebrow">{t('legal.onThisPage')}</p>
              <nav aria-label={t('legal.onThisPage')} className="mt-4">
                <ol className="space-y-2.5 border-s border-ink/10 ps-4">
                  {sections.map((section, index) => (
                    <li key={section.title.en}>
                      <a
                        href={`#${slugify(section.title.en, index)}`}
                        className="block text-[0.8125rem] leading-snug text-ink/65 transition-colors hover:text-ink"
                      >
                        {section.title[lang]}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Body */}
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <section key={section.title.en} aria-labelledby={slugify(section.title.en, index)}>
                  <h2
                    id={slugify(section.title.en, index)}
                    className="scroll-mt-header font-display text-[1.5rem] leading-snug text-ink"
                  >
                    {section.title[lang]}
                  </h2>
                  <p
                    className={`mt-3 text-ink/70 ${
                      lang === 'ar' ? 'text-[1.0625rem] leading-[1.95]' : 'text-[1rem] leading-[1.8]'
                    }`}
                  >
                    {section.body[lang]}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-7">
              <a
                href="#main"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/65 transition-colors hover:text-ink"
              >
                {t('legal.backToTop')}
                <ArrowDownIcon className="h-3.5 w-3.5 rotate-180" />
              </a>
            </div>

            {/* A legal page still needs a way to reach a person */}
            <div className="mt-10 flex flex-col gap-4 rounded-card border border-ink/10 bg-sand/30 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.9375rem] font-medium text-ink">{t('contact.closing.title')}</p>
                <div className="mt-2">
                  <OpenNowBadge />
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <WhatsAppButton
                  source={`legal_${kind}`}
                  context={t('wa.contexts.general')}
                  page={t('wa.pages.contact')}
                  label={t('common.whatsappUs')}
                />
                <CallButton source={`legal_${kind}`} label={t('common.call')} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
