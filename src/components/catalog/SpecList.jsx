/**
 * Specifications as quiet rows — label start, value end, hairline between.
 * No icons, no badges, no certificates.
 */
export default function SpecList({ specs = [], lang = 'ar', className = '' }) {
  return (
    <dl className={`divide-y divide-ink/10 border-y border-ink/10 ${className}`}>
      {specs.map((spec) => (
        <div key={spec.label[lang]} className="flex items-baseline justify-between gap-6 py-3.5">
          <dt className="text-[0.8125rem] text-ink/65">{spec.label[lang]}</dt>
          <dd className="text-end text-[0.875rem] font-medium text-ink/85">{spec.value[lang]}</dd>
        </div>
      ))}
    </dl>
  )
}
