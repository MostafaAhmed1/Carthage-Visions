/**
 * Cookie/analytics consent — one value, stored locally.
 * Nothing is loaded before 'accepted': no gtag, no pixel, no third-party
 * request. 'declined' is remembered so the banner does not reappear.
 */
export const CONSENT_KEY = 'cv.consent'
export const CONSENT_EVENT = 'cv:consent'

export function readConsent() {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

export function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    /* private mode — the banner simply reappears next time */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new window.CustomEvent(CONSENT_EVENT, { detail: value }))
  }
  return value
}
