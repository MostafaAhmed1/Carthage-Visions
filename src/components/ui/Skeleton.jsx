import { useTranslation } from 'react-i18next'

/**
 * Loading placeholders used while a catalog route chunk arrives.
 * Pure CSS shimmer (transform-free), static under prefers-reduced-motion.
 */
export function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return (
    <span
      aria-hidden="true"
      className={`block bg-ink/[0.06] ${rounded} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(100deg, rgb(20 17 14 / 0.04) 30%, rgb(20 17 14 / 0.09) 50%, rgb(20 17 14 / 0.04) 70%)',
        backgroundSize: '220% 100%',
        animation: 'skeleton 1.6s ease-in-out infinite',
      }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-ink/10">
      <Skeleton className="aspect-[4/5] w-full" rounded="rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 6 }) {
  const { t } = useTranslation()
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">{t('catalog.skeleton.grid')}</span>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function PageSkeleton() {
  const { t } = useTranslation()
  return (
    <div className="bg-ivory" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{t('catalog.skeleton.loading')}</span>
      <div className="shell pb-16 pt-[calc(var(--header-h)+3rem)]">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-6 h-10 w-2/3 max-w-lg" />
        <Skeleton className="mt-4 h-4 w-1/2 max-w-md" />
        <div className="mt-14">
          <GridSkeleton count={6} />
        </div>
      </div>
    </div>
  )
}

export function DetailSkeleton() {
  const { t } = useTranslation()
  return (
    <div className="bg-ivory" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{t('catalog.skeleton.loading')}</span>
      <div className="shell pb-20 pt-[calc(var(--header-h)+3rem)]">
        <Skeleton className="h-3 w-40" />
        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Skeleton className="aspect-[4/5] w-full" rounded="rounded-card" />
            <div className="mt-4 flex gap-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-20 w-20" rounded="rounded-xl" />
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:col-span-5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-9 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-6 h-12 w-48" rounded="rounded-full" />
            <Skeleton className="h-px w-full" />
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
