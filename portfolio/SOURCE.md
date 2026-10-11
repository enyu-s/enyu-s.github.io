# Portfolio template source

- Project: [Portfolio Starter](https://github.com/mullinsben/Portfolio-Starter)
- Author: Benjamin Mullins
- License: MIT; the original notice is included in `LICENSE`.
- Upstream commit: `1ffb1f9154a8653deb6d651236fbb4725fbb313e`
- Imported file: `index.html`, Git blob `36230332939f6cd4dba478cb948ab078474019fc`.

The template's original layout, CSS, responsive navigation and scroll effects
are retained. Local changes translate section labels, set the author to 八九,
use a green accent, fix metadata and the favicon path, and add links back to
the blog. All example biography, projects, achievements, photos, résumé and
contact details are removed. Empty sections await author-provided content.
The hero's author line is replaced by a smaller, rotating typewriter slogan
using author-provided wording. `tagline.js` implements this effect without
additional dependencies and keeps a static slogan for reduced motion.
The hero also displays the author-provided `avatar.png` with the caption
`Shi Enyu`: beside the headline on desktop and underneath it on mobile.
The hero aligns its headline with the section headings and uses proportional
grid columns for the headline and portrait. Its desktop top spacing follows
the viewport height, with limits for short and tall screens. The portrait
stays inside its own column; narrow viewports stack the content without
horizontal offsets and retain their existing top spacing.
Below the hero, section containers align to the left of the main content
on desktop, retaining a responsive gutter and the existing mobile spacing.
A soft neutral gray mouse spotlight illuminates the background using a CSS radial
gradient and `spotlight.js`. It batches pointer updates per animation frame,
leaves content and links above the effect, and is disabled for touch input
and reduced motion preferences.
The footer includes the author's supplied phone number and email on the
left, and links to the personal blog and GitHub profile on the right.
The columns stack vertically on small screens.

This page is served at `/portfolio/` as static HTML. It uses a full page
navigation when entered from Butterfly so its styles and scripts load in
their own document. The GitHub Pages workflow continues to publish the
repository root without a build step.

To add actual projects, use the template's `.csgrid` / `.cscard` structure
under `#work` and link to the real case-study pages. No sample case studies,
demo password gate or placeholder résumé are published.
