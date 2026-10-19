import fs from 'node:fs'
import path from 'node:path'

// crude ESM import of locale files via esbuild transform
import { build } from 'esbuild'

const load = async (entry) => {
  const out = await build({ entryPoints: [entry], bundle: true, format: 'esm', write: false, platform: 'node' })
  const text = out.outputFiles[0].text
  return (await import('data:text/javascript;base64,' + Buffer.from(text).toString('base64'))).default
}
const en = await load('src/i18n/locales/en.js')
const ar = await load('src/i18n/locales/ar.js')


const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === 'object' ? flat(v, p ? `${p}.${k}` : k) : [[p ? `${p}.${k}` : k, v]])

const enKeys = new Map(flat(en))
const arKeys = new Map(flat(ar))

const missingAr = [...enKeys.keys()].filter(k => !arKeys.has(k))
const missingEn = [...arKeys.keys()].filter(k => !enKeys.has(k))
console.log('keys:', enKeys.size, '| missing in ar:', missingAr, '| missing in en:', missingEn)

// empty values
const empty = [...arKeys].filter(([,v]) => typeof v === 'string' && !v.trim()).map(([k]) => k)
console.log('empty ar values:', empty)

// find used keys
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : p.endsWith('.jsx') || p.endsWith('.js') ? [p] : []
  })
}
const used = new Set()
for (const f of walk('src')) {
  const s = fs.readFileSync(f, 'utf8')
  for (const m of s.matchAll(/\bt\(\s*'([^']+)'/g)) used.add(m[1])
}
const literalMissing = [...used].filter(k => !enKeys.has(k))
console.log('literal t() keys missing:', literalMissing)

// enumerate dynamic prefixes
const dynamic = ['solutions.items', 'products.items', 'projects.items', 'steps.items',
 'testimonials.items', 'faq.items', 'quote.property', 'quote.cameras', 'quote.city',
 'quote.groups']
for (const d of dynamic) {
  const kids = [...enKeys.keys()].filter(k => k.startsWith(d + '.') && !enKeys.get(k)?.includes?.('.'))
  if (!kids.length) console.log('!! no children for', d)
}
