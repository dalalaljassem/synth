# Adding images

Run `npm run check:assets` to list any image the content data expects but `/public` doesn't have yet.
Missing files show a neutral striped placeholder (in dev mode it also shows the expected path).

## Where files live

| What | Path |
|---|---|
| Project slides | `public/images/projects/<slug>/slide-01.jpg`, `slide-02.jpg`, … (in slide order) |
| Client logo | `public/images/projects/<slug>/logo.png` (transparent); optional `logo-light.png` = white version |
| Archive thumbnails | `public/images/archive/archive-01.jpg` … |
| Brand | `public/images/brand/` (`synth-display.svg` hero wordmark, `synth-wordmark.png` header logo) |

Slugs are listed in `src/data/projects.js`.

## Exporting from Figma

Export project frames as **PDF**, not PNG. A PNG flattens the site overlays (pill, ticks, caption, arrow)
into the photo; a PDF keeps the original full-resolution photo and the logo as separate objects,
which is what the site needs.

Select the frames → Export → **PDF** → Export. Figma writes one PDF per frame, named after the frame.

From each PDF the pipeline takes:

- the background photo, saved whole (max 2000px, JPG q80) with a focus point that reproduces the frame's crop;
- the client logo as a transparent PNG;
- the palette swatches and the slide position (read from the slide indicator, so order follows the design).

## After adding a project

- Add or update its entry in `projects.js`: slide count, captions per series, palettes, logo size.
- If the important part of a photo is cropped on desktop, adjust that slide's `focus` (CSS `object-position`).
