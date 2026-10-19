# Credits & licences

## Photography

All images currently in `public/images/` are **AI-generated placeholders created for this
build** and are owned by the site. They carry no third-party attribution requirement.
They are not photographs of real Carthage Visions installations, and the people quoted in
testimonials are illustrative — replace both before launch.

| File | Subject | Status | Suggested real replacement |
|---|---|---|---|
| `hero-poster.jpg` | Dome camera in an Omani arch | Site-owned placeholder | Unsplash / Pexels search: “dome security camera”, “Oman villa dusk” |
| `solution-home.jpg` | Villa entrance, blue hour | Site-owned placeholder | Your own villa installs (best) |
| `solution-business.jpg` | Boutique interior with ceiling camera | Site-owned placeholder | Your own retail installs |
| `solution-site.jpg` | Farm / warehouse entrance | Site-owned placeholder | Your own sites |
| `scene-office.jpg` | Calm office at dusk | Site-owned placeholder | Your own office installs |
| `scene-warehouse.jpg` | Warehouse interior | Site-owned placeholder | Your own warehouse installs |
| `scene-farm.jpg` | Farm / rural gate | Site-owned placeholder | Your own farm installs |
| `scene-construction.jpg` | Construction site | Site-owned placeholder | Your own site installs |
| `scene-shopfront.jpg` | Boutique shopfront | Site-owned placeholder | Your own retail installs |
| `scene-villa-garden.jpg` | Villa garden at dusk | Site-owned placeholder | Your own villa installs |

| `product-dome.jpg` | Indoor dome product shot | Site-owned placeholder | Manufacturer press images (check licence) |
| `product-bullet.jpg` | Outdoor bullet product shot | Site-owned placeholder | Manufacturer press images |
| `product-nvr.jpg` | Network recorder | Site-owned placeholder | Manufacturer press images |
| `product-access.jpg` | Access keypad | Site-owned placeholder | Manufacturer press images |
| `project-villa.jpg` | Villa door at night | Site-owned placeholder | Your own installs |
| `project-retail.jpg` | Retail interior | Site-owned placeholder | Your own installs |
| `og.jpg` | 1200×630 social card | Site-owned placeholder | Rebuild from your hero photo |
| `product-turret.jpg` | Turret camera product shot | Site-owned placeholder | Your supplier press images |
| `product-ptz.jpg` | PTZ speed dome | Site-owned placeholder | Your supplier press images |
| `product-smartlock.jpg` | Smart door lock | Site-owned placeholder | Your supplier press images |
| `product-alarm.jpg` | Alarm keypad | Site-owned placeholder | Your supplier press images |
| `product-motion.jpg` | Motion sensor | Site-owned placeholder | Your supplier press images |
| `product-intercom.jpg` | Video intercom panel | Site-owned placeholder | Your supplier press images |
| `product-hdd.jpg` | Surveillance hard drive | Site-owned placeholder | Your supplier press images |
| `product-cable.jpg` | Cable and connectors | Site-owned placeholder | Your supplier press images |

If you replace these with Unsplash, Pexels or Pixabay photographs, add a row here with the
photographer, the page URL and the licence (Unsplash and Pexels licences do not require
attribution but do prohibit reselling unmodified copies; Pixabay is similar).

## Icons & favicons

`favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and
`icon-maskable-512.png` were generated from `public/logo-mark.svg` for this build. Regenerate
them if the logo changes. `site.webmanifest` references the same files.

The interface icons in `src/components/ui/Icons.jsx` are drawn inline in this project — no icon
font or third-party set is loaded.

## Brand marks

The brands in `src/data/brands.js` (Siraj, Mirqab, Najd, Burj, Sahil, Qamar) are **fictional
placeholders drawn by this build** — they are not real companies and no partnership is
claimed. Replace each with a brand you are authorised to sell, and drop its monochrome SVG
into `public/brands/` (set `logo` in the data file). Set `placeholderBrands = false` once
real marks are in place — that also removes the on-page note and the `noindex`.

## 3D model

`public/models/hero-camera.glb` was **not present in this checkout**, so the hero is
currently using the photographic poster. The code is wired and waiting.

When you add a model, record it here:

```
Model:        <name>
Author:       <author>
Source:       <Sketchfab / Poly Pizza URL>
Licence:      CC0 / CC-BY 4.0  (CC-BY requires the attribution above to be visible)
Downloaded:   <date>
Modified:     scaled/centred at runtime only (HeroScene), no geometry edits
```

Where to find a suitable free model: search Sketchfab (filter **Downloadable** +
**CC0**/CC BY), Poly Pizza, or the Khronos glTF sample set. Prefer a premium-looking
dome or bullet camera, `.glb`, PBR materials, under ~4 MB, no baked lighting.

## Fonts

Self-hosted through Fontsource, all under the SIL Open Font License 1.1:

- **Amiri** — Khaled Hosny / Amiri Project — OFL 1.1
- **IBM Plex Sans Arabic** — IBM — OFL 1.1
- **Cormorant Garamond** — Christian Thalmann — OFL 1.1
- **Manrope** — Mikhail Sharanda — OFL 1.1

## Libraries

React · React Router · Vite · Tailwind CSS · Framer Motion · GSAP (+ ScrollTrigger) ·
Lenis · three.js · @react-three/fiber · @react-three/drei · react-i18next · i18next ·
react-helmet-async · sharp (build-time image pipeline).

GSAP is used under its standard “no charge” licence for this project; if the site is later
sold as a template or the business grows past GSAP’s free-use threshold, review their
current licensing terms.

## Icons

All icons are hand-drawn SVG strokes in `src/components/ui/Icons.jsx` — no icon-font
licence, no third-party requests. The WhatsApp glyph is the standard brand mark, used only
to link to WhatsApp.
