/**
 * Render smoke test: renders the page tree to HTML in Node so runtime errors,
 * missing providers and broken translations surface without a browser.
 *   node scripts/ssr-smoke.mjs [ar|en]
 */
import { createServer } from 'vite'
import { writeFile } from 'node:fs/promises'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from './helmet-stub.js'
import { I18nextProvider } from 'react-i18next'

const lang = process.argv[2] === 'en' ? 'en' : 'ar'
const toHtmlPath = '/tmp/cv-ssr-smoke.html'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
  resolve: { alias: { 'react-helmet-async': '/scripts/helmet-stub.js' } },
})

try {
  const i18n = (await vite.ssrLoadModule('/src/i18n/index.js')).default
  await i18n.changeLanguage(lang)

  const { QuoteProvider } = await vite.ssrLoadModule('/src/lib/quoteContext.jsx')
  const Layout = (await vite.ssrLoadModule('/src/components/layout/Layout.jsx')).default
  const Home = (await vite.ssrLoadModule('/src/pages/Home.jsx')).default
  const NotFound = (await vite.ssrLoadModule('/src/pages/NotFound.jsx')).default

  const page = process.argv[3] === '404' ? NotFound : Home

  const html = renderToString(
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
            { initialEntries: ['/'] },
            React.createElement(Layout, null, React.createElement(page, null)),
          ),
        ),
      ),
    ),
  )

  await writeFile(toHtmlPath, html)
  const checks = [
    ['<h1', 'h1 present'],
    ['id="products"', 'products section'],
    ['id="how"', 'how section'],
    ['id="faq"', 'faq section'],
    ['wa.me/', 'whatsapp links'],
    ['tel:+', 'phone links'],
    ['dir="rtl"', 'rtl markup'],
  ]
  console.log(`rendered ${html.length} chars → ${toHtmlPath}`)
  for (const [needle, label] of checks) console.log(needle && `${html.includes(needle) ? '✓' : '✗'} ${label}`)
  console.log('placeholders leaked:', (html.match(/\[TODO/g) || []).length)
} finally {
  await vite.close()
}
