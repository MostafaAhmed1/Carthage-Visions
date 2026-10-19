import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import FilterChips from '../components/ui/FilterChips'
import EmptyState from '../components/ui/EmptyState'
import ClosingBand from '../components/cta/ClosingBand'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectLightbox from '../components/projects/ProjectLightbox'
import { projects, projectTypes, projectsByType, placeholderProjects } from '../data/projects'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function Projects() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [type, setType] = useState('all')
  const [openSlug, setOpenSlug] = useState(null)

  const visible = useMemo(() => projectsByType(type), [type])

  const options = [
    { value: 'all', label: t('projectsPage.filterAll'), count: projects.length },
    ...projectTypes.map((item) => ({
      value: item.value,
      label: item.label[lang],
      count: projects.filter((p) => p.type === item.value).length,
    })),
  ]

  const active = projects.find((p) => p.slug === openSlug) ?? null

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('nav.projects'),
      description: t('projectsPage.lede'),
      url: `${shop.siteUrl}${paths.projects}`,
      hasPart: projects.map((project) => ({
        '@type': 'CreativeWork',
        name: project.title[lang],
        url: `${shop.siteUrl}${paths.project(project.slug)}`,
      })),
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
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.projects')} — ${shop.brand.name[lang]}`}
        description={t('projectsPage.lede')}
        path={paths.projects}
        jsonLd={jsonLd}
        noindex={placeholderProjects}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.projects') }]} />
        }
        eyebrow={t('projectsPage.eyebrow')}
        title={t('projectsPage.title')}
        lede={t('projectsPage.lede')}
      />

      <Container className="pb-section">
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-7 md:flex-row md:items-center md:justify-between">
          <FilterChips
            label={t('projectsPage.filtersLabel')}
            options={options}
            value={type}
            onChange={setType}
          />
          <p className="text-[0.75rem] text-ink/60">{t('projectsPage.count', { count: visible.length })}</p>
        </div>

        {visible.length ? (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                onOpen={() => setOpenSlug(project.slug)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title={t('projectsPage.emptyTitle')}
              body={t('projectsPage.emptyBody')}
              ctaLabel={t('projectsPage.emptyCta')}
              context={t('wa.contexts.consultation')}
              page={t('wa.pages.projects')}
              source="projects_empty"
            />
          </div>
        )}

        {placeholderProjects ? (
          <p className="mt-8 text-[0.6875rem] text-ink/60">{t('projectsPage.placeholderNote')}</p>
        ) : null}
      </Container>

      <ProjectLightbox project={active} onClose={() => setOpenSlug(null)} />

      <ClosingBand
        eyebrow={t('projectsPage.closing.eyebrow')}
        title={t('projectsPage.closing.title')}
        body={t('projectsPage.closing.body')}
        context={t('wa.contexts.consultation')}
        page={t('wa.pages.projects')}
        source="projects_closing"
        primaryLabel={t('projectsPage.closing.primary')}
        note={t('projectsPage.closing.note')}
      />
    </>
  )
}
