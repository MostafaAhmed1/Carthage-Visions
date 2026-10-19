import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon } from '../ui/Icons'
import media from '../../config/media'
import { useQuote } from '../../lib/quoteContext'

const KEYS = ['home', 'business', 'site']

export default function Solutions() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const { openQuote } = useQuote()

  return (
    <Section
      id="solutions"
      eyebrow={t('solutions.eyebrow')}
      title={t('solutions.title')}
      lede={t('solutions.lede')}
      className="scroll-mt-header"
    >
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {KEYS.map((key, index) => {
          const item = media.solutions[key]
          return (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              <div className="relative arch-mask-soft overflow-hidden bg-sand">
                <div className="aspect-[4/5] w-full">
                  <SmartImage
                    src={item.src}
                    alt={item.alt[lang]}
                    sizes="(min-width: 768px) 30vw, 90vw"
                    imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.035]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 start-4 rounded-full border border-ivory/25 bg-ink/45 px-3 py-1 text-[0.6875rem] text-ivory/85 backdrop-blur-sm">
                  {t(`solutions.items.${key}.detail`)}
                </span>
              </div>

              <div className="flex flex-1 flex-col pt-6">
                <h3 className="text-display-sm">{t(`solutions.items.${key}.title`)}</h3>
                <p className="mt-3 max-w-[26rem] text-[0.9375rem] leading-relaxed text-ink/65">
                  {t(`solutions.items.${key}.body`)}
                </p>
                <button
                  type="button"
                  onClick={() => openQuote(`solution_${key}`)}
                  className="mt-5 inline-flex items-center gap-2 self-start text-[0.8125rem] font-medium text-ink/75 transition-colors hover:text-ink"
                >
                  <span className="link-underline">{t('solutions.cta')}</span>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 ease-calm group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
