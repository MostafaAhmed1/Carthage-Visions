import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import { usePauseOffscreen } from '../../hooks/useMedia'

const KEYS = ['one', 'two', 'three', 'four']

function QuoteCard({ item }) {
  return (
    <figure className="me-4 flex w-[19rem] shrink-0 flex-col justify-between rounded-card border border-ink/10 bg-ivory p-6 sm:me-5 sm:w-[23rem] sm:p-7">
      <blockquote className="text-[0.9375rem] leading-relaxed text-ink/75">
        <span aria-hidden="true" className="me-1 font-display text-[1.75rem] leading-none text-brass/70">
          &ldquo;
        </span>
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
        <span className="grid h-8 w-8 place-items-center rounded-full border border-brass/40 font-display text-[0.8125rem] text-brass-deep">
          {item.name.trim().charAt(0)}
        </span>
        <span className="text-[0.75rem] leading-tight">
          <span className="block font-medium text-ink/80">{item.name}</span>
          <span className="block text-ink/55">{item.place}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const isRtl = lang === 'ar'
  const trackRef = usePauseOffscreen()

  const items = KEYS.map((key) => ({
    quote: t(`testimonials.items.${key}.quote`),
    name: t(`testimonials.items.${key}.name`),
    place: t(`testimonials.items.${key}.place`),
  }))

  return (
    <section
      aria-label={t('testimonials.label')}
      className="relative border-y border-ink/10 bg-sand/40 py-16 md:py-20"
    >
      <Container className="mb-9 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{t('testimonials.eyebrow')}</p>
          <h2 className="mt-3 text-display-sm">{t('testimonials.label')}</h2>
        </div>
        <span className="hidden text-[0.6875rem] uppercase tracking-[0.16em] text-ink/50 sm:block">
          {t('a11y.marqueePaused')}
        </span>
      </Container>

      <div className="marquee">
        <div
          ref={trackRef}
          className={`marquee__track ps-4 pause-offscreen ${
            isRtl ? 'motion-safe:animate-marquee-rtl' : 'motion-safe:animate-marquee'
          }`}
          style={{ '--marquee-duration': '68s' }}
        >
          {items.map((item) => (
            <QuoteCard key={`a-${item.name}`} item={item} />
          ))}
          {items.map((item) => (
            <div key={`b-${item.name}`} aria-hidden="true" className="contents">
              <QuoteCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
