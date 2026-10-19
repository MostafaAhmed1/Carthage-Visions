import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon } from '../ui/Icons'
import { getImage } from '../../config/media'
import { paths } from '../../lib/paths'

/** Large arch-masked image with a calm caption block beneath. */
export default function SolutionCard({ solution, index = 0 }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const image = getImage(solution.image)

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: Math.min(index * 0.08, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={paths.solution(solution.slug)} className="flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[999px_999px_0.9rem_0.9rem] bg-sand">
          <div className="aspect-[3/4]">
            <SmartImage
              src={image.src}
              alt={solution.imageAlt?.[lang] ?? image.alt[lang]}
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
              imgClassName="transition-transform duration-[1100ms] ease-calm group-hover:scale-[1.035]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          <p className="absolute bottom-4 start-5 end-5 text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/75">
            {solution.short[lang]}
          </p>
        </div>

        <div className="pt-5">
          <h2 className="font-body text-[1.125rem] font-medium leading-snug text-ink">
            <span className="link-underline">{solution.name[lang]}</span>
          </h2>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/60">{solution.lede[lang]}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink/65 transition-colors group-hover:text-ink">
            {t('solutionsPage.detail')}
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
