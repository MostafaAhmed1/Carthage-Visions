import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../../hooks/useMedia'

gsap.registerPlugin(ScrollTrigger)

/**
 * The one deliberate scroll moment in Phase 3: a vertical brass rail draws
 * itself downward as the three steps pass, and each step settles into place.
 * A vertical rail is used on purpose so the motion reads identically in RTL
 * and LTR — nothing needs mirroring.
 */
export default function SurveySteps({ steps = [], title }) {
  const reduced = usePrefersReducedMotion()
  const root = useRef(null)
  const rail = useRef(null)
  const items = useRef([])

  useEffect(() => {
    if (reduced || !root.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        },
      )

      items.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.35, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          },
        )
      })
    }, root)

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 500)

    return () => {
      window.clearTimeout(refresh)
      ctx.revert()
    }
  }, [reduced])

  return (
    <div ref={root} className="relative">
      <h2 className="text-display-md">{title}</h2>

      <ol className="relative mt-10 space-y-10 ps-10 md:space-y-12 md:ps-14">
        {/* static rail + drawn rail, both on the start edge */}
        <span
          aria-hidden="true"
          className="absolute inset-y-2 start-[0.9375rem] w-px bg-ink/10 md:start-[1.4375rem]"
        />
        <span
          ref={rail}
          aria-hidden="true"
          className="absolute inset-y-2 start-[0.9375rem] w-px origin-top bg-brass md:start-[1.4375rem]"
          style={{ transform: reduced ? 'scaleY(1)' : 'scaleY(0)' }}
        />

        {steps.map((step, index) => (
          <li
            key={step.title}
            ref={(el) => {
              items.current[index] = el
            }}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -start-10 top-0 grid h-8 w-8 place-items-center rounded-full border border-brass/50 bg-ivory font-display text-[0.8125rem] text-brass-deep md:-start-14 md:h-9 md:w-9 md:text-[0.875rem]"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-body text-[1.0625rem] font-medium text-ink">{step.title}</h3>
            <p className="mt-2 max-w-[30rem] text-[0.9375rem] leading-relaxed text-ink/65">{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
