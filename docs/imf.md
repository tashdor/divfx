# IMF — The Interoperable Master Format

IMF is a component-based mastering and delivery format used for streaming and international distribution. Unlike a flat master, it stores reusable picture, audio, and subtitle elements, then assembles each version from a playlist.

## The problem IMF solves

Most masters in this handbook are **flat** deliverables: one continuous render per version. A title with domestic, airline, language, music-rights, SDR, or HDR variants repeats nearly identical picture in every master.

IMF stores the essence once as track files. Each version is a playlist referencing the required segments. A changed version can therefore contain only its replacement segments and a new playlist. **IMF is a versioning format.**

## Structure

An IMF package is a set of files with defined roles:

| Component | Role |
| --- | --- |
| **Track Files** | The essence itself — picture, audio, subtitles — as separate MXF files |
| **CPL** (Composition Playlist) | Describes one *version*: which track files, in what order, with what timing |
| **PKL** (Packing List) | Inventory of the files in this delivery, with hashes for integrity |
| **ASSETMAP** | Maps asset identifiers to file paths on the delivered medium |
| **OPL** (Output Profile List) | Optional; describes how to derive a specific output from a CPL |

A **Supplemental Package** contains only what is new. The airline version ships as a handful of replacement segments plus a new CPL that references the original package's track files for everything unchanged. The unchanged material is provably unchanged, because it is literally the same file.

A CPL resembles an EDL: it references external essence by identifier and timecode instead of baking one continuous render.

### Application #2E

IMF is a framework with **applications** that constrain it to a usable profile. App #2E is the one that matters for streaming delivery. Per ST 2067-21, it uses image essence coded as a **JPEG 2000** codestream and audio as **linear PCM**, with track files conforming to SMPTE ST 379-1 and ST 422, and picture essence described by a CDCI descriptor (for Y′C′BC′R) or an RGBA descriptor (for R′G′B′).

JPEG 2000 is intra-frame and frame-addressable, so a version can change at any frame without temporal dependencies.

**Netflix requires IMF App #2E** — conformant to SMPTE ST 2067-21:2016, :2020, or :2023 — and immersive-audio packages must additionally conform to ST 2067-201:2019 (IAB) Level 0.[^imf-nflx]

[^imf-nflx]: Netflix Partner Help Center — [*Interoperable Master Format (IMF): Overview*](https://partnerhelp.netflixstudios.com/hc/en-us/articles/360002018547-Interoperable-Master-Format-IMF-Overview) and [*Post Production Branded Delivery Specifications*](https://partnerhelp.netflixstudios.com/hc/en-us/articles/7262346654995-Post-Production-Branded-Delivery-Specifications). Netflix's delivery specifications are versioned and change over time — confirm current requirements before delivery.

## What this means for an independent production

IMF authoring is usually handled by a mastering facility or specialist vendor. The production must supply material from which that vendor can build the package:

- **Supply textless elements.** Every title, caption, and dub card that may vary by territory needs a clean background with handles.
- **Plan versions during post.** Organize known alternate cuts and elements during the DI; adding them later means reopening the master.
- **Naming and versioning discipline carries through.** The same argument the [Versioning](turnover-vfx.md#versioning) section makes about VFX shots applies to deliverables. A supplemental package that references the wrong version of a segment is the distribution-scale version of conforming the wrong comp.
- **Get the complete specification before the DI.** "IMF" alone is insufficient. Confirm the application, audio configuration, HDR variant, and whether supplemental packages are expected.
