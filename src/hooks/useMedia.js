import { useEffect, useRef, useState } from 'react'

/** Media query hook that stays in sync. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** Adds `is-visible` while the element is on screen so CSS loops can pause. */
export function usePauseOffscreen() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([entry]) => node.classList.toggle('is-visible', entry.isIntersecting),
      { rootMargin: '120px' },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return ref
}

/** Small staggered "in view" flag for entrance animations. */
export function useInViewOnce(options = { threshold: 0.25 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, options)
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return [ref, inView]
}
