import { motion } from 'framer-motion'

export default function Card({
  as = 'div',
  tone = 'ivory',
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  const tones = {
    ivory: 'bg-ivory border-ink/10',
    sand: 'bg-sand/60 border-ink/10',
    ink: 'bg-ink-2 border-ivory/10 text-ivory',
    glass: 'bg-ivory/[0.06] border-ivory/15 text-ivory backdrop-blur-md',
  }

  return (
    <Tag
      className={`relative overflow-hidden rounded-card border ${tones[tone] ?? tones.ivory} ${className}`}
      {...(interactive
        ? {
            whileHover: { y: -4 },
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }
        : null)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
