/**
 * Placeholder wordmark: a small carved-arch monogram plus the name in the
 * display face, all in currentColor so every mark reads at the same weight.
 * Replace with a real SVG by setting `brand.logo` in src/data/brands.js.
 */
export default function BrandMark({ brand, className = '' }) {
  if (brand.logo) {
    return (
      <img
        src={brand.logo}
        alt={brand.name}
        className={`h-10 w-auto opacity-70 grayscale ${className}`}
        loading="lazy"
        decoding="async"
      />
    )
  }

  const initial = brand.name.trim().charAt(0).toUpperCase()

  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label={brand.name} role="img">
      <span className="grid h-9 w-9 place-items-center rounded-[0.55rem] border border-ink/20">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path
            d="M12 3.2c4 0 6.9 3.1 6.9 7.4V21H5.1V10.6C5.1 6.3 8 3.2 12 3.2Z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <text
            x="12"
            y="16"
            textAnchor="middle"
            fill="currentColor"
            style={{ font: '500 8px "Cormorant Garamond", serif' }}
          >
            {initial}
          </text>
        </svg>
      </span>
      <span className="font-display text-[1.5rem] uppercase leading-none tracking-[0.16em]">
        {brand.name}
      </span>
    </span>
  )
}
