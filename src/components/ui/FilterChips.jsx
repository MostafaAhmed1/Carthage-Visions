import { motion } from 'framer-motion'

/**
 * Keyboard-accessible filter group.
 * Rendered as a radio group: arrow keys move, space/enter selects, one tab stop.
 */
export default function FilterChips({ label, options, value, onChange, className = '' }) {
  const handleKeyDown = (event, index) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const rtl = document.documentElement.dir === 'rtl'
    const forward =
      event.key === 'ArrowRight'
        ? !rtl
        : event.key === 'ArrowDown'
          ? true
          : event.key === 'ArrowLeft'
            ? rtl
            : false
    let next = index
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = options.length - 1
    else next = (index + (forward ? 1 : -1) + options.length) % options.length
    onChange(options[next].value)
    const node = event.currentTarget.parentElement?.children[next]
    node?.querySelector('button')?.focus()
  }

  return (
    <div role="radiogroup" aria-label={label} className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option, index) => {
        const active = option.value === value
        return (
          <div key={option.value} onKeyDown={(event) => handleKeyDown(event, index)}>
            <button
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(option.value)}
              className={`relative inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border px-4 text-[0.8125rem] font-medium transition-colors duration-300 ${
                active
                  ? 'border-ink bg-ink text-ivory'
                  : 'border-ink/15 text-ink/65 hover:border-ink/30 hover:text-ink'
              }`}
            >
              {active ? (
                <motion.span
                  layoutId="filter-chip"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className="relative">{option.label}</span>
              {typeof option.count === 'number' ? (
                <span className={`relative text-[0.6875rem] ${active ? 'text-ivory/65' : 'text-ink/65'}`}>
                  {option.count}
                </span>
              ) : null}
            </button>
          </div>
        )
      })}
    </div>
  )
}
