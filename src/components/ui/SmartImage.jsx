import manifest from '../../config/image-manifest.json'

/**
 * Responsive image with AVIF → WebP → JPEG fallbacks.
 * Variants are produced by `npm run images` (scripts/optimize-images.mjs) and
 * listed in image-manifest.json, so we never request a file that is not there.
 */
export default function SmartImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  width,
  height,
  priority = false,
  ...rest
}) {
  const key = src.replace(/^\/images\//, '').replace(/\.(jpe?g|png)$/i, '')
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const widths = manifest[key] ?? []
  const srcSet = (ext) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')

  return (
    <picture className={`block h-full w-full ${className}`}>
      {widths.length ? <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} /> : null}
      {widths.length ? <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} /> : null}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${imgClassName}`}
        {...rest}
      />
    </picture>
  )
}
