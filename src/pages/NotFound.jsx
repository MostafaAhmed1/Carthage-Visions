import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../components/ui/Container'
import Seo from '../components/layout/Seo'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CallButton from '../components/cta/CallButton'
import OpenNowBadge from '../components/cta/OpenNowBadge'
import { ArrowIcon } from '../components/ui/Icons'
import { paths } from '../lib/paths'

/**
 * 404 — quiet, on-brand, and still conversion-first: the two largest actions
 * are the ones that reach a person. No search box, no sitemap dump.
 */
export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={`404 — ${t('notFound.title')}`} noindex />
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory">
        <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.04]" aria-hidden="true" />
        <Container className="relative py-32">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" aria-hidden="true">
              <path
                d="M32 8c11 0 18 8.4 18 20V56H14V28C14 16.4 21 8 32 8Z"
                stroke="rgb(176 141 87)"
                strokeWidth="1.2"
              />
              <circle cx="32" cy="30" r="7" stroke="rgb(176 141 87)" strokeWidth="1" />
              <circle cx="32" cy="30" r="2.4" fill="rgb(176 141 87)" />
            </svg>

            <p className="mt-8 font-display text-[0.875rem] uppercase tracking-[0.3em] text-brass-deep">
              {t('notFound.eyebrow')}
            </p>
            <h1 className="mt-4 text-display-lg">{t('notFound.title')}</h1>
            <p className="mt-5 max-w-md text-lede text-ink/60">{t('notFound.body')}</p>

            <div className="mt-9 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                source="404"
                context={t('wa.contexts.general')}
                page={t('wa.pages.home')}
                label={t('common.whatsappUs')}
                size="lg"
                className="flex-1"
              />
              <CallButton
                source="404"
                label={t('common.callNow')}
                variant="outline"
                size="lg"
                className="flex-1"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link
                to={paths.home}
                className="group inline-flex items-center gap-2 text-[0.875rem] font-medium text-ink/70 transition-colors hover:text-ink"
              >
                <ArrowIcon className="h-4 w-4 rotate-180 rtl:-scale-x-100" />
                {t('notFound.primary')}
              </Link>
              <Link
                to={paths.blog}
                className="link-underline text-[0.875rem] font-medium text-ink/65 transition-colors hover:text-ink"
              >
                {t('nav.blog')}
              </Link>
            </div>

            <div className="mt-8">
              <OpenNowBadge />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
