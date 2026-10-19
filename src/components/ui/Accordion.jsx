import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronIcon } from './Icons'

export default function Accordion({ items = [], defaultOpen = 0, tone = 'light' }) {
  const [open, setOpen] = useState(defaultOpen)
  const uid = useId().replace(/:/g, '')
  const dark = tone === 'dark'

  return (
    <div className={`divide-y ${dark ? 'divide-ivory/12' : 'divide-ink/10'} border-y ${dark ? 'border-ivory/12' : 'border-ink/10'}`}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `${uid}-panel-${index}`
        const buttonId = `${uid}-button-${index}`
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className={`flex w-full items-center justify-between gap-6 py-6 text-start transition-colors duration-300 ${
                  dark ? 'text-ivory hover:text-ivory/80' : 'text-ink hover:text-ink/70'
                }`}
              >
                <span className="font-body text-[1.0625rem] font-medium leading-snug">{item.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-transform duration-500 ease-calm ${
                    dark ? 'border-ivory/20' : 'border-ink/15'
                  } ${isOpen ? 'rotate-180' : ''}`}
                >
                  <ChevronIcon />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-reading pb-7 pe-12 text-[0.9375rem] leading-relaxed ${dark ? 'text-ivory/65' : 'text-ink/65'}`}>
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
