/**
 * Render smoke test: renders every route to HTML in Node so runtime errors,
 * missing providers, broken translations and bad SEO data surface without a
 * browser.
 *
 *   node scripts/ssr-smoke.mjs            # both languages, all routes
 *   node scripts/ssr-smoke.mjs en         # one language
 */
import { createServer } from 'vite'
import { writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { HelmetProvider } from './helmet-stub.js'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  resolve: { alias: { 'react-helmet-async': '/scripts/helmet-stub.js' } },
})

const load = (path) => vite.ssrLoadModule(path)

const i18n = (await load('/src/i18n/index.js')).default
const { QuoteProvider } = await load('/src/lib/quoteContext.jsx')
const Layout = (await load('/src/components/layout/Layout.jsx')).default

const pages = {
  home: (await load('/src/pages/Home.jsx')).default,
  solutions: (await load('/src/pages/Solutions.jsx')).default,
  solution: (await load('/src/pages/SolutionDetail.jsx')).default,
  services: (await load('/src/pages/Services.jsx')).default,
  survey: (await load('/src/pages/SiteSurvey.jsx')).default,
  support: (await load('/src/pages/Support.jsx')).default,
  projects: (await load('/src/pages/Projects.jsx')).default,
  project: (await load('/src/pages/ProjectDetail.jsx')).default,
  about: (await load('/src/pages/About.jsx')).default,
  blog: (await load('/src/pages/Blog.jsx')).default,
  post: (await load('/src/pages/BlogPost.jsx')).default,
  faq: (await load('/src/pages/Faq.jsx')).default,
  contact: (await load('/src/pages/Contact.jsx')).default,
  privacy: (await load('/src/pages/Privacy.jsx')).default,
  terms: (await load('/src/pages/Terms.jsx')).default,
  notFound: (await load('/src/pages/NotFound.jsx')).default,
  products: (await load('/src/pages/Products.jsx')).default,
  category: (await load('/src/pages/ProductCategory.jsx')).default,
  detail: (await load('/src/pages/ProductDetail.jsx')).default,
  packages: (await load('/src/pages/Packages.jsx')).default,
  brands: (await load('/src/pages/Brands.jsx')).default,
}

const cases = [
  { name: 'home', Page: pages.home, path: '/', expect: ['id="products"', 'id="how"', 'id="faq"'] },
  {
    name: 'products',
    Page: pages.products,
    path: '/products',
    expect: ['role="radiogroup"', '/products/cctv', '/products/access-control'],
  },
  {
    name: 'category',
    Page: pages.category,
    path: '/products/cctv',
    route: '/products/:category',
    params: { category: 'cctv' },
    expect: ['dome-indoor-4mp', 'bullet-outdoor-5mp', 'turret-4mp'],
  },
  {
    name: 'detail',
    Page: pages.detail,
    path: '/products/cctv/dome-indoor-4mp',
    route: '/products/:category/:slug',
    params: { category: 'cctv', slug: 'dome-indoor-4mp' },
    expect: ['dome-indoor-4mp', '2560', 'wa.me', 'bottom-0'],
  },
  {
    name: 'packages',
    Page: pages.packages,
    path: '/packages',
    expect: ['shop-secure', 'premium-estate'],
    expectFor: { ar: 'ر.ع', en: 'OMR' },
  },
  { name: 'brands', Page: pages.brands, path: '/brands', expect: ['Mirqab', 'Sahil'] },
  {
    name: 'solutions',
    Page: pages.solutions,
    path: '/solutions',
    expect: ['/solutions/homes-villas', '/solutions/warehouses-sites', 'wa.me'],
  },
  {
    name: 'solution',
    Page: pages.solution,
    path: '/solutions/homes-villas',
    route: '/solutions/:slug',
    params: { slug: 'homes-villas' },
    expect: ['/packages#villa-essential', '/projects/villa-al-khoud', 'wa.me'],
  },
  { name: 'services', Page: pages.services, path: '/services', expect: ['wa.me', '/site-survey'] },
  {
    name: 'survey',
    Page: pages.survey,
    path: '/site-survey',
    expect: ['wa.me', 'tel:', 'bottom-0'],
    expectFor: { ar: 'معاينة مجانية', en: 'Free site survey' },
  },
  {
    name: 'support',
    Page: pages.support,
    path: '/support',
    expect: ['wa.me'],
    expectFor: { ar: 'أساسي', en: 'Essential' },
  },
  {
    name: 'projects',
    Page: pages.projects,
    path: '/projects',
    expect: ['/projects/villa-al-khoud', 'role="radiogroup"'],
  },
  {
    name: 'project',
    Page: pages.project,
    path: '/projects/villa-al-khoud',
    route: '/projects/:slug',
    params: { slug: 'villa-al-khoud' },
    expect: ['/solutions/homes-villas', '/packages#villa-essential', 'wa.me'],
  },
  {
    name: 'about',
    Page: pages.about,
    path: '/about',
    expect: ['wa.me', 'tel:'],
    expectFor: { ar: 'قصتنا', en: 'Our story' },
  },
  {
    name: 'blog',
    Page: pages.blog,
    path: '/blog',
    expect: ['/blog/choosing-cameras-for-a-villa', '/blog/night-vision-explained', 'role="search"'],
  },
  {
    name: 'post',
    Page: pages.post,
    path: '/blog/night-vision-explained',
    route: '/blog/:slug',
    params: { slug: 'night-vision-explained' },
    expect: ['wa.me', 'tel:', '/blog/remote-viewing-safely'],
    expectFor: { ar: 'قراءة', en: 'min read' },
  },
  {
    name: 'faq',
    Page: pages.faq,
    path: '/faq',
    expect: ['aria-expanded', 'role="search"', 'wa.me'],
  },
  {
    name: 'contact',
    Page: pages.contact,
    path: '/contact',
    expect: ['tel:', 'wa.me', 'maps.google.com/maps?q='],
    expectFor: { ar: 'مفتوح الآن', en: 'Open now' },
  },
  {
    name: 'privacy',
    Page: pages.privacy,
    path: '/privacy',
    expect: ['tel:'],
    expectFor: { ar: 'الخصوصية', en: 'Privacy' },
  },
  {
    name: 'terms',
    Page: pages.terms,
    path: '/terms',
    expect: ['wa.me'],
    expectFor: { ar: 'الشروط', en: 'Terms' },
  },
  {
    name: 'detail-404',
    Page: pages.detail,
    path: '/products/cctv/does-not-exist',
    route: '/products/:category/:slug',
    params: { category: 'cctv', slug: 'does-not-exist' },
    expect: ['wa.me'],
    expectFor: { ar: 'هذا المنتج تغيّر مكانه', en: 'This product has moved' },
    noThrow: true,
  },
]

const languages = process.argv[2] ? [process.argv[2]] : ['ar', 'en']
let failures = 0

for (const lang of languages) {
  await i18n.changeLanguage(lang)
  for (const test of cases) {
    let html = ''
    let error = null
    try {
      html = renderToString(
        React.createElement(
          HelmetProvider,
          null,
          React.createElement(
            I18nextProvider,
            { i18n },
            React.createElement(
              QuoteProvider,
              null,
              React.createElement(
                MemoryRouter,
                { initialEntries: [test.path] },
                React.createElement(
                  Layout,
                  null,
                  React.createElement(
                    Routes,
                    null,
                    React.createElement(Route, {
                      path: test.route ?? '*',
                      element: React.createElement(test.Page),
                    }),
                  ),
                ),
              ),
            ),
          ),
        ),
      )
    } catch (e) {
      error = e
    }

    const expected = test.expectFor ? [...test.expect, test.expectFor[lang]] : test.expect
    const checks = expected.map((needle) => [needle, html.includes(needle)])
    const ok = !error && checks.every(([, pass]) => pass)
    if (!ok) failures += 1
    console.log(`${ok ? '✓' : '✗'} [${lang}] ${test.name}`)
    if (error) console.log('   threw:', error.message)
    for (const [needle, pass] of checks) if (!pass) console.log(`   missing: ${needle}`)
    if (test.name === 'detail' && html) {
      // Confirm the detail WhatsApp link carries the product URL.
      const hasUrl = html.includes(encodeURIComponent('cctv/dome-indoor-4mp'))
      console.log(`   ${hasUrl ? '✓' : '✗'} whatsapp prefilled with product URL`)
      if (!hasUrl) failures += 1
    }
    await writeFile(path.join(os.tmpdir(), `cv-${lang}-${test.name}.html`), html)
  }
}

await vite.close()
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll routes rendered cleanly.')
process.exitCode = failures ? 1 : 0
