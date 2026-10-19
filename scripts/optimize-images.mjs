/**
 * Generates responsive AVIF / WebP / JPEG variants for every image in
 * /public/images and writes src/config/image-manifest.json so the front end
 * only ever references variants that actually exist.
 *
 * Run with: npm run images
 */
import { readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = path.resolve('public/images')
const MANIFEST = path.resolve('src/config/image-manifest.json')
const WIDTHS = [480, 800, 1200]

const all = await readdir(DIR)

// Clean previous variants so the manifest can never point at stale files.
await Promise.all(
  all
    .filter((f) => /-\d+\.(avif|webp|jpe?g)$/i.test(f))
    .map((f) => unlink(path.join(DIR, f)).catch(() => {})),
)

const sources = all.filter((f) => /\.(jpe?g|png)$/i.test(f) && !/-\d+\./i.test(f))
const manifest = {}

for (const file of sources) {
  const input = path.join(DIR, file)
  const base = file.replace(/\.(jpe?g|png)$/i, '')
  const meta = await sharp(input).metadata()
  const width = meta.width ?? 0

  const variants = [...new Set(WIDTHS.map((w) => Math.min(w, width)).filter(Boolean))].sort(
    (a, b) => a - b,
  )

  for (const w of variants) {
    const prefix = path.join(DIR, `${base}-${w}`)
    const pipeline = () => sharp(input).resize({ width: w, withoutEnlargement: true })
    await pipeline().avif({ quality: 52, effort: 4 }).toFile(`${prefix}.avif`)
    await pipeline().webp({ quality: 74 }).toFile(`${prefix}.webp`)
    await pipeline().jpeg({ quality: 78, mozjpeg: true }).toFile(`${prefix}.jpg`)
  }

  manifest[base] = variants
  console.log(`✓ ${file} → ${variants.join(', ')}px`)
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\nDone. Manifest written to src/config/image-manifest.json`)
