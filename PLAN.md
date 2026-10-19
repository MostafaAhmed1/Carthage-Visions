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

**Built in Phase 2**

```
/products                 category overview + family filter
/products/:category       category grid + "not sure?" strip
/products/:category/:slug detail: gallery, specs, included, related, sticky CTA
/packages                 three tiers, recommended one, quote-builder link
/brands                   monochrome marks + one-line notes
```

**Planned — not built**

```
/solutions            overview
/solutions/villas     /solutions/business    /solutions/farms-sites
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

---

## Phase 2 — catalogue, packages, brands

### Routes

| Route | Page | Purpose | Indexing |
|---|---|---|---|
| `/products` | Products | 7 category tiles, family filter, WhatsApp ask on each card | noindex while `placeholderCatalog` |
| `/products/:category` | ProductCategory | intro, calm grid, "not sure?" strip; unknown slug → empty state | noindex while placeholder |
| `/products/:category/:slug` | ProductDetail | gallery, 5 spec rows, who it suits, what installation includes, 3 related, sticky CTA | noindex while placeholder |
| `/packages` | Packages | 3 tiers, subtle recommended, prefilled WhatsApp, quote-builder custom block | noindex while `placeholderPackages` |
| `/brands` | Brands | monochrome placeholder marks + one-line notes | noindex while `placeholderBrands` |

Each page has its own `Seo` (title, description, canonical, OG, hreflang) plus JSON-LD:
`CollectionPage` + `ItemList` (category), `Product` + `Offer` (detail), `OfferCatalog`
(packages), `CollectionPage` (brands), and `BreadcrumbList` on every inner page.

### Data

- `src/data/products.js` — 7 categories, 14 products, bilingual, `priceFrom` or `null`.
- `src/data/packages.js` — 3 tiers with cameras/storage/installation/warranty/inclusions.
- `src/data/brands.js` — 6 placeholder marks + notes, `placeholderBrands` flag.
- Placeholder flags (`placeholderCatalog`, `placeholderPackages`, `placeholderBrands`) keep
  unreviewed content out of search results. Flip to `false` when the data is real.

### New components (reusing the Phase 1 system)

`PageHeader`, `Breadcrumbs`, `FilterChips` (radiogroup, arrow-key navigation, one tab stop),
`Skeleton`/`PageSkeleton`/`DetailSkeleton`, `EmptyState`, `ProductCard`, `CategoryCard`,
`ProductGallery`, `SpecList`, `ProductStickyBar`, `AskStrip`, `PackageCard`, `BrandMark`.
`WhatsAppButton` gained `rawText` (full custom message) and `page` (analytics/context label);
`Button` now accepts router `Link` without losing navigation; `SmartImage` gained a
decode-time skeleton; `Seo` accepts arrays of JSON-LD and an `image` override.

### Conversion details

- Every catalog card carries an explicit "Ask on WhatsApp" (categories) or a single link
  into the detail page (products) — one job per card.
- Product detail message includes the product name **and its absolute URL**.
- Packages message includes the package name and its anchor URL.
- On product detail the generic mobile bar is replaced by a product-specific bar
  ("Ask about it" + Call) so the context travels with the visitor.
- No prices are hard-coded in components: `priceFrom` is data, `null` renders
  "price on request".

### QA

`npm run build` · `npm run lint` · `npm run check:i18n` · `npm run smoke:render`
(renders 7 routes × 2 languages, asserts WhatsApp links carry the product URL).

---

## Phase 3 — solutions, services, survey, support, projects

### Routes

| Route | Page | Purpose | Indexing |
|---|---|---|---|
| `/solutions` | Solutions | five spaces, arch-masked scene images, one link per card | indexed |
| `/solutions/:slug` | SolutionDetail | risks → recommended setup → sample package → related project → CTAs | indexed |
| `/services` | Services | six calm blocks, each with one WhatsApp action | indexed |
| `/site-survey` | SiteSurvey | the conversion page: what the visit includes, 3 steps, reassurance, one big WhatsApp + Call | indexed, `Service` JSON-LD |
| `/support` | Support | three maintenance plans, covered / not covered, "having a problem?" strip | indexed |
| `/projects` | Projects | filterable gallery, lightbox, placeholder note | **noindex** while `placeholderProjects` |
| `/projects/:slug` | ProjectDetail | problem / what we fitted / what changed, package + solution links | **noindex** while `placeholderProjects` |

Each page has its own `Seo` (title, description, canonical, OG, hreflang, JSON-LD) inside
the existing page transition, the global sticky mobile Call/WhatsApp bar, and a shared
`ClosingBand` at the foot.

### Data

- `src/data/solutions.js` — 5 solutions; each carries `risks`, `setup{cameras,storage,viewing,extras}`,
  an optional `package` and `project` slug, and a `scene:*` image key.
- `src/data/services.js` — 6 services, plus `supportPlans` (Essential / Care / Business).
  Every response time is marked `responsePlaceholder: true`.
- `src/data/projects.js` — 8 case studies with `placeholderProjects = true`. Cities, camera
  counts and results are illustrative; the flag keeps them out of search until replaced.

### The one scroll moment

`src/components/survey/SurveySteps.jsx` draws a vertical brass rail down the three steps
with GSAP `ScrollTrigger` (scrub) and settles each step in once. The rail is vertical on
purpose so RTL needs no mirroring; under `prefers-reduced-motion` it renders fully drawn
and static. Everything else on the seven pages is opacity/transform via Framer Motion,
`once: true`, paused off-screen.

### RTL

- Directional spacing uses logical utilities only (`ps/pe`, `start/end`, `text-end`).
- Arrows use `rtl:-scale-x-100`; hover nudges flip with `rtl:group-hover:-translate-x-1`.
- Filter chips, the survey progress rail and the lightbox carousel are direction-agnostic.
- The Arabic nav is longer than the English one: the desktop nav gap and the quote link
  breakpoint were tuned so both fit at 1024–1440, and the mobile menu scrolls.

### QA

`npm run build` · `npm run lint` · `npm run check:i18n` · `npm run smoke:render`
(14 routes × 2 languages, asserting WhatsApp links, package/project cross-links, `tel:`).

---

## Phase 4 — the remaining pages, and the quality pass

### Routes added

| Route | Page | Notes |
|---|---|---|
| `/about` | About | story, four values, timeline, roles-only team, arch photo strip |
| `/blog` | Blog | topic filters + search, empty state, reading time |
| `/blog/:slug` | BlogPost | long-form reading column, inline WhatsApp CTA, related guides |
| `/faq` | Faq | search + categories, ARIA accordion, `FAQPage` JSON-LD |
| `/contact` | Contact | call and WhatsApp as the two largest elements, map + fallback, hours, quote-builder entry |
| `/privacy`, `/terms` | Legal | shared LegalPage shell, review banner, `noindex` until signed off |
| `*` | NotFound | rewritten: two large actions, home and guides links |

### New systems

- **Consent** (`src/lib/consent.js` + `CookieBanner`): analytics loads only after "accept";
  declining is remembered; no third-party request before a choice.
- **Numbers** (`src/lib/format.js`): `shop.formatting.numerals` decides `0-9` vs `٠-٩` for Arabic
  text only; phone numbers stay Western.
- **Reading time** (`src/lib/readingTime.js`): derived from the article, never typed.
- **Nav overflow**: five primary links + a "More" menu (keyboard/Escape/outside-click aware), so
  Arabic labels never crowd the header.
- **Above-the-fold CTAs**: `PageHeader` now renders WhatsApp + Call by default; pages with their
  own hero actions opt out with `cta={false}`.
- **Global reduced motion**: `<MotionConfig reducedMotion="user">` plus the existing CSS switch.
- **Icons**: generated favicon/manifest set from the placeholder mark.

### Accessibility & performance pass

- Raised every low-opacity text token to at least `ink/60` / `ivory/65` (≈4.8:1 on ivory), so
  small labels pass AA.
- No physical direction utilities remain anywhere in `src/` (checked by grep); arrows mirror with
  `rtl:-scale-x-100`, spacing uses `ps/pe` and `start/end`.
- Hero 3D verified: lazy, desktop-only, DPR ≤ 1.75, poster fallback, `frameloop` demand under
  reduced motion, unmounts off-screen.
- Removed the unused Cormorant 300 face; all fonts remain self-hosted subsets.

### QA added

`npm run check:links` (WhatsApp/tel payloads in both languages) and
`npm run check:analytics` (event shape, Meta mapping, consent-safe no-op), both wired into
`npm run qa` alongside lint, build and the 21-route SSR smoke test.
