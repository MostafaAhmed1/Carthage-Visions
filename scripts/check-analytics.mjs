/**
 * Unit-level check for the analytics wrapper (no browser needed).
 * Verifies that events reach gtag with the right shape, that Meta receives the
 * mapped standard event, and that nothing throws when no id is configured.
 *
 *   node scripts/check-analytics.mjs
 */
import { build } from 'esbuild'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'

const dir = await mkdtemp(path.join(tmpdir(), 'cv-analytics-'))
const outfile = path.join(dir, 'analytics.mjs')
await build({
  entryPoints: ['src/lib/analytics.js'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
  define: { 'import.meta.env.DEV': 'false' },
  logLevel: 'silent',
})
const { track, initAnalytics } = await import(`file://${outfile}`)

let failures = 0
const check = (label, ok) => {
  if (!ok) failures += 1
  console.log(`${ok ? '✓' : '✗'} ${label}`)
}

const gtagCalls = []
const fbqCalls = []
globalThis.window = {
  dataLayer: [],
  gtag: (...args) => gtagCalls.push(args),
  fbq: (...args) => fbqCalls.push(args),
}
globalThis.document = {
  createElement: () => ({}),
  head: { appendChild() {} },
  getElementsByTagName: () => [{ parentNode: { insertBefore() {} } }],
}

track('whatsapp_click', { source: 'hero', context: 'a villa', lang: 'ar' })
track('call_click', { source: 'sticky' })
track('quote_builder_open', { source: 'header' })
track('something_unmapped', { source: 'x' })

check('gtag received every event', gtagCalls.length === 4)
check('event name is forwarded', gtagCalls[0][1] === 'whatsapp_click')
check('params are forwarded', gtagCalls[0][2].source === 'hero' && gtagCalls[0][2].lang === 'ar')
check('timestamp is added', typeof gtagCalls[0][2].timestamp === 'number')
check('Meta maps whatsapp to Contact', fbqCalls[0][1] === 'Contact')
check('Meta maps quote to Lead', fbqCalls[2][1] === 'Lead')
check('unmapped event is not sent to Meta', fbqCalls.length === 3)

// No ids configured: initAnalytics must be a quiet no-op.
const before = gtagCalls.length
initAnalytics({})
check('initAnalytics without ids does not throw or fire', gtagCalls.length === before)

console.log(failures ? `\n${failures} check(s) failed.` : '\nAnalytics events behave as expected.')
process.exitCode = failures ? 1 : 0
