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
import OpenNowBadge from '../components/cta/OpenNowBadge'
import { ArrowIcon } from '../components/ui/Icons'
import { getSolution, solutions } from '../data/solutions'
import { packages } from '../data/packages'
import { getProject } from '../data/projects'
import { getImage } from '../config/media'
import shop from '../config/shop'
import { paths } from '../lib/paths'

const SETUP_KEYS = ['cameras', 'storage', 'viewing', 'extras']

export default function SolutionDetail() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const solution = getSolution(slug)

  if (!solution) {
    return (
      <>
        <Seo title={`404 — ${t('solutionPage.notFoundTitle')}`} noindex />
        <Container className="pb-section pt-[calc(var(--header-h)+4rem)]">
          <EmptyState
            title={t('solutionPage.notFoundTitle')}
            body={t('solutionPage.notFoundBody')}
            ctaLabel={t('catalog.products.stripCta')}
            context={t('wa.contexts.consultation')}
            page={t('wa.pages.solutions')}
            source="solution_unknown"
          >
            <div className="mt-5">
              <Button as={Link} to={paths.solutions} variant="ghost" size="sm">
                {t('solutionPage.all')}
              </Button>
            </div>
          </EmptyState>
        </Container>
      </>
    )
  }

  const image = getImage(solution.image)
  const name = solution.name[lang]
  const pkg = solution.package ? packages.find((p) => p.slug === solution.package) : null
  const project = solution.project ? getProject(solution.project) : null
  const others = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${name} — ${t('nav.solutions')}`,
      description: solution.lede[lang],
      url: `${shop.siteUrl}${paths.solution(solution.slug)}`,
      serviceType: name,
      areaServed: shop.coverage.cities.map((c) => ({ '@type': 'City', name: c[lang] })),
      provider: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('common.home'), item: shop.siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('nav.solutions'),
          item: `${shop.siteUrl}${paths.solutions}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: `${shop.siteUrl}${paths.solution(solution.slug)}`,
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${name} — ${shop.brand.name[lang]}`}
        description={solution.lede[lang]}
        path={paths.solution(solution.slug)}
        image={image.src}
        jsonLd={jsonLd}
      />

      {/* Opening: image + copy */}
      <section className="relative overflow-hidden bg-ivory">
        <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.03]" aria-hidden="true" />
        <Container className="relative pb-14 pt-[calc(var(--header-h)+2rem)] md:pb-20">
          <Breadcrumbs
            items={[
              { label: t('common.home'), to: paths.home },
              { label: t('nav.solutions'), to: paths.solutions },
              { label: name },
            ]}
          />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden rounded-[999px_999px_1rem_1rem] bg-sand">
                <div className="aspect-[4/5]">
                  <SmartImage
                    src={image.src}
                    alt={solution.imageAlt?.[lang] ?? image.alt[lang]}
                    sizes="(min-width: 1024px) 40vw, 92vw"
                    priority
                  />
                </div>
                <div className="vignette pointer-events-none absolute inset-0" aria-hidden="true" />
              </div>
            </motion.div>

            <div className="lg:col-span-6 lg:col-start-7">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {t('nav.solutions')} · {solution.short[lang]}
              </motion.p>
              <motion.h1
                className="mt-4 text-display-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05 }}
              >
                {name}
              </motion.h1>
              <motion.p
                className="mt-5 max-w-reading text-lede text-ink/65"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {solution.lede[lang]}
              </motion.p>
              <motion.p
                className="mt-4 max-w-reading text-[0.9375rem] leading-relaxed text-ink/60"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {solution.intro[lang]}
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <WhatsAppButton
                  source="solution_detail"
                  context={name}
                  page={t('wa.pages.solutions')}
                  label={t('solutionPage.primary')}
                  size="lg"
                />
                <CallButton
                  source="solution_detail"
                  label={t('solutionPage.secondary')}
                  variant="outline"
                  size="lg"
                />
              </motion.div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <OpenNowBadge />
                <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
                <span className="text-[0.75rem] text-ink/65">{t('solutionPage.reassurance')}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Risks + setup */}
      <section className="border-y border-ink/10 bg-sand/35">
        <Container className="py-section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">{t('solutionPage.risksTitle')}</p>
              <p className="mt-3 text-[0.8125rem] text-ink/65">{t('solutionPage.risksNote')}</p>
              <ul className="mt-6 space-y-4">
                {solution.risks[lang].map((risk, index) => (
                  <motion.li
                    key={risk}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className="flex items-start gap-4 border-b border-ink/10 pb-4 text-[0.9375rem] leading-relaxed text-ink/70"
                  >
                    <span className="mt-1 font-display text-[0.875rem] text-brass-deep" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {risk}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow">{t('solutionPage.setupTitle')}</p>
              <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {SETUP_KEYS.map((key) => (
                  <div key={key} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
                    <dt className="text-[0.75rem] uppercase tracking-[0.12em] text-ink/60">
                      {t(`solutionPage.setup.${key}`)}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-ink/80 sm:col-span-2">
                      {solution.setup[key][lang]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Package + project pair */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
            {pkg ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65 }}
                className="flex flex-col justify-between rounded-card border border-ink/10 bg-ivory p-6 md:p-7"
              >
                <div>
                  <p className="eyebrow">{t('solutionPage.packageTitle')}</p>
                  <h2 className="mt-3 text-display-sm">{pkg.name[lang]}</h2>
                  <p className="mt-2 text-[0.875rem] text-ink/60">{pkg.summary[lang]}</p>
                  <p className="mt-2 text-[0.75rem] text-ink/60">{t('solutionPage.packageNote')}</p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
                  <span className="font-display text-[1.375rem] text-ink">
                    {t('common.from', { price: pkg.priceFrom })}
                  </span>
                  <Link
                    to={`${paths.packages}#${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-ink/70 transition-colors hover:text-ink"
                  >
                    {t('solutionPage.packageCta')}
                    <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
                  </Link>
                </div>
              </motion.div>
            ) : null}

            {project ? (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="overflow-hidden rounded-card border border-ink/10 bg-ivory"
              >
                <Link to={paths.project(project.slug)} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                    <SmartImage
                      src={getImage(project.images[0]).src}
                      alt={project.title[lang]}
                      sizes="(min-width: 768px) 45vw, 92vw"
                      imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                    <p className="absolute bottom-3 start-4 text-[0.6875rem] uppercase tracking-[0.14em] text-ivory/80">
                      {project.city[lang]} · {project.cameras} {t('projectsPage.cameras')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                    <div>
                      <p className="eyebrow">{t('solutionPage.projectTitle')}</p>
                      <h2 className="mt-2 font-body text-[1.0625rem] font-medium">{project.title[lang]}</h2>
                    </div>
                    <ArrowIcon className="h-4 w-4 shrink-0 text-ink/65 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Other solutions */}
      <Container className="py-section">
        <p className="eyebrow">{t('solutionPage.otherSolutions')}</p>
        <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to={paths.solution(other.slug)}
                className="group flex items-center justify-between gap-6 py-5 transition-colors hover:text-ink"
              >
                <span>
                  <span className="block font-body text-[1.0625rem] font-medium text-ink">
                    {other.name[lang]}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] text-ink/65">{other.short[lang]}</span>
                </span>
                <ArrowIcon className="h-4 w-4 shrink-0 text-ink/60 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <ClosingBand
        eyebrow={t('solutionsPage.closing.eyebrow')}
        title={t('solutionsPage.closing.title')}
        body={t('solutionsPage.closing.body')}
        context={`${name} — ${t('wa.contexts.consultation')}`}
        page={t('wa.pages.solutions')}
        source="solution_closing"
        primaryLabel={t('solutionPage.primary')}
        note={t('solutionsPage.closing.note')}
      />
    </>
  )
}
