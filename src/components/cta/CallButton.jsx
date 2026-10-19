import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import { CheckIcon, PhoneIcon } from '../ui/Icons'
import { buildTelLink, plainPhone, displayPhone } from '../../lib/whatsapp'
import { useMediaQuery } from '../../hooks/useMedia'
import { track } from '../../lib/analytics'

/**
 * Phone CTA. On desktop the number is copied on click as well as dialled,
 * so it can be pasted into a phone or CRM.
 */
export default function CallButton({
  source = 'unknown',
  label,
  variant = 'outline',
  size = 'md',
  className = '',
  showNumber = false,
  copyOnClick = true,
  ...rest
}) {
  const { t } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleClick = async () => {
    track('call_click', { source, page: 'home' })
    if (!copyOnClick || !isDesktop) return
    try {
      await navigator.clipboard.writeText(plainPhone())
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2400)
    } catch {
      /* clipboard blocked — the tel: link still works */
    }
  }

  return (
    <span className="relative inline-flex">
      <Button
        as="a"
        href={buildTelLink()}
        variant={variant}
        size={size}
        className={className}
        onClick={handleClick}
        iconStart={<PhoneIcon className={size === 'lg' ? 'h-[1.3rem] w-[1.3rem]' : 'h-[1.15rem] w-[1.15rem]'} />}
        aria-label={`${t('common.callNow')} ${displayPhone()}`}
        {...rest}
      >
        {label ?? (showNumber ? displayPhone() : t('common.callNow'))}
      </Button>

      <span
        aria-live="polite"
        className={`pointer-events-none absolute top-full z-10 mt-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[0.6875rem] font-medium text-ivory transition-all duration-300 ${
          copied ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
        }`}
        style={{ insetInlineStart: 0 }}
      >
        <CheckIcon className="h-3 w-3 text-brass-soft" />
        {t('common.copied')}
      </span>
    </span>
  )
}
