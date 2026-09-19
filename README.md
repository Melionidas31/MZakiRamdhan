# M. Zaki Ramdhan's portfolio

The production site is the root `index.html`, with its self-hosted styles, scripts, fonts, and optimized images in `assets/workshop/`. GitHub Pages publishes `main` from the repository root at https://melionidas31.github.io/MZakiRamdhan/.

## Editing and building

The approved manuscript/fantasy design lives in `concepts/artificer-workshop/`. Edit `workshop.css` and `workshop.js` there. Structural preview changes belong in `tmp/portfolio-audit/build_revision.py`; its archived source is `tmp/portfolio-audit/legacy-index.html`. The historical project catalogue comes from `assets/js/script.js` with current overrides in the workshop script.

From the repository root, using Python with Pillow and Node installed:

```sh
python tmp/portfolio-audit/build_revision.py
node tmp/portfolio-audit/check-preview.cjs
python tmp/portfolio-audit/finalize.py
node tmp/portfolio-audit/check-release.cjs
python -m http.server 3012 --bind 127.0.0.1
```

`finalize.py` promotes the approved preview, generates WebP copies and smaller artwork delivery variants, fixes root-relative asset references, and supplies production SEO metadata. Original media are preserved. Small stylesheets are inlined to avoid blocking the first render. Rebuild production after editing the preview. Update the sitemap date in the release builder for a new release.

Self-hosted WOFF2 subsets are included. If copy needs new glyphs, install `fonttools` and `brotli` for Python and run `python tmp/portfolio-audit/optimize-fonts.py` before finalizing. Original TTF fonts are retained in the concept source.

## Validation

The 19 September 2026 release checks all 15 project records, 8 content sections, production file references (including inline CSS and responsive images), and search/social metadata. Browser verification covers desktop, 390px and 320px widths, filters, modal navigation and Escape, paused motion, and mobile navigation. Local fonts require no third-party font service.

Teaching-assistant dates retain the supplied `2023-present` wording; no new end date was inferred. The supplied portrait and fantasy artwork are owner-approved. FinFlow captures contain demonstration data. See the concept's `DIRECTION.md` for artwork provenance.
