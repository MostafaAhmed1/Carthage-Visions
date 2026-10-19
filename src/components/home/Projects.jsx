import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import SmartImage from '../ui/SmartImage'
import Button from '../ui/Button'
import { ArrowIcon } from '../ui/Icons'
import media from '../../config/media'
import { paths } from '../../lib/paths'

/** Home teasers → the matching case study. */
const ITEMS = [
  { key: 'villa', slug: 'villa-al-khoud' },
  { key: 'retail', slug: 'shop-barka' },
  { key: 'site', slug: 'warehouse-suhar' },
]

export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  return (
    <Section
      id="work"
      eyebrow={t('projects.eyebrow')}
      title={t('projects.title')}
      lede={t('projects.lede')}
      className="scroll-mt-header"
      action={
        <Button
          as={Link}
          to={paths.projects}
          variant="outline"
          size="sm"
          iconEnd={<ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />}
        >
          {t('projects.viewAll')}
        </Button>
      }
    >
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {ITEMS.map(({ key, slug }, index) => (
          <motion.article
            key={key}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <Link to={paths.project(slug)} className="group/link block outline-offset-4">
              <div className="relative overflow-hidden rounded-card bg-sand">
                <div className="aspect-[4/3]">
                  <SmartImage
                    src={media.projects[key].src}
                    alt={media.projects[key].alt[lang]}
                    sizes="(min-width: 768px) 30vw, 90vw"
                    imgClassName="transition-transform duration-[1100ms] ease-calm group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80" />
                <p className="absolute bottom-4 start-4 text-[0.6875rem] uppercase tracking-[0.14em] text-ivory/80">
                  {t(`projects.items.${key}.place`)}
                </p>
              </div>
              <h3 className="mt-5 font-body text-[1.0625rem] font-medium">
                {t(`projects.items.${key}.title`)}
              </h3>
              <p className="mt-1.5 text-[0.8125rem] text-ink/65">{t(`projects.items.${key}.scope`)}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
