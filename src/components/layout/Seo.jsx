import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import shop, { isPlaceholder } from '../../config/shop'
import media from '../../config/media'

/**
 * Per-page SEO + Open Graph + hreflang + LocalBusiness JSON-LD.
 * Only pages that exist are advertised as alternates.
 */
export default function Seo({ title, description, path = '/', jsonLd = null, noindex = false }) {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const url = `${shop.siteUrl}${path}`
  const fullTitle = title ?? `${shop.brand.name[lang]} — ${shop.brand.tagline[lang]}`
  const desc = description ?? shop.brand.shortDescription[lang]
  const image = `${shop.siteUrl}${media.og.src}`

  const DAY_NAMES = {
    sun: 'Sunday',
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
  }
  const openingHours = Object.entries(shop.hours.week)
    .filter(([, value]) => Boolean(value))
    .map(([day, value]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_NAMES[day],
      opens: value.open,
      closes: value.close === '24:00' ? '23:59' : value.close,
    }))

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'SecuritySystemInstallationService'],
    '@id': `${shop.siteUrl}/#business`,
    name: shop.brand.name[lang],
    alternateName: shop.brand.name[lang === 'ar' ? 'en' : 'ar'],
    description: shop.brand.shortDescription[lang],
    url,
    image,
    telephone: shop.contact.phones[0]?.e164,
    email: shop.contact.email,
    priceRange: 'OMR',
    currenciesAccepted: 'OMR',
    address: {
      '@type': 'PostalAddress',
      ...(isPlaceholder(shop.address.street[lang]) ? null : { streetAddress: shop.address.street[lang] }),
      addressLocality: shop.address.city[lang],
      addressRegion: shop.address.region[lang],
      addressCountry: shop.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: shop.address.geo.lat,
      longitude: shop.address.geo.lng,
    },
    openingHoursSpecification: openingHours,
    areaServed: shop.coverage.cities.map((c) => ({ '@type': 'City', name: c[lang] })),
    sameAs: Object.values(shop.social).filter(Boolean),
    ...(shop.rating.value
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: shop.rating.value,
            reviewCount: shop.rating.count,
          },
        }
      : null),
  }

  return (
    <Helmet>
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {!noindex ? <link rel="alternate" hrefLang="ar" href={`${shop.siteUrl}/`} /> : null}
      {!noindex ? <link rel="alternate" hrefLang="en" href={`${shop.siteUrl}/?lang=en`} /> : null}
      {!noindex ? <link rel="alternate" hrefLang="x-default" href={`${shop.siteUrl}/`} /> : null}
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={shop.brand.name[lang]} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_OM' : 'en_OM'} />
      <meta property="og:locale:alternate" content={lang === 'ar' ? 'en_OM' : 'ar_OM'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      <meta name="geo.region" content="OM" />
      <meta name="geo.placename" content={shop.address.city[lang]} />

      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  )
}
