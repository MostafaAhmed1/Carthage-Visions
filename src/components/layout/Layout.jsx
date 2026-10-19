import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import Footer from './Footer'
import Preloader from './Preloader'
import StickyMobileBar from '../cta/StickyMobileBar'
import FloatingWhatsApp from '../cta/FloatingWhatsApp'
import QuoteBuilder from '../cta/QuoteBuilder'
import { useLenis } from '../../hooks/useLenis'
import { scrollToId, scrollToTop } from '../../lib/scroll'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = window.setTimeout(() => scrollToId(id), 120)
      return () => window.clearTimeout(timer)
    }
    scrollToTop(true)
    return undefined
  }, [pathname, hash])

  return null
}

export default function Layout({ children }) {
  const { t } = useTranslation()
  useLenis()

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
      <StickyMobileBar />
      <FloatingWhatsApp />
      <QuoteBuilder />
    </>
  )
}
