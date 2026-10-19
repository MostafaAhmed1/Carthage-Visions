import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon, WhatsAppIcon } from '../ui/Icons'
import { getImage } from '../../config/media'
import { paths } from '../../lib/paths'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/** Category tile: large image, name, one line, count, and an explicit WhatsApp ask. */
export default function CategoryCard({ category, count, familyLabel, index = 0 }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const image = getImage(category.image) ?? getImage('hero:poster')

  const href = buildWhatsAppLink({
    context: `${category.name[lang]} — ${t('wa.contexts.consultation')}`,
    lang,
    page: t('wa.pages.products'),
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-ink/10 bg-ivory transition-colors duration-300 hover:border-ink/25"
    >
      {/* The image is decorative for keyboard users — the title link follows. */}
      <Link
        to={paths.category(category.slug)}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[5/4] overflow-hidden bg-sand/40"
      >
        <SmartImage
          src={image.src}
          alt={image.alt[lang]}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.035]"
        />
        <span className="absolute start-4 top-4 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.14em] text-ink/60 backdrop-blur-sm">
          {familyLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-body text-[1.0625rem] font-medium leading-snug">
            <Link to={paths.category(category.slug)} className="link-underline">
              {category.name[lang]}
            </Link>
          </h2>
          <span className="shrink-0 text-[0.6875rem] text-ink/60">
            {t('catalog.products.itemsCount', { count })}
          </span>
        </div>

        <p className="mt-2.5 flex-1 text-[0.875rem] leading-relaxed text-ink/60">{category.blurb[lang]}</p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track('whatsapp_click', {
                source: `category_card_${category.slug}`,
                context: category.name[lang],
                lang,
              })
            }
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-green transition-opacity hover:opacity-80"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {t('catalog.products.ask')}
          </a>

          <Link
            to={paths.category(category.slug)}
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink/60 transition-colors hover:text-ink"
          >
            {t('catalog.products.view')}
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
