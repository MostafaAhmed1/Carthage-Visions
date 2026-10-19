import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SmartImage from '../ui/SmartImage'
import { getImage } from '../../config/media'
import { paths } from '../../lib/paths'
import { track } from '../../lib/analytics'

/**
 * Project card. The image opens a quiet lightbox; the title links to the full
 * case study, so keyboard and screen-reader users get a normal link.
 */
export default function ProjectCard({ project, index = 0, onOpen }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const image = getImage(project.images[0])

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.06, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <button
        type="button"
        onClick={() => {
          track('project_open', { source: 'projects_grid', project: project.slug })
          onOpen?.()
        }}
        className="relative block w-full overflow-hidden rounded-card bg-sand text-start"
        aria-label={`${t('projectsPage.view')}: ${project.title[lang]}`}
      >
        <div className="aspect-[4/3]">
          <SmartImage
            src={image.src}
            alt={image.alt[lang]}
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
            imgClassName="transition-transform duration-[1100ms] ease-calm group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute bottom-4 start-4 flex flex-wrap items-center gap-2 text-[0.6875rem] text-ivory/85">
          <span className="rounded-full border border-ivory/25 bg-ink/40 px-2.5 py-1 backdrop-blur-sm">
            {project.city[lang]}
          </span>
          <span className="rounded-full border border-ivory/25 bg-ink/40 px-2.5 py-1 backdrop-blur-sm">
            {project.cameras} {t('projectsPage.cameras')}
          </span>
        </span>
      </button>

      <h2 className="mt-4 font-body text-[1.0625rem] font-medium leading-snug">
        <Link to={paths.project(project.slug)} className="link-underline">
          {project.title[lang]}
        </Link>
      </h2>
      <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink/65">
        {project.problem[lang]}
      </p>
    </motion.article>
  )
}
