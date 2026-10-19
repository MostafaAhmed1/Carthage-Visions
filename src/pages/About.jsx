import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import SmartImage from '../components/ui/SmartImage'
import ClosingBand from '../components/cta/ClosingBand'
import OpenNowBadge from '../components/cta/OpenNowBadge'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CallButton from '../components/cta/CallButton'
import { getImage } from '../config/media'
import { story, values, team, timeline, strip } from '../data/about'
import { paths } from '../lib/paths'
import { formatNumber } from '../lib/format'
import shop from '../config/shop'

const ease = [0.22, 1, 0.36, 1]

export default function About() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const hero = getImage('scene:office')
  const stripImages = strip.map((key) => getImage(key)).filter(Boolean)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: t('about.eyebrow'),
      description: t('about.lede'),
      url: `${shop.siteUrl}${paths.about}`,
      mainEntity: {
        '@type': 'Organization',
        name: shop.brand.name[lang],
        description: shop.brand.shortDescription[lang],
        url: shop.siteUrl,
        telephone: shop.contact.phones[0]?.e164,
        address: {
          '@type': 'PostalAddress',
          addressLocality: shop.address.city[lang],
          addressRegion: shop.address.region[lang],
          addressCountry: shop.address.countryCode,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.about'), item: `${shop.siteUrl}${paths.about}` },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.about')} — ${shop.brand.name[lang]}`}
        description={t('about.lede')}
        path={paths.about}
        image={hero?.src}
        jsonLd={jsonLd}
        type="website"
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.about') }]} />
        }
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        lede={t('about.lede')}
        cta={false}
      >
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <WhatsAppButton
            source="about_hero"
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.about')}
            label={t('common.whatsappUs')}
          />
          <CallButton source="about_hero" />
          <span className="hidden h-4 w-px bg-ink/15 sm:block" aria-hidden="true" />
          <OpenNowBadge />
        </div>
      </PageHeader>

      {/* Story + one arch image */}
      <section className="border-y border-ink/10 bg-sand/30">
        <Container className="py-section">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="arch-mask-soft overflow-hidden bg-sand">
                <div className="aspect-[4/5]">
                  <SmartImage
                    src={hero.src}
                    alt={hero.alt[lang]}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-display-md">{t('about.storyTitle')}</h2>
              <div className="mt-6 space-y-5 text-[1.0625rem] leading-[1.85] text-ink/75">
                {[story.opening, story.second, story.third].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.65, delay: index * 0.06, ease }}
                  >
                    {paragraph[lang]}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <Container className="py-section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{t('about.valuesTitle')}</p>
            <h2 className="mt-3 text-display-sm">{t('about.valuesNote')}</h2>
          </div>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.article
              key={value.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.07, ease }}
              className="border-t border-ink/15 pt-5"
            >
              <span
                className="font-display text-[0.8125rem] tracking-[0.2em] text-brass-deep"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-body text-[1.0625rem] font-medium text-ink">{value.title[lang]}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/65">{value.body[lang]}</p>
            </motion.article>
          ))}
        </div>
      </Container>

      {/* Timeline */}
      <section className="border-y border-ink/10 bg-ivory">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('about.timelineTitle')}</p>
              <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ink/60">
                {t('about.timelineNote')}
              </p>
            </div>

            <ol className="relative space-y-9 ps-10 lg:col-span-7 lg:col-start-6">
              <span aria-hidden="true" className="absolute inset-y-1 start-[0.9375rem] w-px bg-ink/10" />
              {timeline.map((item, index) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -start-10 top-0 grid h-8 w-8 place-items-center rounded-full border border-brass/40 bg-ivory font-display text-[0.75rem] text-brass-deep"
                  >
                    {formatNumber(item.step, lang)}
                  </span>
                  <h3 className="font-body text-[1.0625rem] font-medium">{item.title[lang]}</h3>
                  <p className="mt-1.5 max-w-[32rem] text-[0.9375rem] leading-relaxed text-ink/65">
                    {item.body[lang]}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Team */}
      <Container className="py-section">
        <div className="max-w-xl">
          <p className="eyebrow">{t('about.teamTitle')}</p>
          <p className="mt-4 text-[0.875rem] leading-relaxed text-ink/65">{t('about.teamNote')}</p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {team.map((member, index) => (
            <div key={member.role.en} className="rounded-card border border-ink/10 bg-sand/25 p-6">
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-full border border-brass/40 font-display text-[0.9375rem] text-brass-deep"
              >
                {formatNumber(String(index + 1).padStart(2, '0'), lang)}
              </span>
              <h3 className="mt-5 font-body text-[1rem] font-medium">{member.role[lang]}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60">{member.note[lang]}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Photo strip */}
      <section aria-labelledby="strip-title" className="border-t border-ink/10 bg-sand/30 py-section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="strip-title" className="text-display-sm">
              {t('about.stripTitle')}
            </h2>
            <p className="text-[0.6875rem] text-ink/60">{t('about.stripNote')}</p>
          </div>
        </Container>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stripImages.map((image, index) => (
            <figure key={image.src} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26rem]">
              <div className="arch-mask-soft overflow-hidden bg-sand">
                <div className="aspect-[4/5]">
                  <SmartImage
                    src={image.src}
                    alt={image.alt[lang]}
                    sizes="(min-width: 1024px) 26rem, (min-width: 640px) 42vw, 68vw"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-[0.75rem] text-ink/60">
                {formatNumber(String(index + 1).padStart(2, '0'), lang)} · {t('about.stripCaption')}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ClosingBand
        eyebrow={t('about.closing.eyebrow')}
        title={t('about.closing.title')}
        body={t('about.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.about')}
        source="about_closing"
        primaryLabel={t('about.closing.primary')}
        note={t('about.closing.note')}
      />
    </>
  )
}
