import WhatsAppButton from '../cta/WhatsAppButton'

/**
 * One empty state, used by filters, categories and unknown routes inside the
 * catalogue. It always offers a way to continue by conversation.
 */
export default function EmptyState({
  title,
  body,
  ctaLabel,
  context,
  page,
  source = 'empty_state',
  icon = null,
  children,
}) {
  return (
    <div className="rounded-card border border-dashed border-ink/15 bg-sand/25 px-6 py-14 text-center sm:px-10">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-brass/30 text-brass-deep">
          {icon ?? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <h3 className="mt-5 text-display-sm">{title}</h3>
        {body ? <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/60">{body}</p> : null}
        {children}
        {ctaLabel ? (
          <div className="mt-6">
            <WhatsAppButton source={source} context={context} page={page} label={ctaLabel} size="md" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
