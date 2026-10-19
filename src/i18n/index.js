import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en'
import ar from './locales/ar'
import shop from '../config/shop'

export const SUPPORTED = ['ar', 'en']
export const DEFAULT_LANG = 'ar'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED,
    // Arabic is the brand's first language: always start there unless the
    // visitor has chosen otherwise.
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'cv.lang',
      caches: [],
    },
    lng: readStoredLang() ?? DEFAULT_LANG,
    interpolation: { escapeValue: false },
    returnNull: false,
  })

export function readStoredLang() {
  try {
    const value = localStorage.getItem('cv.lang')
    return SUPPORTED.includes(value) ? value : null
  } catch {
    return null
  }
}

/** Keeps <html lang/dir>, storage and the document title in sync. */
export function applyLang(lang) {
  const next = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG
  const dir = next === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = next
  document.documentElement.dir = dir
  document.documentElement.dataset.lang = next
  try {
    localStorage.setItem('cv.lang', next)
  } catch {
    /* private mode — ignore */
  }
  // Let the browser style form controls/scrollbars in the right direction.
  document.body?.setAttribute('dir', dir)
  return next
}

export function brandName(lang) {
  return shop.brand.name[lang] ?? shop.brand.name.ar
}

export default i18n
