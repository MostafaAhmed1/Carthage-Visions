import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import ClosingBand from '../components/cta/ClosingBand'
import OpenNowBadge from '../components/cta/OpenNowBadge'
import { PhoneIcon, WhatsAppIcon, MapPinIcon, MailIcon, ArrowIcon, ClockIcon } from '../components/ui/Icons'
import { buildWhatsAppLink, buildTelLink, displayPhone, plainPhone } from '../lib/whatsapp'
import { useQuote } from '../lib/quoteContext'
import { track } from '../lib/analytics'
import { paths } from '../lib/paths'
import shop, { isPlaceholder } from '../config/shop'

const ease = [0.22, 1, 0.36, 1]

export default function Contact() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const { openQuote } = useQuote()

  const { address, contact, coverage, hours } = shop
  const waHref = buildWhatsAppLink({
    context: t('wa.contexts.general'),
    lang,
    page: t('wa.pages.contact'),
  })
  const mapEmbed = `https://maps.google.com/maps?q=${address.geo.lat},${address.geo.lng}&z=15&output=embed`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: t('contact.eyebrow'),
      description: t('contact.lede'),
      url: `${shop.siteUrl}${paths.contact}`,
      about: {
        '@type': 'Store',
        name: shop.brand.name[lang],
        telephone: contact.phones[0]?.e164,
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          addressLocality: address.city[lang],
          addressRegion: address.region[lang],
          addressCountry: address.countryCode,
        },
        geo: { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        { '@type': 'ListItem', position: 2, name: t('nav.contact'), item: `${shop.siteUrl}${paths.contact}` },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.contact')} — ${shop.brand.name[lang]}`}
        description={t('contact.lede')}
        path={paths.contact}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.contact') }]} />
        }
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        lede={t('contact.lede')}
      />

      {/* The two biggest elements on the page */}
      <Container className="pb-16">
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <motion.a
            href={buildTelLink()}
            onClick={() => track('call_click', { source: 'contact_big', page: paths.contact })}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="group relative overflow-hidden rounded-card bg-ink p-7 text-ivory transition-colors hover:bg-ink-2 md:p-9"
          >
            <div
              className="pointer-events-none absolute inset-0 arabesque opacity-[0.04]"
              aria-hidden="true"
            />
            <div className="relative">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/20">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-display-sm">{t('contact.callTitle')}</h2>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/65">
                {t('contact.callBody')}
              </p>
              <p
                className="mt-6 font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-none tracking-tight"
                dir="ltr"
              >
                {displayPhone()}
              </p>
              <span className="mt-6 inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-ivory px-6 text-[0.9375rem] font-medium text-ink transition-transform duration-300 group-hover:-translate-y-0.5">
                <PhoneIcon className="h-4 w-4" />
                {t('common.callNow')}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </span>
            </div>
          </motion.a>

          <motion.a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track('whatsapp_click', { source: 'contact_big', context: t('wa.contexts.general'), lang })
            }
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="group relative overflow-hidden rounded-card bg-green p-7 text-ivory transition-colors hover:bg-green/90 md:p-9"
          >
            <div className="relative">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-ivory/25">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-display-sm">{t('contact.whatsappTitle')}</h2>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/75">
                {t('contact.whatsappBody')}
              </p>
              <p
                className="mt-6 font-display text-[clamp(1.75rem,4.2vw,2.75rem)] leading-none tracking-tight"
                dir="ltr"
              >
                {displayPhone()}
              </p>
              <span className="mt-6 inline-flex min-h-[3.25rem] items-center gap-2 rounded-full bg-ivory px-6 text-[0.9375rem] font-medium text-green transition-transform duration-300 group-hover:-translate-y-0.5">
                <WhatsAppIcon className="h-4 w-4" />
                {t('common.chatWithUs')}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </span>
            </div>
          </motion.a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-card border border-ink/10 bg-sand/30 px-6 py-4">
          <OpenNowBadge />
          <span className="text-[0.8125rem] text-ink/60">{hours.label[lang]}</span>
          <span className="hidden h-3 w-px bg-ink/15 sm:block" aria-hidden="true" />
          <span className="text-[0.8125rem] text-ink/65">{hours.note[lang]}</span>
        </div>
      </Container>

      {/* Details + map */}
      <section className="border-y border-ink/10 bg-sand/25">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-display-sm">{t('contact.addressTitle')}</h2>

              <address className="mt-6 flex items-start gap-3 not-italic text-[0.9375rem] leading-relaxed text-ink/75">
                <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass-deep" />
                <span>
                  {!isPlaceholder(address.street[lang]) ? (
                    <>
                      {address.street[lang]}
                      <br />
                    </>
                  ) : (
                    <span className="text-ink/60">[{t('common.address')}]</span>
                  )}
                  {address.city[lang]}، {address.region[lang]}
                  <br />
                  {address.country[lang]}
                </span>
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={address.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-ink/20 px-5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink/40"
                >
                  <MapPinIcon className="h-4 w-4" />
                  {t('contact.directions')}
                </a>
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 text-[0.8125rem] font-medium text-ink/60 transition-colors hover:text-ink"
                >
                  {t('common.viewOnMaps')}
                </a>
              </div>

              <dl className="mt-9 divide-y divide-ink/10 border-y border-ink/10">
                <div className="flex items-start gap-3 py-4">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
                      {t('contact.numberLabel')}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem]">
                      <a href={buildTelLink()} className="link-underline" dir="ltr">
                        {plainPhone()}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
                      {t('contact.emailTitle')}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem]" dir="ltr">
                      <a href={`mailto:${contact.email}`} className="link-underline break-all">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" />
                  <div>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
                      {t('contact.hoursTitle')}
                    </dt>
                    <dd className="mt-1 text-[0.9375rem] text-ink/75">{hours.label[lang]}</dd>
                    <dd className="mt-0.5 text-[0.8125rem] text-ink/65">{hours.note[lang]}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <h2 className="text-display-sm">{t('contact.mapTitle')}</h2>
              <div className="mt-6 overflow-hidden rounded-card border border-ink/10 bg-sand">
                <div className="aspect-[16/10] w-full">
                  <iframe
                    title={t('contact.mapTitle')}
                    src={mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0 grayscale-[0.35] contrast-[0.95]"
                  />
                </div>
              </div>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-ink/60">
                {t('contact.mapNote')}{' '}
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink/70"
                >
                  {t('contact.mapFallback')}
                </a>
              </p>

              <div className="mt-9">
                <p className="eyebrow">{t('contact.coverageTitle')}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {coverage.cities.map((city) => (
                    <li
                      key={city.en}
                      className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[0.75rem] text-ink/65"
                    >
                      {city[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quote builder entry — the only "form-like" thing, and it is not a form */}
      <Container className="py-section">
        <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-ink/10 bg-ivory p-7 md:flex-row md:items-center md:p-9">
          <div className="max-w-xl">
            <p className="eyebrow">{t('contact.quoteTitle')}</p>
            <h2 className="mt-3 text-display-sm">{t('contact.quoteCta')}</h2>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/60">{t('contact.quoteBody')}</p>
          </div>
          <Button
            variant="ink"
            size="lg"
            onClick={() => openQuote('contact')}
            iconEnd={<ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />}
          >
            {t('contact.quoteCta')}
          </Button>
        </div>
      </Container>

      <ClosingBand
        eyebrow={t('contact.closing.eyebrow')}
        title={t('contact.closing.title')}
        body={t('contact.closing.body')}
        context={t('wa.contexts.general')}
        page={t('wa.pages.contact')}
        source="contact_closing"
        primaryLabel={t('contact.closing.primary')}
        note={t('contact.closing.note')}
      />
    </>
  )
}
