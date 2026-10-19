# Carthage Visions — قرطاج فيجن

A calm, bilingual (Arabic-first / English) website for a security-camera installer in Barka,
Oman. Every page exists to produce one of two actions: **call** or **WhatsApp**. There is no
cart, no booking and no contact form.

- **Stack:** Vite · React 18 · React Router · Tailwind CSS · Framer Motion · GSAP (one scroll moment) · react-three-fiber (optional hero) · i18next
- **Languages:** Arabic (default, RTL) and English (LTR), one shared component tree
- **Content:** all copy lives in `src/i18n/locales/{ar,en}.js` and `src/data/*.js` — never in components

---

## 1. Quick start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # serve the build locally
```

Requires Node 18+ (Node 20 recommended).

### Quality commands

| Command | What it checks |
|---|---|
| `npm run qa` | everything below, in order |
| `npm run lint` | ESLint (flat config, React + a11y-minded rules) |
| `npm run format` | Prettier write (`src/`, `scripts/`) |
| `npm run format:check` | Prettier check, no writes |
| `npm run check:i18n` | AR/EN parity, empty strings, missing `t()` keys, duplicate keys |
| `npm run check:links` | every WhatsApp message carries brand + context + page; `tel:` is valid E.164 |
| `npm run check:analytics` | event shape, Meta mapping, consent-safe no-op |
| `npm run build` | production build |
| `npm run smoke:render` | server-renders all 21 routes in Arabic (Node, no browser) |
| `npm run smoke:render:en` | the same in English |

`smoke:render` is the fastest way to catch a missing translation, a broken provider or a
bad SEO payload without opening a browser.

---

## 2. Where everything lives

```
public/
  logo-mark.svg              ← temporary typographic mark (favicon source)
  favicon-32/48.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png
  site.webmanifest           ← PWA metadata (name, colours, icons)
  images/                    ← placeholder photography + generated AVIF/WebP variants
  images/og.jpg              ← 1200×630 social card
  models/                    ← put hero-camera.glb here (see public/models/README.md)
  robots.txt, sitemap.xml

src/
  config/shop.js             ← ALL business data: name, numbers, hours, address, coverage, flags
  config/media.js            ← every image + model path, alt text (AR/EN), credits
  config/nav.js              ← primary nav, "More" menu, mobile order
  config/image-manifest.json ← generated — do not edit
  data/products.js           ← categories + product catalogue (PLACEHOLDER)
  data/packages.js           ← bundle tiers and starting prices (PLACEHOLDER)
  data/brands.js             ← brands carried + monochrome marks (PLACEHOLDER)
  data/solutions.js          ← five space types and their recommended setups
  data/services.js           ← six services + three maintenance plans (PLACEHOLDER response times)
  data/projects.js           ← eight case studies (PLACEHOLDER, kept noindex)
  data/blog.js               ← security guides (bilingual, 5 posts)
  data/faqPage.js            ← categorised FAQ (16 questions)
  data/legal.js              ← privacy + terms drafts (PLACEHOLDER, kept noindex)
  data/about.js              ← story, values, team roles, timeline, photo strip

  content lives in src/i18n/locales/{ar,en}.js

  components/
    layout/   Header, MoreMenu, Footer, Logo, Layout, Preloader, PageTransition, Seo,
              PageHeader, Breadcrumbs, ErrorBoundary, CookieBanner
    cta/      WhatsAppButton, CallButton, StickyMobileBar, FloatingWhatsApp, OpenNowBadge,
              QuoteBuilder, ClosingBand (shared closing CTA band)
    home/     Hero, TrustStrip, Solutions, Products, HowItWorks, Projects, Testimonials, Faq, CtaBand
    catalog/  ProductCard, CategoryCard, ProductGallery, SpecList, ProductStickyBar, AskStrip, PackageCard
    solutions/ SolutionCard
    services/  ServiceBlock, SupportPlanCard
    projects/  ProjectCard, ProjectLightbox
    survey/    SurveySteps (the one GSAP scroll moment)
    blog/      BlogCard
    legal/     LegalPage
    brands/    BrandMark
    three/     HeroScene (display-only 3D, lazy)
    ui/        Button, Card, Section, Container, Sheet, Accordion, LanguageSwitch,
               SmartImage, FilterChips, EmptyState, Skeleton, Icons

  lib/        whatsapp.js, analytics.js, consent.js, hours.js, quoteContext.jsx,
              scroll.js, paths.js, readingTime.js, format.js
  hooks/      useLenis, useMedia, useHeroModel
  i18n/       index.js + locales
  styles/     fonts.css (self-hosted), index.css (tokens + base)

scripts/      optimize-images.mjs, check-i18n.mjs, check-links.mjs, check-analytics.mjs,
              ssr-smoke.mjs, helmet-stub.js
```

---

## 3. Replace the brand and business details

Everything customer-facing comes from **`src/config/shop.js`**. Edit it once and the header,
footer, WhatsApp messages, JSON-LD, opening-hours badge, map and contact page all follow.

| Field | What it changes |
|---|---|
| `brand.name` / `brand.tagline` / `brand.shortDescription` | Wordmark, titles, meta descriptions |
| `brand.logoImage` | Set to `/logo.svg` to use an image logo instead of the wordmark |
| `contact.phones[]` | `tel:` links, header, footer, contact page (`e164` must be digits only) |
| `contact.whatsapp.digits` | Every WhatsApp link on the site |
| `contact.email` | Footer and contact page |
| `address` | Contact page, footer, map embed, LocalBusiness JSON-LD |
| `hours` | Open-now badge and "Open every day" copy |
| `coverage.cities` | "Where we work" chips and `areaServed` JSON-LD |
| `legal.crNumber` / `legal.licence` | Footer legal line |
| `analytics.ga4Id` / `metaPixelId` | Loaded **only** after cookie consent |
| `formatting.numerals` | `'western'` (default) or `'arabic-indic'` |
| `features.threeD` | Turns the hero 3D scene on/off (poster remains) |
| `siteUrl` | Canonical URLs, Open Graph, JSON-LD, sitemap |

Search for `TODO` in `src/` to find every remaining placeholder:
```bash
grep -rn "TODO" src/ | grep -v node_modules
```
See **`CHECKLIST.md`** for the human-readable version, grouped by page.

---

## 4. Swapping media

All images are referenced through `src/config/media.js` (never hard-coded in components), and
every entry carries bilingual `alt` text plus a credit line.

1. Drop the new file into `public/images/` using the **same base name** (e.g. `hero-poster.jpg`).
2. Run `npm run images`. This regenerates AVIF/WebP/JPEG variants at 480/800/1024/1200 px and
   rewrites `src/config/image-manifest.json`.
3. Adjust `alt` text and the credit in `media.js`.

`SmartImage` reads the manifest, so it never requests a variant that does not exist.

### The 3D hero camera

The scene is display-only: it loads, centres, lights and gently rotates the model.

1. Put the file at `public/models/hero-camera.glb` (spec in `public/models/README.md`).
2. Keep `features.threeD: true` in `shop.js`.

Behaviour already implemented:

- lazy-loaded — the three.js chunk only downloads on desktop, after the hero is in view;
- **desktop only**, and only above 1024 px;
- replaced by the poster image when the model is missing, on mobile, or with reduced motion;
- DPR capped at 1.75;
- loop rotation stops under `prefers-reduced-motion` (`frameloop: 'demand'`);
- the canvas unmounts when the hero leaves the viewport.

If the model is absent, nothing breaks: `useHeroModel` reports `missing` and the poster stays.

---

## 5. Editing content

| Page(s) | File to edit |
|---|---|
| Home sections, nav labels, buttons | `src/i18n/locales/{ar,en}.js` |
| Products / categories | `src/data/products.js` (plus copy in locales if you add a category) |
| Packages | `src/data/packages.js` |
| Brands | `src/data/brands.js` |
| Solutions (`/solutions`, `/solutions/:slug`) | `src/data/solutions.js` |
| Services & support plans | `src/data/services.js` |
| Projects (`/projects`, `/projects/:slug`) | `src/data/projects.js` |
| Guides (`/blog`, `/blog/:slug`) | `src/data/blog.js` |
| FAQ (`/faq`) | `src/data/faqPage.js` |
| Privacy / Terms | `src/data/legal.js` |
| About | `src/data/about.js` |

Semantics worth knowing:

- **Projects** are flagged with `placeholderProjects = true` in `data/projects.js`. While that
  flag is on, the pages render a visible note and are `noindex`. Set it to `false` only when
  every project is real.
- **Legal text** is flagged with `reviewRequired = true` in `data/legal.js`, which keeps
  `/privacy` and `/terms` out of search results. Flip it after a legal review.
- Products, packages and brands already carry `placeholderCatalog` / `placeholderPackages` /
  `placeholderBrands` flags with the same behaviour.
- **Blog posts** have a date, cover image key, sections and a takeaway. Reading time is derived
  automatically (`src/lib/readingTime.js`) — do not type it by hand.
- Adding a blog post updates `/blog`, the post page, related posts and `Blog` JSON-LD; remember
  to add the URL to `public/sitemap.xml` (there is a separate entry block for guides).

---

## 6. Copy, languages and numbers

- Arabic is the default language; English is a switch away. Both locale files must always have
  the **same keys** — `npm run check:i18n` enforces it.
- Never reuse a top-level block name for a different purpose: a second `faq:` block silently
  replaces the first. Page-level copy uses `*Page` names (`faqPage`, `projectsPage`, …).
- Arabic typography is tuned globally in `src/styles/index.css`: Amiri for display, IBM Plex
  Sans Arabic for body, looser line height, no negative letter-spacing.
- Numbers: `shop.formatting.numerals` controls `0-9` vs `٠-٩` for Arabic text only. Phone numbers
  stay Western by design (`src/lib/format.js`).

---

## 7. Conversion, consent and analytics

- **Sticky mobile bar** (WhatsApp + Call) on every page; product detail swaps in a
  product-specific bar.
- **Header** always carries Call + WhatsApp on desktop.
- **ClosingBand** finishes every page with the same two actions.
- **WhatsApp messages are prefilled** with the page, the item and the language — verify with
  `npm run check:links`.
- **Analytics never loads before consent.** The banner stores `accepted` / `declined` in
  `localStorage` under `cv.consent`; only `accepted` starts gtag or the Meta pixel.
  Events: `whatsapp_click`, `call_click`, `quote_builder_open`, `page_view`, plus Meta's
  `Contact` / `Lead` mapping.

---

## 8. Deploying

The build is a static SPA (`dist/`). Both hosts need a rewrite so deep links resolve.

### Vercel

1. Import the repository.
2. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
3. Add `vercel.json` at the repo root:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

4. Set the production domain, then update `siteUrl` in `src/config/shop.js` and the absolute
   URLs in `public/sitemap.xml` / `public/robots.txt`.

### Netlify

1. Build command `npm run build`, publish directory `dist`.
2. Add `public/_redirects` containing:

```
/*  /index.html  200
```

3. Same domain step as above.

### After the first deploy

- Replace the placeholder phone, WhatsApp and email, then re-run `npm run check:links`.
- Confirm the map embed points at the real location (`shop.address.geo`).
- Flip the placeholder flags once the content is real.
- Submit `sitemap.xml` in Google Search Console.

---

## 9. Design & performance notes

- **Palette:** ink/charcoal, ivory/sand, one brass accent. Tokens live in `src/styles/index.css`.
- **Pattern & shape:** one arabesque pattern at 3–6% opacity, arch masks for imagery.
- **Motion:** transform/opacity only; loops carry `pause-offscreen` and `motion-safe`; Framer is
  wrapped in `<MotionConfig reducedMotion="user">`; GSAP checks `prefers-reduced-motion`;
  one global CSS switch disables animation for reduced-motion users.
- **Images:** AVIF → WebP → JPEG, responsive `srcset`, lazy by default, `priority` only above
  the fold.
- **Fonts:** self-hosted subsets with `font-display: swap`. No third-party requests.
- **Dark/light:** not offered by design — one calm palette.
