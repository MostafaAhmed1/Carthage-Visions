import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PhoneIcon, WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink, buildTelLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/**
 * Thumb-friendly bar: WhatsApp (primary) + Call, always at the bottom on
 * small screens. Appears after the hero so it never covers the opening line.
 */
export default function StickyMobileBar() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 260)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = buildWhatsAppLink({ context: t('wa.contexts.general'), lang, page: t('wa.pages.home') })

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/95 backdrop-blur-md transition-transform duration-500 ease-calm md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { source: 'sticky_mobile_bar', lang })}
          className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-full bg-green text-[0.9375rem] font-medium text-ivory active:scale-[0.99]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t('common.whatsapp')}
        </a>
        <a
          href={buildTelLink()}
          onClick={() => track('call_click', { source: 'sticky_mobile_bar' })}
          className="flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-full border border-ink/20 text-[0.9375rem] font-medium text-ink active:scale-[0.99]"
        >
          <PhoneIcon className="h-[1.15rem] w-[1.15rem]" />
          {t('common.call')}
        </a>
      </div>
    </div>
  )
}
