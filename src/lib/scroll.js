/** Scroll to an in-page section, honouring the sticky header and reduced motion. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const headerOffset = 88
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset

  if (window.__lenis) {
    window.__lenis.scrollTo(top, { duration: reduced ? 0 : 1.2 })
    return
  }

  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

export function scrollToTop(instant = true) {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: instant })
    return
  }
  window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })
}
