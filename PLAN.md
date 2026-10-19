# Phase 1 — Plan & handover

Premium, calm camera-shop site for **Carthage Visions / قرطاج فيجن**, Barka, Oman.
Conversion model: **call or WhatsApp, nothing else.** No cart, no checkout, no forms.

---

## 1. Your answers, as built

| Question | Answer | Where it lives |
|---|---|---|
| Shop name | Carthage Visions / قرطاج فيجن | `shop.brand.name` |
| Phones / WhatsApp / email | placeholders `+968 9XXX XXXX`, `hello@carthagevisions.om` | `shop.contact` |
| Location | Barka, Oman | `shop.address` (coords are Barka centre) |
| Hours | Open every day, 24 hours | `shop.hours` |
| Coverage | Barka + all governorates; installation nationwide | `shop.coverage` |
| Language | Arabic default (RTL), English switch | `src/i18n` |
| Reassurance claims | Free survey · reply within minutes · installation & warranty | `shop.reassurances` |
| Logo / 3D model | Not present in this checkout → poster fallback + documented drop-in paths | `shop.brand.logoImage`, `media.model.src` |

### Placeholders to replace (all marked `TODO`)

- `contact.phones[0].display` + `.e164` — real number(s)
- `contact.whatsapp.display` + `.digits` (digits only, starts with `968`)
- `contact.email`
- `address.street`, exact `geo`, `mapsUrl`, `directionsUrl`
- `brands[]` (also feeds JSON-LD)
- `social.*`, `rating.value` / `rating.count` (rating block is hidden while `null`)
- `legal.crNumber`, `legal.licence`
- `analytics.ga4Id`, `analytics.metaPixelId`
- `siteUrl` (canonical/OG)
- Product prices: currently shown as **“السعر عند الطلب / price on request”**. Add a `fromPrice` per product in `src/config/media.js` neighbours if you want “from OMR X”.
- Project names/locations and testimonials are *example content* — replace with real ones before launch.

---

## 2. Sitemap

**Built now (Phase 1)**

```
/            Home (8 sections)
/404         Not found (catch-all)
```

**Planned — not built, as instructed**

```
/solutions            overview
/solutions/villas     /solutions/business    /solutions/farms-sites
/products             filterable, still quote-based
/products/[slug]
/projects             portfolio
/about                team, licensing, coverage
/contact              map, hours, directions — still WhatsApp-first
/privacy              required before running GA4/Meta pixel
```

---

## 3. Component tree

```
App (HelmetProvider → QuoteProvider → Router)
└─ Layout
   ├─ SkipLink · Preloader · ScrollManager · arch clip-path defs
   ├─ Header .......... Logo, SectionLink nav, LanguageSwitch, CallButton, WhatsAppButton, quote link, mobile sheet nav
   ├─ main → PageTransition → Home | NotFound
   │  └─ Home
   │     ├─ Hero ............ HeroScene (lazy, 3D) | SmartImage poster, WhatsApp/Call, OpenNowBadge
   │     ├─ TrustStrip
   │     ├─ Solutions ........ 3 arch-masked cards → QuoteBuilder
   │     ├─ Products ......... 4 cards → contextual WhatsApp links
   │     ├─ HowItWorks ....... GSAP scroll rail
   │     ├─ Projects
   │     ├─ Testimonials ..... slow marquee
   │     ├─ Faq .............. Accordion + sticky CTA column
   │     └─ CtaBand
   ├─ Footer ......... brand, nav, contact, hours, address, socials, legal, language
   ├─ StickyMobileBar . WhatsApp + Call (mobile only)
   ├─ FloatingWhatsApp (desktop only, pulse + tooltip)
   └─ QuoteBuilder .... Sheet (3 taps) + analytics
```

Primitives: `Button`, `Card`, `Section`, `Container`, `Sheet`, `Accordion`, `SmartImage`,
`Icons`, `LanguageSwitch`, `WhatsAppButton`, `CallButton`, `OpenNowBadge`,
`StickyMobileBar`, `FloatingWhatsApp`, `QuoteBuilder`, `Seo`.

---

## 4. Design tokens (`src/styles/index.css`)

| Token | Value | Use |
|---|---|---|
| `--c-ink` | `#14110e` | base, dark sections, primary text |
| `--c-ink-2 / 3` | `#1e1914 / #2d261f` | raised dark surfaces |
| `--c-ivory` | `#f6f1e8` | page surface |
| `--c-sand` / `--c-sand-deep` | `#e8dcc8 / #d5c4aa` | warm section bands, image beds |
| `--c-brass` | `#b08d57` | the single accent (lines, numerals, hovers) |
| `--c-brass-soft` | `#c9a86a` | accent on dark |
| `--c-brass-deep` | `#6a4e25` | accent text on ivory (AA) |
| `--c-green` | `#2e4034` | WhatsApp CTA only |
| `--c-terracotta` | `#a85c3e` | reserved micro-detail (unused for now) |

Rules: one accent visible at a time; brass never used for large fills; green only on the
primary WhatsApp action; pattern at 3.5–5% opacity; arch masks as the only organic shape.

---

## 5. Typography scale

| Role | Arabic | English |
|---|---|---|
| Display | Amiri 400/700 (naskh) | Cormorant Garamond 400, italic for the accent line |
| UI / body | IBM Plex Sans Arabic 400/500 | Manrope 400/500/600 |

Fluid steps: `display-xl` clamp(2.75→5.75rem) · `display-lg` (2.25→4.25) ·
`display-md` (1.875→2.9) · `display-sm` (1.5→2) · `lede` (1.06→1.25) · `body` 1rem · `small` .875 · `micro` .75.
Arabic line-height is raised to `1.85` for body and headings get letter-spacing reset.
Fonts are self-hosted via Fontsource (`font-display: swap`), Arabic subsets only.

---

## 6. Animation map

| Moment | Library | Behaviour | Reduced motion / low-end |
|---|---|---|---|
| Page transitions | Framer Motion | 0.6s fade + 14px rise, `AnimatePresence mode="wait"` | instant |
| Section entrances | Framer Motion | 0.7–0.9s opacity/translate, once | instant |
| Hero camera | R3F + three | 0.2 rad/s turntable + pointer parallax (≤0.1 rad) | poster still |
| Hero dust / scan / pattern | CSS keyframes (transform+opacity) | 11–68s loops, paused off-screen | static |
| Trust / testimonial marquee | CSS track | 68s linear, pause on hover/focus, off-screen pause | static row |
| WhatsApp pulse | CSS `pulseRing` | 3.4s ring, one soft ring | none |
| How it works | GSAP ScrollTrigger | line `scaleY` scrub 0.7 + active-step toggles (no pinning) | static, all steps visible |
| Hover / tap | Framer Motion + CSS | −1px lift, 0.985 tap, 900ms image scale 1.035 | colour only |
| Language switch | Framer `layoutId` | shared pill slides between AR/EN | instant |

Lenis handles smooth scroll (duration 1.15), disabled for `prefers-reduced-motion` and when
`shop.features.lenis` is false. Overlays lock scroll through Lenis-aware `setScrollLocked`.

---

## 7. i18n & RTL strategy

- `react-i18next`; `ar` and `en` resource bundles with **identical key sets**
  (`npm run check:i18n` verifies parity, empty values and literal `t()` keys).
- Arabic is the default. Choice persists in `localStorage['cv.lang']`; `<html lang dir>`
  is set before first paint (inline script) and on every change, so there is no LTR flash.
- `/?lang=en` is honoured, matching the `hreflang` alternates.
- Layout is logical-property only: `ps/pe`, `ms/me`, `start/end`, `text-start/end`,
  `border-s/e`, `insetInline*`. Directional icons flip with `rtl:-scale-x-100`.
- WhatsApp/phone messages, alt text, SEO title/description and JSON-LD are all localised.
- Arabic copy was written natively by the build, **but should still be reviewed by you**
  before launch — tone, local idiom and any brand-specific phrasing.

---

## 8. Conversion system

| Surface | Action | Prefilled context |
|---|---|---|
| Header | WhatsApp + Call (number visible on XL, icon+copy on LG) | general systems |
| Hero | WhatsApp + Call + reassurance | consultation |
| Solution cards | “Request a survey” → QuoteBuilder | solution_* |
| Product cards | “Ask about this” | product name |
| How it works | quote/survey | free site survey |
| Projects | “What would my place need?” | consultation |
| FAQ | WhatsApp + Call + open-now | consultation |
| CTA band | WhatsApp + Call + visible number | free site survey |
| Floating (desktop) | WhatsApp with tooltip | general |
| Sticky bar (mobile) | WhatsApp + Call | general |
| Quote builder | 3 taps → WhatsApp | structured summary |

Events fired through `src/lib/analytics.js`: `whatsapp_click`, `call_click`,
`quote_builder_open`, `quote_builder_submit` — each with `source`, `page`, `context`, `lang`.
GA4/Meta only load when IDs exist in `shop.analytics`.

---

## 9. Phase 1 acceptance checklist

- [x] React 18 + Vite + Router 6, lazy routes, page transitions
- [x] Tailwind logical properties, tokens, full AR/EN + RTL
- [x] Framer Motion, GSAP (one scroll moment), Lenis, R3F display layer
- [x] Per-page SEO, JSON-LD Store/LocalBusiness + FAQPage, OG, hreflang
- [x] Header CTAs, mobile bar, floating WhatsApp, open-now badge, quote builder, analytics
- [x] Home with exactly the 8 requested sections, ≤40-word blocks, ≤4 cards/row
- [x] AVIF/WebP srcset, lazy loading, font swap, reduced-motion paths, focus states
- [x] `npm run build` clean; SSR smoke render passes in both languages
- [ ] Real phone/WhatsApp numbers, address, logo, GLB, brands, prices, legal text
- [ ] Arabic copy review · Privacy page before enabling analytics
