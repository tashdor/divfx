# Contributing

This handbook is maintained as Markdown in the
[tashdor/divfx](https://github.com/tashdor/divfx) repository. Corrections and additions are
welcome.

## Quick corrections

Every page has an :material-file-edit-outline: edit icon at the top right. It opens that page's
Markdown source on GitHub, where you can make a change and open a pull request without
cloning anything.

## Working locally

```bash
git clone https://github.com/tashdor/divfx.git
cd divfx
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs serve
```

The site will be available at <http://127.0.0.1:8000> and reloads as you edit.

To preview the exact published layout — the original PDF landing page at the root, this wiki
under `/wiki` — build both together:

```bash
./scripts/build-site.sh
python3 -m http.server 8899 --directory publish
```

## Structure

```
docs/
  index.md              landing page
  introduction.md       front matter
  *.md                  one file per chapter
  figures/              figure images
  stylesheets/extra.css theme overrides
landing/                the published landing page, served at the site root
mkdocs.yml              nav, theme, and Markdown extension config
```

To add a chapter, create the Markdown file in `docs/` and add it to the `nav:` list in
`mkdocs.yml`.

## Conventions

- **Chapters map to the original document's structure.** If you restructure, note it in
  [Change List](changelog.md).
- **Flag rather than silently rewrite.** Where 2017 content is out of date or incorrect, the
  practice in this port is to leave the original text and add an admonition linking to
  [Notes for v1.1](v1.1-notes.md). This keeps the port faithful about what is original and what is
  editorial. If you are making a substantive technical revision, that becomes a versioned change
  — record it.
- **Cite sources** for factual claims, particularly specifications, standards numbers, and dates.
- **Figures** live in `docs/figures/` and use the `<figure markdown>` pattern with a
  `<figcaption>`. They were rebuilt from the original artwork embedded in the v1.0.1 `.docx`:
  the ten vector diagrams are re-rendered from the PDF at 400 DPI, and the multi-panel figures
  (4, 20, 21, 22, 23) are recomposed from the original images at their intended proportions.
  Figures 8, 18, 19, and 20 are at their source resolution — do not upscale them, as that adds
  no real detail.

## Reporting errata

Open an [issue](https://github.com/tashdor/divfx/issues) or email
[divfx@tashitrieu.com](mailto:divfx@tashitrieu.com).
