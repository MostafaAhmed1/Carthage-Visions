# Carthage Visions — قرطاج فيجن

A calm, premium Arabic-first (RTL) website for a security-camera shop in Barka, Oman.
Every screen is built to produce a **call** or a **WhatsApp message** — there is no cart,
no checkout and no forms.

Phase 1 contains the global layout, the design system, and the Home page.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to /dist
npm run preview
```

Node 20+ recommended (built on Node 22).

---

## Where everything lives

```
public/
  logo-mark.svg            ← temporary mark used in the wordmark
  images/                  ← placeholder photography + generated AVIF/WebP variants
  images/og.jpg            ← 1200×630 social card
  models/                  ← put hero-camera.glb here (see public/models/README.md)
src/
  config/shop.js           ← ALL business data: name, numbers, hours, coverage, flags
  config/media.js          ← every image + model path, alt text (AR/EN), credits
  config/image-manifest.json (generated)
  content lives in src/i18n/locales/{ar,en}.js
  components/
    layout/   Header, Footer, Logo, Layout, Preloader, PageTransition, Seo, SectionLink, ErrorBoundary
    cta/      WhatsAppButton, CallButton, StickyMobileBar, FloatingWhatsApp, OpenNowBadge, QuoteBuilder
    home/     Hero, TrustStrip, Solutions, Products, HowItWorks, Projects, Testimonials, Faq, CtaBand
    three/    HeroScene (display-only 3D)
    ui/       Button, Card, Section, Container, Sheet, Accordion, LanguageSwitch, SmartImage, Icons
  lib/        whatsapp.js, analytics.js, hours.js, quoteContext.jsx, scroll.js
  hooks/      useLenis, useMedia, useHeroModel
  i18n/       index.js + locales
  styles/     fonts.css (self-hosted), index.css (tokens + base)
scripts/      optimize-images.mjs, check-i18n.mjs, ssr-smoke.mjs
```

---

## 1. Edit your business data first

Everything user-facing is read from `src/config/shop.js`. Replace the `TODO` values:

- phone(s) → `contact.phones` (`display` for humans, `e164` for `tel:`)
- WhatsApp → `contact.whatsapp.digits` (digits only, e.g. `96891234567`)
- address, map links, geo
- hours (currently open 24/7 — `hours.week` accepts `null` for closed days and overnight ranges)
- brands, socials, rating, CR number, licence, analytics IDs, `siteUrl`

In development the console prints which placeholders are still in use.

## 2. Logo

The site ships with a typographic lockup. To use your own file:

1. Drop it in `public/` (transparent SVG or PNG, light and dark variants if you have them).
2. In `shop.js`: `brand.logoImage = '/logo.svg'`.

The header switches the header background from transparent to ivory on scroll, so a
single-colour logo needs to work on both dark and light. If yours does not, tell us and
we will add a `logoImageLight` variant.

## 3. The 3D hero camera

The display code is ready (`src/components/three/HeroScene.jsx`) and lazy-loads three.js
**only** when all of these are true: a real GLB exists, the viewport is ≥1024px, the device
is not in reduced-motion mode, and the hero is on screen. Otherwise the poster image is used.

Drop the model at `public/models/hero-camera.glb`. Requirements and sourcing notes are in
`public/models/README.md`. If you never add one, the site simply keeps the poster — nothing
breaks and no errors are logged.

## 4. Images

Placeholder photography is AI-generated for this build and owned by the site. Replace any file
in `public/images/` (keep the name) and re-run:

```bash
npm run images
```

This writes 480/800/1200px AVIF + WebP + JPEG variants and refreshes
`src/config/image-manifest.json`, which `SmartImage` uses for `srcset`.
Update alt text and credits in `src/config/media.js` and `CREDITS.md`.

## 5. Language

Arabic (RTL) is the default. The switch in the header/footer updates `<html lang dir>`,
persists the choice in `localStorage`, and all WhatsApp/phone messages follow the visitor's
language. `/?lang=en` opens the English version (used by `hreflang`).

Copy lives in `src/i18n/locales/ar.js` and `en.js` — same keys in both.

```bash
npm run check:i18n     # parity, empty strings, literal t() keys
```

## 6. Analytics

Add IDs in `shop.analytics` (`ga4Id`, `metaPixelId`). Scripts are only injected when an ID
exists. Events:

- `whatsapp_click` — `{ source, context, page, lang }`
- `call_click` — `{ source, page }`
- `quote_builder_open` — `{ source, page }`
- `quote_builder_submit` — `{ source, property, cameras, city, lang }`

`src/lib/analytics.js` maps these to GA4 events and Meta standard events (`Contact`, `Lead`).
Add a privacy page before switching them on.

## 7. QA before launch

```bash
npm run build
npm run preview
npm run smoke:render    # renders the page in Node; catches provider/i18n errors
```

Then check by hand: real numbers on a phone, WhatsApp prefilled message in both languages,
the open/closed badge around midnight Asia/Muscat, keyboard tab order, and Lighthouse on
mobile (target 90+).

---

## Design & performance notes

- One accent (brass), one pattern (arabesque at 3–5%), arch image masks, generous space.
- Every loop is transform/opacity only, paused off-screen, static under
  `prefers-reduced-motion` (which also disables Lenis, the 3D scene and GSAP).
- Contrast: body copy ≥ 4.5:1 on both surfaces; brass text uses `--c-brass-deep` on ivory.
- Focus rings use a dual outline + light halo so they read on dark and light sections.
- Images ship AVIF/WebP with srcset; fonts are self-hosted and `swap`; routes are code-split;
  three.js is in its own lazy chunk and is never requested without a model.
