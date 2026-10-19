import { useState } from 'react'
import manifest from '../../config/image-manifest.json'

/**
 * Responsive image with AVIF → WebP → JPEG fallbacks and a quiet skeleton
 * while it decodes. Variants come from `npm run images` via the manifest, so
 * we never request a file that does not exist.
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
  skeleton = true,
  onLoad,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)

  const key = src.replace(/^\/images\//, '').replace(/\.(jpe?g|png)$/i, '')
  const base = src.replace(/\.(jpe?g|png)$/i, '')
  const widths = manifest[key] ?? []
  const srcSet = (ext) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')

  return (
    <span className={`relative block h-full w-full overflow-hidden ${className}`}>
      {skeleton && !loaded ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-sand/50"
          style={{
            backgroundImage:
              'linear-gradient(100deg, rgb(20 17 14 / 0.03) 30%, rgb(20 17 14 / 0.08) 50%, rgb(20 17 14 / 0.03) 70%)',
            backgroundSize: '220% 100%',
            animation: 'skeleton 1.8s ease-in-out infinite',
          }}
        />
      ) : null}

      <picture className="block h-full w-full">
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
          onLoad={(event) => {
            setLoaded(true)
            onLoad?.(event)
          }}
          className={`h-full w-full object-cover transition-opacity duration-700 ease-calm ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...rest}
        />
      </picture>
    </span>
  )
}
