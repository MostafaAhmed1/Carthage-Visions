import { useTranslation } from 'react-i18next'
import shop, { isPlaceholder } from '../../config/shop'
import Container from '../ui/Container'
import Logo from './Logo'
import SectionLink from './SectionLink'
import OpenNowBadge from '../cta/OpenNowBadge'
import LanguageSwitch from '../ui/LanguageSwitch'
import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'
import { buildTelLink, buildWhatsAppLink, plainPhone } from '../../lib/whatsapp'
import { track } from '../../lib/analytics'

const NAV = [
  { id: 'solutions', key: 'nav.solutions' },
  { id: 'products', key: 'nav.products' },
  { id: 'how', key: 'nav.how' },
  { id: 'work', key: 'nav.work' },
  { id: 'faq', key: 'nav.faq' },
]

export default function Footer() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'ar'
  const name = shop.brand.name[lang]
  const address = shop.address
  const socials = [
    { key: 'instagram', href: shop.social.instagram, Icon: InstagramIcon, label: 'Instagram' },
    { key: 'facebook', href: shop.social.facebook, Icon: FacebookIcon, label: 'Facebook' },
  ].filter((s) => s.href)

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="pointer-events-none absolute inset-0 arabesque opacity-[0.04]" aria-hidden="true" />

      <Container className="relative pb-24 pt-section md:pb-10">
        <div className="grid gap-12 border-b border-ivory/10 pb-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/60">{t('footer.blurb')}</p>
            <div className="mt-6">
              <OpenNowBadge tone="dark" />
            </div>
            <div className="mt-6 flex items-center gap-2">
              {socials.length ? (
                socials.map(({ key, href, Icon, label }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-ivory/40 hover:text-ivory"
                  >
                    <Icon />
                  </a>
                ))
              ) : (
                <span className="text-[0.75rem] text-ivory/50">{t('footer.socialPending')}</span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 font-body text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory/55">
              {t('footer.explore')}
            </h3>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    className="text-[0.875rem] text-ivory/65 transition-colors hover:text-ivory"
                  >
                    {t(item.key)}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-5 font-body text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory/55">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4 text-[0.875rem]">
              <li>
                <a
                  href={buildTelLink()}
                  onClick={() => track('call_click', { source: 'footer' })}
                  className="group flex items-start gap-2.5 text-ivory/70 transition-colors hover:text-ivory"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass/80" />
                  <span dir="ltr">{plainPhone()}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink({
                    context: t('wa.contexts.general'),
                    lang,
                    page: t('common.whatsapp'),
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('whatsapp_click', { source: 'footer', lang })}
                  className="flex items-start gap-2.5 text-ivory/70 transition-colors hover:text-ivory"
                >
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass/80" />
                  {t('common.whatsapp')}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${shop.contact.email}`}
                  className="flex items-start gap-2.5 text-ivory/70 transition-colors hover:text-ivory"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass/80" />
                  <span dir="ltr" className="break-all">{shop.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="mb-5 font-body text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-ivory/55">
              {t('footer.hoursTitle')}
            </h3>
            <div className="space-y-3 text-[0.875rem] text-ivory/65">
              <p className="flex items-start gap-2.5">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass/80" />
                <span>{shop.hours.label[lang]}</span>
              </p>
              <p className="ps-6 text-[0.8125rem] text-ivory/55">{shop.hours.note[lang]}</p>
            </div>
          </div>
        </div>

        {/* Visit */}
        <div className="flex flex-col gap-6 border-b border-ivory/10 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass/80" />
            <address className="not-italic text-[0.875rem] leading-relaxed text-ivory/65">
              {!isPlaceholder(address.street[lang]) ? `${address.street[lang]} · ` : ''}
              {address.city[lang]}، {address.region[lang]}
              <br />
              {address.country[lang]}
            </address>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.8125rem] font-medium text-ivory/75"
            >
              {t('common.viewOnMaps')}
            </a>
            <a
              href={address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.8125rem] font-medium text-ivory/75"
            >
              {t('common.getDirections')}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[0.75rem] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>
            {t('footer.rights', { year: shop.legal.copyrightYear, name })}
            {shop.legal.crNumber ? ` · ${t('footer.cr', { number: shop.legal.crNumber })}` : ''}
          </p>
          <div className="flex items-center gap-4">
            {shop.legal.licence ? <span>{shop.legal.licence}</span> : <span>{t('footer.builtNote')}</span>}
            <LanguageSwitch tone="dark" />
          </div>
        </div>
      </Container>

      {/* Oversized watermark wordmark — a single quiet brand moment */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden pb-2 text-center"
      >
        <span className="block whitespace-nowrap font-display text-[clamp(3rem,13vw,11rem)] leading-[0.8] text-ivory/[0.04]">
          {name}
        </span>
      </div>
    </footer>
  )
}
