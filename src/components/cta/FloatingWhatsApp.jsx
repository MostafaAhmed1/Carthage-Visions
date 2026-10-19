import { useTranslation } from 'react-i18next'
import { WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/**
 * Desktop only. A single floating button with a very slow pulse ring and a
 * tooltip that appears on hover/focus — never a popup over the content.
 */
export default function FloatingWhatsApp() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const href = buildWhatsAppLink({ context: t('wa.contexts.general'), lang, page: t('wa.pages.home') })

  return (
    <div className="pointer-events-none fixed bottom-8 z-40 hidden md:block" style={{ insetInlineEnd: '2rem' }}>
      <div className="group pointer-events-auto relative">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-green/25 motion-safe:animate-pulse-ring"
        />
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { source: 'floating_button', lang })}
          aria-label={`${t('common.chatWithUs')} — ${t('common.whatsapp')}`}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-green text-ivory shadow-[0_20px_45px_-20px_rgb(20_17_14_/_0.65)] transition-transform duration-300 ease-calm hover:scale-[1.04]"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>

        <span
          role="tooltip"
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-[0.75rem] font-medium text-ivory opacity-0 shadow-lift transition-all duration-300 ease-calm group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ insetInlineEnd: 'calc(100% + 0.75rem)' }}
        >
          {t('common.chatWithUs')}
          <span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-ink"
            style={{ insetInlineEnd: '-0.25rem' }}
          />
        </span>
      </div>
    </div>
  )
}
