import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Seo from '../components/layout/Seo'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import { ArrowIcon } from '../components/ui/Icons'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={`404 — ${t('notFound.title')}`} noindex />
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ivory">
        <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.04]" aria-hidden="true" />
        <Container className="relative py-32 text-center">
          <div className="mx-auto flex max-w-xl flex-col items-center">
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

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex min-h-[3rem] items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-ivory transition-colors hover:bg-ink-2"
              >
                {t('notFound.primary')}
                <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
              <WhatsAppButton
                source="404"
                context={t('wa.contexts.consultation')}
                label={t('notFound.secondary')}
                variant="outline"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
