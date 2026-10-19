import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Layout from './components/layout/Layout'
import PageTransition from './components/layout/PageTransition'
import { PageSkeleton, DetailSkeleton } from './components/ui/Skeleton'
import { QuoteProvider } from './lib/quoteContext'
import { initAnalytics, pageview } from './lib/analytics'
import { readConsent, CONSENT_EVENT } from './lib/consent'
import shop from './config/shop'
import { applyLang } from './i18n'

const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductCategory = lazy(() => import('./pages/ProductCategory'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Packages = lazy(() => import('./pages/Packages'))
const Brands = lazy(() => import('./pages/Brands'))
const Solutions = lazy(() => import('./pages/Solutions'))
const SolutionDetail = lazy(() => import('./pages/SolutionDetail'))
const Services = lazy(() => import('./pages/Services'))
const SiteSurvey = lazy(() => import('./pages/SiteSurvey'))
const Support = lazy(() => import('./pages/Support'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Faq = lazy(() => import('./pages/Faq'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteChangeTracker() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    pageview(location.pathname, document.title, i18n.language)
  }, [location.pathname, i18n.language])

  return null
}

const page = (element, fallback = <PageSkeleton />) => (
  <PageTransition>
    <Suspense fallback={fallback}>{element}</Suspense>
  </PageTransition>
)

export default function App() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const [consent, setConsent] = useState(() => readConsent())

  // Analytics only ever loads after an explicit "accept" in the banner.
  useEffect(() => {
    if (consent === 'accepted') initAnalytics(shop.analytics)
  }, [consent])

  useEffect(() => {
    const onChange = (event) => setConsent(event.detail)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  useEffect(() => {
    applyLang(i18n.language)
    const onChanged = (lang) => applyLang(lang)
    i18n.on('languageChanged', onChanged)
    return () => i18n.off('languageChanged', onChanged)
  }, [i18n])

  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <QuoteProvider>
          <RouteChangeTracker />
          <Layout>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={page(<Home />)} />
                <Route path="/products" element={page(<Products />)} />
                <Route path="/products/:category" element={page(<ProductCategory />)} />
                <Route
                  path="/products/:category/:slug"
                  element={page(<ProductDetail />, <DetailSkeleton />)}
                />
                <Route path="/solutions" element={page(<Solutions />)} />
                <Route path="/solutions/:slug" element={page(<SolutionDetail />, <DetailSkeleton />)} />
                <Route path="/services" element={page(<Services />)} />
                <Route path="/site-survey" element={page(<SiteSurvey />)} />
                <Route path="/support" element={page(<Support />)} />
                <Route path="/projects" element={page(<Projects />)} />
                <Route path="/projects/:slug" element={page(<ProjectDetail />, <DetailSkeleton />)} />
                <Route path="/packages" element={page(<Packages />)} />
                <Route path="/brands" element={page(<Brands />)} />
                <Route path="/about" element={page(<About />)} />
                <Route path="/blog" element={page(<Blog />)} />
                <Route path="/blog/:slug" element={page(<BlogPost />, <DetailSkeleton />)} />
                <Route path="/faq" element={page(<Faq />)} />
                <Route path="/contact" element={page(<Contact />)} />
                <Route path="/privacy" element={page(<Privacy />)} />
                <Route path="/terms" element={page(<Terms />)} />
                <Route path="*" element={page(<NotFound />)} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </QuoteProvider>
      </MotionConfig>
    </HelmetProvider>
  )
}
