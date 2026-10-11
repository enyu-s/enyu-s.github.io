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

This page is served at `/portfolio/` as static HTML. It uses a full page
navigation when entered from Butterfly so its styles and scripts load in
their own document. The GitHub Pages workflow continues to publish the
repository root without a build step.

To add actual projects, use the template's `.csgrid` / `.cscard` structure
under `#work` and link to the real case-study pages. No sample case studies,
demo password gate or placeholder résumé are published.
