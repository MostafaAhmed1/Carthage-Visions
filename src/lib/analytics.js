/**
 * Analytics wrapper — GA4 + Meta Pixel ready.
 * No id configured? Events are logged to the console in development only,
 * so nothing breaks and no cookies are written.
 */

const state = { ready: false }

const getGtag = () => (typeof window !== 'undefined' ? window.gtag : undefined)
const getFbq = () => (typeof window !== 'undefined' ? window.fbq : undefined)

/** Inject gtag.js when an id exists. Called once from App. */
export function initAnalytics({ ga4Id, metaPixelId } = {}) {
  if (typeof window === 'undefined' || state.ready) return
  state.ready = true

  if (ga4Id) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', ga4Id, { anonymize_ip: true })
  }

  if (metaPixelId) {
    ;(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', metaPixelId)
    window.fbq('track', 'PageView')
  }
}

/**
 * Track a conversion event.
 * @param {'call_click'|'whatsapp_click'|'quote_builder_open'|'quote_builder_submit'} name
 * @param {object} params  e.g. { page, source, context }
 */
export function track(name, params = {}) {
  const payload = { ...params, timestamp: Date.now() }

  if (getGtag()) {
    getGtag()('event', name, payload)
  }
  if (getFbq()) {
    const map = {
      call_click: 'Contact',
      whatsapp_click: 'Contact',
      quote_builder_open: 'Lead',
      quote_builder_submit: 'Lead',
    }
    if (map[name]) getFbq()('track', map[name], { content_name: name, ...params })
  }

  if (import.meta.env.DEV) {
    console.debug(`%c[analytics] ${name}`, 'color:#b08d57', params)
  }
}

/** Page views (called on route change). */
export function pageview(path, title, lang) {
  if (getGtag()) getGtag()('event', 'page_view', { page_path: path, page_title: title, language: lang })
  if (getFbq()) getFbq()('track', 'PageView')
}
