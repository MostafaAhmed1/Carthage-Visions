import { useTranslation } from 'react-i18next'
import Seo from '../components/layout/Seo'
import Hero from '../components/home/Hero'
import TrustStrip from '../components/home/TrustStrip'
import Solutions from '../components/home/Solutions'
import Products from '../components/home/Products'
import HowItWorks from '../components/home/HowItWorks'
import Projects from '../components/home/Projects'
import Testimonials from '../components/home/Testimonials'
import Faq from '../components/home/Faq'
import CtaBand from '../components/home/CtaBand'

const FAQ_KEYS = ['one', 'two', 'three', 'four', 'five']

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map((key) => ({
      '@type': 'Question',
      name: t(`faq.items.${key}.q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`faq.items.${key}.a`) },
    })),
  }

  return (
    <>
      <Seo
        title={
          lang === 'ar'
            ? 'قرطاج فيجن — كاميرات مراقبة في عُمان | معاينة مجانية وتركيب'
            : 'Carthage Visions — Security Cameras in Oman | Free Survey & Installation'
        }
        description={
          lang === 'ar'
            ? 'أنظمة كاميرات مراقبة للمنازل والمحلات والمزارع في عُمان. معاينة مجانية، تركيب وضمان، ومشاهدة من هاتفك. تواصل واتساب أو اتصل بنا.'
            : 'Camera systems for homes, shops and farms across Oman. Free site survey, installation and warranty, viewing from your phone. WhatsApp or call us.'
        }
        jsonLd={faqSchema}
      />

      <Hero />
      <TrustStrip />
      <Solutions />
      <Products />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  )
}
