/**
 * Validates the one thing the whole site depends on: WhatsApp and tel links.
 * Builds a link for every page label in both languages and asserts that the
 * prefilled message carries the brand, the context and the page reference.
 *
 *   node scripts/check-links.mjs
 */
import { build } from 'esbuild'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const dir = await mkdtemp(path.join(tmpdir(), 'cv-links-'))
let counter = 0

async function load(entry) {
  const outfile = path.join(dir, `m${counter++}.mjs`)
  await build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile,
    define: { 'import.meta.env.DEV': 'false' },
    logLevel: 'silent',
  })
  return import(`file://${outfile}`)
}

const { buildWhatsAppLink, buildTelLink, plainPhone } = await load('src/lib/whatsapp.js')
const en = (await load('src/i18n/locales/en.js')).default
const ar = (await load('src/i18n/locales/ar.js')).default

let failures = 0
const check = (label, condition) => {
  if (!condition) failures += 1
  console.log(`${condition ? '✓' : '✗'} ${label}`)
}

const pages = [
  'home',
  'solutions',
  'services',
  'survey',
  'support',
  'projects',
  'about',
  'blog',
  'post',
  'faq',
  'contact',
]

for (const lang of ['ar', 'en']) {
  const dict = lang === 'ar' ? ar : en
  const brand = lang === 'ar' ? 'قرطاج فيجن' : 'Carthage Visions'
  const hello = lang === 'ar' ? 'السلام عليكم' : 'Hello'
  let allOk = true

  for (const key of pages) {
    const page = dict.wa.pages[key]
    const context = dict.wa.contexts.general
    const href = buildWhatsAppLink({ context, lang, page })
    const decoded = decodeURIComponent(href.split('?text=')[1] ?? '')
    const ok =
      href.startsWith('https://wa.me/') &&
      !href.includes('+') &&
      decoded.includes(brand) &&
      decoded.includes(hello) &&
      decoded.includes(context) &&
      decoded.includes(page)
    if (!ok) {
      allOk = false
      check(`[${lang}] ${key} message`, false)
      console.log('    ', decoded.replace(/\n/g, ' | '))
    }
  }

  check(`[${lang}] all ${pages.length} page messages carry brand + context + page`, allOk)
}

check('tel: link is E.164', buildTelLink().startsWith('tel:+'))
check('tel: link has no spaces', !buildTelLink().includes(' '))
check('number is digits only', /^\d+$/.test(plainPhone().replace('+', '')))

console.log(failures ? `\n${failures} check(s) failed.` : '\nWhatsApp and tel links look correct.')
process.exitCode = failures ? 1 : 0
