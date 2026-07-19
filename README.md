# Digital Intermediates and Visual Effects for Independent Film Production

**A Production Handbook** by Tashi Trieu

A handbook on digital intermediate finishing and visual effects workflows for independent film
production — covering the path an image takes from acquisition through dailies, editorial, VFX,
DI, and distribution.

📖 **PDF downloads: [divfx.tashitrieu.com](https://divfx.tashitrieu.com/)**
🚧 **Wiki edition (in progress): [divfx.tashitrieu.com/wiki/](https://divfx.tashitrieu.com/wiki/)**

## Editions

| Edition | Format | Version |
| --- | --- | --- |
| [Wiki](https://divfx.tashitrieu.com/wiki/) | Web, searchable, Markdown source | derived from v1.0.1 — **in review, not formally published** |
| [English PDF](https://github.com/tashdor/divfx/releases/download/1.0.1/DigitalIntermediates_VisualEffects_Independent_v1.0.1.pdf) | PDF, 21 MB | v1.0.1, Fall 2017 |
| [简体中文 PDF](https://github.com/tashdor/divfx/releases/download/1.0.1_cn/DigitalIntermediates_VisualEffects_Independent_v1.0.1_cn.pdf) | PDF, 24 MB | v1.0.1, translation by Xiyu Fan |

## About the wiki edition

The wiki is a port of the v1.0.1 PDF to Markdown, built with
[MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

The port applied a copy-editing pass but **left the technical content as it stood in 2017**.
Passages that are now out of date — or that were incorrect as written — carry an inline callout
linking to [Notes for v1.1](https://divfx.tashitrieu.com/wiki/v1.1-notes/), which catalogues them with
sources. Nothing was silently rewritten.

## What is published where

| Path | Content |
| --- | --- |
| `/` | The original PDF landing page — unchanged from v1.0.1 |
| `/wiki/` | The wiki edition, in review. Not linked from the landing page and excluded via `robots.txt` until it is formally published. |

## Repository layout

```
landing/              the published landing page (root of the site)
  index.html          original v1.0.1 page
  assets/, icons/     vendored theme CSS/fonts and favicons
  CNAME, robots.txt   custom domain; keeps /wiki out of search results
docs/                 wiki Markdown source, one file per chapter
  figures/            figures rebuilt from the original .docx artwork
  figures/svg/        vector chromaticity diagrams
  drafts/             new v1.1 material, for review
scripts/              build and figure-generation helpers
mkdocs.yml            navigation, theme, and Markdown extension config
.github/workflows/    assembles landing + wiki and deploys to gh-pages
```

## Building locally

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

# live-reload the wiki alone
.venv/bin/mkdocs serve

# or build the exact published layout (landing at /, wiki at /wiki)
./scripts/build-site.sh
python3 -m http.server 8899 --directory publish
```

## Contributing

Corrections and additions are welcome — see
[Contributing](https://divfx.tashitrieu.com/wiki/contributing/). Every page has an edit link that
opens its Markdown source directly on GitHub.

Questions, comments, and errata: [divfx@tashitrieu.com](mailto:divfx@tashitrieu.com)

## License

MIT — see [LICENSE](LICENSE).

> **Note:** MIT is a software license and sits awkwardly on a prose handbook. A Creative Commons
> license would express the intent more accurately. This is flagged for consideration in
> [Notes for v1.1](https://divfx.tashitrieu.com/wiki/v1.1-notes/#license) and has not been changed.
