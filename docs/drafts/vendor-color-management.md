---
tags:
  - draft
---

# Vendor Color Management: DaVinci and FilmLight

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

[ACES](aces.md) is not the only way to run a scene-referred, color-managed pipeline. The two
grading systems a production is most likely to encounter — Blackmagic's
**DaVinci Resolve** and FilmLight's **Baselight** — each ship their own end-to-end color
management, with their own working space and their own display rendering transform. They solve the
same problem ACES solves — keep the image scene-referred, apply the display transform once at the
end, and let footage from many cameras share a common working space — but they solve it *inside a
product* rather than as an open standard.

These vendor systems are not proprietary "black boxes." DaVinci Wide Gamut has a published white
paper, and FilmLight's color spaces are downloadable files you can use outside Baselight. But
neither is a SMPTE-style open standard the way ACES is
([ST 2065-1](aces.md#what-aces-actually-is)), and neither is natively implemented across the whole
VFX tool ecosystem the way ACES is via [OpenColorIO](color-management.md). The accurate framing is
**published and partially portable, but single-vendor** — not "secret," and not "an open standard."

## DaVinci Resolve Color Management (RCM)

**Objective:** normalize many cameras into one scene-referred working space and retarget to any
deliverable, without leaving Resolve. Instead of grading log footage into shape by hand
(*display-referred* — Resolve knows nothing about the source), you tell it each clip's camera
profile and it maps that source into a working space and out to the deliverable using the
manufacturer's known log curve and gamut (*scene-referred*).[^dg1]

The working space Blackmagic recommends is **DaVinci Wide Gamut (DWG)** with the **DaVinci
Intermediate** log curve — a gamut Blackmagic describes as larger than BT.2020, ARRI Wide Gamut,
and ACES AP-1, so nothing clips whatever camera it came from.[^dg2] Two things worth knowing about
how open it is:

- **The encoding is fully specified; the rendering is not.** DWG-the-color-space — its virtual
  primaries, D65 white point, RGB↔XYZ matrices, and the DaVinci Intermediate log equations — is
  published in a Blackmagic white paper, so it can be rebuilt *exactly* in an OCIO config or a LUT
  tool. The DaVinci display rendering transform — how Resolve tone- and gamut-maps DWG to an output
  — is internal, not a separately published spec. "DWG is published" is true of the color space,
  not the look.
- **Resolve also contains full ACES modes** (ACEScc/ACEScct, with ACES AMF 2.0 metadata), so "we
  grade in Resolve" and "the show is ACES" are not mutually exclusive — the choice is a project
  setting.[^dg3]

[^dg1]: *DaVinci Resolve 21 Reference Manual* (Blackmagic Design, July 2026), Ch. 9, "Data Levels,
        Color Management, and ACES," pp. 225–290 — the authoritative reference; and *The Colorist
        Guide to DaVinci Resolve 20* (Fissoun, Blackmagic, 2025), Lesson 4, for the walkthrough. The
        workflow has evolved since the *Definitive Guide to Resolve 15* (2018) this chapter first
        cited.

[^dg2]: Qualitative comparison: *DaVinci Resolve 21 Reference Manual*, Ch. 9, pp. 241–243 ("greater
        than BT.2020, ARRI Wide Gamut, and even ACES"). Numeric definition: *DaVinci Resolve 17 —
        Wide Gamut Intermediate* white paper (Blackmagic, Aug 2021) — DWG CIE 1931 xy primaries
        R (0.8000, 0.3130), G (0.1682, 0.9877), B (0.0790, −0.1155), white D65 (0.3127, 0.3290),
        with RGB↔XYZ matrices; DaVinci Intermediate is a log OETF encoding > 9.1 stops above 18%
        grey (middle grey → 0.336043). Its revision history notes the green-x coordinate was
        corrected in v1.1 (2021) — pre-v1.1 reconstructions circulating online carry the old value.

[^dg3]: *DaVinci Resolve 21 Reference Manual*, Ch. 9, covers Resolve's ACES signal flow, working
        space, and AMF 2.0 support.

**What RCM makes easier:** getting a color-managed grade running inside Resolve with almost no
setup — its *Automatic* mode detects each clip's input space from the media and normalizes mixed
cameras to one output on its own. Nothing to license or configure; retargeting SDR/HDR or
Rec.709/P3/Rec.2020 is a menu change.

**What RCM makes harder:** anything that leaves Resolve. A VFX vendor working in Nuke is not "in
RCM"; the DaVinci rendering is not a spec another facility reproduces identically; and DWG is a
working space, not a neutral archival interchange master. It is an excellent *in-application*
pipeline, not an *interchange* one.

## FilmLight: Baselight, Daylight, and the Truelight Color Spaces

**Objective:** a high-end managed grade whose display transform is built on a color appearance
model. FilmLight's systems (**Baselight**, and the on-set/dailies tool **Daylight**) work in the
**Truelight Color Spaces (TCS)** — an **E-Gamut / T-Log** working space — and render to display
through **T-CAM** (the Truelight Color Appearance Model, currently v2), which maps scene-referred
data to a display without baking in a specific look. **[web-sourced — the E-Gamut / T-Log / T-CAM-v2
product names are not in the reference library.]**

What makes T-CAM distinctive is a documented design *philosophy*: its author, FilmLight's Richard
Kirk, argues for the simplest appearance model that works rather than the most elaborate.

!!! quote "Kirk, *Colour: Sense & Measurement* (FilmLight, 2022), Ch. 6"
    "[I tried] CIECAM02 Jab space internally to see whether this might help, but I never saw any
    difference. […] I suggest you use the simplest model you can."

That is the same open question the [ACES chapter](aces.md#aces-20) raises about ACES 2.0 — whether a
full color appearance model belongs *inside* the display rendering transform. ACES 2.0 embeds a
Hellwig-derived CAM; FilmLight's position is that a lighter model plus a viewing-condition
correction does the job. It is a genuine technical disagreement between two shipping systems, which
is why an independent production should know the choice of display transform is a real choice, not a
detail.[^fl1]

[^fl1]: Richard Kirk, *Colour: Sense & Measurement* (FilmLight, 2022) — the TCAM rationale (Ch. 5–6)
        and "simplest model" argument are in the reference library. The E-Gamut/T-Log/T-CAM-v2
        product names and the portability specifics below are web-sourced beyond it.

**What FilmLight makes easier:** a well-regarded rendering and, unusually for a vendor system, real
portability — FilmLight publishes its color-space and transform files (`.flspace` / `.fltransform`),
a Truelight OCIO config, and an Autodesk Flame color policy, so TCS can travel outside Baselight.
And, exactly as with Resolve, choosing FilmLight's tools is not choosing against ACES: **Baselight
can run a full ACES pipeline** as its color-managed workflow (v7 added ACES 2.0), so "we finish at a
Baselight house" and "the show is ACES" are equally compatible. **[web-sourced.]**

**What FilmLight makes harder:** it is still single-vendor in origin. Those portable files are
FilmLight's, under FilmLight's control — not a SMPTE/Academy specification that many vendors
implement and certify against independently. And you most often encounter it because you are
finishing at a Baselight house, not because a small production chose it from scratch.

## What the vendor systems make easier — and harder — than ACES

Both vendor systems trade the same way against ACES, and it is worth stating plainly because it
drives the decision:

| | Vendor CM (RCM / TCS) | ACES |
| --- | --- | --- |
| **Setup cost** | Low — on by a project setting, no external config | Higher — configs, transforms, vendor discipline |
| **Normalize many cameras** | Easy, in-app | Also strong, but with more overhead |
| **Cross-app / cross-vendor interchange** | Weak — the rendering does not leave the app | The whole point — an open standard everyone implements |
| **Neutral archival master** | No (a working space, not an interchange encoding) | Yes (ACES2065-1) |
| **Retarget deliverables (SDR/HDR/theatrical)** | Easy | Easy |

The short version: a vendor system makes the *in-application* finish easier and the *interchange*
harder; ACES makes the interchange easier at the cost of setup. Neither is "better" — they optimize
for different shapes of production.

## Documentary vs. single-camera narrative

The most useful way to choose is to notice that "how many cameras" and "how many vendors and
applications" are *different* axes, and they often point opposite ways.

- **Non-scripted documentary.** Typically *many heterogeneous sources* — archival, several
  shooters, phones, stock, footage from different eras and formats — but usually *one* finishing
  facility and little or no VFX. The dominant pain is normalizing disparate sources quickly. That is
  exactly what a vendor system, and RCM's Automatic mode in particular, makes trivial. With no
  multi-vendor VFX chain to serve, ACES's interchange advantage goes largely unused, and its setup
  cost buys little. **Vendor color management is often the better fit for documentary finishing.**
- **Single-camera scripted narrative.** Usually *one* camera format — so the multi-source
  normalization a vendor system excels at matters less — but frequently VFX spread across multiple
  vendors and applications, an archival master, and theatrical-plus-HDR-plus-SDR deliverables. A
  Nuke or Flame VFX chain is precisely the case only an open standard spans, and a neutral archive
  is exactly what ACES2065-1 provides. **ACES tends to earn its keep on VFX-heavy narrative work.**

The inversion is the point: *many cameras* favors vendor color management; *many vendors,
applications, deliverables, or an archival requirement* favors ACES. A simple single-camera
narrative with no VFX and one deliverable may need no managed pipeline at all — a well-run
camera-native grade is fine.

## When to decide

Like every color decision in this handbook, it belongs in **pre-production**, written into the
[three format specifications](../turnover-vfx.md#format-specification) and proven with a
[confidence package](../production-workflow.md#visual-effects-production_1) before shot work starts —
because the working space and display transform, once graded against, are expensive to change. The
options are not exclusive (Resolve and Baselight both contain ACES modes); the decision that matters
is which **working space and display transform the whole show agrees on**. For the four-way picture
including an un-managed workflow, see the
[color management comparison](color-management-comparison.md).
