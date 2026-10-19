import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon } from '../ui/Icons'
import { getImage } from '../../config/media'
import { paths } from '../../lib/paths'

/**
 * Catalogue card: image, name, one line, price line, and one action.
 * The whole card is a link; the WhatsApp action lives on the detail page so
 * each card has exactly one job.
 */
export default function ProductCard({ product, index = 0, categorySlug }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const image = getImage(product.images[0])

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        to={paths.product(product.category ?? categorySlug, product.slug)}
        className="flex h-full flex-col overflow-hidden rounded-card border border-ink/10 bg-ivory transition-colors duration-300 hover:border-ink/25"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-sand/40">
          <SmartImage
            src={image.src}
            alt={image.alt[lang]}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.035]"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-body text-[1rem] font-medium leading-snug text-ink">{product.name[lang]}</h3>
          <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-ink/65">{product.summary[lang]}</p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
            <span className="text-[0.75rem] text-brass-deep">
              {product.priceFrom
                ? t('common.from', { price: product.priceFrom })
                : t('catalog.product.requestPrice')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink/60 transition-colors group-hover:text-ink">
              {t('catalog.category.view')}
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
