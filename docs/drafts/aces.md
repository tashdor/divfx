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

The practical argument for an independent production is narrow: ACES
gives you a pipeline that multiple vendors can implement identically without negotiating a
bespoke color workflow for every show. That is precisely the failure mode this handbook opens
by describing — plates pulled in the wrong space, work done under an unknown viewing transform,
and a colorist inheriting the consequences.

## What ACES actually is

ACES is not a look, and it is not a LUT. It is four things:

1. **A scene-referred interchange encoding** — [ACES2065-1](https://docs.acescentral.com/encodings/aces2065-1/),
   standardized as SMPTE ST 2065-1.
2. **Working spaces** derived from it for compositing and grading.
3. **Defined transforms** at the [input](https://docs.acescentral.com/system-components/input-transforms/)
   and [output](https://docs.acescentral.com/system-components/output-transforms/) of the pipeline.
4. **A container** for the image data, standardized as SMPTE ST 2065-4.

The Academy's own framing is that ACES is "a free, open, device-independent color management
and image interchange system that can be applied to almost any current or future workflow"
(Academy Technical Bulletin
[TB-2018-001](https://docs.acescentral.com/white-point/), Introduction).

Primary references: the [ACES documentation](https://docs.acescentral.com/),
the [aces-aswf/aces](https://github.com/aces-aswf/aces) repository (formerly
[ampas/aces-dev](https://github.com/ampas/aces-dev)), and the
[SMPTE ACES standards](https://www.smpte.org/standards/aces-standards) — ST 2065-1 through
ST 2065-5, which are normative and paywalled.

### Color primary sets

ACES defines two sets of primaries, and confusing them is the most common source of
ACES-related pipeline errors.

| Set | Role | Chromaticities (x, y) |
| --- | --- | --- |
| **AP0** | The ST 2065-1 encoding primaries. Encompasses the entire CIE 1931 visible spectrum; the primaries are non-physical. | R (0.73470, 0.26530) · G (0.00000, 1.00000) · B (0.00010, −0.07700) |
| **AP1** | Working-space primaries, closer to achievable display primaries. Basis of ACEScg, ACEScc, and ACEScct. | R (0.713, 0.293) · G (0.165, 0.830) · B (0.128, 0.044) |

Sources: Academy TB-2014-004 (informative notes on ST 2065-1) and S-2014-004, published as
[ACEScg](https://docs.acescentral.com/encodings/acescg/).

AP0's blue primary has a **negative y coordinate** and its green sits at (0, 1). These are not
colors; they are a mathematical basis chosen so that the encoding can represent every visible
chromaticity without clipping. That is the right property for an archival interchange space and
the wrong property for a working space — which is exactly why AP1 exists. As [S-2014-004](https://docs.acescentral.com/encodings/acescg/) puts it, render and compositing
operations "sometimes do not work well with very wide-gamut primaries."

!!! warning "The most common ACES mistake"
    Rendering or compositing in **AP0** because it is "the ACES space." Lighting and shading math
    performed against non-physical primaries produces hue shifts that look like a lighting bug and
    get chased as one. Composite in **ACEScg** (AP1). Reserve ACES2065-1 (AP0) for interchange,
    delivery between vendors, and archival.

### The white point — and why ACES is "D60" in a D65 world

All ACES encodings share a white point of **x = 0.32168, y = 0.33767**.

This is the single most-questioned number in ACES, and reasonably so. Cameras are balanced and
characterized around daylight; Rec.709, sRGB, Rec.2020, and BT.2100 all specify **D65**; HDR
home video masters in **P3-D65**. Theatrical digital cinema calibrates its projectors to the DCI
reference white (x 0.314, y 0.351 — a slightly green ≈6300 K point that is neither D60 nor D65),
but the format carries arbitrary creative white points, and Dolby Cinema masters to **D65**.
Across the whole chain, almost nothing lands on D60. So why is the interchange encoding?

#### It does not constrain your image

!!! quote "Academy [TB-2018-001](https://docs.acescentral.com/white-point/), *Derivation of the ACES White Point CIE Chromaticity Coordinates*"
    "It is important to note that the ACES white point does not dictate the chromaticity of the
    reproduction neutral axis. […] the chromaticity of the equal red, green and blue
    (ACES2065-1 R=G=B) may match the ACES white point, the display calibration white point, or any
    other white point preferred for technical or aesthetic reasons."

The encoding white point is the chromaticity you get when R = G = B **in the encoding**. It is the
system's *default* neutral — the reference the standard rendering and your grading tools are built
around — not a *mandate* on the final image. A show working in ACES can grade to a D65 neutral
axis and deliver a D65 master; nothing about the encoding prevents it. TB-2018-001 notes this
misreading — that the number fixes the delivered look — is common enough that the Committee
worried about it when choosing the coordinates in the first place.

The useful analogy is the [DCI-X'Y'Z'](../color.md#dci-xyz) encoding white point, which is the
Equal Energy point and deliberately not the projector white point. Encoding white and
reproduction white are separate things, and conflating them causes trouble in both systems.

#### Why 6000 K specifically

The ACES white point was set by the Academy's ACES Project Committee in 2008 (Academy
S-2008-001, later standardized as SMPTE ST 2065-1) after months of debate. The candidates were
the obvious ones, and both were rejected:

- **D55** — historically the design illuminant for daylight color negative stocks.
- **D65** — the display calibration white point of television and computer graphics.

They chose the less common 6000 K instead, on three grounds:

1. **A measurement of what film actually does.** The Committee ran an experiment: expose a
   spectrally non-selective neutral gray scale onto color negative, print it to color print
   stock, project it with a xenon projector, and measure the colorimetry off the screen. The
   projected LAD patch came back at approximately **x = 0.32170, y = 0.33568**. Compared in
   CIE u′v′, that measured film-system neutral was closest to CIE daylight at a CCT of
   **6000 K** — closer than to D55 or D65.
2. **Viewing conditions and preference.** The discussion centered on viewer adaptation, dark
   surround viewing, and "cinematic look". Imagery reproduced with that white point was felt to
   look right in a theatre.
3. **Familiarity to a film heritage.** The Committee wanted a neutral that would feel correct to
   people who had spent careers looking at projected print film.

In short: **ACES is not D60 because displays are D60. It is D60-like because that is where
projected print film's neutral actually sits**, measured off a screen. ACES was designed as the
successor to a film-based pipeline, and its encoding neutral was chosen to match what that
pipeline delivered to the eye in a dark theatre.

!!! question "If the white point doesn't dictate the look, why did aesthetics decide it?"
    *"Because the exact white point chromaticity would not prohibit users from achieving any
    reproduction white point, the Committee ultimately decided to use the less common CCT of
    6000 K."* — TB-2018-001

    The override-freedom is precisely what **licensed** the aesthetic choice, rather than
    conflicting with it. The encoding white is the system's *default* neutral: the un-graded look
    a standard Output Transform produces, and the reference a colorist balances toward. That
    default has a real feel — which is exactly why the Committee cared that it read as "cinematic"
    and sat where film people's instincts expected. But because you can always move the final
    reproduction white — a different Output Transform, a chromatic adaptation, or simply grading —
    choosing a pleasant default costs you nothing. A good default you can override is not a
    constraint. That is the whole reason a number with "no instruction on how your film should
    look" was still worth choosing on how it looks.

#### Why not exactly CIE D60

Because it is not D60 — it is D60-*like*. The CIE daylight equations at 6000 K give
x = 0.32169, y = 0.33780. ACES specifies x = 0.32168, y = 0.33767. Close, but deliberately not
equal.

TB-2018-001 §4.3 gives the reason as "somewhat precautionary": the Committee was concerned that
publishing an exact CIE D-series coordinate would imply the reproduction neutral axis was
*required* to be that illuminant — the very misreading described above. Choosing coordinates
that are near a daylight illuminant without being one signals that the encoding white is a
reference, not a mandate.

This is why writing "D60" without qualification is imprecise, and why color scientists tend to
say "the ACES white point" instead.

#### What it means in practice

- **You do not grade to D60.** Set your grading display to its calibrated white point — P3-D65
  or DCI for theatrical, D65 for home video — and grade normally.
- **The Output Transform handles the adaptation.** Converting ACES to a D65 output applies a
  chromatic adaptation. That is expected behavior, not an error.
- **When neutrals drift, look here first.** If grays read warm or cool between the grading
  display and a deliverable, a mismatched or doubled white-point adaptation in the transform
  chain is the usual cause — more often than a monitor calibration fault.
- **Do not "correct" the ACES white point.** Productions occasionally try to force ACES to D65
  by inserting an adaptation before the Output Transform. This double-adapts and produces exactly
  the neutral drift it was meant to fix.

### Encodings

| Encoding | Primaries | Transfer | Use |
| --- | --- | --- | --- |
| **ACES2065-1** | AP0 | Linear | Interchange between vendors and archival. The "full fidelity" exchange format. |
| **ACEScg** | AP1 | Linear | CGI rendering and compositing. |
| **ACEScc** | AP1 | Logarithmic | Color grading, where controls expect a log relationship to scene exposure. |
| **ACEScct** | AP1 | Logarithmic with a toe | As ACEScc, with a film-like toe near black that makes lift/offset behave the way colorists expect. |
| **ACESproxy** | AP1 | Log, integer | On-set look management and transmission over HD-SDI. **Not** for storage, production imagery, or final grading. |

Specifications: [ACES2065-1](https://docs.acescentral.com/encodings/aces2065-1/) (ST 2065-1) ·
[ACEScg](https://docs.acescentral.com/encodings/acescg/) (S-2014-004) ·
[ACEScc](https://docs.acescentral.com/encodings/acescc/) (S-2014-003) ·
[ACEScct](https://docs.acescentral.com/encodings/acescct/) (S-2016-001) ·
ACESproxy (S-2013-001). Component naming follows Academy TB-2014-012.

ACES2065-1 values are 16-bit floating point — 1 sign bit, 5 exponent, 10 mantissa — encoding
relative exposure values linearly.[^ac3]

[^ac3]: Academy TB-2014-004, §5.6 and the color encoding description: "ACES values are encoded as
        16-bit floating-point numbers." See
        [ACES2065-1](https://docs.acescentral.com/encodings/aces2065-1/).

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
| **[Input Transform](https://docs.acescentral.com/system-components/input-transforms/)** | Input Device Transform (IDT) | Converts camera-native data to ACES2065-1 |
| **[Look Transform](https://docs.acescentral.com/system-components/look-transforms/)** | Look Modification Transform (LMT) | Applies a global, show-wide look upstream of the Output Transform |
| **[Output Transform](https://docs.acescentral.com/system-components/output-transforms/)** | "RRT plus ODT" | Converts ACES data to display code values |

The Look Transform is the ACES equivalent of the concept this handbook already calls the
[Show LUT](../digital-intermediates.md#the-show-lut) — a single show-wide creative
transformation that everyone works beneath. Academy TB-2014-010 covers their design and
integration; see also [Look Transforms](https://docs.acescentral.com/system-components/look-transforms/).

The important structural property, and the reason ACES fits the workflow this handbook
describes: **grading happens under the Output Transform, not baked into the render**. That is the
same discipline the [Graded Archival Master](../production-workflow.md#graded-archival-master)
section already requires — a fully scene-referred pipeline with the display transform applied at
the end.

### Container

ACES image data is carried in the ACES Image Container, SMPTE ST 2065-4. It is
OpenEXR-compatible but **feature-restricted** — a constrained profile of EXR rather than
arbitrary EXR. It stores 16-bit half-float pixels and mandates a fixed set of header attributes;
ST 2065-4:2023 lists ten required attributes, one of which is `compression`.[^ac4]

[^ac4]: SMPTE ST 2065-4:2023, *ACES Image Container File Layout*, §6.5.3 and Table 5 (required
        attributes). The 2023 edition revises ST 2065-4:2013.

!!! warning "The uncompressed rule is about the ST 2065-4 *container* — not every EXR in the pipeline"
    This trips people up. **SMPTE ST 2065-4:2023 §8.19 is
    explicit:**

    > "The compression attribute shall be of type compression and shall contain the value 0,
    > indicating no compression."

    It is a *required* attribute (§6.5.3) fixed at 0 — in both the 2013 and 2023 editions, not a
    rule that was later relaxed. So a conformant **ACES container is uncompressed, full stop.**

    But note *what* that container is. ST 2065-4 §1 scopes it to "the exchange of digital images
    encoded according to SMPTE ST 2065-1" — i.e. **ACES2065-1 (AP0, linear)**, the full-fidelity
    interchange and archival encoding. The standard nails this down: its required `chromaticities`
    attribute (§8.17) is fixed to the AP0 primaries and white point, so you literally **cannot put
    ACEScg (AP1) data in a conformant ST 2065-4 container.**

    So the rule applies to what you would actually deliver *as* an ACES container:

    | File | Typical encoding | ST 2065-4 container? | Compression |
    | --- | --- | --- | --- |
    | Archival / source master | ACES2065-1 (AP0) | Yes | **Uncompressed** (mandated) |
    | Full-fidelity vendor interchange | ACES2065-1 (AP0) | Yes | **Uncompressed** (mandated) |
    | VFX plate pull | ACEScg or camera-log EXR | No | Compress freely (ZIP/PIZ/DWA) |
    | VFX render back to the DI | ACEScg (AP1) EXR | No | Compress freely |
    | Comp working files | ACEScg (AP1) EXR | No | Compress freely |

    Your ACEScg renders and plates are ordinary OpenEXR files — compress them normally; nobody
    ships uncompressed ACEScg. They are simply **not ST 2065-4 ACES containers**, and the rule
    never claimed they were.

    Why uncompressed for the container itself? It is an archival interchange format. Fixing it to
    uncompressed 16-bit half means any reader opens any ACES container identically — no decoder
    dependency, version skew, or ambiguity (the standard's own security note points out the file
    carries no executable code and is not compressed). Fidelity and universal readability over
    file size.

    The practical trap: **"it opened in Nuke" is not evidence of container conformance.** A ZIP- or
    PIZ-compressed ACES2065-1 EXR is still valid *OpenEXR* and opens everywhere — but it is **not a
    conformant ST 2065-4 ACES container**. When you are writing the ACES2065-1 archival/interchange
    master specifically, the compression setting is a conformance requirement, not a preference.

Related: clip-level metadata travels in an **ACES Metadata File**
([AMF specification](https://docs.acescentral.com/amf/specification/); the earlier ACESclip form
is described in Academy TB-2014-009), and LUTs in the **Academy-ASC Common LUT Format**
([CLF specification](https://docs.acescentral.com/clf/specification/), S-2014-006).

Also worth knowing: the **Reference Gamut Compression**
([RGC specification](https://docs.acescentral.com/rgc/specification/)) added in ACES 1.3 handles
out-of-gamut camera values — the negative-primary excursions that produce artifacts when a
saturated highlight lands outside AP1. If your show has strong practical lights or lasers, this
is the tool for it.

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
other. It is not a settled question.

## Should an independent production use ACES?

**Yes** when:

- You are working with **multiple camera systems and multiple VFX vendors**. ACES gives everyone a
  specified pipeline to implement, so plates and renders interchange without a bespoke negotiation
  per vendor.
- You **lack the color-science infrastructure or resources to produce and vet a custom workflow**.
  A standardized, documented pipeline you can adopt is safer than a homemade one you cannot fully
  test.

**Maybe not** when:

- You have a **single camera acquisition format**. Much of what ACES buys you is interchange across
  disparate sources; with one source, a well-run camera-native workflow may be simpler.
- You have a **strong creative reason to deviate from the ACES Output Transform**. If the look you
  want fights the standard rendering, you are working against the system rather than with it.
- You have a **fixed, well-understood set of deliverables and the preparation to accommodate
  them**. If nothing about the job needs neutral interchange or archival, the setup cost may not
  pay for itself.

Adopting ACES badly is worse than a well-run camera-native pipeline. It is not free — it costs
setup, testing, and vendor discipline.

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
