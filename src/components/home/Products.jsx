import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Section from '../ui/Section'
import SmartImage from '../ui/SmartImage'
import Button from '../ui/Button'
import { ArrowIcon, WhatsAppIcon } from '../ui/Icons'
import { getImage } from '../../config/media'
import { featuredProducts } from '../../data/products'
import { paths } from '../../lib/paths'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/** Four chosen pieces from the catalogue. Each links to its full page. */
export default function Products() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const items = featuredProducts().slice(0, 4)

  return (
    <Section
      id="products"
      tone="sand"
      eyebrow={t('products.eyebrow')}
      title={t('products.title')}
      lede={t('products.lede')}
      className="scroll-mt-header"
      action={
        <Button
          as={Link}
          to={paths.products}
          variant="outline"
          size="sm"
          iconEnd={<ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />}
        >
          {t('catalog.products.view')}
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {items.map((product, index) => {
          const image = getImage(product.images[0])
          const name = product.name[lang]
          const href = buildWhatsAppLink({
            context: `${name} — ${t('wa.contexts.consultation')}`,
            lang,
            page: t('nav.products'),
          })

          return (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-card border border-ink/10 bg-ivory"
            >
              <Link
                to={paths.product(product.category, product.slug)}
                className="relative block aspect-square overflow-hidden bg-ivory"
              >
                <SmartImage
                  src={image.src}
                  alt={image.alt[lang]}
                  sizes="(min-width: 768px) 22vw, 45vw"
                  imgClassName="transition-transform duration-[900ms] ease-calm group-hover:scale-[1.04]"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4 md:p-5">
                <h3 className="font-body text-[0.9375rem] font-medium leading-snug text-ink">
                  <Link to={paths.product(product.category, product.slug)} className="link-underline">
                    {name}
                  </Link>
                </h3>
                <p className="mt-1.5 flex-1 text-[0.75rem] leading-relaxed text-ink/65">
                  {product.summary[lang]}
                </p>
                <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.12em] text-brass-deep/80">
                  {product.priceFrom ? t('common.from', { price: product.priceFrom }) : t('common.quoteOnly')}
                </p>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track('whatsapp_click', { source: `home_product_${product.slug}`, context: name, lang })
                  }
                  className="mt-4 inline-flex items-center gap-1.5 border-t border-ink/10 pt-3 text-[0.75rem] font-medium text-green transition-opacity hover:opacity-80"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  {t('products.cta')}
                </a>
              </div>
            </motion.article>
          )
        })}
      </div>

      <p className="mt-8 text-[0.75rem] text-ink/65">{t('products.pricesNote')}</p>
    </Section>
  )
}
