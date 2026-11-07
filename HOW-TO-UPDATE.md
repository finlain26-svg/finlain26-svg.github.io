# How to update your portfolio

Everything you will ever change lives in **three places**:

| You want to change… | Edit this file |
|---|---|
| Your name, bio, skills, software, experience, education, email, LinkedIn, résumé link | `site.json` |
| Your projects (add, remove, reorder, reword) | `projects.json` + the images in `images/projects/` |
| How the site looks (colors, fonts, spacing) | `styles.css` (the block at the top) — see `DESIGN-GUIDE.md` |

You never need to edit the `.html` files or `script.js` to add work or change text.

---

## 0. Before you publish: fill in the placeholders

`site.json` currently has placeholders in `[square brackets]`. They show up on the live site until you replace them. Open `site.json` and replace:

- [ ] `"location"`: your city and state, or delete the text between the quotes to hide it
- [ ] `"email"`: your real email
- [ ] `"linkedin"`: your LinkedIn URL
- [ ] `"instagram"`: your Instagram URL, or leave it empty `""` to hide it
- [ ] `"resumePdf"`: `"downloads/resume.pdf"` once you've uploaded that file (section 6)
- [ ] `"experience"`: your real jobs (section 5)
- [ ] `"education"`: your real school(s)
- [ ] `"bio"`: reword so it sounds like you
- [ ] In `projects.json`, fill in empty `"year"` and `"tools"` fields. Recruiters read these.

**Rule for empty fields:** if a value is `""` (empty), that line is hidden automatically. A line can't show an empty label.

---

## 1. Put the site online (GitHub Pages)

Your repo is already named correctly (`finlain26-svg.github.io`), so the address will be **https://finlain26-svg.github.io**.

1. Go to your repo on github.com → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**. Click **Save**.
4. Wait 1 to 2 minutes, then open the address above. Later updates appear the same way, 30 to 90 seconds after each commit.

### Two ways to make changes

**A. In the browser (easiest, no software):**
- Open any file on github.com, click the **pencil** icon, edit, then **Commit changes**.
- Press the **`.`** (period) key on your repo page to open a full web editor (github.dev) with all files in a sidebar. You can drag images into folders there too.
- To upload images: open the folder on github.com → **Add file** → **Upload files** → drag them in → **Commit changes**.

**B. Ask me.** Attach new images or paste the details and I'll update `projects.json` and `site.json` for you.

---

## 2. Add a new project (the 3-step recipe)

### Step 1: Prepare and upload the images

Make a folder named after the project. Use lowercase letters, numbers and dashes. **No spaces, no capitals.**

```
images/projects/my-new-project/
    cover.webp              ← the thumbnail shown on Home and Work (required)
    final/                  ← finished work
    render/                 ← 3D renders
    drawing/                ← CAD / shop drawings
    process/                ← sketches, in-progress shots
    reference/              ← site photos, inspiration
```

Only create the sub-folders you need. **The folder name decides the heading** the images appear under on the project page ("Final work", "3D renders", "Shop drawings", "Process", "Site reference") and the order: final → render → drawing → process → reference.

**Image prep checklist** (this keeps the site fast, which matters on phones and for search ranking):

| Image type | Format | Size (pixels) | Target file size |
|---|---|---|---|
| `cover.webp` | WebP | **1200 × 900** (4:3 crop) | under 150 KB |
| Photos, mockups, renders | WebP, quality ~80 | longest side **1600 to 2000** | under 350 KB |
| Shop drawings | WebP, quality ~85 | **2400 wide** (they need to stay readable) | under 600 KB |
| Animations | Animated WebP | under 1000 wide | under 3 MB |

**Free converter, no install:** go to **squoosh.app**, drop in a JPG or PNG, choose **WebP**, set quality ~80, resize, and download. Do this *before* uploading. Phone photos are usually 3 to 10 MB and will slow the site down a lot.

### Step 2: Add one entry to `projects.json`

Open `projects.json`. Every project is a block between `{ }` inside the `"projects": [ ... ]` list. **Copy an existing block, paste it right after another block's closing `},` and change the values.** Order in the file = order on the site.

```json
{
  "id": "my-new-project",
  "title": "Client or Project Name — What It Is",
  "category": "Branding",
  "alsoIn": ["3D Rendering"],
  "year": "2026",
  "role": "Logo design & packaging",
  "tools": ["Adobe Illustrator", "Adobe Photoshop"],
  "summary": "One sentence, under 160 characters. Shows under the title and in Google results.",
  "description": "A short paragraph about the project and the result.",
  "brief": "What the client asked for, or the problem you were solving.",
  "process": [
    "First thing you did.",
    "Second thing you did.",
    "Third thing you did."
  ],
  "featured": true,
  "cover": {
    "src": "images/projects/my-new-project/cover.webp",
    "alt": "Describe what is in the picture, in plain words",
    "w": 1200,
    "h": 900
  },
  "images": [
    {
      "src": "images/projects/my-new-project/final/mockup-1.webp",
      "alt": "Describe what is in the picture",
      "caption": "Final mockup",
      "w": 1600,
      "h": 1200
    }
  ]
}
```

**What each field does**

| Field | Required? | Notes |
|---|---|---|
| `id` | yes | Must match the folder name. Lowercase, dashes, **unique**. It becomes the page address: `project.html?p=my-new-project`. |
| `title` | yes | Be specific: "Client — Type of work". |
| `category` | yes | The main category. Must be spelled **exactly** like one of: `Branding`, `3D Rendering`, `CAD / Shop Drawings`, `Illustration`, `Photography`, `Physical Art`. |
| `alsoIn` | no | Extra categories the project should also appear under. Use `[]` for none. |
| `year`, `role`, `tools` | no, but fill them | Shown in the details row. `tools` is a list: `["Adobe Illustrator"]`. Empty `""` or `[]` hides it. |
| `summary` | yes | One sentence. Also used as the page's search description. |
| `description` / `brief` / `process` | no | Case-study text. Empty or missing parts are skipped. |
| `featured` | yes | `true` puts it on the Home page. **Keep it to 6 to 8 projects** (8 are featured right now). |
| `cover` | yes | The thumbnail. `w`/`h` are its real pixel size. |
| `images` | yes | Every image on the project page. Each needs `src`, `alt`, `caption`, `w`, `h`. |
| `pdf` | no | For shop drawings: `"pdf": "downloads/my-new-project-shop-drawings.pdf"` adds a **Download shop drawings (PDF)** button. Upload the PDF to `downloads/`. |
| `animation` | no | Inside an image entry: `"animation": "images/.../anim.webp"` adds a **Play animation** button. `src` is the still frame. |

**Alt text rules (required for accessibility and for search/AI screeners):** describe what's in the image in one plain sentence. Don't start with "Image of…". Example: *"Navy wine bottle with gold line-art label beside a glass of white wine."*

**Finding an image's pixel size (`w` and `h`):**
- Mac: select the file → ⌘I (Get Info) → "More Info" → Dimensions.
- Windows: right-click → Properties → Details.
- Squoosh shows it too. If unsure, an approximate ratio is fine. It only reserves space so the page doesn't jump while loading.

### Step 3: Commit

Commit the images and `projects.json` together. After ~1 minute, the project appears on the Work page, under its category filter, in Home (if `featured`), in the Prev/Next links, and in the page's search metadata.

**Also add it to `sitemap.xml`** (helps Google find it): copy one `<url>` line and change the address:
```xml
<url><loc>https://finlain26-svg.github.io/project.html?p=my-new-project</loc></url>
```

---

## 3. Edit, reorder or remove a project

- **Edit text:** change the values in its block in `projects.json`.
- **Reorder:** cut a whole `{ ... },` block and paste it somewhere else in the list. **Put your strongest work first.**
- **Hide without deleting:** change `"featured": true` to `false` to remove it from Home only.
- **Remove entirely:** delete the whole `{ ... }` block (and the image folder, if you like), and remove its line from `sitemap.xml`.
- **Commas matter.** Every block except the last one ends with `},`. The last one ends with `}` and no comma. A missing or extra comma is the #1 cause of a blank site; see Troubleshooting.

---

## 4. Add or rename a category

Open `site.json` → `"categories"`. Each entry is `{ "name": "...", "blurb": "..." }`. The `name` must exactly match the `category` / `alsoIn` text in `projects.json`. The `blurb` is the line shown under the heading when that filter is picked. A category with no projects is hidden from the filter bar automatically, so **Photography** will appear as soon as you add your first photo project.

---

## 5. Change your bio, skills, experience and contact info

All of this is in `site.json`:

| Field | What it controls |
|---|---|
| `name` | Name in the header, footer, Home heading and search results |
| `jobTitle` | Used in page titles and structured data (e.g. "Graphic Designer") |
| `headline` | The line under your name: `Graphic Designer \| 3D Visualization \| CAD Drafting` |
| `valueStatement` | The one-sentence pitch on Home. Make it about what the employer gets. |
| `availability` | The "Open to work" box and Contact page intro |
| `location`, `email`, `linkedin`, `instagram` | Contact page and footer. Empty = hidden. |
| `bio` | List of paragraphs on About. Add or remove lines in the `[ ]`. |
| `skills`, `software` | Tags on About and Résumé |
| `resumeSummary` | The summary at the top of the Résumé page |
| `experience`, `education` | See below |

**Experience entry:**
```json
{
  "role": "Graphic Designer",
  "org": "Company Name",
  "years": "2023 – Present",
  "bullets": [
    "Designed packaging for 12 product lines, cutting reprint errors with dimensioned shop drawings.",
    "Produced 3D renders for client approval, reducing revision rounds."
  ]
}
```
Put the **most recent job first**. Start bullets with a verb and add numbers where you honestly can. Applicant-tracking systems and recruiters both scan for them. Separate entries with commas.

**Education entry:** `{ "school": "...", "credential": "B.A. Graphic Design", "years": "2018 – 2022" }`

> **JSON rules:** text goes in `"double quotes"`; use `\"` for a quote inside text; no trailing comma after the last item in a list; no comments. If you break it, the site shows an error message instead of content. Undo your last edit and it comes back.

---

## 6. Update the résumé PDF

1. Export your résumé as `resume.pdf` (keep it to one page if you can, and keep real selectable text).
2. Upload it to the `downloads/` folder (replace the file to update it).
3. In `site.json` set `"resumePdf": "downloads/resume.pdf"`.

The **Download résumé (PDF)** button then appears on the Résumé page. While `resumePdf` is `""`, the button is hidden.

---

## 7. Preview changes on your computer (optional)

Opening `index.html` by double-clicking will **not** work (browsers block loading the `.json` files from disk). Instead, in the project folder run:

```
python3 -m http.server 8000
```
then open **http://localhost:8000**. Stop with Ctrl+C. Or just commit and look at the live site; GitHub Pages updates in about a minute.

---

## 8. Troubleshooting

| Problem | Cause and fix |
|---|---|
| Page says *"This page could not load its content"* | A typo in `site.json` or `projects.json`. Paste the file into **jsonlint.com**. It points to the line. Usually a missing/extra comma or quote. |
| A project's image is missing/broken | The path in `src` must match the file **exactly**, including capitals (`Cover.webp` ≠ `cover.webp`) and the `.webp` ending. GitHub Pages is case-sensitive. |
| A project doesn't show on Work | Its `category` is spelled differently from `site.json`'s category names, or it's missing from the `projects` list, or JSON is broken above it. |
| Project page says "Project not found" | The link's `?p=` doesn't match the project's `id`. |
| I committed but see old content | Wait ~1 minute, then hard-refresh (Ctrl/⌘+Shift+R). Check the **Actions** tab on GitHub for a green check on the "pages build" run. |
| Site is slow | Images are too large. Re-export with Squoosh (section 2). |
| Link preview (LinkedIn/iMessage) shows no image or an old image | Replace `images/og-cover.jpg` (1200 × 630). Platforms cache previews, so re-scrape with LinkedIn's Post Inspector. |

---

## 9. Good to know

- **Search and AI screeners:** all names, titles, tools and descriptions are real text, not baked into images. Every page has a title, description, social-sharing tags, and your name/title as structured data. `sitemap.xml` and `robots.txt` are included.
- **One caveat:** the pages fill themselves in with JavaScript from the two JSON files. Google and modern recruiting tools handle that, but very basic text-only crawlers see just the page frame. To cover that gap, **attach your PDF résumé when you apply**, and keep your LinkedIn current. That's where most screeners look first.
- **Original images:** your original un-resized photos were moved out of the live site. They still exist in your repo's history (the commit named "Organizing") if you ever need them.
- **Theory Wellness mural drawings:** a PDF for this project was in your original images but has no cover image or write-up yet. Send me a photo or render and a few sentences and I'll add it as a new CAD / Shop Drawings project.
