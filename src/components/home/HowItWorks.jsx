import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import WhatsAppButton from '../cta/WhatsAppButton'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

gsap.registerPlugin(ScrollTrigger)

const KEYS = ['one', 'two', 'three']

/**
 * The one scroll-driven GSAP moment on the page: a brass line draws itself as
 * the three steps pass, and the current step lifts into focus.
 * Uses CSS sticky (no pinning) so Lenis and mobile browsers stay predictable.
 */
export default function HowItWorks() {
  const { t } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const root = useRef(null)
  const track = useRef(null)
  const line = useRef(null)
  const stepEls = useRef([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced || !root.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: track.current,
            start: 'top 62%',
            end: 'bottom 78%',
            scrub: 0.7,
          },
        },
      )

      stepEls.current.filter(Boolean).forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 68%',
          end: 'bottom 42%',
          onToggle: (self) => {
            if (self.isActive) setActive(index)
          },
        })
      })
    }, root)

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      window.clearTimeout(refresh)
      ctx.revert()
    }
  }, [reduced])

  return (
    <section id="how" ref={root} className="relative scroll-mt-header overflow-hidden bg-ink text-ivory">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 arabesque opacity-[0.035]" />
        <div className="absolute -end-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-brass/[0.07] blur-[120px]" />
      </div>

      <Container className="relative py-section">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
              <p className="eyebrow eyebrow-light">{t('steps.eyebrow')}</p>
              <h2 className="mt-5 text-display-md">{t('steps.title')}</h2>
              <p className="mt-5 max-w-prose text-lede text-ivory/65">{t('steps.lede')}</p>
              <p className="mt-8 flex items-start gap-3 text-[0.8125rem] text-ivory/55">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" aria-hidden="true" />
                {t('steps.note')}
              </p>
              <div className="mt-10">
                <WhatsAppButton
                  source="how_it_works"
                  context={t('wa.contexts.survey')}
                  label={t('common.requestQuote')}
                />
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            {/* progress rail */}
            <div className="absolute inset-y-0 start-0 hidden w-px bg-ivory/10 lg:block" aria-hidden="true">
              <div
                ref={line}
                className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-brass via-brass to-brass/30"
                style={{ transform: 'scaleY(0)' }}
              />
            </div>

            <ol ref={track} className="space-y-16 lg:space-y-0 lg:ps-12">
              {KEYS.map((key, index) => {
                const isActive = active === index
                return (
                  <li
                    key={key}
                    ref={(el) => {
                      stepEls.current[index] = el
                    }}
                    className="lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center"
                  >
                    <div
                      className={`transition-opacity duration-700 ease-calm ${
                        isActive || reduced ? 'opacity-100' : 'lg:opacity-45'
                      }`}
                    >
                      <span
                        className={`font-display text-[2.5rem] leading-none transition-colors duration-700 ${
                          isActive || reduced ? 'text-brass' : 'text-ivory/25'
                        }`}
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-5 text-display-sm text-ivory">{t(`steps.items.${key}.title`)}</h3>
                      <p className="mt-3 max-w-[28rem] text-[0.9375rem] leading-relaxed text-ivory/60">
                        {t(`steps.items.${key}.body`)}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
