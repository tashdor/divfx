---
tags:
  - draft
---

# Vendor Color Management: DaVinci and FilmLight

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

[ACES](aces.md) is not the only way to run a scene-referred, color-managed pipeline. The two
grading systems an independent production is most likely to actually sit in front of —
Blackmagic's **DaVinci Resolve** and FilmLight's **Baselight** — each ship their own end-to-end
color management, with their own working space and their own display rendering transform. They
solve the same problem ACES solves — keep the image scene-referred, apply the display transform
once at the end, and let footage from many cameras share a common working space — but they solve
it *inside a product* rather than as an open standard.

That distinction is the whole point of this chapter, and it is easy to get wrong in both
directions. These vendor systems are more open than "proprietary black box" suggests: DaVinci Wide
Gamut has a published white paper, and FilmLight's color spaces are downloadable files you can use
outside Baselight. But neither is a SMPTE-style open standard the way ACES is
([ST 2065-1](aces.md#what-aces-actually-is)), and neither is natively implemented across the whole
VFX tool ecosystem the way ACES is via [OpenColorIO](color-management.md). The accurate framing is
**published and partially portable, but single-vendor** — not "secret," and not "an open standard."

## DaVinci Resolve Color Management (RCM)

Resolve can run in several color-science modes. The managed one is called **DaVinci YRGB Color
Managed**, selected under Project Settings → Color Management → Color science.[^dg1] Turning it on
does not change the image; it activates three menus that define the pipeline:

[^dg1]: *The Definitive Guide to DaVinci Resolve 15* (Blackmagic Design, 2018), Lesson 11, "Using
        DaVinci Resolve color management," p. 304–306: choose "DaVinci YRGB Color Managed" in the
        Color science menu, then set **Input Color Space**, **Timeline Color Space**, and **Output
        Color Space**.

- **Input Color Space** — what the footage actually is (e.g. `Blackmagic Design 4.6K Film v3`,
  `ARRI LogC4`, `Sony S-Log3 / S-Gamut3.Cine`). Set per clip or per camera.
- **Timeline Color Space** — the working space everything is graded in.
- **Output Color Space** — the deliverable encoding (e.g. `Rec.709 Gamma 2.4`, `P3-D65`).

Resolve converts each clip from its input space into the timeline space, you grade there, and it
converts to the output space on the way to the display and the render. This is the same
scene-referred discipline the [Digital Intermediates](../digital-intermediates.md) chapter argues
for: the display transform is applied once, at the end, and grading happens beneath it.

!!! warning "Set Input and Timeline before you grade, not after"
    The Definitive Guide is explicit: "never change the Input or Timeline Color Space once you have
    started color grading your clips" (p. 306). Changing the working space mid-grade re-interprets
    every correction you have already made. Output space you *can* change per deliverable — that is
    the point of the design.

### The working space: DaVinci Wide Gamut + DaVinci Intermediate

The modern default timeline space is **DaVinci Wide Gamut (DWG)** primaries with the **DaVinci
Intermediate (DI)** log transfer function, introduced with Resolve 17.
**[web-sourced — postdates the reference library; the newest Blackmagic doc in the library is
*The Definitive Guide to Resolve 15* (2018), which predates DWG.]**

Blackmagic *did* publish a white paper on it —
*DaVinci Wide Gamut / Intermediate* (August 2021), hosted at
`documents.blackmagicdesign.com`. Per that paper, DWG is a large gamut chosen to contain every
current professional camera gamut plus every current and anticipated display/delivery gamut
(Rec.709 through Rec.2020), and DaVinci Intermediate is a logarithmic encoding of relative scene
light. The primaries and white point are documented in the paper (white point D65). **[web-sourced
— from the Blackmagic white paper, not corroborated by the reference library.]**

!!! note "The white paper is published — the full DRT is not the same thing"
    Two separate questions get conflated. **DWG-as-a-color-space** (primaries + the DI transfer
    function) is documented, and can therefore be reconstructed and defined in other tools — people
    have added it to OCIO configs and LUT calculators. **The DaVinci display rendering transform**
    — how Resolve tone-maps and gamut-maps from DWG to a given output — is an internal part of the
    application, not a separately published spec. So "DWG is published" is true of the encoding and
    not, in the same sense, of the rendering. Independent reconstructions of the DWG primaries from
    the white paper have also turned up small discrepancies against the values Resolve uses
    internally, which is the kind of thing worth round-tripping rather than trusting on paper.
    **[web-sourced.]**

### Resolve also does ACES

RCM is not an either/or with ACES. Resolve has a separate **ACEScct** color-science mode, so the
same application can run a full ACES pipeline — Input Transform, ACEScct grading, Output Transform
— instead of the DaVinci-native one. Choosing "DaVinci YRGB Color Managed" versus "ACEScct" is a
project setting.[^dg2] A production that wants ACES for interchange reasons but likes grading in
Resolve does not have to give up either.

[^dg2]: The Color science menu in Project Settings offers DaVinci YRGB, DaVinci YRGB Color Managed,
        and ACES modes (ACEScc and ACEScct). *Definitive Guide to Resolve 15*, Lesson 11, and
        general product documentation. **[Resolve's ACES modes are web-sourced beyond the library.]**

### What RCM can and cannot do

| Can | Cannot / caveats |
| --- | --- |
| Normalize many cameras into one working space with per-clip input tagging | Impose that pipeline on tools outside Resolve — a VFX vendor in Nuke is not "in RCM" |
| Grade scene-referred with the display transform applied last | Offer the DRT as an open, separately-specified standard other vendors implement identically |
| Retarget to multiple outputs (SDR/HDR, Rec.709/P3/Rec.2020) by changing Output Color Space | Guarantee a match to ACES output — it is a *different* rendering, not a re-skin of the ACES one |
| Export/define DWG as a color space elsewhere (primaries + DI are documented) | Export the *rendering* as a documented transform in the way ACES publishes its Output Transform |

The honest summary: RCM is an excellent **in-application** managed workflow, and DWG is a genuinely
useful, documented wide-gamut working space. What it is not is an **interchange standard**. If your
whole finish lives in Resolve and your VFX are handled as scene-referred EXRs with an agreed
working space, RCM is a clean way to run the DI. If you need many vendors in many applications to
implement the *same* pipeline without bespoke negotiation, that is the job ACES-via-OCIO was built
for, and DWG does not replace it.

## FilmLight: Baselight, Daylight, and the Truelight Color Spaces

FilmLight's grading systems (**Baselight**, and the on-set/dailies tool **Daylight**) are built
around the **Truelight Color Spaces (TCS)**: a scene-referred working space plus a color-appearance
display transform.

- **Working space:** **E-Gamut** primaries with the **T-Log** transfer function — a camera-agnostic,
  wide-gamut log space analogous in role to ACEScct or DWG/Intermediate.
  **[web-sourced — the E-Gamut/T-Log product names are not in the reference library. The library's
  FilmLight material describes the underlying color science, below, but not these encodings by
  name.]**
- **Display rendering transform:** **T-CAM** (Truelight Color Appearance Model), currently **v2** —
  a DRT built on a color appearance model that maps scene-referred data to a display "without
  putting a specific look on the final image." **[web-sourced for the "v2" designation.]**

### T-CAM and the "simplest model" argument — this part the library *does* corroborate

FilmLight's principal color scientist, Richard Kirk, wrote both Truelight and TCAM, and the
library holds his book — *Colour: Sense & Measurement* (FilmLight, 2022) — which lays out the
rationale directly. This makes T-CAM one of the better-documented vendor DRTs in terms of *why* it
is built the way it is, even though the shipping transform itself is a product.

The central design claim is minimalism. Kirk builds his working space and appearance model in
**LMS cone primaries** rather than XYZ, and argues repeatedly for "the simplest model that works":

!!! quote "Kirk, *Colour: Sense & Measurement* (FilmLight, 2022), Ch. 6, p. 134–135"
    "[I tried] CIECAM02 Jab space internally to see whether this might help, but I never saw any
    difference. This was probably because of my particular requirements: I was not changing the
    white point by much (most cinema whites were about D60, and video was D65) […] I suggest you use
    the simplest model you can."

TCAM's tone mapping is a highlight-compression curve parameterized by a tunable reference white
`Rw`. Kirk places it side by side with the ACES RRT and is candid about the comparison:

!!! quote "Kirk, *Colour: Sense & Measurement*, Ch. 5, p. 107"
    "We have the ACES RRT for reference. This looks a bit duller than our Rw=0.5 image. This is not
    a fair comparison as the ACES RRT is fixed for all images, while we can tune Rw. However, it
    does show that we are doing broadly the same thing as ACES."

This is the same open argument the [ACES chapter](aces.md#aces-20) flags around ACES 2.0: whether a
full color appearance model belongs *inside* the display rendering transform. ACES 2.0 embeds a
Hellwig-derived CAM; FilmLight's position, stated in the book, is that a lighter model plus a
separate viewing-condition (Bartleson–Breneman-style surround) correction does the job, and that
adding more CAM machinery earned Kirk "no difference" in his tests (p. 98, p. 134–135). It is a
genuine technical disagreement between two shipping systems, not marketing — which is exactly why
it is worth an independent production knowing that the choice of DRT is a real choice.

### How portable is it, actually?

More portable than most vendor systems, and this is where the "vendor color management isn't
published" framing needs correcting:

- FilmLight publishes the color-space and transform definitions as **downloadable files** —
  Truelight color-space files (`.flspace`) and display-rendering-transform files
  (`.fltransform` / `.cub`) — which "can be defined externally of Baselight." **[web-sourced.]**
- They provide a **Truelight Colour Spaces OCIO config** and an **Autodesk Flame colour policy**,
  so the same working space and DRT can be used in a Flame or an OCIO-based tool, not only in
  Baselight. **[web-sourced.]**
- Baselight **v7** (2026) added integrated **ACES 2.0** support and updated AMF handling, i.e.
  FilmLight interoperates with ACES rather than competing to replace it. **[web-sourced.]**

!!! warning "Portable files are not an open standard"
    Downloadable `.flspace`/`.fltransform` files and an OCIO config make TCS usable outside
    Baselight — genuinely useful, and more than DWG's rendering offers. But they are FilmLight
    deliverables under FilmLight's control, not a SMPTE/Academy specification that multiple vendors
    independently implement and certify against. If two facilities both "use TCS," they are using
    FilmLight's files; if two facilities both "use ACES," they are each implementing a published
    standard. The interoperability guarantee is different in kind.

### What FilmLight color management can and cannot do

| Can | Cannot / caveats |
| --- | --- |
| Run a scene-referred managed grade with a CAM-based DRT (T-CAM v2) | Be a neutral open standard — TCS is FilmLight's, distributed as FilmLight's files |
| Be used outside Baselight via published `.flspace`/DRT files, an OCIO config, and a Flame policy | Guarantee every third-party tool implements it natively the way OCIO ships ACES |
| Interoperate with ACES (import/export, ACES 2.0 support in v7) | Match ACES output — T-CAM is a different rendering by design |
| Offer a well-argued, documented DRT philosophy (Kirk's book) | Publish the shipping transform as a normative spec anyone must implement identically |

## Where each system fits

For an independent production the practical read is:

- **DaVinci RCM** — the path of least resistance if the finish lives in Resolve, the show is
  effectively single-facility, and VFX are exchanged as scene-referred EXRs on an agreed working
  space. Cheapest to stand up; nothing to license; DWG is a real, documented working space. Its
  limit is interchange breadth.
- **FilmLight TCS / T-CAM** — encountered when you finish at a Baselight house, or specifically want
  T-CAM's rendering. More portable than Resolve's DRT thanks to the published files and OCIO config,
  and interoperable with ACES. Its limit is the same one-vendor-origin caveat.
- **ACES** — the answer when the pipeline must cross many vendors and applications and be
  implemented identically by each, or when you lack the color-science resources to vet a bespoke
  workflow. See the [ACES chapter](aces.md#should-an-independent-production-use-aces) and the
  four-way [comparison](color-management-comparison.md).

These are not mutually exclusive. Resolve and Baselight both *contain* full ACES modes, so "we grade
in Resolve" and "the show is ACES" can both be true. The decision that matters is which **working
space and display transform** the whole show agrees on — and, as with every color decision in this
handbook, it belongs in pre-production alongside the
[three format specifications](../turnover-vfx.md#format-specification) and should be proven with a
[confidence package](../production-workflow.md#visual-effects-production_1) before shot work starts.

## Pitfalls

- **Assuming DWG or TCS output matches ACES output.** They are different renderings. If a vendor
  works in ACES and the DI is in DaVinci or FilmLight native, you have crossed rendering transforms,
  not just color spaces. Agree on one.
- **Treating "the white paper exists" as "the whole system is a standard."** DWG's *encoding* is
  documented; its *rendering* is not published as a spec. TCS is downloadable but single-vendor.
  Neither is ST 2065.
- **Changing Input or Timeline color space mid-grade in Resolve.** Re-interprets work already done.
  Lock working space in pre-production.
- **Sending a VFX vendor "we grade in Baselight" as a color spec.** The grading application is not
  the pipeline. The vendor needs the working space, the input encodings, the DRT, and the delivery
  encoding written down — exactly as for [ACES](aces.md#pitfalls). "We use Resolve" specifies none
  of resolution, bit depth, handles, or naming either.
- **Relying on an internally-reconstructed DWG in a third-party tool without round-tripping.**
  Reconstructions from the white paper have shown small primary discrepancies. Difference-check a
  round trip before trusting it. **[web-sourced.]**
