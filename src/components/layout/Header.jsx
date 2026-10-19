import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import SectionLink from './SectionLink'
import Container from '../ui/Container'
import LanguageSwitch from '../ui/LanguageSwitch'
import WhatsAppButton from '../cta/WhatsAppButton'
import OpenNowBadge from '../cta/OpenNowBadge'
import CallButton from '../cta/CallButton'
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'
import { useQuote } from '../../lib/quoteContext'
import { useMediaQuery } from '../../hooks/useMedia'
import { buildWhatsAppLink, buildTelLink, displayPhone } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'
import { setScrollLocked } from '../../hooks/useLenis'

const NAV = [
  { id: 'solutions', key: 'nav.solutions' },
  { id: 'products', key: 'nav.products' },
  { id: 'how', key: 'nav.how' },
  { id: 'work', key: 'nav.work' },
  { id: 'faq', key: 'nav.faq' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openQuote } = useQuote()
  const isXl = useMediaQuery('(min-width: 1280px)')

  const onHome = location.pathname === '/'
  const transparent = onHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    setScrollLocked(menuOpen)
    return () => setScrollLocked(false)
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-calm ${
          transparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-ink/10 bg-ivory/90 backdrop-blur-xl'
        }`}
        style={{ height: 'var(--header-h)' }}
      >
        <Container className="flex h-full items-center justify-between gap-4">
          <Logo tone={transparent ? 'dark' : 'light'} compact />

          <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label={t('common.menu')}>
            {NAV.map((item) => (
              <SectionLink
                key={item.id}
                id={item.id}
                className={`link-underline text-[0.8125rem] font-medium transition-colors duration-300 ${
                  transparent ? 'text-ivory/80 hover:text-ivory' : 'text-ink/70 hover:text-ink'
                }`}
              >
                {t(item.key)}
              </SectionLink>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden md:block">
              <LanguageSwitch tone={transparent ? 'dark' : 'light'} />
            </div>

            <div className="hidden md:block">
              <CallButton
                source="header"
                variant={transparent ? 'outlineLight' : 'outline'}
                size="sm"
                label={isXl ? displayPhone() : ''}
                className={isXl ? '' : 'px-3.5'}
                copyOnClick
              />
            </div>

            <div className="hidden md:block">
              <WhatsAppButton
                source="header"
                context={t('wa.contexts.general')}
                label={t('common.whatsapp')}
                size="sm"
              />
            </div>

            <button
              type="button"
              onClick={() => openQuote('header')}
              className={`hidden rounded-full px-3 text-[0.8125rem] font-medium transition-colors xl:inline-block ${
                transparent ? 'text-ivory/75 hover:text-ivory' : 'text-ink/65 hover:text-ink'
              }`}
            >
              {t('common.requestQuote')}
            </button>

            <button
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
                transparent ? 'border-ivory/25 text-ivory' : 'border-ink/15 text-ink'
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label={t('common.menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ivory lg:hidden"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-[var(--header-h)] items-center justify-between px-5">
              <Logo compact />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t('common.close')}
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label={t('common.menu')}>
              {NAV.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SectionLink
                    id={item.id}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-[2rem] leading-tight text-ink"
                  >
                    {t(item.key)}
                  </SectionLink>
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-ink/10 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <OpenNowBadge />
                <LanguageSwitch />
              </div>
              <div className="grid gap-2.5">
                <a
                  href={buildWhatsAppLink({
                    context: t('wa.contexts.general'),
                    lang,
                    page: t('wa.pages.home'),
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'mobile_menu', lang })}
                  className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-green font-medium text-ivory"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t('common.whatsappUs')}
                </a>
                <a
                  href={buildTelLink()}
                  onClick={() => track('call_click', { source: 'mobile_menu' })}
                  className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-ink/20 font-medium text-ink"
                >
                  <PhoneIcon className="h-[1.15rem] w-[1.15rem]" />
                  {displayPhone()}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    openQuote('mobile_menu')
                  }}
                  className="pt-2 text-start text-small text-ink/55"
                >
                  {t('quote.open')} →
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
