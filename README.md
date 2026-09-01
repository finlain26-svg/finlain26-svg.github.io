# Portfolio site

A static HTML/CSS/JS portfolio — no build step, no Jekyll theme required.

## Publish it on GitHub Pages

1. Delete the old contents of your `finlain26-svg.github.io` repo (or start a fresh repo with that exact name).
2. Copy every file from this folder into the repo, keeping the folder structure (`index.html`, `styles.css`, `script.js`, `.nojekyll`, and the `images/` folder).
3. You can delete `_config.yml` — it's not needed for a plain HTML site.
4. Commit and push to the `main` branch.
5. In the repo's Settings → Pages, make sure the source is set to deploy from `main` / root.
6. Your site will be live at `https://finlain26-svg.github.io` within a minute or two.

## Edit your content

See `CONTENT-GUIDE.md` for the exact lines to change (your name, bio, and contact info are currently placeholders).

## Add more work later

Each category section in `index.html` is a `<div class="gallery">` of `<figure>` blocks. To add a new piece:
1. Drop the image file into the matching `images/<category>/` folder.
2. Copy an existing `<figure>...</figure>` block in that section, update the `src`, `data-full`, `data-cap`, `alt`, and caption text.

To add the CAD shop drawings category:
1. Create `images/cad/` and `images/cad_thumb/` folders.
2. Add a new `<section class="section" id="cad">` to `index.html` (copy the "Paintings" section as a template) with its own gallery.
3. Add `<li><a href="#cad">CAD Drawings</a></li>` to the nav in both the desktop and mobile menu list.
