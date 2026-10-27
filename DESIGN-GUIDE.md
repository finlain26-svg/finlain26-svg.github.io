# Design guide: changing how the site looks

The site's look is controlled from **one block at the top of `styles.css`** ("DESIGN SETTINGS"). Change a value there and the whole site updates. You don't need to touch the rest of the file for most changes.

There are two ways to restyle the site:

1. **Do it yourself:** edit the values below (Part 1) or use the recipes (Part 2).
2. **Hand it to me:** send a mood board and assets and I'll translate them into the site (Part 3).

---

## Part 1: The design settings

```css
:root {
  --bg:        #f6f5f2;   /* page background */
  --surface:   #ffffff;   /* cards, image frames, menu */
  --ink:       #17171a;   /* main text */
  --muted:     #5b5b63;   /* secondary text */
  --line:      #dcdad4;   /* hairline borders */
  --accent:    #c4421a;   /* the ONE accent color */
  --accent-ink:#ffffff;   /* text on top of the accent color */

  --font-display: "Fraunces", Georgia, serif;     /* headings */
  --font-body:    "Work Sans", system-ui, sans-serif;  /* everything else */

  --radius: 6px;       /* roundness of buttons, cards, images */
  --gap:    1.25rem;   /* space between grid items */
  --max:    1180px;    /* maximum content width */

  --cols-sm: 2;  --cols-md: 3;  --cols-lg: 3;   /* project grid columns: phone / tablet / desktop */
}
```

### What each setting does

| Setting | Where you see it | Notes |
|---|---|---|
| `--bg` | Page background | Keep it **neutral** (off-white, warm gray, or near-black). The work should be the colorful thing. |
| `--surface` | Cards, image frames, mobile menu | Usually slightly lighter (or darker, in a dark theme) than `--bg`. |
| `--ink` | Headings and body text | Needs strong contrast against `--bg`. |
| `--muted` | Dates, captions, secondary lines | Must still pass contrast; see the checks below. |
| `--accent` | Primary button, links, hover, keyboard focus ring, active nav | Pick **one**. Using a color from your own work or brand ties the site to you. |
| `--accent-ink` | Text on accent buttons | White or near-black, whichever is readable. |
| `--font-display` / `--font-body` | Headings / body text | Two fonts maximum; this keeps the site clean and fast. |
| `--radius` | Corner roundness | `0` = sharp and editorial, `6px` = subtle (current), `16px` = soft and friendly. |
| `--gap` | Spacing between thumbnails | Smaller = denser; larger = airier. |
| `--cols-*` | Thumbnail columns | Try `--cols-lg: 4` for a denser desktop grid. |

### Contrast: why it matters

Text must have enough contrast against its background to be readable and to pass accessibility checks (WCAG AA = **4.5 : 1** for normal text). Today's colors:

| Pair | Ratio | Passes AA? |
|---|---|---|
| Body text on background | 16.4 : 1 | yes |
| Muted text on background | 6.2 : 1 | yes |
| White text on accent button | 5.1 : 1 | yes |
| Accent link on background | 4.7 : 1 | yes (barely, so don't make the accent much lighter) |

Check any new combination at **webaim.org/resources/contrastchecker**. Enter the two hex codes and it tells you pass or fail. Or send me your colors and I'll check them.

---

## Part 2: Common changes (recipes)

### Change the colors
Edit the hex codes in `:root`. Example, a deep green accent:
```css
--accent: #1f6f50;
```

### Dark theme
Replace the color lines with:
```css
--bg: #121214;  --surface: #1c1c20;  --ink: #f2f1ee;
--muted: #a5a5ad;  --line: #2e2e34;  --accent: #ff7a4d;  --accent-ink: #121214;
```
Then change `<meta name="theme-color" content="#f6f5f2">` in each `.html` file's `<head>` to `#121214`. Dark themes make colorful work pop, but check that any images with white backgrounds (like your shop drawings) still look intentional on dark. They are framed in `--surface` for this reason.

### Change the fonts
1. Pick two fonts at **fonts.google.com** (one for headings, one for text).
2. Click **Get font** → **Get embed code** → choose **`<link>`**, and copy the `<link href="https://fonts.googleapis.com/css2?...">` line.
3. In **every** `.html` file (`index`, `work`, `project`, `about`, `resume`, `contact`, `404`), replace the existing `fonts.googleapis.com/css2?...` line in the `<head>` with the new one.
4. In `styles.css` change `--font-display` and `--font-body` to the new family names.

**Self-hosting your own font files** (for a licensed or custom font): put the files in `assets/fonts/` (`.woff2` is best), then add this to the **top** of `styles.css` and remove the Google Fonts `<link>` lines:
```css
@font-face {
  font-family: "My Font";
  src: url("assets/fonts/my-font.woff2") format("woff2");
  font-weight: 400 700;   /* the weights the file contains */
  font-display: swap;
}
```
Make sure you have the license to use the font on a website.

### Change the project grid
- **Thumbnail shape:** in `styles.css` find `.card-img { aspect-ratio: 4 / 3; ... }` and change to `1 / 1` (square), `3 / 2`, or `4 / 5` (portrait). Cover images are cropped to fit, so choose what flatters your work.
- **Columns:** change `--cols-lg`.
- **Hover effect:** find `.card:hover .card-img img { transform: scale(1.04); }`. Change `1.04` (zoom amount) or delete the line for no zoom.

### Change the Home hero
The hero is the block in `index.html` between `<section class="hero">` and `</section>`. The text comes from `site.json`; the layout/size comes from the `.hero` rules in `styles.css`. A hero image, a split layout, or a big type treatment are all possible. Describe what you want (Part 3).

### Change the navigation
Menu items are the `items` list near the top of `buildChrome` in `script.js` (label + page). To change the **look**, edit the `.site-header`, `.brand` and `.nav-list` rules in `styles.css`.

### Change the logo / wordmark in the header
Right now it's your name in the heading font. To use a logo file, put it at `assets/logo.svg` and send it to me. It's a small change in `script.js` plus alt text.

### Add a favicon (browser-tab icon)
Put a square `favicon.png` (at least 180 × 180) in the main folder and replace the `<link rel="icon" ...>` line in each `.html` head with `<link rel="icon" href="favicon.png">`.

### Social-sharing image
Replace `images/og-cover.jpg` (**1200 × 630**) with a strong image. It's what appears when someone shares your link on LinkedIn, iMessage or Slack.

---

## Part 3: Giving me a mood board and assets

This is the fastest route to a site that looks like *you*. You bring the inspiration; I handle the UX/UI decisions and the code.

### What to send

**1. Mood board (any form works).** A Pinterest board link, a Figma/Canva/Milanote export, a folder of screenshots, a PDF, or photos of physical boards. 8 to 20 images is plenty. It can mix:
- Websites or portfolios whose *feel* you like (links or screenshots)
- Color, texture and photography references
- Typography you're drawn to (posters, book covers, packaging)
- Your own work that represents the vibe you want

**2. The words.** A few lines on each:
- **3 to 5 adjectives** for how the site should feel (e.g. *warm, precise, confident, playful*)
- **What to avoid** (e.g. *trendy gradients, cluttered, corporate blue*)
- **Who must be impressed:** recruiters and hiring managers at what kind of company? (Packaging/CPG brands? Sign and fabrication shops? Agencies? In-house teams?) This changes how loud or quiet the design should be.
- **Any "must keep"** such as a color, a font, a logo you already use

**3. Assets for the site.** Send any of these that you have:

| Asset | Best format | Where it goes in the repo |
|---|---|---|
| Your logo or monogram | **SVG** (or transparent PNG, large) | `assets/logo.svg` |
| Brand colors | Hex codes (e.g. `#c4421a`) or a swatch image | Goes into `styles.css` |
| Fonts you own or prefer | `.woff2` / `.ttf` / `.otf` + the license, or just the font names | `assets/fonts/` |
| A portrait or hero photo | JPG/PNG, at least 1600 px wide | `assets/` then converted to WebP |
| Icons, textures, patterns, illustrations | SVG / PNG | `assets/` |
| Hero or cover images | Your best 1 to 3 pieces, uncropped | `images/` |
| Favicon / share image | PNG / JPG | main folder / `images/og-cover.jpg` |

**Sending files to me:** attach them in our chat. **Don't commit your mood board to the repo.** The repo is public, and inspiration images may belong to other people. Only the final assets that the site uses (logo, fonts, photos) belong in the `assets/` folder.

### What I'll do with it

1. **Translate the board into design decisions:** a color palette (checked for contrast), a type pairing, grid/spacing style, corner shapes, and how motion and hover should behave. All of it maps directly onto the settings in Part 1.
2. **Propose 2 to 3 directions** you can compare as quick previews *before* I change the live site. You pick one, or mix them.
3. **Apply the chosen direction** to `styles.css` and the page templates, and re-test on phone and desktop.
4. **Keep the rules that make the site work for hiring:** neutral background so your work stands out, one accent color, two fonts at most, work first and decoration second, accessible contrast, fast images.

### UX/UI changes I can make beyond colors and fonts
- Different **layouts:** hero with an image, split-screen intro, full-bleed project covers, masonry vs. uniform grids
- **Navigation** patterns: sticky bar, minimal text menu, side menu
- **Project page** structure: image-first, text-first, alternating rows, sticky info column
- **Micro-interactions:** hover, transitions, a custom cursor, scroll reveals. These stay subtle and respect "reduce motion" settings.
- **Custom illustrations or textures** from your assets as section dividers or backgrounds
- **Branded details:** your monogram as a favicon, a custom 404 page, styled buttons

### Mood board brief (copy, fill in, send)

```
Feel (3-5 adjectives):
Avoid:
Audience / target employers:
Colors I love (hex codes or images):
Fonts I love (names or images):
Sites whose layout I like (links) and what I like about each:
Assets attached: logo / fonts / photo / other
Anything the site must keep or must say:
```

---

## Design rules to keep (they're what make a portfolio get jobs)

1. **The work is the hero.** Neutral background, one accent color, two fonts.
2. **Real text for everything that matters** (your name, title, tools, descriptions). Never bake those into images; recruiters' systems can't read them.
3. **Every image has alt text.** Describe it plainly.
4. **Contrast ≥ 4.5 : 1** for text; the keyboard focus outline must stay visible.
5. **Three clicks or fewer** from Home to any piece of work. Right now it's **one**.
6. **Fast on a phone.** WebP images, sensible sizes, no autoplay.
