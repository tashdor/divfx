---
tags:
  - draft
---

# Application-Native Color Management: DaVinci and FilmLight

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

[ACES](aces.md) is not the only way to run a scene-referred, color-managed pipeline. The two
grading systems a production is most likely to encounter — Blackmagic's **DaVinci Resolve** and
FilmLight's **Baselight** — each ship their own **automatic, holistic color-management framework**:
a single system that assigns every source its input color space, maps everything into one working
space, and renders to the deliverable through one display transform, applied to every clip without
per-shot intervention. Like ACES, they keep the image scene-referred and apply the display transform
once at the end — but they do it *inside a product* rather than as an open standard.

*Automatic* and *framework* are the operative words. Color management is just a chain of transforms,
and a colorist can build a **manual** pipeline by hand instead — input/output **color space transforms (CSTs)**, **LUTs**, **DCTLs**, and
a display rendering transform or look tool of their choosing, such as Video Village's
[**Filmbox**](https://videovillage.com/filmbox/) (a Kodak Vision3 film-print-emulation DRT that runs
in Resolve, Baselight, and Premiere, and coexists with ACES or RCM). That trades a framework's
automation and consistency for total control over every stage. ACES, RCM, and FilmLight give
you that chain **pre-built, standardized, and applied automatically** to every clip. Assemble the
pipeline yourself and you give that up.

These application-native systems are not proprietary "black boxes." DaVinci Wide Gamut has a published white
paper, and FilmLight's color spaces are downloadable files you can use outside Baselight. But
neither is a SMPTE-style open standard the way ACES is
([ST 2065-1](aces.md#what-aces-actually-is)), and neither is natively implemented across the whole
VFX tool ecosystem the way ACES is via [OpenColorIO](color-management.md). The accurate framing is
**published and partially portable, but single-vendor** — not "secret," and not "an open standard."

Each system works in its own wide-gamut internal space. The three you will meet — ACES's **AP1**
(the ACEScg working gamut), **DaVinci Wide Gamut**, and FilmLight's **E-Gamut** (what T-CAM renders
from) — are all deliberately wide, encompassing most camera and display gamuts, with virtual
primaries that fall outside the spectral locus:

<figure class="cp-embed"
  style="--cp-embed-aspect: 820 / 1000"
  data-cp-title="Working color spaces — ACES AP1, DaVinci Wide Gamut, FilmLight E-Gamut"
  data-cp-light="https://ditools.videovillage.com/embed/color_plotter#p=eyJwcm9qZWN0Ijp7Im5hbWUiOiJXb3JraW5nIENvbG9yIFNwYWNlcyIsImRlc2MiOiIiLCJuYW1lQXV0byI6ZmFsc2UsImRlc2NBdXRvIjpmYWxzZSwic2hvd1RpdGxlIjpmYWxzZSwiZGlhZ3JhbSI6IjE5MzEiLCJtb2RlIjoiMmQiLCJzcGFjZTNkIjoiY2hyb21hIiwibG9nWSI6ZmFsc2UsInNwYWNlcyI6W3siaWQiOiJpZDE3IiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoiYXAxIiwibGFiZWwiOiJBQ0VTIEFQMSAoQUNFU2NnKSIsImNvbG9yIjoiIzRjNmVmNSIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkMTgiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJkYXZpbmNpd2ciLCJsYWJlbCI6IkRhVmluY2kgV2lkZSBHYW11dCIsImNvbG9yIjoiI2U4NTkwYyIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkMTkiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJlZ2FtdXQiLCJsYWJlbCI6IkZpbG1MaWdodCBFLUdhbXV0IiwiY29sb3IiOiIjMmY5ZTQ0IiwiZmlsbCI6ZmFsc2UsImZpbGxBbHBoYSI6MC4xMiwibGluZVdpZHRoIjoxLjgsImxpbmVTdHlsZSI6InNvbGlkIiwic2hvd1doaXRlIjp0cnVlLCJ3aGl0ZSI6IiIsIm1heE5pdHMiOjEwMCwibWluTml0cyI6MC4xfV0sInBvaW50cyI6W10sIndoaXRlcyI6W10sImFubm90YXRpb25zIjpbXSwicGxhbmNrIjp7InNob3ciOmZhbHNlLCJrTWluIjoxNTAwLCJrTWF4IjoxNTAwMCwiaXNvdGhlcm1zIjpmYWxzZX0sImxvY3VzIjp7InNob3ciOnRydWUsIndhdmVsZW5ndGhUaWNrcyI6dHJ1ZX0sImxhYmVsUHJpbWFyaWVzIjpmYWxzZSwibGFiZWxTcGFjZXMiOmZhbHNlLCJmaWxsIjp7InNob3ciOnRydWV9LCJjb250YWluIjp7InNob3ciOmZhbHNlLCJyZWZlcmVuY2VJZCI6bnVsbCwiY29sb3IiOiIjZmY0ZDRkIiwiaGF0Y2giOmZhbHNlLCJvcGFjaXR5IjowLjg1LCJjb3ZlcmFnZSI6ZmFsc2V9LCJ0aXRsZU91dHNpZGUiOmZhbHNlLCJpbWFnZSI6bnVsbH0sInZpZXciOnsidngwIjotMC4wNTUsInZ4MSI6MC44NTUsInZ5MCI6LTAuMTUsInZ5MSI6MS4wMiwiY2FtZXJhIjp7InRoZXRhIjozLjkyLCJwaGkiOjAuNjIsImRpc3QiOjMuNCwidGFyZ2V0IjpbMCwwLDBdfSwidGhlbWUiOiJsaWdodCIsInRyYW5zcGFyZW50IjpmYWxzZSwid2lkdGgiOjgyMCwiaGVpZ2h0IjoxMDAwLCJzY2FsZSI6MiwiZ3JpZCI6dHJ1ZSwiYXhlcyI6dHJ1ZSwibGFiZWxzIjp0cnVlLCJsZWdlbmQiOnRydWV9fQ"
  data-cp-dark="https://ditools.videovillage.com/embed/color_plotter#p=eyJwcm9qZWN0Ijp7Im5hbWUiOiJXb3JraW5nIENvbG9yIFNwYWNlcyIsImRlc2MiOiIiLCJuYW1lQXV0byI6ZmFsc2UsImRlc2NBdXRvIjpmYWxzZSwic2hvd1RpdGxlIjpmYWxzZSwiZGlhZ3JhbSI6IjE5MzEiLCJtb2RlIjoiMmQiLCJzcGFjZTNkIjoiY2hyb21hIiwibG9nWSI6ZmFsc2UsInNwYWNlcyI6W3siaWQiOiJpZDIwIiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoiYXAxIiwibGFiZWwiOiJBQ0VTIEFQMSAoQUNFU2NnKSIsImNvbG9yIjoiIzRjNmVmNSIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkMjEiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJkYXZpbmNpd2ciLCJsYWJlbCI6IkRhVmluY2kgV2lkZSBHYW11dCIsImNvbG9yIjoiI2U4NTkwYyIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkMjIiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJlZ2FtdXQiLCJsYWJlbCI6IkZpbG1MaWdodCBFLUdhbXV0IiwiY29sb3IiOiIjMmY5ZTQ0IiwiZmlsbCI6ZmFsc2UsImZpbGxBbHBoYSI6MC4xMiwibGluZVdpZHRoIjoxLjgsImxpbmVTdHlsZSI6InNvbGlkIiwic2hvd1doaXRlIjp0cnVlLCJ3aGl0ZSI6IiIsIm1heE5pdHMiOjEwMCwibWluTml0cyI6MC4xfV0sInBvaW50cyI6W10sIndoaXRlcyI6W10sImFubm90YXRpb25zIjpbXSwicGxhbmNrIjp7InNob3ciOmZhbHNlLCJrTWluIjoxNTAwLCJrTWF4IjoxNTAwMCwiaXNvdGhlcm1zIjpmYWxzZX0sImxvY3VzIjp7InNob3ciOnRydWUsIndhdmVsZW5ndGhUaWNrcyI6dHJ1ZX0sImxhYmVsUHJpbWFyaWVzIjpmYWxzZSwibGFiZWxTcGFjZXMiOmZhbHNlLCJmaWxsIjp7InNob3ciOnRydWV9LCJjb250YWluIjp7InNob3ciOmZhbHNlLCJyZWZlcmVuY2VJZCI6bnVsbCwiY29sb3IiOiIjZmY0ZDRkIiwiaGF0Y2giOmZhbHNlLCJvcGFjaXR5IjowLjg1LCJjb3ZlcmFnZSI6ZmFsc2V9LCJ0aXRsZU91dHNpZGUiOmZhbHNlLCJpbWFnZSI6bnVsbH0sInZpZXciOnsidngwIjotMC4wNTUsInZ4MSI6MC44NTUsInZ5MCI6LTAuMTUsInZ5MSI6MS4wMiwiY2FtZXJhIjp7InRoZXRhIjozLjkyLCJwaGkiOjAuNjIsImRpc3QiOjMuNCwidGFyZ2V0IjpbMCwwLDBdfSwidGhlbWUiOiJkYXJrIiwidHJhbnNwYXJlbnQiOmZhbHNlLCJ3aWR0aCI6ODIwLCJoZWlnaHQiOjEwMDAsInNjYWxlIjoyLCJncmlkIjp0cnVlLCJheGVzIjp0cnVlLCJsYWJlbHMiOnRydWUsImxlZ2VuZCI6dHJ1ZX19">
  <span class="cp-embed-mount">
    <img class="cp-embed-static" src="../../figures/svg/figure-working-gamuts-light.svg#only-light" alt="ACES AP1, DaVinci Wide Gamut, and FilmLight E-Gamut on the CIE 1931 diagram" loading="lazy">
    <img class="cp-embed-static" src="../../figures/svg/figure-working-gamuts-dark.svg#only-dark" alt="" loading="lazy">
  </span>
  <figcaption>The three managed working color spaces on the CIE 1931 diagram: ACES AP1 (ACEScg),
  DaVinci Wide Gamut, and FilmLight E-Gamut — the gamut T-CAM renders from. DaVinci Wide Gamut is the
  widest; all three use virtual primaries beyond the spectral locus (note the negative blue-y and
  greens near y = 1). <span class="cp-embed-hint">Interactive — drag to pan, scroll to zoom.</span>
  <a href="../../figures/svg/figure-working-gamuts-light.svg">Static version</a>.</figcaption>
</figure>

## DaVinci Resolve Color Management (RCM)

**Objective:** normalize many cameras into one scene-referred working space and retarget to any
deliverable, without leaving Resolve. Instead of grading log footage into shape by hand
(*display-referred* — Resolve knows nothing about the source), you tell it each clip's camera
profile and it maps that source into a working space and out to the deliverable using the
manufacturer's known log curve and gamut (*scene-referred*).[^dg1]

**RCM is an alternative to ACES, not the opposite of it.** Both are the same *kind* of system —
"automatic," scene-referred color management, where you assign each clip its source camera format /
input color space and the tool maps it into a common working space and out through a display
transform. The difference is that RCM is a configurable, single-vendor *framework*: you choose among
many working spaces (DaVinci Wide Gamut, Rec.2020, camera-native wide gamuts — and Resolve can even
run ACES itself as its color science) and among several **output tone-mapping methods** (the Output
DRT — the DaVinci default, RED IPP2, saturation-preserving variants, or *None*). ACES is essentially
*one standardized configuration* of that same idea, available inside Resolve alongside the
DaVinci-native one; choosing between them is a project setting, so "we grade in Resolve" and "the
show is ACES" are not mutually exclusive.[^dg3]

The working space Blackmagic recommends is **DaVinci Wide Gamut (DWG)** with the **DaVinci
Intermediate** log curve — a gamut Blackmagic describes as larger than BT.2020, ARRI Wide Gamut, and
ACES AP-1, so nothing clips whatever camera it came from.[^dg2] Worth knowing about how open it is:
**the encoding is fully specified; the rendering is not.** DWG-the-color-space — its virtual
primaries, D65 white point, RGB↔XYZ matrices, and the DaVinci Intermediate log equations — is
published in a Blackmagic white paper, so it can be rebuilt *exactly* in an OCIO config or a LUT
tool. The DaVinci display rendering transform — how Resolve tone- and gamut-maps DWG to an output —
is internal, not a separately published spec. "DWG is published" is true of the color space, not the
look.

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
        gray (middle gray → 0.336043). Its revision history notes the green-x coordinate was
        corrected in v1.1 (2021) — pre-v1.1 reconstructions circulating online carry the old value.

[^dg3]: *DaVinci Resolve 21 Reference Manual*, Ch. 9, covers the two color-science modes, the Output
        DRT tone-mapping options (incl. *None*), Resolve's ACES signal flow, working space, and
        AMF 2.0 support.

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

FilmLight's system is, unusually for a vendor, genuinely portable: FilmLight publishes its
color-space and transform files (`.flspace` / `.fltransform`), a Truelight OCIO config, and an
Autodesk Flame color policy, so TCS can travel outside Baselight. And exactly as with Resolve,
choosing FilmLight's tools is not choosing against ACES: **Baselight can run a full ACES pipeline**
as its color-managed workflow (v7 added ACES 2.0), and FilmLight is an ACES product partner — so "we
finish at a Baselight house" and "the show is ACES" are equally compatible. Its portable files are
still FilmLight's, under FilmLight's control — useful, but not a SMPTE/Academy specification that
many vendors implement and certify against independently. **[web-sourced.]**

## Application-native color management vs. ACES: easier and harder

An application-native system is often called easier to set up than ACES. That holds in one narrow case and
reverses in the one that matters:

| | Application-native (RCM / TCS) | ACES |
| --- | --- | --- |
| **Assigning input color spaces** (camera normalization) | The same metadata-driven menu | The same metadata-driven menu — **virtually identical labor** |
| **Single-app, single-facility finish** | On by a project setting | Also a project setting; runs in one app just as well |
| **Multi-vendor VFX interchange** | **More work** — no path to VFX vendors; the colorist hand-authors LUTs or transforms and workflow guidance for each vendor | **Less work** — VFX tools already ship OCIO/ACES configs; vendors are already set up |
| **Neutral archival master** | No — a working space, not an interchange encoding | Yes — ACES2065-1 |

- **Normalizing many cameras is no easier in an application-native system.** In both, it is the same menu,
  auto-assigned from camera metadata — the same labor either way. That is not a differentiator.
- **ACES is not inherently "more setup."** ACES ships as a default component of most standard VFX
  applications — both ACES and OpenColorIO are named components of the
  [VFX Reference Platform](https://vfxplatform.com/) the industry builds against. So most VFX vendors
  already have the *infrastructure* installed: the configs are present whether or not a given vendor
  prefers ACES or has deep experience with it, and onboarding is usually handing them a version and a
  couple of transform names. RCM and TCS have no equivalent vendor-facing distribution: to run one
  across a VFX chain, the *colorist* has to author LUTs or transforms and written workflow guidance
  for each vendor to emulate in their own tools. In a multi-vendor pipeline, that makes the built-in
  system the *higher*-effort option, not ACES. **[VFX Reference Platform components web-sourced.]**

So the real axis is not setup cost — it is whether the pipeline crosses vendors and applications. An
application-native system makes the single-facility, in-application finish marginally simpler and offers no path
to hand a VFX vendor a matching pipeline; ACES makes cross-vendor interchange and a neutral archive
easy, at the cost of a little in-app configuration when you are *not* interchanging.

## Why choose application-native color management over ACES?

If ACES is the interchange standard, why would anyone pick RCM or FilmLight's color management
instead? There are real, defensible reasons — and industry commentary bears them out.

- **You are not in a multi-vendor, ACES-driven pipeline.** For a single-facility finish with no VFX
  houses to coordinate — a documentary, a commercial, a Resolve-only grade — ACES's interchange
  advantage goes unused, and an application-native system is simpler and more predictable. As Frame.io's guide
  puts it, if you have "no overwhelming reason to go to ACES," RCM is "a slightly easier and more
  predictable path," giving the benefits of color management while keeping "the feel that the DaVinci
  Resolve Color page controls have always had."[^why1]
- **Grading-tool behavior and working-space preference.** Colorists often choose a timeline space
  because the grading controls *behave* the way they like in it — you can set RCM's timeline space to
  DaVinci Wide Gamut or any log format for exactly this reason.[^why1]
- **The rendering itself.** A display transform is a creative instrument, not just plumbing. FilmLight
  developed T-CAM with a particular emphasis on look-development flexibility, grading-tool behavior,
  minimizing image artifacts, and visual consistency — founded on the same ideas as ACES but tuned by
  FilmLight based on user feedback.[^why2] Some colorists simply prefer its
  rendering to the ACES Output Transform — a legitimate reason to run TCS, and the same debate the
  [ACES chapter](aces.md#aces-20) raises about whether a full CAM belongs in the DRT.
- **It is rarely all-or-nothing.** Because both systems *contain* ACES, choosing an application-native system is
  often really choosing its working-space and DRT defaults while keeping ACES available for the parts
  of the job that need it.

[^why1]: [*Resolve Color Management vs ACES — Which Should You Choose?*](https://blog.frame.io/2024/02/12/davinci-resolve-color-management-vs-aces-which-should-you-choose/)
        (Frame.io Insider, 2024); see also [Mixing Light](https://mixinglight.com/color-grading-tutorials/aces-vs-rcm-2026/)
        and the [ACESCentral RCM-vs-ACEScct discussion](https://community.acescentral.com/t/davinci-reslove-color-sceince-rcm-vs-acescct/2883).
        Both RCM and ACES are scene-referred systems solving the same problem. **[web-sourced.]**

[^why2]: [FilmLight — Colour Management / Truelight](https://www.filmlight.ltd.uk/workflow/truelight.php)
        and [Baselight v7 Truelight Colour Space improvements](https://www.newsshooter.com/2026/02/03/filmlight-baselight-v7-truelight-colour-space-improvements/).
        **[web-sourced.]**

!!! note "Using a managed pipeline for input only — and what it costs in ACES"
    Because the input-and-working-space stage is separable from the output rendering, either system
    can be used for *just* the front half: assign inputs, work in a common scene-referred space, and
    then — instead of the built-in display transform — apply your own DRT (in RCM, set the Output DRT
    to *None* and supply a LUT or DCTL; in ACES, substitute your own output). That is a legitimate
    creative choice.

    But doing it in ACES gives up the **simplified** archival framework. The value of an ACES2065-1
    master is that a neutral, scene-referred archive plus the *standard* ACES transforms reproduces
    the delivered look with nothing show-specific to preserve. Swap in a proprietary display rendering
    and standard ACES no longer reconstructs your show on its own. Archival is still achievable — but
    only if the show-specific display transform is documented and stored alongside the master in a
    future-proof form, so the look can be rebuilt later. What you lose is the turnkey guarantee that
    *standard* transforms alone suffice; what replaces it is an archive you are responsible for keeping
    complete. If you are going to supply your own DRT, a vendor working space costs you nothing extra;
    in ACES it trades the self-contained archival guarantee for one you must document and maintain.

## Documentary vs. single-camera narrative

The most useful way to choose is to notice that "how many cameras" and "how many vendors and
applications" are *different* axes, and they often point opposite ways.

- **Non-scripted documentary.** Typically *many heterogeneous sources* — archival, several
  shooters, phones, stock, footage from different eras and formats — but usually *one* finishing
  facility and little or no VFX. Normalizing those sources is the same easy, metadata-driven step in
  either system, and with no VFX chain to coordinate, ACES's interchange advantage is unused. An
  application-native system is a clean, low-friction fit — and RCM's Automatic mode in particular is built for
  exactly this. **Application-native color management is often the natural choice for documentary finishing.**
- **Single-camera scripted narrative.** Usually *one* camera format — so multi-source normalization
  matters less — but frequently VFX spread across multiple vendors and applications, an archival
  master, and theatrical, HDR, and SDR deliverables. A Nuke or Flame VFX chain is precisely the
  case only an open standard spans, and where an application-native system would force the colorist to hand-author
  LUTs for each vendor; ACES2065-1 also gives the neutral archive such shows expect. **ACES tends to
  earn its keep on VFX-heavy narrative work.**

The inversion is the point: *many cameras* does not favor ACES over an application-native system — normalization
is equal — but *many vendors, applications, deliverables, or an archival requirement* does. A simple
single-camera narrative with no VFX and one deliverable may need no managed pipeline at all; a
well-run camera-native grade is fine.

## When to decide

Like every color decision in this handbook, it belongs in **pre-production**, written into the
[three format specifications](../turnover-vfx.md#format-specification) and proven with a
[confidence package](../production-workflow.md#visual-effects-production_1) before shot work starts —
because the working space and display transform, once graded against, are expensive to change. The
options are not exclusive (Resolve and Baselight both contain ACES modes); the decision that matters
is which **working space and display transform the whole show agrees on**. For the four-way picture
including an un-managed workflow, see the
[color management comparison](color-management-comparison.md).
