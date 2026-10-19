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
| `product-dome.jpg` | Indoor dome product shot | Site-owned placeholder | Manufacturer press images (check licence) |
| `product-bullet.jpg` | Outdoor bullet product shot | Site-owned placeholder | Manufacturer press images |
| `product-nvr.jpg` | Network recorder | Site-owned placeholder | Manufacturer press images |
| `product-access.jpg` | Access keypad | Site-owned placeholder | Manufacturer press images |
| `project-villa.jpg` | Villa door at night | Site-owned placeholder | Your own installs |
| `project-retail.jpg` | Retail interior | Site-owned placeholder | Your own installs |
| `og.jpg` | 1200×630 social card | Site-owned placeholder | Rebuild from your hero photo |

If you replace these with Unsplash, Pexels or Pixabay photographs, add a row here with the
photographer, the page URL and the licence (Unsplash and Pexels licences do not require
attribution but do prohibit reselling unmodified copies; Pixabay is similar).

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
