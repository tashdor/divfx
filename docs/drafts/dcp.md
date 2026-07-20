---
tags:
  - draft
---

# DCP — The Digital Cinema Package

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

The DCP is the theatrical deliverable — a package muxed from the DCDM, with KDMs to unlock encrypted playback; the [production workflow](../production-workflow.md#dcp-digital-cinema-package) chapter covers that mastering path. This chapter adds everything an independent production actually trips over getting a film onto a festival screen: whether to encrypt at all, the accessibility tracks festivals now expect, how the package physically or electronically reaches the venue, and why none of it is trusted until it has played off a real cinema server.

## What a DCP is

Structurally the DCP is the [IMF](imf.md)'s predecessor — and, in large part, its template. The digital-cinema packaging model — MXF track files described by a **CPL** (Composition Playlist), inventoried by a **PKL** (Packing List), and located by an **ASSETMAP** — was standardized by SMPTE for D-Cinema and released in 2009, and IMF (first standardized in 2013) reused that same architecture for mastering and distribution.[^dcp-imf] The DCP's essence differs because the target is a projector, not a mastering pipeline:

| Component | Encoding |
| --- | --- |
| **Picture** | **JPEG 2000**, intra-frame, 12-bit, in **DCI X′Y′Z′** — gamma 2.6, P3 gamut inside an XYZ container, 48 cd/m² reference white ([see Color Spaces](../color.md#dci-xyz)) |
| **Audio** | 24-bit linear **PCM**, up to 16 channels at 48 or 96 kHz |
| **Subtitles / captions** | **SMPTE Timed Text** ([ST 428-7](https://www.smpte.org/standards)) or Interop XML, with PNG or font-rendered glyphs |

Two package flavors exist, and the difference matters at ingest. **Interop (IOP)** is the older de-facto format: narrower in what it allows, but understood by essentially every server ever deployed. **SMPTE DCP** is the standardized modern format (the ST 428/429 families) and is required for anything Interop never specified — high frame rates, immersive audio, and properly-signalled closed captions.[^dcp-dtdc] Most festivals accept both; some now expect SMPTE. Interop remains the safe universal when you do not know the venue's server age. Confirm which the festival wants before you master — the two are not interchangeable at the door.

## Encrypted or unencrypted

An encrypted DCP has its MXF essence scrambled with **AES-128**; a server can only play it with a **KDM** (Key Delivery Message) — an XML file carrying the content keys, encrypted to one specific server's certificate and valid only for a stated date-and-time window. Unencrypted DCPs carry no keys and play on any compliant server.

For a festival, **unencrypted is the safer default**, and the festivals say so themselves: Venice recommends non-encrypted, Sundance strongly prefers it, and Berlinale accepts either.[^dcp-fest] The reason is operational, not ideological. Encryption obliges you to collect the certificate of every media block (IMB) that will play the film, generate a per-server, per-window KDM from the distribution KDM (DKDM), and deliver those keys ahead of the screening — and any mismatch (wrong certificate, expired window, a last-minute room change to a server you did not key) is an audience watching a black screen.

If a right-holder requires encryption, coordinate with the festival ahead of time so special considerations can be made to ensure KDMs cover the anticipated windows and playback servers, and that there is 24/7 key-management support available by phone in case of a last-minute emergency.[^dcp-fest]

## Accessibility: captions and described audio

Accessibility tracks have moved from optional to expected. Sundance requests them for features; Toronto requires English **SDH** — subtitles for the Deaf and Hard of hearing — for English-language films.[^dcp-cap] Two distinct audiences are served by two distinct mechanisms.

**Captions, for Deaf and hard-of-hearing viewers**, come in two forms, and the DCP naming convention makes you declare which:[^dcp-isdcf]

- **OCAP (open captions)** are rendered into the presentation itself — always on, visible to the whole auditorium, needing no hardware. A timed-text track flagged `OCAP`. Because it depends on nothing in the venue, it is the most reliable way to guarantee an accessible screening.
- **CCAP (closed captions)** play as a silent metadata track that reaches only personal devices — a CaptiView reader in the seat cupholder, or caption glasses — which the viewer turns on. It keeps the screen clean for everyone else, but it works only if the venue has the caption hardware and it is functioning.

SDH differs from ordinary translation subtitles: beyond the dialogue, it carries speaker IDs and non-dialogue sound cues (music, effects).

**Described audio, for blind and low-vision viewers**, is a separate narrated track (audio description / VI-N) describing key visual action between lines. Alongside it, a **Hearing Impaired (HI)** track carries a dialogue-boosted mix. Both ride the DCP's audio channel map — HI and VI-N conventionally on channels 15 and 16.[^dcp-dtdc]

The practical rule: **an OCAP version is the fallback that always works**, because it needs nothing from the venue. Provide the specific tracks the festival's spec names; when in doubt, an open-caption version is the safe accessible deliverable.

## Delivering to a festival

**Physical media** is still the workhorse. The historical standard is a **CRU DX115** dataport drive; festivals increasingly also accept USB 3.0 drives and SSDs (SSD preferred for reliability).[^dcp-fest] DCP drives are conventionally formatted **Linux ext2/ext3** — the format every server reads, as required by the DCI specification (format with a **128-byte inode size**; modern Linux defaults to 256 bytes, which older servers reject) — though some festivals now also accept exFAT or NTFS.[^dcp-drive] Check, rather than assume.

**Electronic delivery** is rising: Venice takes files by **Aspera**, Berlinale through its own **Digital Cinema Portal**, and services such as CineSend and Massive move DCPs over managed transfers.[^dcp-fest] It removes shipping, but a feature DCP is tens to hundreds of gigabytes, so it is a significant transfer, and time and resources must be budgeted to ensure the upload completes within the delivery window.

Whatever the medium, the package title must follow the **ISDCF Digital Cinema Naming Convention (DCNC)** — the string that encodes title, content type, aspect ratio, language and subtitle territory, audio, resolution, studio, and date so that a server and a programmer can parse the film unambiguously.[^dcp-isdcf] But renaming the delivery folder is not enough: a server takes the display name from the **ContentTitleText** field — and often the **AnnotationText** — *inside* the CPL (and PKL), not from the folder name, so the ISDCF title has to be written into the CPL metadata when the DCP is authored. A folder whose name disagrees with the CPL shows the wrong title on the ingest screen and in every playlist editor. A misnamed DCP is a support call at the projection booth.

## QC on a real cinema server

The step that separates a DCP that *builds* from a DCP that *screens*: **play it off an actual cinema server, on a real projector, before it ships.** A package that ingests and plays in a desktop tool (DCP-o-matic, easyDCP) can still fail in a theater.

A theater QC pass — on a DCI media block (Dolby, GDC, Sony, Barco Alchemy, Qube) and projector — is the only place to catch:

- **Ingest and validation** errors, and Interop/SMPTE incompatibilities with a particular server generation.
- **Audio channel mapping** — that center, surrounds, LFE, HI, and VI-N land where they should, not rotated or swapped.
- **Subtitle and caption rendering** — timing, position, glyphs, and, for CCAP, that the captions actually reach the seat device in sync.
- **Framing and masking** — the right aspect, no cropping, correct Flat/Scope container.
- **Frame-rate support**, dropped frames, and audio-video sync across the whole runtime.
- **KDM validity**, for encrypted packages — that the key opens on *that* server, within the window.

Play it start to finish, listen to the full mix, and verify captions on the real device. Budget a theater QC session the way you budget a [confidence package](../production-workflow.md#visual-effects-production_1) for VFX — it is the same discipline, applied to the deliverable.

## What this means for an independent production

- **Decide encryption early**, and default to unencrypted for festivals unless a rights-holder demands otherwise.
- **Build accessibility during the DI, not after** — an OCAP version, SDH, and described audio are increasingly required, and retrofitting them into a finished master is expensive.
- **Get each festival's exact spec first.** "A DCP" is not a specification: Interop vs SMPTE, media and delivery method, naming, and which accessibility tracks all need to be settled before mastering.
- **QC on real hardware.** A desktop player proves the package parses; only a cinema server proves it screens.

[^dcp-imf]: IMF (SMPTE ST 2067, first edition 2013) identifies its deliverable components with technology derived from the DCP standards — the same CPL / PKL / ASSETMAP and MXF track-file model SMPTE standardized for D-Cinema Packaging (ST 429) and released in 2009. IMF began as a studio requirements effort at USC's Entertainment Technology Center, submitted to SMPTE. [Interoperable Master Format (Wikipedia)](https://en.wikipedia.org/wiki/Interoperable_Master_Format) and the [Library of Congress format description](https://www.loc.gov/preservation/digital/formats/fdd/fdd000535.shtml). **[web-sourced.]**

[^dcp-dtdc]: DTDC (Deluxe Technicolor Digital Cinema), *Recommended Guidelines for Digital Cinema Source and DCP Content Delivery* v4.08 (2019) — Interop vs SMPTE differences, audio channel layouts, subtitle/caption XML and PNG rules, Hearing Impaired and sign-language accessibility tracks, DKDM/certificate identity, and physical vs electronic delivery. The DCP itself is defined by the SMPTE **ST 428** (DCDM) and **ST 429** (D-Cinema Packaging) standard families and the [DCI Digital Cinema System Specification](https://www.dcimovies.com/).

[^dcp-cap]: Festival accessibility expectations summarized from Sundance and Toronto requirements and practitioner guidance ([Cinematiq — *Making a DCP: Accessibility*](https://www.cinematiq.com/posts/things-to-consider-before-making-a-dcp-accessibility)). **[web-sourced.]**

[^dcp-isdcf]: ISDCF, [Open and Closed Captions](https://registry-page.isdcf.com/openandclosedcaptions/) and the [Digital Cinema Naming Convention](https://registry-page.isdcf.com/). **[web-sourced.]**

[^dcp-drive]: EXT2/EXT3 with a **128-byte inode size** is the required delivery-drive format under the DCI specification and the [ISDCF](https://www.isdcf.com/) recommendation; modern Linux tooling defaults to 256-byte inodes, which older Doremi/Dolby servers reject outright. **[web-sourced.]**

[^dcp-fest]: Unencrypted preference, KDM window rules, and delivery-media requirements from the 2024 festival technical specifications of the [Venice Biennale](https://static.labiennale.org/files/cinema/2024/Documenti/specs-dcp-2024.pdf), the [Berlinale](https://www.berlinale.de/en/film-entry/technical-specifications/festival-media.html), and [Sundance](https://www.sundance.org/wp-content/uploads/2022/11/Technical-Specifications-For-Festival-Presentation.pdf). Specs change yearly — confirm the current edition. **[web-sourced.]**
