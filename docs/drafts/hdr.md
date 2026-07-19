---
tags:
  - draft
---

# HDR Mastering

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

v1.0.1 mentions high dynamic range once, in passing, as a bit-depth argument: that 10-bit log is
insufficient for "EDR (extended dynamic range, theatrical) and HDR (high dynamic range, home
video)" and that 12-bit should be the floor. The bit-depth point is still correct. The framing is
not how the industry describes HDR, and "EDR" is legacy vendor language that should be dropped.

HDR is not a look and not a grade setting. It is a different display referring — a different
EOTF, a wider container gamut, and an explicit statement of the display the master was made on.

## The standard: ITU-R BT.2100

**BT.2100** is the recommendation that defines HDR television. Its parameters:

| Parameter | Value |
| --- | --- |
| Primaries | R (0.708, 0.292) · G (0.170, 0.797) · B (0.131, 0.046) — the BT.2020 primaries |
| White point | D65 |
| Bit depth | 10 or 12 bit |
| Transfer functions | **PQ** (Perceptual Quantization) or **HLG** (Hybrid Log-Gamma) |
| Reference display peak | ≥ 1 000 cd/m² |

Source: ITU-R BT.2100-2 (July 2018), Table 1 and Table 3.

Note what BT.2100 does *not* do: it does not tell you to grade to the primaries. The gamut is a
**container**. See [mastering in practice](#mastering-in-practice) below.

### PQ and HLG are not interchangeable

This is the distinction that most often goes wrong in a delivery conversation.

**PQ** — standardized as **SMPTE ST 2084** — is an *absolute* transfer function. A code value
maps to a specific luminance in cd/m², up to 10 000. A PQ signal says "this pixel is 400 nits."
That is what makes it right for cinematic mastering: the creative intent is pinned to measurable
light, and the display's job is to reproduce it or tone-map it down honestly.

**HLG** is a *relative* transfer function, with the OETF operating on scene linear light. It is
designed for live production and broadcast, and is substantially backward-compatible with SDR
displays. BT.2100 specifies the HLG system with a nominal 1 000 cd/m² display and a system gamma
around 1.2 in a reference environment.

For a scripted feature or series destined for streaming, **PQ is effectively the answer**. HLG
matters if you are delivering live or broadcast content, or a distributor asks for it.

!!! note "Where the OOTF lives"
    The [Rec.709 note](../v1.1-notes.md#rec709-and-the-oetfeotf-conflation) elsewhere in these
    materials explains that SDR has no explicitly specified OOTF — it exists only as the cascade
    of the BT.709 OETF and the BT.1886 EOTF. BT.2100 is more rigorous: it specifies an OETF, an
    EOTF, *and* an OOTF explicitly for HLG, and defines PQ in terms of the display EOTF directly.
    If you have ever wanted a clean answer to "where is the rendering intent applied," HDR
    standards give one and SDR does not.

## Metadata

An HDR master is incomplete without metadata describing the display it was made on. This is a
genuine change from SDR practice, where the mastering display was implied by the standard.

| Standard | Carries | Kind |
| --- | --- | --- |
| **SMPTE ST 2086** | Mastering display color volume — primaries, white point, min/max luminance | Static |
| **MaxCLL / MaxFALL** | Maximum content light level; maximum frame-average light level | Static |
| **SMPTE ST 2094** | Dynamic metadata for color volume transform, per-scene or per-frame | Dynamic |

ST 2086 describes *the display you graded on*, not the content. MaxCLL and MaxFALL describe the
content. Downstream displays use these to decide how to tone-map. Getting them wrong — declaring
a 4000-nit mastering display when you graded on a 1000-nit one — produces a master that tone-maps
incorrectly on every consumer display, and it is not visible on your reference monitor.

## Distribution formats

| Format | Metadata | Notes |
| --- | --- | --- |
| **HDR10** | Static (ST 2086 + MaxCLL/MaxFALL) | The baseline. PQ, 10-bit, Rec.2020 container. Royalty-free. |
| **HDR10+** | Dynamic (ST 2094-40) | Scene-by-scene metadata without a proprietary grading step. |
| **Dolby Vision** | Dynamic (ST 2094-10) | Adds an authored trim pass. The most common premium deliverable. |

**Dolby Vision** is the one that changes your schedule, because it adds creative work rather than
just an export setting. The workflow is: grade the HDR master, then author **trims** — a
colorist-guided derivation of how the image should look on lower-capability displays and in SDR.
Dolby's own grading guidance treats the trim pass as a creative session, not a technical
conversion.[^hdr1]

[^hdr1]: Dolby *Vision Color Grading Best Practices Guide* v4.0 and the *Dolby Vision
        Professional Tools User Manual* v4.0.0 cover trim workflow and the metadata levels in
        detail.

!!! warning "Budget the trim pass"
    A production that budgets an HDR grade but not a Dolby Vision trim pass has budgeted roughly
    half the work. The SDR derivation is where the argument happens, because that is the version
    most of the audience will see.

## Mastering in practice

The single most useful thing to understand, and the one BT.2100 does not say outright:

> HDR is mastered in **P3-D65, limited inside a Rec.2100/BT.2020 container**, at a stated peak
> luminance — typically 1 000 or 4 000 cd/m² — not graded to the BT.2020 primaries.

No consumer or reference display reproduces the full BT.2020 gamut. High-end 2025–26 panels
measure roughly 75–85% of BT.2020 while covering nearly all of DCI-P3.
**[web-sourced — display coverage figures.]** The container is wider than any display so the
encoding does not constrain future displays; the grade is made inside a volume that displays can
actually show.

This makes the v1.0.1 [Rec.2020 entry](../color.md#display-color-spaces) — "few displays are
capable of reproducing many of the colors" — still substantially accurate. What it lacks is the
consequence: Rec.2020 is a container you encode into, not a gamut you grade to.

A typical deliverable set for a streaming feature:

- **HDR master** — PQ, P3-D65 inside Rec.2100, 1 000 nit, with ST 2086 + MaxCLL/MaxFALL
- **Dolby Vision metadata** — trims authored against that master
- **SDR master** — Rec.709 / BT.1886, derived from the HDR grade with a colorist pass

### Theatrical

Theatrical HDR is a separate presentation, not the home master. **Dolby Vision Cinema** — the
dual-laser projection format used in Dolby Cinema auditoriums — reaches far higher contrast and
peak luminance than the 48 cd/m² of the
[standard DCI reference](../color.md#dci-xyz). A theatrical HDR pass is its own grade, and its
own line item.

## Consequences for visual effects

HDR is not only a DI concern, and this is the part an independent production most often
discovers late:

- **Bit depth.** The v1.0.1 argument holds and strengthens: 10-bit log is not enough. 12-bit log
  is the floor for HDR finishing, 16-bit float preferable. See
  [Camera Log](../digital-intermediates.md#camera-log).
- **Highlights are visible now.** Specular detail, practical lights, and skies that clipped
  invisibly in a Rec.709 grade are plainly visible at 1 000 nits. Comps that "worked" in SDR
  reveal blown highlight rolloff, clipped CG speculars, and mismatched black points.
- **Review at the target.** The [VFX review](../production-workflow.md#visual-effects-reviews)
  section already insists on reviewing in a calibrated environment matching the intended
  exhibition. For an HDR deliverable that means an HDR reference display, not a Rec.709 monitor
  with the assumption that it will "hold up."
- **Exposure checking earns its keep.** The
  [exposure check](../vfx-quality-control.md#exposure-checking) technique — driving exposure up
  and down to test whether artificial highlights clip where plate highlights clip — is a proxy
  for exactly the failure HDR exposes. Productions that adopt it during SDR work arrive at HDR
  with fewer surprises.
