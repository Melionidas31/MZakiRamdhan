# The Artificer's Workshop

Updated 19 September 2026. The owner approved finalization. This concept is the source for the production portfolio at the repository root.

## Direction and content

A personal portfolio for visitors and recruiters, using a light D&D-inspired manuscript and inventor's workshop. Native HTML, CSS, and JavaScript reuse the original authored portfolio content. Design variance 8, motion intensity 8, visual density 4: expressive illustration, tactile details, and varied sections, with readable professional content. Forest-green ink, parchment, and brass fit the requested fantasy world. Locally hosted Cormorant Garamond headings evoke a manuscript; Alegreya Sans keeps technical information readable.

All interface and narrative copy is English. Original screenshots, institution names, and official document titles may retain their source language. At the owner's request, the profile uses `foto zaki/ElevenLabs_image_seedream-5-pro_Dark ultra-real_2026-08-17T06_30_23.png`. The hero illustration still uses `IMG_1252.JPEG` as its identity reference.

Content includes profile and education; five featured works (thesis largest); eight gallery works; FinFlow under Side Projects & Creative Explorations; experience and leadership; skills and achievements; two publications; five credentials; and CV, email, WhatsApp, LinkedIn, and GitHub links. The leadership gallery for Sekitar Kita is also retained.

The fantasy treatment continues through framed project images, an illustrated journey map, a book-like skills layout, publication spines, credential seals, and the brass owl. Contact text remains unobstructed; the decorative contact owl is hidden on phones.

## Interaction and implementation

Native dialog provides focus containment and Escape support. Project images/videos have previous/next controls and full-media links. Closing stops video playback and returns focus to the opener. Gallery categories, mobile navigation, motion pause, and reduced-motion preferences are supported.

Motion includes pointer parallax in the hero, gentle movement inside project and credential images, floating decorative layers, compass rotation, section reveals, and five animated fantasy charms. The charms support pointer/touch dragging, keyboard arrow movement, Shift for larger steps, and Home to reset. The character has no facial rig, blinking, or hand animation. Pause motion and reduced-motion preferences stop idle motion while preserving direct manipulation. Paused motion also disables dialog entrance animation so the modal cannot freeze while transparent.

Edit structural content in `tmp/portfolio-audit/build_revision.py`, then rebuild. The builder overwrites preview HTML and project-data.js. Styles and interaction code are maintained directly in workshop.css and workshop.js. No new framework or dependency was introduced.

## Art provenance

Generated in the preceding session with the built-in image generator:

| Preview file | Original generation file | Reference / purpose |
| --- | --- | --- |
| zaki-workshop.png | exec-ae6ab93a-7538-47c1-80c0-b0c118ce4631.png | IMG_1252.JPEG identity reference; illustrated workshop hero without baked UI text |
| journey-map.png | exec-e4fd73a2-b593-4a8d-879e-da214c684e7b.png | Fantasy map, journals, compass, ivy, and owl for lower-page art |
| owl.png | exec-0a7865f4-cc5d-43ec-aabd-9a71154b8665.png | Transparent brass owl on a book |

Original generation directory: `C:/Users/Ganyu Wangy/.codex/generated_images/01a0b297-4b32-7ab0-97d7-eec90a8215c4/`.

Exact generation prompts were held in the preceding session's transient tool store and are unavailable in this resumed session. The descriptions above are provenance summaries, not reconstructed exact prompts. The rejected anonymous-character `hero-concept.png` is not referenced by the preview.

## Validation and remaining review

Desktop and mobile browser checks covered modal navigation, video playback and pause on close, Escape/focus return, gallery filtering, menu behavior, and motion pause. Viewports at 390px and 320px were checked for horizontal overflow. Local reference/content check: `node tmp/portfolio-audit/check-preview.cjs`.

Laboratory/Basic Physics TA dates retain the supplied `2023-present`; no end date was invented. Thesis descriptions avoid mixing conflicting evaluation metrics. FinFlow images use synthetic demo data and do not verify live integrations. The production build uses optimized WebP artwork, responsive delivery variants, WOFF2 font subsets, and inline CSS. See the root README for rebuilding and production checks.
