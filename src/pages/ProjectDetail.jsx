import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import SmartImage from '../components/ui/SmartImage'
import WhatsAppButton from '../components/cta/WhatsAppButton'
import CallButton from '../components/cta/CallButton'
import ClosingBand from '../components/cta/ClosingBand'
import { ArrowIcon } from '../components/ui/Icons'
import { getProject, projects, placeholderProjects } from '../data/projects'
import { getSolution } from '../data/solutions'
import { packages } from '../data/packages'
import { getImage } from '../config/media'
import shop from '../config/shop'
import { paths, absolute } from '../lib/paths'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const project = getProject(slug)

  if (!project) {
    return (
      <>
        <Seo title={`404 — ${t('projectsPage.detail.notFoundTitle')}`} noindex />
        <Container className="pb-section pt-[calc(var(--header-h)+4rem)]">
          <EmptyState
            title={t('projectsPage.detail.notFoundTitle')}
            body={t('projectsPage.detail.notFoundBody')}
            ctaLabel={t('projectsPage.emptyCta')}
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.projects')}
            source="project_unknown"
          >
            <div className="mt-5">
              <Button as={Link} to={paths.projects} variant="ghost" size="sm">
                {t('projectsPage.detail.back')}
              </Button>
            </div>
          </EmptyState>
        </Container>
      </>
    )
  }

  const title = project.title[lang]
  const images = project.images.map((key) => getImage(key)).filter(Boolean)
  const relatedPackage = project.package ? packages.find((p) => p.slug === project.package) : null
  const relatedSolution = project.solutionSlug ? getSolution(project.solutionSlug) : null
  const more = projects.filter((p) => p.slug !== project.slug && p.type === project.type).slice(0, 3)
  const others = more.length ? more : projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      about: project.solution[lang],
      locationCreated: { '@type': 'Place', name: project.city[lang] },
      url: absolute(paths.project(project.slug), shop.siteUrl),
      image: `${shop.siteUrl}${images[0]?.src ?? ''}`,
      creator: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('nav.projects'),
          item: `${shop.siteUrl}${paths.projects}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: absolute(paths.project(project.slug), shop.siteUrl),
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${title} — ${shop.brand.name[lang]}`}
        description={project.problem[lang]}
        path={paths.project(project.slug)}
        image={images[0]?.src}
        jsonLd={jsonLd}
        noindex={placeholderProjects}
      />

      <article className="bg-ivory">
        <Container className="pb-16 pt-[calc(var(--header-h)+2rem)] md:pb-24">
          <Breadcrumbs
            items={[
              { label: t('common.home'), to: paths.home },
              { label: t('nav.projects'), to: paths.projects },
              { label: title },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-card bg-sand">
                <div className="aspect-[4/3]">
                  <SmartImage
                    src={images[0].src}
                    alt={images[0].alt[lang]}
                    sizes="(min-width: 1024px) 55vw, 92vw"
                    priority
                  />
                </div>
              </div>
              {images[1] ? (
                <div className="mt-3 overflow-hidden rounded-card bg-sand">
                  <div className="aspect-[16/9]">
                    <SmartImage
                      src={images[1].src}
                      alt={images[1].alt[lang]}
                      sizes="(min-width: 1024px) 55vw, 92vw"
                    />
                  </div>
                </div>
              ) : null}
            </motion.div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <motion.p
                  className="eyebrow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {t('nav.projects')} · {project.city[lang]}
                </motion.p>
                <motion.h1
                  className="mt-4 text-display-md"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                >
                  {title}
                </motion.h1>

                <dl className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
                  {[
                    [t('projectsPage.detail.cameras'), String(project.cameras)],
                    [t('projectsPage.detail.city'), project.city[lang]],
                    [t('projectsPage.detail.year'), String(project.year)],
                    relatedPackage && [t('projectsPage.detail.package'), relatedPackage.name[lang]],
                    relatedSolution && [t('projectsPage.detail.solutionLink'), relatedSolution.name[lang]],
                  ]
                    .filter((row) => Array.isArray(row))
                    .map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                        <dt className="text-[0.8125rem] text-ink/65">{label}</dt>
                        <dd className="text-end text-[0.875rem] font-medium text-ink/85">
                          {label === t('projectsPage.detail.solutionLink') && relatedSolution ? (
                            <Link to={paths.solution(relatedSolution.slug)} className="link-underline">
                              {value}
                            </Link>
                          ) : label === t('projectsPage.detail.package') && relatedPackage ? (
                            <Link to={`${paths.packages}#${relatedPackage.slug}`} className="link-underline">
                              {value}
                            </Link>
                          ) : (
                            value
                          )}
                        </dd>
                      </div>
                    ))}
                </dl>

                <div className="mt-6 flex flex-col gap-2.5">
                  <WhatsAppButton
                    source="project_detail"
                    context={`${title} — ${t('wa.contexts.consultation')}`}
                    page={t('wa.pages.projects')}
                    label={t('projectsPage.detail.similar')}
                    size="lg"
                    className="w-full"
                  />
                  <CallButton
                    source="project_detail"
                    label={t('projectsPage.detail.call')}
                    variant="outline"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Case study body */}
          <div className="mt-16 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-3 md:gap-12">
            {[
              ['problem', project.problem[lang]],
              ['solution', project.solution[lang]],
              ['result', project.result[lang]],
            ].map(([key, value]) => (
              <section key={key} aria-labelledby={`project-${key}`}>
                <h2 id={`project-${key}`} className="eyebrow">
                  {t(`projectsPage.detail.${key}`)}
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/70">{value}</p>
              </section>
            ))}
          </div>

          {/* More projects */}
          {others.length ? (
            <section aria-labelledby="more-projects" className="mt-16 border-t border-ink/10 pt-12">
              <div className="mb-7 flex items-end justify-between gap-4">
                <h2 id="more-projects" className="text-display-sm">
                  {t('projectsPage.detail.more')}
                </h2>
                <Link
                  to={paths.projects}
                  className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/60 transition-colors hover:text-ink"
                >
                  {t('projectsPage.detail.back')}
                  <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {others.map((item) => {
                  const image = getImage(item.images[0])
                  return (
                    <Link key={item.slug} to={paths.project(item.slug)} className="group block">
                      <div className="overflow-hidden rounded-card bg-sand">
                        <div className="aspect-[4/3]">
                          <SmartImage
                            src={image.src}
                            alt={image.alt[lang]}
                            sizes="(min-width: 640px) 30vw, 92vw"
                            imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.04]"
                          />
                        </div>
                      </div>
                      <p className="mt-3 font-body text-[0.9375rem] font-medium">{item.title[lang]}</p>
                      <p className="text-[0.75rem] text-ink/65">
                        {item.city[lang]} · {item.cameras} {t('projectsPage.cameras')}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </section>
          ) : null}
        </Container>
      </article>

      <ClosingBand
        eyebrow={t('projectsPage.closing.eyebrow')}
        title={t('projectsPage.closing.title')}
        body={t('projectsPage.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.projects')}
        source="project_closing"
        primaryLabel={t('projectsPage.closing.primary')}
        note={t('projectsPage.closing.note')}
      />
    </>
  )
}
