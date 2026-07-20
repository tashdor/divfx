---
tags:
  - draft
---

# IMF — The Interoperable Master Format

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).
v1.0.1 covers IMF in three sentences, in the [Video Distribution Masters](../production-workflow.md#imf-interoperable-master-format) section: same as the video master, often without textless elements, compressed and mastered per the IMF specifications. That was a fair summary of IMF's role in 2017. It is no longer proportionate — IMF is now the standard mastering-and-delivery format for streaming and international distribution, and it is structurally different from every other deliverable in this handbook.

## The problem IMF solves

Every other master described in this handbook is a **flat** deliverable — one continuous render of one version of the film. That model breaks down as soon as a title has versions, and modern titles always do: a domestic cut, an airline edit, territory-specific title cards, dub cards for a dozen languages, a version with different music rights, an SDR and an HDR variant.

Delivering that as flat masters means delivering the same two hours of picture over and over, differing by ninety seconds. It is expensive to transfer, expensive to store, and — the real problem — it is impossible to guarantee that the ninety-nine percent that is supposed to be identical actually is.

IMF's answer is a **component** model. The essence is stored once as track files, and each version is described by a playlist that references the pieces it needs. SMPTE ST 2067-21 states the intent directly:

!!! quote
    "Application #2E is meant for studio applications where a TV or movie title is transformed into multiple content versions (airline edits, special edition, languages…) that are made available to multiple consumer distribution channels (Internet, optical media, broadcast…) across multiple territories and over the span of many months to over a year."

    — SMPTE ST 2067-21, §1 Scope
That sentence is the whole rationale. **IMF is a versioning format.** Everything structural about it follows from that.

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

Anyone who has read the [Editorial Turnover](../turnover-di.md) chapter will recognize the model. A CPL is conceptually an EDL that survived into distribution: a list of events referencing external essence by identifier and timecode, rather than a baked render.

### Application #2E

IMF is a framework with **applications** that constrain it to a usable profile. App #2E is the one that matters for streaming delivery. Per ST 2067-21, it uses image essence coded as a **JPEG 2000** codestream and audio as **linear PCM**, with track files conforming to SMPTE ST 379-1 and ST 422, and picture essence described by a CDCI descriptor (for Y′C′BC′R) or an RGBA descriptor (for R′G′B′).

The choice of JPEG 2000 rather than a long-GOP codec is deliberate: it is intra-frame, mathematically lossless at high rates, and frame-addressable — the same properties that make it right for [DCP](../production-workflow.md#dcp-digital-cinema-package). A mastering format must be editable at any frame, which rules out temporal compression.

**Netflix requires IMF App #2E** — conformant to SMPTE ST 2067-21:2016, :2020, or :2023 — and immersive-audio packages must additionally conform to ST 2067-201:2019 (IAB) Level 0.[^imf-nflx]

[^imf-nflx]: Netflix Partner Help Center — [*Interoperable Master Format (IMF): Overview*](https://partnerhelp.netflixstudios.com/hc/en-us/articles/360002018547-Interoperable-Master-Format-IMF-Overview) and [*Post Production Branded Delivery Specifications*](https://partnerhelp.netflixstudios.com/hc/en-us/articles/7262346654995-Post-Production-Branded-Delivery-Specifications). Netflix's delivery specifications are versioned and change over time — confirm current requirements before delivery. **[web-sourced.]**

## What this means for an independent production

Most independent features will never author an IMF themselves — it is specialist work, usually done by the mastering facility or a dedicated vendor. What the production is responsible for is delivering material an IMF can be built from. In practice:

- **Textless elements are not optional.** Every title, caption, and dub card that will vary by territory needs a clean background. The [Uncompressed Video Master](../production-workflow.md#uncompressed-video-master) section already calls for textless elements with handles; IMF is the reason that requirement is strict rather than a nicety.
- **Version planning belongs in post, not distribution.** If the airline edit is known during the DI, the reels and elements can be organized to make it cheap. Discovered afterwards, it means reopening a finished master.
- **Naming and versioning discipline carries through.** The same argument the [Versioning](../turnover-vfx.md#versioning) section makes about VFX shots applies to deliverables. A supplemental package that references the wrong version of a segment is the distribution-scale version of conforming the wrong comp.
- **Ask what the deliverable actually is, early.** "IMF" alone is not a specification. The application, the audio configuration, the HDR variant, and whether supplementals are expected all need to be settled with the distributor before the DI, not after.

!!! tip "The useful mental model"
    A flat ProRes master is a **render**. An IMF is a **project** — essence plus the edit decisions needed to reconstruct any version of it. That is why it displaced flat masters for distributors managing hundreds of versions, and why it looks like unnecessary complexity to a production that only ever makes one.
