import shop from '../config/shop'

const digitsOf = (value) => String(value || '').replace(/[^\d]/g, '')

/**
 * The single WhatsApp entry point for the whole site.
 * Produces https://wa.me/<digits>?text=<encoded, localised message>
 *
 * @param {object}  options
 * @param {string}  options.context  Localised context (product, service, page…).
 * @param {'ar'|'en'} options.lang   Visitor's language.
 * @param {string} [options.page]    Localised page/placement reference.
 * @param {string} [options.rawText] Full message body, used by the quote builder.
 * @returns {string} URL
 */
export function buildWhatsAppLink({ context, lang = 'ar', page, rawText } = {}) {
  const number = digitsOf(shop.contact.whatsapp.digits)
  const brand = shop.brand.name[lang] ?? shop.brand.name.ar

  const body =
    rawText ||
    (context
      ? lang === 'ar'
        ? `أرغب بمعرفة المزيد عن: ${context}`
        : `I'd like to know more about: ${context}`
      : lang === 'ar'
        ? 'أرغب بمعرفة المزيد عن أنظمة الكاميرات.'
        : "I'd like to know more about your camera systems.")

  const lines =
    lang === 'ar'
      ? [
          `السلام عليكم ${brand} 🌿`,
          body,
          page ? `— وصلت إليكم من ${page}` : null,
          'شكراً لكم.',
        ]
      : [`Hello ${brand} 🌿`, body, page ? `— I came from ${page}` : null, 'Thank you.']

  const text = lines.filter(Boolean).join('\n')
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}

/** tel: href for a given or default phone entry. */
export function buildTelLink(phone) {
  const raw = phone ?? shop.contact.phones[0]?.e164 ?? ''
  return `tel:${raw.replace(/\s+/g, '')}`
}

/** Human-friendly number for the currently visible phone. */
export function displayPhone(phone) {
  return (phone ?? shop.contact.phones[0])?.display ?? ''
}

/** Digits-only number for copying to the clipboard. */
export function plainPhone(phone) {
  return String((phone ?? shop.contact.phones[0])?.e164 ?? '').replace(/\s+/g, '')
}

/**
 * Open a WhatsApp link safely. Uses a new tab on desktop; same tab on mobile is
 * friendlier because the OS hands off to the app.
 */
export function openWhatsApp(url) {
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent)
  if (isMobile) window.location.href = url
  else window.open(url, '_blank', 'noopener,noreferrer')
}
