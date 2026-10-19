import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Layout from './components/layout/Layout'
import PageTransition from './components/layout/PageTransition'
import { QuoteProvider } from './lib/quoteContext'
import { initAnalytics, pageview } from './lib/analytics'
import shop from './config/shop'
import { applyLang } from './i18n'

const Home = lazy(() => import('./pages/Home'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteChangeTracker() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    pageview(location.pathname, document.title, i18n.language)
  }, [location.pathname, i18n.language])

  return null
}

function Fallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-ivory" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border border-ink/15 border-t-brass" />
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    initAnalytics(shop.analytics)
  }, [])

  useEffect(() => {
    applyLang(i18n.language)
    const onChanged = (lang) => applyLang(lang)
    i18n.on('languageChanged', onChanged)
    return () => i18n.off('languageChanged', onChanged)
  }, [i18n])

  return (
    <HelmetProvider>
      <QuoteProvider>
        <RouteChangeTracker />
        <Layout>
          <Suspense fallback={<Fallback />}>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </Layout>
      </QuoteProvider>
    </HelmetProvider>
  )
}
