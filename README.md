# M. Zaki Ramdhan's portfolio

The production site is the root `index.html`, with styles and scripts in `assets/site/` and optimized images in `assets/workshop/media/`. GitHub Pages publishes `main` from the repository root at https://melionidas31.github.io/MZakiRamdhan/.

## Editing

The site is plain HTML/CSS/JS with no build step:

- `index.html`: page content (hero, experience, skills, contact)
- `assets/site/site.css`: styles
- `assets/site/site.js`: project cards and the project/certificate viewer
- `assets/workshop/project-data.js`: project details shown in the viewer (`site.js` applies a few overrides)
- `assets/workshop/media-map.js`: maps original images to optimized WebP copies in `assets/workshop/media/`

Preview locally with `python -m http.server 3012` and open http://127.0.0.1:3012/.

The previous fantasy "Artificer's Workshop" design is kept for reference in `concepts/artificer-workshop/` and `tmp/portfolio-audit/`. Do not run `tmp/portfolio-audit/finalize.py`: it would overwrite the current `index.html` with the old design.
