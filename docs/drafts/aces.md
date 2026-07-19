---
tags:
  - draft
---

# The Academy Color Encoding System (ACES)

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

The [Overview of Digital Intermediates](../digital-intermediates.md) chapter argues that the
central discipline of a modern pipeline is knowing, at every step, what image state you are in —
scene-referred or display-referred — and never crossing that boundary by accident. ACES is the
industry's standardized answer to that problem. It fixes a single scene-referred interchange
encoding, a single set of working spaces derived from it, and a defined transform at each end.

The practical argument for an independent production is narrow and worth stating plainly: ACES
gives you a pipeline that multiple vendors can implement identically without negotiating a
bespoke color workflow for every show. That is precisely the failure mode this handbook opens
by describing — plates pulled in the wrong space, work done under an unknown viewing transform,
and a colorist inheriting the consequences.

## What ACES actually is

ACES is not a look, and it is not a LUT. It is four things:

1. **A scene-referred interchange encoding** — ACES2065-1, standardized as SMPTE ST 2065-1.
2. **Working spaces** derived from it for compositing and grading.
3. **Defined transforms** at the input and output of the pipeline.
4. **A container** for the image data, standardized as SMPTE ST 2065-4.

The Academy's own framing is that ACES is "a free, open, device-independent color management
and image interchange system that can be applied to almost any current or future workflow."[^ac1]

[^ac1]: Academy Technical Bulletin TB-2018-001, *Derivation of the ACES White Point CIE
        Chromaticity Coordinates*, Introduction.

### Color primary sets

ACES defines two sets of primaries, and confusing them is the most common source of
ACES-related pipeline errors.

| Set | Role | Chromaticities (x, y) |
| --- | --- | --- |
| **AP0** | The ST 2065-1 encoding primaries. Encompasses the entire CIE 1931 visible spectrum; the primaries are non-physical. | R (0.73470, 0.26530) · G (0.00000, 1.00000) · B (0.00010, −0.07700) |
| **AP1** | Working-space primaries, closer to achievable display primaries. Basis of ACEScg, ACEScc, and ACEScct. | R (0.713, 0.293) · G (0.165, 0.830) · B (0.128, 0.044) |

Source: TB-2014-004 (informative notes on ST 2065-1) and S-2014-004 (ACEScg).

AP0's blue primary has a **negative y coordinate** and its green sits at (0, 1). These are not
colors; they are a mathematical basis chosen so that the encoding can represent every visible
chromaticity without clipping. That is the right property for an archival interchange space and
the wrong property for a working space — which is exactly why AP1 exists. As S-2014-004 puts it,
render and compositing operations "sometimes do not work well with very wide-gamut primaries."

!!! warning "The most common ACES mistake"
    Rendering or compositing in **AP0** because it is "the ACES space." Lighting and shading math
    performed against non-physical primaries produces hue shifts that look like a lighting bug and
    get chased as one. Composite in **ACEScg** (AP1). Reserve ACES2065-1 (AP0) for interchange,
    delivery between vendors, and archival.

### The white point

All ACES encodings share a white point of **x = 0.32168, y = 0.33767**.

This is commonly called "D60", and it is not D60. TB-2018-001 exists specifically to address the
confusion: the ACES white point is a "D60-like" chromaticity that does not match the coordinates
CIE D-series equations produce for 6000 K (x = 0.32169, y = 0.33780) — close, but not equal.[^ac2]

[^ac2]: TB-2018-001, §4.1 "Comparison of the ACES white point and CIE D60" and §4.3 "Reasons why
        the ACES white point doesn't match the CIE D60 chromaticity coordinates."

For a production this matters in one concrete way: when your deliverable is P3-D65 or Rec.709
(D65), the Output Transform is doing a white-point adaptation, not just a gamut mapping. If
neutrals drift warm or cool between your grading display and a deliverable, that adaptation is
where to look first.

### Encodings

| Encoding | Primaries | Transfer | Use |
| --- | --- | --- | --- |
| **ACES2065-1** | AP0 | Linear | Interchange between vendors and archival. The "full fidelity" exchange format. |
| **ACEScg** | AP1 | Linear | CGI rendering and compositing. |
| **ACEScc** | AP1 | Logarithmic | Color grading, where controls expect a log relationship to scene exposure. |
| **ACEScct** | AP1 | Logarithmic with a toe | As ACEScc, with a film-like toe near black that makes lift/offset behave the way colorists expect. |
| **ACESproxy** | AP1 | Log, integer | On-set look management and transmission over HD-SDI. **Not** for storage, production imagery, or final grading. |

Sources: TB-2014-012 (component names), S-2014-004 (ACEScg), S-2014-003 (ACEScc),
S-2013-001 (ACESproxy).

ACES2065-1 values are 16-bit floating point — 1 sign bit, 5 exponent, 10 mantissa — encoding
relative exposure values linearly.[^ac3]

[^ac3]: TB-2014-004, §5.6 and the color encoding description: "ACES values are encoded as 16-bit
        floating-point numbers."

!!! note "ACEScc vs ACEScct"
    Use **ACEScct** unless you have a specific reason not to. ACEScc is purely logarithmic to
    black, which makes a lift adjustment behave very differently from the log grading controls
    most colorists have muscle memory for. ACEScct adds the toe and is the usual choice for
    grading. Pick one and specify it in the workflow document — mixing them across vendors
    produces subtle mismatches in the shadows that are painful to diagnose late.

### Transforms

ACES 1.0 deliberately renamed the transforms in user-facing terms. TB-2014-012 records both the
old and new names, and explicitly deprecates "RRT" in end-user documentation:

| Current name | Formerly | Does |
| --- | --- | --- |
| **Input Transform** | Input Device Transform (IDT) | Converts camera-native data to ACES2065-1 |
| **Look Transform** | Look Modification Transform (LMT) | Applies a global, show-wide look upstream of the Output Transform |
| **Output Transform** | "RRT plus ODT" | Converts ACES data to display code values |

The Look Transform is the ACES equivalent of the concept this handbook already calls the
[Show LUT](../digital-intermediates.md#the-show-lut) — a single show-wide creative
transformation that everyone works beneath. TB-2014-010 covers their design and integration.

The important structural property, and the reason ACES fits the workflow this handbook
describes: **grading happens under the Output Transform, not baked into the render**. That is the
same discipline the [Graded Archival Master](../production-workflow.md#graded-archival-master)
section already requires — a fully scene-referred pipeline with the display transform applied at
the end.

### Container

ACES image data is carried in the ACES Image Container, SMPTE ST 2065-4. It is
OpenEXR-compatible but **feature-restricted** — a constrained profile of EXR rather than
arbitrary EXR.[^ac4]

[^ac4]: TB-2014-006, *Informative Notes on SMPTE ST 2065-4*. Note that TB-2014-006 is deliberately
        thin: it explains what the container is and when to use it, but the file layout, channel
        naming, and compression constraints live in the SMPTE standard itself, which must be
        purchased.

!!! warning "Verify before relying on this"
    The specific set of permitted compression schemes is defined in ST 2065-4, not in the free
    Academy bulletins. Commonly cited guidance is that the container permits only uncompressed,
    PIZ, and B44A — which would make DWAA/DWAB **non-conformant** in a ST 2065-4 file even though
    any EXR reader will open one. **[web-sourced — confirm against ST 2065-4 before print.]**
    This is worth pinning down, because "it opened in Nuke" is not evidence of conformance, and a
    non-conformant archival master is the kind of error that surfaces years later.

Related: clip-level metadata travels in an **ACESclip** file (TB-2014-009), and LUTs in the
**Academy-ASC Common LUT Format** (CLF, S-2014-006).

## ACES 2.0

!!! danger "Not corroborated by the reference library"
    Everything in this section is **[web-sourced]**. The newest ACES document in the library is
    TB-2018-001 (2018), which predates ACES 2.0 entirely. Verify against the specification before
    print.

ACES 2.0 was released in **April 2025**, developed under the Academy Software Foundation. Its
significant change is architectural: the separate RRT + ODT model is replaced by a single Output
Transform built on a **Hellwig 2022 JMh** color appearance model, with a unified tone scale,
chroma compression, and volumetric gamut compression, plus substantially improved invertibility.

Version history: 1.0 (2014), 1.1 (2018), 1.2 (2020), 1.3 (2021), 2.0 (2025). ACES 1.3 remains
widely deployed.

!!! warning "Do not switch versions mid-show"
    ACES 2.0 output is not a drop-in match for 1.x. A show already in production should finish on
    the version it started on. This is exactly the class of mid-flight pipeline change this
    handbook exists to warn against — the cost lands on the colorist, at the end, with no
    schedule left to absorb it.

Whether a full color appearance model belongs inside a display rendering transform is an open
argument in the field, with ACES 2.0 on one side and approaches like FilmLight's TCAM on the
other. A handbook at this level should note the debate exists rather than present ACES 2.0's
approach as settled.

## Should an independent production use ACES?

**Yes, if** you have multiple VFX vendors, multiple camera systems, or a deliverable set that
includes both theatrical and HDR home video. ACES gives you a specified pipeline that vendors can
implement without a bespoke negotiation, and an archival master in a standardized space.

**Probably not, if** you are a single-camera show finishing Rec.709 with one artist, and your
colorist already has a camera-native workflow they trust. ACES is not free — it costs setup,
testing, and vendor discipline. Adopting it badly is worse than a well-run camera-native pipeline.

**Either way**, the decision belongs in pre-production, alongside the
[three format specifications](../turnover-vfx.md#format-specification) — acquisition, plate
pull, and vendor delivery — and it should be tested with a
[confidence package](../production-workflow.md#visual-effects-production_1) before any shot work
begins. An ACES pipeline that nobody round-tripped is not an ACES pipeline.

## Pitfalls

- **Compositing in AP0.** See above. Use ACEScg.
- **Two Output Transforms.** Applying a display transform in the comp and again in the DI —
  the classic double-tone-map. Renders delivered to the DI should be scene-referred, with the
  Output Transform applied by the colorist.
- **An Input Transform that does not match the camera settings.** Input Transforms are specific
  to camera, and often to color science version and recording mode. "ALEXA" is not a
  specification; "ALEXA 35, LogC4, AWG4" is.
- **Assuming ACES removes the need for a look.** ACES gives you a neutral rendering, not a look.
  Productions that skip look development and grade against the bare Output Transform tend to
  discover the film has no visual point of view somewhere around the DI.
- **Treating "we're ACES" as a workflow document.** It specifies neither resolution, nor bit
  depth, nor handle length, nor naming. Those still need to be written down.
