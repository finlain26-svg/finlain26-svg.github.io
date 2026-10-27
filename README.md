# Lainey: Graphic Design Portfolio

A fast, accessible portfolio built with plain HTML, CSS and a little JavaScript. There's **no build step**: it publishes directly on GitHub Pages and every file can be edited in the browser.

**Live site:** https://finlain26-svg.github.io

## Where things are

| Path | What it is |
|---|---|
| `site.json` | Your name, bio, skills, experience, education, contact info |
| `projects.json` | Every project (one entry each). Pages are generated from this |
| `images/projects/<project-name>/` | Images for each project (`cover.webp` plus `final/`, `render/`, `drawing/`, `process/`, `reference/`) |
| `downloads/` | PDFs: shop drawings and your résumé |
| `styles.css` | All styling. Colors, fonts and spacing are at the top |
| `script.js` | Builds the pages from the two JSON files. You shouldn't need to edit it |
| `index.html`, `work.html`, `project.html`, `about.html`, `resume.html`, `contact.html`, `404.html` | Page shells (the same `project.html` is used for every project) |
| `sitemap.xml`, `robots.txt` | For search engines |
| `images/og-cover.jpg` | Link-preview image (1200 × 630) |

## Guides

- **[HOW-TO-UPDATE.md](HOW-TO-UPDATE.md)** covers adding projects, editing your bio and résumé, publishing, and fixing problems.
- **[DESIGN-GUIDE.md](DESIGN-GUIDE.md)** covers changing colors, fonts and layout, and how to hand over a mood board and assets for a redesign.

## Publish

Settings → Pages → Deploy from a branch → `main` / `(root)`. Full steps are in HOW-TO-UPDATE.md, section 1.
