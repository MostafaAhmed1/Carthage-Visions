import { useEffect, useState } from 'react'

/**
 * Checks that the GLB really exists (and is not the SPA's HTML fallback)
 * before we load three.js. Missing model → poster image, no console errors.
 */
export function useHeroModel(src) {
  const [state, setState] = useState('checking')

  useEffect(() => {
    let cancelled = false
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (cancelled) return
        const type = res.headers.get('content-type') ?? ''
        const isModel = res.ok && !type.includes('text/html')
        setState(isModel ? 'ready' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setState('missing')
      })

    return () => {
      cancelled = true
    }
  }, [src])

  return state
}
