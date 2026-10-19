import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import Footer from './Footer'
import Preloader from './Preloader'
import StickyMobileBar from '../cta/StickyMobileBar'
import FloatingWhatsApp from '../cta/FloatingWhatsApp'
import QuoteBuilder from '../cta/QuoteBuilder'
import CookieBanner from './CookieBanner'
import { useLenis } from '../../hooks/useLenis'
import { scrollToId, scrollToTop } from '../../lib/scroll'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      scrollToTop(true)
      return undefined
    }

    // The target may live on a lazily-loaded page, so retry briefly instead of
    // scrolling once into an empty document.
    const id = hash.replace('#', '')
    let attempts = 0
    let timer

    const tryScroll = () => {
      attempts += 1
      if (document.getElementById(id)) {
        scrollToId(id)
        return
      }
      if (attempts < 12) timer = window.setTimeout(tryScroll, 100)
    }

    timer = window.setTimeout(tryScroll, 80)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default function Layout({ children }) {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  useLenis()

  // Product pages carry their own product-specific sticky bar.
  const hasProductBar = /^\/products\/[^/]+\/[^/]+/.test(pathname)

  return (
    <>
      {/* Arch clip-path, used by image masks across the site */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <defs>
          <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,1 L0,0.44 C0,0.17 0.22,0.01 0.5,0.01 C0.78,0.01 1,0.17 1,0.44 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>

      <Preloader />
      <ScrollManager />
      <Header />

      <main id="main">{children}</main>

      <Footer />
      {hasProductBar ? null : <StickyMobileBar />}
      <FloatingWhatsApp />
      <QuoteBuilder />
      <CookieBanner />
    </>
  )
}
