# Hero 3D model

Drop a file named **`hero-camera.glb`** in this folder.

```
public/models/hero-camera.glb
```

The site checks for it at runtime (HTTP `HEAD`). If it is missing or is not a binary glTF,
the hero falls back to the poster image with no console errors and no three.js download.

## What the model should be

- A **premium-looking dome or bullet security camera** — matte white/ivory or dark metal,
  PBR materials, no baked lighting, no text or logos.
- **Format:** `.glb` (binary glTF 2.0). `.gltf` + external textures also works but is slower.
- **Size:** ideally under 4 MB. Target under ~80k triangles.
- **Orientation:** Y-up, facing +Z or −Z (the code turntables around Y, so either is fine).
- **Scale/origin:** any — the scene centres the model and normalises its largest dimension
  to 2.7 units at load. A model that already sits on the origin still looks best.
- **No animation clips required.** The turntable is done in code.

## Where to find one (free, downloadable)

- **Sketchfab** — filter *Downloadable* + *CC0* or *CC BY*. Search “security camera”,
  “dome camera”, “CCTV camera”. CC-BY models require attribution in `CREDITS.md`.
- **Poly Pizza** — smaller, low-poly models; fine for a stylised look.
- **Khronos glTF Sample Models** — no camera, but useful for testing the pipeline.

If you download from Sketchfab, choose **glTF (.glb)** as the format, not FBX/OBJ.

## Optional compression

Draco works out of the box (drei loads the decoder from its CDN), but that adds a network
dependency. A safer prep step is gltf-transform’s meshopt or plain texture resizing:

```bash
npx @gltf-transform/cli optimize hero-camera.glb hero-camera.glb \
  --compress meshopt --texture-compress webp --texture-size 1024
```

If you use meshopt, the loader needs `MeshoptDecoder` — tell us and we will wire it.
Simplest path: export at a sensible texture size (1024), skip compression, stay under 4 MB.

## What the code does with it

`src/components/three/HeroScene.jsx`

- Loads with drei’s `useGLTF` inside the lazy `HeroScene` chunk.
- Builds a local PMREM environment from three’s `RoomEnvironment` (no HDR download),
  plus a warm key light, a cool fill and a brass rim spot.
- Centres and scales the model, casts contact shadows, turntables at 0.2 rad/s and adds a
  very small pointer parallax.
- Caps DPR at 1.75 and unmounts the canvas when the hero scrolls out of view.

Record the model’s author, source URL and licence in `CREDITS.md`.
