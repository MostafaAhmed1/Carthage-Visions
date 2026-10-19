import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WhatsAppIcon, PhoneIcon } from '../ui/Icons'
import { buildTelLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/**
 * Product-specific sticky bar. On mobile it replaces the generic site bar so
 * the visitor always carries the exact product context into WhatsApp.
 */
export default function ProductStickyBar({ whatsappHref, context }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/95 backdrop-blur-md transition-transform duration-500 ease-calm md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { source: 'product_sticky_bar', context })}
          className="flex min-h-[3.25rem] flex-[1.6] items-center justify-center gap-2 rounded-full bg-green px-3 text-[0.875rem] font-medium text-ivory active:scale-[0.99]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span className="truncate">{t('catalog.product.askShort')}</span>
        </a>
        <a
          href={buildTelLink()}
          onClick={() => track('call_click', { source: 'product_sticky_bar' })}
          className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full border border-ink/20 text-[0.875rem] font-medium text-ink active:scale-[0.99]"
        >
          <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
          {t('catalog.product.call')}
        </a>
      </div>
    </div>
  )
}
