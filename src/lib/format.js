import shop from '../config/shop'

/**
 * One place that decides how numbers look.
 * `shop.formatting.numerals` is 'western' by default: Omani customers dial and
 * type Western digits, so a phone number or a price written ٩٦٨ would be a
 * usability problem, not a flourish.
 */
export const NUMERALS = shop.formatting?.numerals ?? 'western'

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/** 42 → '٤٢' when Arabic-Indic is configured, otherwise '42'. */
export function localizeDigits(value, lang = 'ar') {
  const text = String(value ?? '')
  if (NUMERALS !== 'arabic-indic' || lang !== 'ar') return text
  return text.replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)])
}

/** Numbers inside sentences (counts, reading time, camera totals). */
export function formatNumber(value, lang = 'ar') {
  return localizeDigits(value, lang)
}

/** Long dates, e.g. "18 September 2026" / "١٨ سبتمبر ٢٠٢٦". */
export function formatDate(iso, lang = 'ar') {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(date.getTime())) return iso
  try {
    return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-OM' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
      numberingSystem: NUMERALS === 'arabic-indic' && lang === 'ar' ? 'arab' : 'latn',
    }).format(date)
  } catch {
    return iso
  }
}

/** A human "3 min" style duration, localised. */
export function formatMinutes(minutes, lang = 'ar', t) {
  const value = formatNumber(minutes, lang)
  return t ? t('blog.readingTime', { count: value }) : `${value} min`
}
