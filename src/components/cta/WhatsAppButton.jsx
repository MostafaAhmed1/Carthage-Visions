import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import { WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

/**
 * Every WhatsApp link on the site goes through here: context is localised,
 * the language is the visitor's, and the click is tracked with its source.
 */
export default function WhatsAppButton({
  context,
  page,
  source = 'unknown',
  label,
  variant = 'whatsapp',
  size = 'md',
  className = '',
  iconEnd,
  showIcon = true,
  ...rest
}) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const resolvedContext = context ?? t('wa.contexts.general')
  const resolvedPage = page ?? t('wa.pages.home')
  const href = buildWhatsAppLink({ context: resolvedContext, lang, page: resolvedPage })

  return (
    <Button
      as="a"
      href={href}
      external
      variant={variant}
      size={size}
      className={className}
      iconStart={showIcon ? <WhatsAppIcon className={size === 'lg' ? 'h-[1.35rem] w-[1.35rem]' : 'h-5 w-5'} /> : null}
      iconEnd={iconEnd}
      aria-label={`${label ?? t('common.whatsappUs')} (${t('common.newTab')})`}
      onClick={() =>
        track('whatsapp_click', { source, context: resolvedContext, lang, page: resolvedPage })
      }
      {...rest}
    >
      {label ?? t('common.whatsappUs')}
    </Button>
  )
}
