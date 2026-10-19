import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getOpenStatus } from '../../lib/hours'

/**
 * "Open now / Closed · we reply on WhatsApp", computed in Asia/Muscat.
 * Re-evaluates every minute; the dot is the only place we allow green/amber.
 */
export default function OpenNowBadge({ tone = 'light', className = '' }) {
  const { t } = useTranslation()
  const [status, setStatus] = useState(() => getOpenStatus())

  useEffect(() => {
    const id = window.setInterval(() => setStatus(getOpenStatus()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  const dark = tone === 'dark'
  const label = status.open
    ? status.allDay
      ? t('common.openNow')
      : `${t('common.openNow')} · ${t('common.closesAt', { time: status.closesAt })}`
    : t('common.closedWa')

  return (
    <span
      className={`inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-wide ${
        dark ? 'text-ivory/70' : 'text-ink/65'
      } ${className}`}
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span
          className={`absolute inset-0 rounded-full ${status.open ? 'bg-green' : 'bg-brass'}`}
        />
        {status.open ? (
          <span className="absolute inset-0 animate-ping rounded-full bg-green/60 [animation-duration:3.5s]" />
        ) : null}
      </span>
      <span>{label}</span>
    </span>
  )
}
