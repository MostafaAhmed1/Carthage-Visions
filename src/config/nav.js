/**
 * One navigation list for header, mobile menu and footer.
 * `to` → a route; `id` → a section on the home page.
 *
 * Desktop shows `primaryNav` inline and tucks the rest behind "More" so the
 * header stays calm at 1024px and in Arabic, where labels are wider.
 */
export const primaryNav = [
  { to: '/solutions', key: 'nav.solutions' },
  { to: '/products', key: 'nav.products' },
  { to: '/packages', key: 'nav.packages' },
  { to: '/projects', key: 'nav.projects' },
  { to: '/services', key: 'nav.services' },
]

export const moreNav = [
  { to: '/about', key: 'nav.about' },
  { to: '/blog', key: 'nav.blog' },
  { to: '/faq', key: 'nav.faq' },
  { to: '/support', key: 'nav.support' },
  { to: '/brands', key: 'nav.brands' },
  { to: '/site-survey', key: 'nav.survey' },
  { to: '/contact', key: 'nav.contact' },
]

/** Everything, in the order the mobile menu should show it. */
export const allNav = [...primaryNav, ...moreNav]

/** The one conversion route, surfaced separately from the lists. */
export const surveyNav = { to: '/site-survey', key: 'nav.survey' }

export default primaryNav
