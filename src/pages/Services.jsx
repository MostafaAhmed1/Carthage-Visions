import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import Container from '../components/ui/Container'
import ClosingBand from '../components/cta/ClosingBand'
import ServiceBlock from '../components/services/ServiceBlock'
import { services } from '../data/services'
import { paths } from '../lib/paths'
import shop from '../config/shop'

export default function Services() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t('nav.services'),
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.name[lang],
          description: service.benefit[lang],
          serviceType: service.name[lang],
          provider: { '@type': 'Organization', name: shop.brand.name[lang], url: shop.siteUrl },
          areaServed: shop.coverage.cities.map((c) => ({ '@type': 'City', name: c[lang] })),
        },
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
          name: t('nav.services'),
          item: `${shop.siteUrl}${paths.services}`,
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={`${t('nav.services')} — ${shop.brand.name[lang]}`}
        description={t('services.lede')}
        path={paths.services}
        jsonLd={jsonLd}
      />

      <PageHeader
        breadcrumbs={
          <Breadcrumbs items={[{ label: t('common.home'), to: paths.home }, { label: t('nav.services') }]} />
        }
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        lede={t('services.lede')}
      />

      <Container className="pb-section">
        <div className="border-t border-ink/10">
          {services.map((service, index) => (
            <ServiceBlock key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Container>

      <ClosingBand
        eyebrow={t('services.closing.eyebrow')}
        title={t('services.closing.title')}
        body={t('services.closing.body')}
        context={t('wa.contexts.survey')}
        page={t('wa.pages.services')}
        source="services_closing"
        primaryLabel={t('services.closing.primary')}
        note={t('services.closing.note')}
      />
    </>
  )
}
