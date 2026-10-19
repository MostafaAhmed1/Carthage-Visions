/**
 * ============================================================================
 *  SHOP CONFIGURATION — single source of truth.
 *  Everything marked `TODO` is a placeholder. Replace it here and the whole
 *  site (header, footer, WhatsApp messages, JSON-LD, hours badge) updates.
 * ============================================================================
 */

export const shop = {
  /* Brand ------------------------------------------------------------------ */
  brand: {
    name: { en: 'Carthage Visions', ar: 'قرطاج فيجن' },
    // TODO: confirm the official tagline (owner to review the Arabic wording).
    tagline: {
      en: 'Quiet security for the places you love.',
      ar: 'أمانٌ هادئ لما تُحبّ.',
    },
    shortDescription: {
      en: 'Security camera systems for homes, shops and sites across Oman.',
      ar: 'أنظمة كاميرات مراقبة للمنازل والمحلات والمواقع في سلطنة عُمان.',
    },
    // Set this to '/logo.svg' (or /your-logo.svg) to use an image logo instead
    // of the built-in typographic lockup. Leave null to use the wordmark.
    logoImage: null,
    logoMark: '/logo-mark.svg',
  },

  /**
   * Contact details.
   * TODO: replace both numbers. `e164` must be digits only, starting with 968.
   */
  contact: {
    phones: [
      {
        label: { en: 'Sales & support', ar: 'المبيعات والدعم' },
        display: '+968 9XXX XXXX',
        e164: '+96890000000',
      },
    ],
    whatsapp: { display: '+968 9XXX XXXX', digits: '96890000000' },
    email: 'hello@carthagevisions.om', // TODO: confirm email (placeholder domain)
  },

  /* Location --------------------------------------------------------------- */
  address: {
    // TODO: replace with the exact shop / showroom address.
    street: { en: '[TODO: street / building]', ar: '[TODO: الشارع / المبنى]' },
    city: { en: 'Barka', ar: 'بركاء' },
    region: { en: 'Al Batinah South', ar: 'جنوب الباطنة' },
    country: { en: 'Oman', ar: 'سلطنة عُمان' },
    countryCode: 'OM',
    geo: { lat: 23.6785, lng: 57.8869 }, // Barka centre — approximate, TODO confirm
    // TODO: paste the exact Google Maps place link.
    mapsUrl: 'https://maps.google.com/?q=Barka,Oman',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Barka,Oman',
  },

  /**
   * Opening hours in Asia/Muscat.
   * `open` / `close` are 24h strings. `close: '24:00'` (or open === close) = 24h.
   * `null` = closed that day.
   * Confirmed: the shop is open every day. Adjust per day if that changes.
   */
  hours: {
    timezone: 'Asia/Muscat',
    label: { en: 'Open every day', ar: 'مفتوح كل يوم' },
    alwaysOpen: true,
    week: {
      sun: { open: '00:00', close: '24:00' },
      mon: { open: '00:00', close: '24:00' },
      tue: { open: '00:00', close: '24:00' },
      wed: { open: '00:00', close: '24:00' },
      thu: { open: '00:00', close: '24:00' },
      fri: { open: '00:00', close: '24:00' },
      sat: { open: '00:00', close: '24:00' },
    },
    // Shown in the footer next to the weekly hours.
    note: {
      en: 'After-hours? We reply on WhatsApp.',
      ar: 'خارج أوقات العمل؟ نرد عليك على واتساب.',
    },
  },

  /* Coverage --------------------------------------------------------------- */
  coverage: {
    cities: [
      { en: 'Barka', ar: 'بركاء' },
      { en: 'Muscat', ar: 'مسقط' },
      { en: 'Al Batinah South', ar: 'جنوب الباطنة' },
      { en: 'Sohar', ar: 'صحار' },
      { en: 'Nizwa', ar: 'نزوى' },
    ],
    nationwideInstallation: true, // TODO: confirm whether installation outside the home city is offered.
  },

  /* What we sell / do ------------------------------------------------------ */
  categories: ['cctv', 'ip-ptz', 'nvr-dvr', 'access-control', 'alarms', 'intercom', 'smart-home'],
  brands: [], // TODO: add the brands you are authorised to sell (they also feed JSON-LD).
  services: ['survey', 'installation', 'maintenance', 'remote-viewing'],

  /**
   * Reassurance microcopy. Only claims confirmed by the owner are enabled.
   * Confirmed 2026-10: all three.
   */
  reassurances: {
    freeSurvey: true,
    replyWithinMinutes: true,
    installationAndWarranty: true,
  },

  /* Social ----------------------------------------------------------------- */
  social: {
    instagram: '', // TODO
    facebook: '', // TODO
    tiktok: '', // TODO
    google: '', // TODO: Google Business Profile link
  },

  rating: {
    // TODO: add the real rating + review count, or set to null to hide.
    value: null,
    count: null,
  },

  /* Legal ------------------------------------------------------------------ */
  legal: {
    // TODO: add CR number (سجل تجاري) and any licensing text you want displayed.
    crNumber: '',
    licence: '',
    copyrightYear: 2026,
  },

  /* Analytics -------------------------------------------------------------- */
  analytics: {
    ga4Id: '', // e.g. 'G-XXXXXXXXXX'
    metaPixelId: '', // e.g. '123456789012345'
    debug: import.meta.env.DEV,
  },

  /* Feature flags ---------------------------------------------------------- */
  features: {
    threeD: true, // hero uses /models/hero-camera.glb when available
    lenis: true,
    testimonialsMarquee: true,
    partnersMarquee: false, // enable once partner logos/brands are confirmed
  },

  siteUrl: 'https://carthagevisions.om', // TODO: production domain
}

export const isPlaceholder = (value) => typeof value === 'string' && value.includes('TODO')

if (import.meta.env.DEV) {
  const pending = []
  if (isPlaceholder(shop.address.street.en)) pending.push('address.street')
  if (shop.contact.phones.some((p) => p.e164.endsWith('0000000'))) pending.push('contact.phones')
  if (shop.contact.whatsapp.digits.endsWith('0000000')) pending.push('contact.whatsapp')
  if (!shop.brands.length) pending.push('brands')
  if (!shop.legal.crNumber) pending.push('legal.crNumber')
  if (pending.length) {
    console.info(
      `%c[shop.js] Placeholders still in use: ${pending.join(', ')}. Edit src/config/shop.js.`,
      'color:#b08d57',
    )
  }
}

export default shop
