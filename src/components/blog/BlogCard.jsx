import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon } from '../ui/Icons'
import { getImage } from '../../config/media'
import { categoryName } from '../../data/blog'
import { readingMinutes } from '../../lib/readingTime'
import { formatNumber, formatMinutes } from '../../lib/format'
import { paths } from '../../lib/paths'

/** One guide card: image, topic, title, one-line excerpt, reading time. */
export default function BlogCard({ post, index = 0, featured = false }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const image = getImage(post.cover)
  const minutes = readingMinutes(post, lang)

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={paths.post(post.slug)} className="flex h-full flex-col outline-offset-4">
        <div className={`overflow-hidden bg-sand ${featured ? 'arch-mask-soft' : 'rounded-card'}`}>
          <div className={featured ? 'aspect-[4/3]' : 'aspect-[16/10]'}>
            <SmartImage
              src={image.src}
              alt={image.alt[lang]}
              sizes={
                featured
                  ? '(min-width: 1024px) 55vw, 92vw'
                  : '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw'
              }
              imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.035]"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-1 flex-col">
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
            <span>{categoryName(post.category, lang)}</span>
            <span aria-hidden="true">·</span>
            <span>{formatMinutes(minutes, lang, t)}</span>
          </p>

          <h3
            className={`mt-2.5 font-display leading-snug ${featured ? 'text-display-sm' : 'text-[1.375rem]'}`}
          >
            {post.title[lang]}
          </h3>

          <p className="mt-2.5 line-clamp-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-ink/60">
            {post.excerpt[lang]}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink/70 transition-colors group-hover:text-ink">
            <span className="link-underline">{t('blog.readMore')}</span>
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
