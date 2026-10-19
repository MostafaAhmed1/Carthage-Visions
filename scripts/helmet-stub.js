import React from 'react'

/** No-op stand-in used only by the SSR smoke test (head tags are client-side). */
export const Helmet = () => null
export function HelmetProvider({ children }) {
  return React.createElement(React.Fragment, null, children)
}
