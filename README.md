# Digital Intermediates and Visual Effects for Independent Film Production

**A Production Handbook** by Tashi Trieu

A handbook on digital intermediate finishing and visual effects workflows for independent film
production — covering the path an image takes from acquisition through dailies, editorial, VFX,
DI, and distribution.

📖 **Read it at [divfx.tashitrieu.com](https://divfx.tashitrieu.com/)**

## Editions

| Edition | Format | Version |
| --- | --- | --- |
| [Wiki](https://divfx.tashitrieu.com/) | Web, searchable, Markdown source | derived from v1.0.1 |
| [English PDF](https://github.com/tashdor/divfx/releases/download/1.0.1/DigitalIntermediates_VisualEffects_Independent_v1.0.1.pdf) | PDF, 21 MB | v1.0.1, Fall 2017 |
| [简体中文 PDF](https://github.com/tashdor/divfx/releases/download/1.0.1_cn/DigitalIntermediates_VisualEffects_Independent_v1.0.1_cn.pdf) | PDF, 24 MB | v1.0.1, translation by Xiyu Fan |

## About the wiki edition

The wiki is a port of the v1.0.1 PDF to Markdown, built with
[MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

The port applied a copy-editing pass but **left the technical content as it stood in 2017**.
Passages that are now out of date — or that were incorrect as written — carry an inline callout
linking to [Notes for v1.1](https://divfx.tashitrieu.com/v1.1-notes/), which catalogues them with
sources. Nothing was silently rewritten.

## Repository layout

```
docs/                 Markdown source, one file per chapter
  figures/            figures extracted from the v1.0.1 PDF
  stylesheets/        theme overrides
  CNAME               custom domain for GitHub Pages
mkdocs.yml            navigation, theme, and Markdown extension config
requirements.txt      Python dependencies
.github/workflows/    builds and deploys to gh-pages on push to master
```

## Building locally

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/mkdocs serve
```

Then open <http://127.0.0.1:8000>.

## Contributing

Corrections and additions are welcome — see
[Contributing](https://divfx.tashitrieu.com/contributing/). Every page has an edit link that
opens its Markdown source directly on GitHub.

Questions, comments, and errata: [divfx@tashitrieu.com](mailto:divfx@tashitrieu.com)

## License

MIT — see [LICENSE](LICENSE).

> **Note:** MIT is a software license and sits awkwardly on a prose handbook. A Creative Commons
> license would express the intent more accurately. This is flagged for consideration in
> [Notes for v1.1](https://divfx.tashitrieu.com/v1.1-notes/#license) and has not been changed.
