import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { track } from './analytics'

const QuoteContext = createContext(null)

/**
 * A tiny global controller so any CTA on the site can open the quote builder
 * without prop-drilling. The sheet itself is rendered once in App.
 */
export function QuoteProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState('floating')

  const openQuote = useCallback((from = 'unknown') => {
    setSource(from)
    setOpen(true)
    track('quote_builder_open', { source: from, page: 'home' })
  }, [])

  const closeQuote = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open, source, openQuote, closeQuote, setOpen }),
    [open, source, openQuote, closeQuote],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside QuoteProvider')
  return ctx
}
