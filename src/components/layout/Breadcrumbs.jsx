import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChevronIcon } from '../ui/Icons'

/** items: [{ label, to? }] — the last item is the current page. */
export default function Breadcrumbs({ items = [], className = '' }) {
  const { t } = useTranslation()

  return (
    <nav aria-label={t('catalog.breadcrumbLabel')} className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-ink/65">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <ChevronIcon className="h-3 w-3 -rotate-90 text-ink/65 rtl:rotate-90" /> : null}
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink/75' : ''}>
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
