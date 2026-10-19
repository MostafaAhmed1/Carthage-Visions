import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import SmartImage from '../ui/SmartImage'
import { ArrowIcon } from '../ui/Icons'
import media from '../../config/media'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

const KEYS = ['dome', 'bullet', 'nvr', 'access']

export default function Products() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  return (
    <Section
      id="products"
      tone="sand"
      eyebrow={t('products.eyebrow')}
      title={t('products.title')}
      lede={t('products.lede')}
      className="scroll-mt-header"
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {KEYS.map((key, index) => {
          const item = media.products[key]
          const name = t(`products.items.${key}.name`)
          const href = buildWhatsAppLink({
            context: `${name} — ${t('wa.contexts.consultation')}`,
            lang,
            page: t('wa.pages.products'),
          })

          return (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-card border border-ink/10 bg-ivory"
            >
              <div className="relative aspect-square overflow-hidden bg-ivory">
                <SmartImage
                  src={item.src}
                  alt={item.alt[lang]}
                  sizes="(min-width: 768px) 22vw, 45vw"
                  imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h3 className="font-body text-[0.9375rem] font-medium leading-snug text-ink">{name}</h3>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-ink/55">
                  {t(`products.items.${key}.spec`)}
                </p>
                <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.12em] text-brass-deep/80">
                  {t('common.quoteOnly')}
                </p>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track('whatsapp_click', { source: `product_${key}`, context: name, lang })
                  }
                  className="mt-4 inline-flex items-center gap-1.5 border-t border-ink/10 pt-3 text-[0.75rem] font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {t('products.cta')}
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>

      <p className="mt-8 text-[0.75rem] text-ink/55">{t('products.pricesNote')}</p>
    </Section>
  )
}
