import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Sheet from '../ui/Sheet'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon } from '../ui/Icons'
import { getImage } from '../../config/media'
import { paths } from '../../lib/paths'
import { buildWhatsAppLink } from '../../lib/whatsapp'

/**
 * A calm lightbox built on the existing Sheet: two images, the problem, the
 * solution and a single next step. Reuses the dialog's focus trap and ESC.
 */
export default function ProjectLightbox({ project, onClose }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  // Keep the last project on screen while the sheet animates out.
  const [shown, setShown] = useState(project)
  useEffect(() => {
    if (project) setShown(project)
  }, [project])

  if (!shown) return null

  const title = shown.title[lang]
  const images = shown.images
    .slice(0, 2)
    .map((key) => getImage(key))
    .filter(Boolean)
  const waHref = buildWhatsAppLink({
    context: `${title} — ${t('wa.contexts.consultation')}`,
    lang,
    page: t('wa.pages.projects'),
  })

  return (
    <Sheet
      open={Boolean(project)}
      onClose={onClose}
      eyebrow={`${shown.city[lang]} · ${shown.cameras} ${t('projectsPage.cameras')}`}
      title={title}
      closeLabel={t('projectsPage.lightbox.close')}
      maxWidth="52rem"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`overflow-hidden rounded-xl bg-sand ${index === 1 ? 'hidden sm:block' : ''}`}
          >
            <div className="aspect-[4/3]">
              <SmartImage
                src={image.src}
                alt={image.alt[lang]}
                sizes="(min-width: 640px) 45vw, 92vw"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-6 space-y-5">
        {[
          ['problem', shown.problem[lang]],
          ['solution', shown.solution[lang]],
          ['result', shown.result[lang]],
        ].map(([key, value]) => (
          <div key={key}>
            <dt className="eyebrow">{t(`projectsPage.lightbox.${key}`)}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink/70">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-ink/10 pt-5">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-green px-5 text-[0.8125rem] font-medium text-ivory transition-colors hover:bg-green/90"
        >
          {t('projectsPage.lightbox.similar')}
        </a>
        <Link
          to={paths.project(shown.slug)}
          className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/65 transition-colors hover:text-ink"
        >
          {t('projectsPage.lightbox.details')}
          <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
        </Link>
      </div>
    </Sheet>
  )
}
