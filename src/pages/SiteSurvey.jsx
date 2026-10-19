import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import SmartImage from '../components/ui/SmartImage'
import ClosingBand from '../components/cta/ClosingBand'
import OpenNowBadge from '../components/cta/OpenNowBadge'
import SurveySteps from '../components/survey/SurveySteps'
import { CheckIcon, WhatsAppIcon, PhoneIcon, ArrowIcon } from '../components/ui/Icons'
import { getImage } from '../config/media'
import { useQuote } from '../lib/quoteContext'
import { buildWhatsAppLink, buildTelLink } from '../lib/whatsapp'
import { track } from '../lib/analytics'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function SiteSurvey() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const { openQuote } = useQuote()

  const waHref = buildWhatsAppLink({
    context: t('wa.contexts.survey'),
    lang,
    page: t('wa.pages.survey'),
  })

  const image = getImage('scene:villa-garden')
  const steps = t('survey.steps', { returnObjects: true })
  const includes = t('survey.includes', { returnObjects: true })
  const reassurance = t('survey.reassurance', { returnObjects: true })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('survey.eyebrow'),
    description: t('survey.lede'),
    serviceType: t('survey.eyebrow'),
    url: `${shop.siteUrl}${paths.survey}`,
    areaServed: shop.coverage.cities.map((c) => ({ '@type': 'City', name: c[lang] })),
    provider: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
  }

  return (
    <>
      <Seo
        title={`${t('survey.eyebrow')} — ${shop.brand.name[lang]}`}
        description={t('survey.lede')}
        path={paths.survey}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: t('common.home'), to: paths.home }, { label: t('survey.eyebrow') }]}
          />
        }
        eyebrow={t('survey.eyebrow')}
        title={t('survey.title')}
        lede={t('survey.lede')}
        cta={false}
      >
        {/* The single conversion block, above the fold on every screen */}
        <div className="mt-10 flex flex-col gap-5 rounded-card border border-ink/10 bg-sand/40 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <OpenNowBadge />
            <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
            <span className="text-[0.75rem] text-ink/65">{t('survey.heroNote')}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              as="a"
              href={waHref}
              external
              variant="whatsapp"
              size="lg"
              iconStart={<WhatsAppIcon className="h-5 w-5" />}
              onClick={() =>
                track('whatsapp_click', { source: 'survey_hero', context: t('wa.contexts.survey'), lang })
              }
            >
              {t('survey.primary')}
            </Button>
            <Button
              as="a"
              href={buildTelLink()}
              variant="outline"
              size="lg"
              iconStart={<PhoneIcon className="h-[1.15rem] w-[1.15rem]" />}
              onClick={() => track('call_click', { source: 'survey_hero' })}
            >
              {t('survey.secondary')}
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openQuote('site_survey')}
          className="group mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink/60 transition-colors hover:text-ink"
        >
          <span className="link-underline">{t('survey.quote')}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </button>
      </PageHeader>

      {/* What the visit includes */}
      <section className="border-y border-ink/10 bg-sand/35">
        <Container className="py-section">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[999px_999px_1rem_1rem] bg-sand">
                <div className="aspect-[4/5]">
                  <SmartImage src={image.src} alt={image.alt[lang]} sizes="(min-width: 1024px) 38vw, 92vw" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow">{t('survey.includesTitle')}</p>
              <ul className="mt-6 space-y-4">
                {includes.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, delay: index * 0.06 }}
                    className="flex items-start gap-3.5 border-b border-ink/10 pb-4 text-[0.9375rem] leading-relaxed text-ink/75"
                  >
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brass-deep" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Three steps — the single GSAP moment */}
      <Container className="py-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SurveySteps steps={steps} title={t('survey.stepsTitle')} />
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-card border border-ink/10 p-6 md:p-7">
              <p className="eyebrow">{t('survey.reassureTitle')}</p>
              <ul className="mt-5 space-y-5">
                {reassurance.map((item) => (
                  <li key={item.title}>
                    <p className="font-body text-[0.9375rem] font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink/60">{item.body}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-ink/10 pt-5">
                <Button
                  as="a"
                  href={waHref}
                  external
                  variant="whatsapp"
                  className="w-full"
                  iconStart={<WhatsAppIcon className="h-4 w-4" />}
                  onClick={() =>
                    track('whatsapp_click', {
                      source: 'survey_sidebar',
                      context: t('wa.contexts.survey'),
                      lang,
                    })
                  }
                >
                  {t('survey.primary')}
                </Button>
                <p className="mt-3 text-center text-[0.6875rem] text-ink/60">{t('survey.closingNote')}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <ClosingBand
        eyebrow={t('survey.eyebrow')}
        title={t('survey.closingTitle')}
        body={t('survey.closingBody')}
        context={t('wa.contexts.survey')}
        page={t('wa.pages.survey')}
        source="survey_closing"
        primaryLabel={t('survey.primary')}
        secondaryLabel={t('survey.secondary')}
        note={t('survey.closingNote')}
      />
    </>
  )
}
