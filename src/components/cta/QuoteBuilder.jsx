import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Sheet from '../ui/Sheet'
import Button from '../ui/Button'
import { ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'
import { buildWhatsAppLink, buildTelLink } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'
import { useQuote } from '../../lib/quoteContext'

const STEPS = [
  { key: 'property', options: ['villa', 'shop', 'office', 'farm', 'site', 'other'] },
  { key: 'cameras', options: ['few', 'medium', 'many', 'lots', 'unsure'] },
  { key: 'city', options: ['barka', 'muscat', 'sohar', 'nizwa', 'other'] },
]

/**
 * Quote builder: three taps, no typing, nothing stored.
 * Choices are only ever written into the WhatsApp message the visitor sends.
 */
export default function QuoteBuilder() {
  const { open, closeQuote, source } = useQuote()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    if (open) {
      setStep(0)
      setAnswers({})
    }
  }, [open])

  const current = STEPS[step]
  const value = answers[current?.key]
  const complete = STEPS.every((s) => answers[s.key])

  const summary = useMemo(
    () =>
      STEPS.map((s) => (answers[s.key] ? t(`quote.${s.key}.${answers[s.key]}`) : null))
        .filter(Boolean)
        .join(' · '),
    [answers, t],
  )

  const rawMessage = useMemo(() => {
    if (!complete) return ''
    return lang === 'ar'
      ? [
          'أرغب بعرض سعر:',
          `• المكان: ${t(`quote.property.${answers.property}`)}`,
          `• عدد الكاميرات: ${t(`quote.cameras.${answers.cameras}`)}`,
          `• المدينة: ${t(`quote.city.${answers.city}`)}`,
        ].join('\n')
      : [
          "I'd like a quote:",
          `• Property: ${t(`quote.property.${answers.property}`)}`,
          `• Cameras: ${t(`quote.cameras.${answers.cameras}`)}`,
          `• City: ${t(`quote.city.${answers.city}`)}`,
        ].join('\n')
  }, [answers, complete, lang, t])

  const href = complete
    ? buildWhatsAppLink({ rawText: rawMessage, lang, page: t('wa.pages.quote') })
    : '#'

  const choose = (key, option) => {
    setAnswers((prev) => ({ ...prev, [key]: option }))
    // Auto-advance so the whole thing really is three taps.
    window.setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 160)
  }

  const submit = () => {
    track('quote_builder_submit', { source, ...answers, lang })
  }

  return (
    <Sheet
      open={open}
      onClose={closeQuote}
      eyebrow={t('quote.eyebrow')}
      title={t('quote.title')}
      closeLabel={t('a11y.closeSheet')}
    >
      <p className="mb-6 max-w-sm text-small text-ink/60">{t('quote.lede')}</p>

      {/* Progress */}
      <div className="mb-7">
        <div className="mb-2.5 flex items-center justify-between text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink/60">
          <span>{t('quote.step', { current: step + 1, total: STEPS.length })}</span>
          {summary ? <span className="normal-case tracking-normal text-ink/55">{summary}</span> : null}
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s.key}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${
                i <= step ? 'bg-brass' : 'bg-ink/10'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[16.5rem]">
        <h3 className="mb-4 font-body text-[1.0625rem] font-medium text-ink">{t(`quote.groups.${current.key}`)}</h3>
        <div className={`grid gap-2 ${current.options.length > 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {current.options.map((option) => {
            const active = value === option
            return (
              <motion.button
                key={option}
                type="button"
                onClick={() => choose(current.key, option)}
                whileTap={{ scale: 0.98 }}
                className={`flex min-h-[3.25rem] items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-start text-[0.9375rem] transition-colors duration-300 ${
                  active
                    ? 'border-brass bg-brass/10 text-ink'
                    : 'border-ink/12 bg-ivory text-ink/75 hover:border-ink/25 hover:text-ink'
                }`}
                aria-pressed={active}
              >
                <span>{t(`quote.${current.key}.${option}`)}</span>
                {active ? <CheckIcon className="h-4 w-4 shrink-0 text-brass-deep" /> : null}
              </motion.button>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-small text-ink/55 transition-colors hover:text-ink disabled:opacity-30"
          >
            {t('quote.back')}
          </button>

          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!value}
              onClick={() => setStep((s) => s + 1)}
              iconEnd={<ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />}
            >
              {t('quote.next')}
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-2 border-t border-ink/10 pt-5">
        <Button
          as="a"
          href={href}
          external
          variant="whatsapp"
          size="lg"
          className={`w-full ${complete ? '' : 'pointer-events-none opacity-40'}`}
          iconStart={<WhatsAppIcon className="h-5 w-5" />}
          onClick={submit}
          aria-disabled={!complete}
          tabIndex={complete ? 0 : -1}
        >
          {t('quote.submit')}
        </Button>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[0.75rem] leading-relaxed text-ink/60">{t('quote.privacy')}</p>
          <a
            href={buildTelLink()}
            onClick={() => track('call_click', { source: 'quote_builder' })}
            className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-ink/70 underline-offset-4 hover:underline"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {t('quote.callInstead')}
          </a>
        </div>
      </div>
    </Sheet>
  )
}
