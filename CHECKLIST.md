# Launch checklist — everything still to replace or confirm

Everything below is either a placeholder, a stock/AI-generated asset, or a statement that
must be confirmed by the owner before the site goes live. Tick items as they are replaced.

Legend: **⛔ blocking** · **⚠️ needs confirmation** · **🎨 asset**

---

## Global (affects every page)

- [ ] ⛔ **Phone number** — `shop.contact.phones[]` still reads `+968 9XXX XXXX` / `+96890000000`.
- [ ] ⛔ **WhatsApp number** — `shop.contact.whatsapp` (digits only, no `+`).
- [ ] ⛔ **Email** — `hello@carthagevisions.om` is a placeholder domain.
- [ ] ⛔ **Domain** — `shop.siteUrl` is `https://carthagevisions.om`; also update
      `public/sitemap.xml` and `public/robots.txt`.
- [ ] ⛔ **Street address** — `shop.address.street` still `[TODO: street / building]`.
- [ ] ⚠️ **Map location** — `shop.address.geo` is the approximate centre of Barka; replace with
      the exact coordinates and paste the real `mapsUrl` / `directionsUrl`.
- [ ] ⚠️ **Coverage** — `coverage.cities` and `nationwideInstallation` need confirming.
- [ ] ⚠️ **Opening hours** — currently "open every day, 24 hours". Confirm.
- [ ] ⚠️ **Tagline** — English and Arabic wording to be approved by the owner.
- [ ] ⚠️ **Arabic copy** — the entire Arabic site was drafted by the build, not by a native
      reviewer. Read every page once, out loud if possible.
- [ ] ⚠️ **CR number and licence text** — `shop.legal.crNumber` / `shop.legal.licence` are empty,
      so the footer shows only "Barka, Sultanate of Oman".
- [ ] ⚠️ **Social links** — Instagram, Facebook, TikTok and Google Business are empty.
- [ ] ⚠️ **Rating** — `shop.rating` is `null`; add only a real Google rating.
- [ ] ⚠️ **Analytics** — `shop.analytics.ga4Id` / `metaPixelId` are empty. Nothing loads until a
      visitor accepts cookies, so add the ids *and* test consent in a private window.
- [ ] 🎨 **Logo** — the site uses a typographic wordmark and `/logo-mark.svg`. Supply the real
      logo (light + dark), then set `brand.logoImage` and rebuild the favicon set.
- [ ] 🎨 **Favicons** — `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`,
      `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` are generated from the placeholder
      mark. Regenerate after the logo arrives.
- [ ] 🎨 **3D model** — `public/models/hero-camera.glb` is absent. Until it is supplied, the hero
      shows the poster; the scene is desktop-only and lazy either way.
- [ ] 🎨 **Photography** — every image in `public/images/` is AI-generated for this build. Replace
      with real installs, then run `npm run images`. Credits are in `CREDITS.md`.
- [ ] ⚠️ **Open Graph images** — one shared `og.jpg` plus per-page covers. Optional: a designed
      1200×630 card per main page.

---

## Home `/`

- [ ] ⚠️ Testimonials are illustrative and marked as such — replace with real, attributable
      quotes or remove the section.
- [ ] 🎨 `hero-poster.jpg`, `solution-home/business/site.jpg`, `project-villa/retail/site.jpg`.
- [ ] ⚠️ The three home "solutions" cards link to `/solutions/homes-villas`,
      `/shops-retail` and `/farms-rural` — confirm that mapping.

## Products `/products`, `/products/:category`, `/products/:category/:slug`

- [ ] ⛔ Product data is placeholder: names, `priceFrom`, specs and compatibility
      (`src/data/products.js`). `placeholderCatalog = true` keeps them `noindex`.
- [ ] 🎨 Fifteen product images are studio-style placeholders; replace with supplier press images
      you are licensed to use.
- [ ] ⚠️ Confirm each product is actually stocked.

## Packages `/packages`

- [ ] ⛔ Prices, camera counts, storage days and warranty length (`src/data/packages.js`).
- [ ] ⚠️ `placeholderPackages = true` — flip once the packages are final.

## Brands `/brands`

- [ ] ⛔ Brand list is empty in `shop.js` and the six marks in `src/data/brands.js`
      (Siraj, Mirqab, Najd, Burj, Sahil, Qamar) are fictional.
- [ ] 🎨 Real monochrome brand SVGs, only for brands you are authorised to sell.

## Solutions `/solutions`, `/solutions/:slug`

- [ ] ⚠️ Risk lists and recommended setups are editorial drafts — confirm they match how you
      actually quote (camera counts, storage days, remote viewing).
- [ ] ⚠️ `solution.package` / `solution.project` links point at placeholder packages and projects.

## Services `/services`

- [ ] ⚠️ Six services and their one-line benefits — confirm scope and naming.
- [ ] ⚠️ Support plan response times are marked `responsePlaceholder: true`
      ("within two working days", "one working day", "working hours"). Replace with your real
      commitments before publishing.

## Site survey `/site-survey`

- [ ] ⚠️ Confirm "free", "no obligation", "quote usually the same day" and "30–40 minutes" all
      match reality.
- [ ] ⚠️ Confirm the three steps describe your actual process.

## Support `/support`

- [ ] ⛔ Response times and plan prices are placeholders (`src/data/services.js`).
- [ ] ⚠️ "What is covered / not covered" lists need sign-off — they read like a contract summary.

## Projects `/projects`, `/projects/:slug`

- [ ] ⛔ All eight case studies are illustrative: names, cities, camera counts, years and results.
      `placeholderProjects = true` keeps them `noindex` and shows the note.
- [ ] 🎨 Project photography is stock/AI. Replace with real job photos (with client permission,
      and without house numbers or faces you are not cleared to show).
- [ ] ⚠️ Decide whether project pages should ever be indexed once real.

## About `/about`

- [ ] ⚠️ The story ("began with…", "we work in Barka…") is a draft written from the brief —
      correct the facts.
- [ ] ⚠️ Timeline has no dates by design ("dates are being confirmed"). Add real years if you want
      them shown.
- [ ] 🎨 Team section shows roles only. Add names, photos and one line each; the code already
      renders `[TODO: team names and photos]` as a note.
- [ ] 🎨 Photo strip reuses scene images — replace with real workshop/installation photos.

## Blog `/blog`, `/blog/:slug`

- [ ] ⚠️ Five guides are written by the build. Read them as the owner: nothing in them should
      contradict how you actually install.
- [ ] ⚠️ Publish dates (`2026-07-15` … `2026-09-18`) are placeholders. Set real dates.
- [ ] ⚠️ Author is shown as "Carthage Visions" — add a named author if you prefer.
- [ ] 🎨 Post covers reuse scene images.

## FAQ `/faq`

- [ ] ⚠️ Sixteen answers cover warranty, response, storage and privacy. Confirm every claim —
      especially the warranty wording and "we do not keep a copy" of footage.
- [ ] ⚠️ Home FAQ block and this page ask different questions; keep both in sync when policies change.

## Contact `/contact`

- [ ] ⛔ Numbers, email and address (see *Global*).
- [ ] ⚠️ **Map embed** uses Google Maps without an API key
      (`maps.google.com/maps?q=<lat>,<lng>&output=embed`). Confirm it loads on your network and
      in Oman; if you prefer, swap in a Google Maps embed link from the real place pin.
- [ ] ⚠️ Opening hours and the "Open now" badge (computed in `src/lib/hours.js`).
- [ ] ⚠️ `contact.closing.note` says "Open 7 days · Reply within minutes" — confirm.

## Privacy `/privacy` and Terms `/terms`

- [ ] ⛔ **Legal review required.** Both pages carry a visible "Draft for review" banner and are
      `noindex` while `reviewRequired = true` in `src/data/legal.js`.
- [ ] ⛔ **Last updated date** is `[TODO: …]`.
- [ ] ⛔ **Oman personal-data requirements** — the page says explicitly that consent recording,
      deletion requests and a named privacy contact must be reviewed against Oman's personal data
      protection rules. Have this reviewed by the owner or a legal adviser.
- [ ] ⚠️ Terms: warranty length, payment terms, deposit policy, governing law and jurisdiction are
      all marked TODO in the text.
- [ ] ⚠️ Cookie banner: currently only gates analytics. If any other cookie/script is added,
      update the banner copy and `/privacy`.

## 404

- [ ] No placeholders — just confirm the WhatsApp message wording ("I came from the home page"
      when landing on a 404).

## Technical / SEO

- [ ] ⛔ Replace every `https://carthagevisions.om` occurrence once the domain is live
      (`src/config/shop.js`, `public/sitemap.xml`, `public/robots.txt`).
- [ ] ⚠️ `public/sitemap.xml` is hand-maintained: add each new guide. Project pages stay out while
      `placeholderProjects` is true; `/privacy` and `/terms` stay out while `reviewRequired` is true.
- [ ] ⚠️ `robots.txt` currently allows everything and points at the sitemap.
- [ ] ⚠️ Favicon/manifest colours (`#14110e` / `#f6f1e8`) match the palette — update if you re-theme.
- [ ] ✅ `hreflang` (`ar`, `en`, `x-default`) is generated per path in `src/components/layout/Seo.jsx`.
- [ ] ✅ Open Graph + Twitter cards are generated per page; posts use their cover image.
- [ ] ✅ Canonical URL per page, `noindex` for placeholder areas.
- [ ] ⚠️ After deployment, run Lighthouse on `/`, `/site-survey`, `/blog/:slug` and `/contact`
      on a throttled mobile profile. The build targets 90+ on Performance, Accessibility, SEO and
      Best Practices; the largest single asset is the lazy three.js chunk (only fetched on desktop).

---

## QA commands before every deploy

```bash
npm run qa
```

Runs i18n parity, WhatsApp/tel link validation, analytics checks, ESLint, the production build,
and server-renders all 21 routes in both languages.
