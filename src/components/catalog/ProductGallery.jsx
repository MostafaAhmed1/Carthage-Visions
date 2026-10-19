import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SmartImage from '../ui/SmartImage'
import { getImage } from '../../config/media'

/**
 * Calm gallery: one large frame, thumbnails beneath. Keyboard users can tab
 * through thumbnails; arrows/swipe are a bonus, not a requirement.
 */
export default function ProductGallery({ images = [], name }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [active, setActive] = useState(0)
  const items = images.map((key) => getImage(key)).filter(Boolean)
  const current = items[active] ?? items[0]

  if (!current) return null

  const step = (delta) => setActive((index) => (index + delta + items.length) % items.length)

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-card border border-ink/10 bg-sand/35"
        role="group"
        aria-label={t('catalog.product.gallery')}
        onKeyDown={(event) => {
          if (items.length < 2) return
          if (event.key === 'ArrowRight') step(document.documentElement.dir === 'rtl' ? -1 : 1)
          if (event.key === 'ArrowLeft') step(document.documentElement.dir === 'rtl' ? 1 : -1)
        }}
        tabIndex={items.length > 1 ? 0 : -1}
      >
        <div className="aspect-[4/5]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <SmartImage
                src={current.src}
                alt={`${name} — ${current.alt[lang]}`}
                sizes="(min-width: 1024px) 55vw, 92vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <span className="absolute bottom-4 end-4 rounded-full bg-ink/55 px-3 py-1 text-[0.6875rem] text-ivory/85 backdrop-blur-sm">
          {t('catalog.product.imageOf', { current: active + 1, total: items.length })}
        </span>
      </div>

      {items.length > 1 ? (
        <div className="mt-3 flex gap-3" role="group" aria-label={t('catalog.product.gallery')}>
          {items.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              aria-label={t('catalog.product.imageOf', { current: index + 1, total: items.length })}
              aria-pressed={index === active}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-colors duration-300 sm:h-24 sm:w-24 ${
                index === active ? 'border-brass' : 'border-ink/10 hover:border-ink/30'
              }`}
            >
              <SmartImage
                src={item.src}
                alt=""
                sizes="96px"
                imgClassName={index === active ? '' : 'opacity-80'}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
