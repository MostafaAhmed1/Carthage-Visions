import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-body font-medium leading-none transition-colors duration-300 ease-calm disabled:cursor-not-allowed disabled:opacity-50'

const sizes = {
  sm: 'min-h-[2.75rem] px-4 text-[0.8125rem]',
  md: 'min-h-[3rem] px-6 text-[0.9375rem]',
  lg: 'min-h-[3.5rem] px-7 text-base',
}

const variants = {
  // Primary conversion action — restrained Omani green, never a bright brand green.
  whatsapp: 'bg-green text-ivory hover:bg-green/90 shadow-[0_18px_40px_-28px_rgb(20_17_14_/_0.9)]',
  ink: 'bg-ink text-ivory hover:bg-ink-2',
  outline: 'border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/[0.035]',
  outlineLight: 'border border-ivory/30 text-ivory hover:border-ivory/60 hover:bg-ivory/[0.07]',
  brass: 'bg-brass text-ink hover:bg-brass-soft',
  ghost: 'text-ink/70 hover:text-ink',
  ghostLight: 'text-ivory/75 hover:text-ivory',
}

const Button = forwardRef(function Button(
  {
    as,
    href,
    variant = 'ink',
    size = 'md',
    className = '',
    children,
    iconStart,
    iconEnd,
    external,
    ...rest
  },
  ref,
) {
  const Tag = as ?? (href ? 'a' : 'button')
  const MotionTag = Tag === 'a' ? motion.a : Tag === 'button' ? motion.button : motion.div
  const classes = `${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.ink} ${className}`

  const linkProps =
    href && Tag === 'a'
      ? {
          href,
          ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null),
        }
      : {}

  return (
    <MotionTag
      ref={ref}
      className={classes}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      {...linkProps}
      {...rest}
    >
      {iconStart ? <span className="shrink-0">{iconStart}</span> : null}
      <span>{children}</span>
      {iconEnd ? (
        <span className="shrink-0 transition-transform duration-300 ease-calm group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
          {iconEnd}
        </span>
      ) : null}
    </MotionTag>
  )
})

export default Button
