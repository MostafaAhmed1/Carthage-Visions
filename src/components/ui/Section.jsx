import { motion } from 'framer-motion'
import Container from './Container'

const tones = {
  ivory: 'bg-ivory text-ink',
  sand: 'bg-sand/45 text-ink',
  ink: 'bg-ink text-ivory',
  none: '',
}

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

/**
 * One section, one idea. Optional heading block with eyebrow + title + lede.
 */
export default function Section({
  id,
  tone = 'ivory',
  eyebrow,
  title,
  lede,
  align = 'start',
  action,
  children,
  className = '',
  headerClassName = '',
  containerClassName = '',
  as: Tag = 'section',
  ...rest
}) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start'

  return (
    <Tag id={id} className={`relative ${tones[tone] ?? ''} ${className}`} {...rest}>
      <Container className={`py-section ${containerClassName}`}>
        {(eyebrow || title || lede) && (
          <div
            className={`mb-12 flex flex-col gap-6 md:mb-16 ${
              action ? 'md:flex-row md:items-end md:justify-between' : ''
            } ${headerClassName}`}
          >
            <div className={`flex max-w-2xl flex-col gap-5 ${alignment}`}>
              {eyebrow ? (
                <motion.p
                  className={`eyebrow ${tone === 'ink' ? 'eyebrow-light' : ''}`}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {eyebrow}
                </motion.p>
              ) : null}
              {title ? (
                <motion.h2
                  className="text-display-md"
                  variants={rise}
                  custom={1}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {title}
                </motion.h2>
              ) : null}
              {lede ? (
                <motion.p
                  className={`max-w-reading text-lede ${tone === 'ink' ? 'text-ivory/70' : 'text-ink/65'}`}
                  variants={rise}
                  custom={2}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-80px' }}
                >
                  {lede}
                </motion.p>
              ) : null}
            </div>
            {action ? (
              <motion.div
                variants={rise}
                custom={3}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="shrink-0"
              >
                {action}
              </motion.div>
            ) : null}
          </div>
        )}
        {children}
      </Container>
    </Tag>
  )
}
