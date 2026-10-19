import { lazy, Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Container from '../ui/Container'
import SmartImage from '../ui/SmartImage'
import WhatsAppButton from '../cta/WhatsAppButton'
import CallButton from '../cta/CallButton'
import OpenNowBadge from '../cta/OpenNowBadge'
import ErrorBoundary from '../layout/ErrorBoundary'
import { ArrowDownIcon } from '../ui/Icons'
import media from '../../config/media'
import shop from '../../config/shop'
import { useHeroModel } from '../../hooks/useHeroModel'
import { useMediaQuery, usePauseOffscreen, usePrefersReducedMotion } from '../../hooks/useMedia'
import { scrollToId } from '../../lib/scroll'

const HeroScene = lazy(() => import('../three/HeroScene'))

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduced = usePrefersReducedMotion()
  const modelState = useHeroModel(media.model.src)
  const archRef = useRef(null)
  const sectionRef = usePauseOffscreen()
  const [inView, setInView] = useState(true)

  const show3D = shop.features.threeD && isDesktop && !reduced && modelState === 'ready'

  useEffect(() => {
    const node = archRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '160px',
    })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const reassurance = useMemo(
    () =>
      [
        shop.reassurances.freeSurvey && t('common.freeSurvey'),
        shop.reassurances.replyWithinMinutes && t('common.replyMinutes'),
        shop.reassurances.installationAndWarranty && t('common.installationWarranty'),
      ].filter(Boolean),
    [t],
  )

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-ink text-ivory">
      {/* Ambient light + one very quiet arabesque layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -inset-x-20 -top-40 h-[70vh] bg-[radial-gradient(60%_60%_at_70%_35%,rgb(176_141_87_/_0.16),transparent_70%)]" />
        <div className="pause-offscreen absolute inset-0 arabesque opacity-[0.05] motion-safe:animate-drift" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="grain absolute inset-0" />
      </div>

      <Container className="relative flex min-h-[100svh] flex-col justify-center pb-16 pt-[calc(var(--header-h)+3rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+4rem)]">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-7 lg:pe-6">
            <motion.p
              className="mb-7 flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-brass-soft/90"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={0}
            >
              <span className="h-px w-8 bg-brass/50" aria-hidden="true" />
              {t('hero.eyebrow')}
            </motion.p>

            <motion.h1
              className="text-display-xl text-ivory"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={1}
              style={lang === 'ar' ? { lineHeight: 1.18, letterSpacing: '0' } : undefined}
            >
              <span className="block">{t('hero.title')}</span>
              <span
                className={`block text-brass-soft ${lang === 'en' ? 'italic' : ''}`}
                style={lang === 'ar' ? { lineHeight: 1.35 } : undefined}
              >
                {t('hero.titleAccent')}
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-[34rem] text-lede leading-relaxed text-ivory/70"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={2}
            >
              {t('hero.lede')}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={3}
            >
              <WhatsAppButton
                source="hero"
                context={t('wa.contexts.consultation')}
                label={t('hero.ctaPrimary')}
                size="lg"
              />
              <CallButton
                source="hero"
                label={t('hero.ctaSecondary')}
                variant="outlineLight"
                size="lg"
              />
            </motion.div>

            <motion.ul
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] text-ivory/50"
              variants={fade}
              initial="hidden"
              animate="show"
              custom={4}
            >
              {reassurance.map((item, index) => (
                <li key={item} className="flex items-center gap-2">
                  {index > 0 ? <span className="h-1 w-1 rounded-full bg-brass/60" aria-hidden="true" /> : null}
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual — arch-masked 3D camera, poster fallback */}
          <motion.div
            className="relative lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[26rem] lg:max-w-none">
              {/* warm halo */}
              <div
                className="absolute inset-x-4 -bottom-6 top-6 rounded-[50%] bg-brass/10 blur-[70px]"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
                {[
                  { top: '12%', start: '8%', size: 5, delay: '0s', duration: '13s' },
                  { top: '38%', start: '86%', size: 3, delay: '-4s', duration: '17s' },
                  { top: '64%', start: '14%', size: 4, delay: '-8s', duration: '15s' },
                  { top: '82%', start: '72%', size: 3, delay: '-2s', duration: '19s' },
                ].map((dot, index) => (
                  <span
                    key={index}
                    className="pause-offscreen absolute rounded-full bg-brass-soft/50 blur-[1px] motion-safe:animate-float"
                    style={{
                      top: dot.top,
                      insetInlineStart: dot.start,
                      width: dot.size,
                      height: dot.size,
                      animationDelay: dot.delay,
                      animationDuration: dot.duration,
                    }}
                  />
                ))}
              </div>

              <div ref={archRef} className="relative arch-mask bg-gradient-to-b from-brass/70 via-brass/30 to-brass/60 p-[1.5px]">
                <div className="arch-mask relative aspect-[3/4] overflow-hidden bg-ink-2 lg:aspect-[4/5]">
                  {show3D && inView ? (
                    <ErrorBoundary
                      fallback={
                        <SmartImage
                          src={media.hero.poster}
                          alt={media.hero.alt[lang]}
                          priority
                          sizes="(min-width: 1024px) 40vw, 90vw"
                        />
                      }
                    >
                      <Suspense
                        fallback={
                          <SmartImage
                            src={media.hero.poster}
                            alt={media.hero.alt[lang]}
                            priority
                            sizes="(min-width: 1024px) 40vw, 90vw"
                          />
                        }
                      >
                        <div className="absolute inset-0">
                          <HeroScene src={media.model.src} reduced={reduced} />
                        </div>
                      </Suspense>
                    </ErrorBoundary>
                  ) : (
                    <SmartImage
                      src={media.hero.poster}
                      alt={media.hero.alt[lang]}
                      priority
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      imgClassName="scale-[1.02] motion-safe:animate-[haze_22s_ease-in-out_infinite]"
                    />
                  )}

                  {/* lens-scan glow, very low intensity */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                    <div className="absolute inset-y-0 start-0 w-1/3 pause-offscreen bg-gradient-to-r from-transparent via-ivory/[0.10] to-transparent blur-md motion-safe:animate-scan" />
                  </div>

                  <div className="vignette pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
                </div>
              </div>

              {/* Small studio plaque */}
              <div className="absolute inset-x-0 -bottom-5 mx-auto flex w-max items-center gap-3 rounded-full border border-ivory/12 bg-ink/80 px-4 py-2 backdrop-blur-md">
                <OpenNowBadge tone="dark" />
                <span className="h-3 w-px bg-ivory/15" aria-hidden="true" />
                <span className="text-[0.6875rem] text-ivory/50">{t('hero.caption')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={() => scrollToId('trust')}
          className="mt-16 hidden items-center gap-2 self-center text-[0.6875rem] uppercase tracking-[0.2em] text-ivory/55 transition-colors hover:text-ivory/70 lg:mt-20 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          aria-label={t('a11y.scrollHint')}
        >
          {t('hero.scroll')}
          <ArrowDownIcon className="h-3.5 w-3.5 motion-safe:animate-float" />
        </motion.button>
      </Container>
    </section>
  )
}
