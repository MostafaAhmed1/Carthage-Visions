import { useEffect } from 'react'
import Lenis from 'lenis'
import shop from '../config/shop'
import { usePrefersReducedMotion } from './useMedia'

/**
 * Smooth scroll. Off for reduced motion, off when the feature flag is false.
 * Exposes window.__lenis for components that need to pause (sheets/modals).
 */
export function useLenis() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !shop.features.lenis) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
      autoRaf: true,
    })

    window.__lenis = lenis
    lenis.on('scroll', () => window.dispatchEvent(new Event('lenis:scroll')))

    return () => {
      lenis.destroy()
      delete window.__lenis
    }
  }, [reduced])
}

/** Lock/unlock page scroll for overlays, whether Lenis is running or not. */
export function setScrollLocked(locked) {
  if (typeof document === 'undefined') return
  const lenis = window.__lenis
  if (locked) {
    lenis?.stop()
    document.body.style.overflow = 'hidden'
  } else {
    lenis?.start()
    document.body.style.overflow = ''
  }
}
