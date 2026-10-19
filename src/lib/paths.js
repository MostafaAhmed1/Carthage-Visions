/** Every route in one place, so links and SEO can never drift apart. */
export const paths = {
  home: '/',
  solutions: '/solutions',
  solution: (slug) => `/solutions/${slug}`,
  products: '/products',
  category: (category) => `/products/${category}`,
  product: (category, slug) => `/products/${category}/${slug}`,
  packages: '/packages',
  services: '/services',
  survey: '/site-survey',
  support: '/support',
  projects: '/projects',
  project: (slug) => `/projects/${slug}`,
  brands: '/brands',
  about: '/about',
  blog: '/blog',
  post: (slug) => `/blog/${slug}`,
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
}

/** Absolute URL helper for WhatsApp messages and JSON-LD. */
export const absolute = (path, siteUrl) => `${siteUrl.replace(/\/$/, '')}${path}`

export default paths
