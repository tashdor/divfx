---
tags:
  - draft
---

# Choosing a Color Management Approach

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

The [ACES](aces.md), [OpenColorIO](color-management.md), and
[vendor color management](vendor-color-management.md) chapters each describe one way to run color.
This chapter puts four approaches side by side so an independent production can pick deliberately
rather than by default. The four are:

1. **Un-color-managed** — grade directly in a camera-native or display space, look baked in.
2. **ACES** — an open, standardized, scene-referred pipeline (SMPTE ST 2065).
3. **DaVinci Resolve Color Management (RCM)** — Blackmagic's in-application managed workflow on
   DaVinci Wide Gamut / Intermediate.
4. **FilmLight Truelight Color Spaces (TCS) + T-CAM** — FilmLight's managed workflow on
   E-Gamut / T-Log with a color-appearance display transform.

The through-line of this handbook applies to all four: the discipline that matters is knowing, at
every step, whether you are [scene-referred or display-referred](../digital-intermediates.md), and
applying the display transform once at the end. Three of these four approaches enforce that
discipline for you. The first does not — which is its danger and, occasionally, its virtue.

!!! note "This is a choice about interchange, not image quality"
    None of the managed systems makes a "better picture" on its own. What they buy you is
    *consistency across cameras, vendors, applications, and deliverables* — and, for ACES,
    *neutral archival*. A single-camera job finished by one colorist in one room can look
    identical under any of the four. The differences show up the moment more than one source,
    tool, vendor, or deliverable is involved.

## The four approaches

### Un-color-managed

You grade the footage more or less as the camera and monitor present it — a camera-native log or
even a display-space signal — and bake the look directly into the grade. What you see on the
grading monitor is the deliverable. There is no defined working space and no separately applied
display transform.

- **Benefits.** Zero setup. Nothing to configure, license, or test. WYSIWYG in one application.
  Perfectly adequate for a single camera, a single colorist, and a single, well-understood
  deliverable — a music video, a one-camera short, a social spot.
- **Drawbacks.** No neutral interchange: a second camera or a VFX vendor has nothing common to work
  against. No archival neutrality — the master is the look, so repurposing later (a new HDR pass, a
  different territory's deliverable) means re-deriving from a baked image. Technical and creative
  decisions are entangled: a white-balance fix and a look choice live in the same knob. It does not
  scale to multi-camera, multi-vendor, or multi-deliverable work, and it fails quietly rather than
  loudly.

!!! warning "Un-color-managed is a decision, not the absence of one"
    Grading in a camera-native space with a look baked in is a legitimate choice for the right job.
    The failure mode is *drifting* into it — never deciding a working space, discovering at the DI
    that three cameras were graded against three different monitors, and handing the colorist a mess
    with no schedule left. If you choose it, choose it on purpose and confirm the job really is
    single-source, single-deliverable.

### ACES

A [scene-referred interchange encoding](aces.md#what-aces-actually-is) (ACES2065-1, SMPTE ST 2065-1),
working spaces derived from it ([ACEScg](aces.md#encodings) for comp, ACEScct for grading), an
[Input Transform](aces.md#transforms) at the front and an [Output Transform](aces.md#transforms) at
the back, delivered in practice as an [OCIO config](color-management.md#how-aces-is-actually-delivered).

- **Benefits.** It is an **open standard** multiple vendors implement identically, so plates and
  renders interchange without a bespoke per-vendor negotiation. It is natively supported across the
  VFX tool ecosystem through OCIO (Nuke, Maya, Houdini, Katana, Flame, Resolve, Baselight).
  ACES2065-1 gives a **neutral, documented archival encoding** independent of any display or look.
  It is free and vendor-independent.
- **Drawbacks.** It is not free of *effort*: setup, testing, and vendor discipline cost real time,
  and adopting ACES badly is worse than a well-run camera-native pipeline. The standard Output
  Transform is a strong opinion; a look that fights it means working against the system. There is a
  learning curve, and version discipline matters (do not
  [switch versions mid-show](aces.md#aces-20)). With a single camera and a single deliverable, much
  of what it buys you goes unused.

### DaVinci Resolve Color Management

Blackmagic's [DaVinci YRGB Color Managed](vendor-color-management.md#davinci-resolve-color-management-rcm)
mode: per-clip Input Color Space → a **DaVinci Wide Gamut / Intermediate** timeline space → an
Output Color Space per deliverable, with the display transform applied last.

- **Benefits.** Lowest-friction managed workflow if you already finish in Resolve — no license, no
  separate config, on by a project setting. Normalizes many cameras into one working space. DWG is a
  genuinely large, **documented** working space (published white paper). Retargets cleanly to
  SDR/HDR and Rec.709/P3/Rec.2020 by changing the output space. Resolve can *also* run full ACES if
  you want it. **[DWG specifics web-sourced — see the vendor chapter.]**
- **Drawbacks.** It is a single-vendor, **in-application** system: a VFX vendor in Nuke is not "in
  RCM." The display rendering transform is internal, not published as an interoperable spec, so it is
  not something other tools implement identically. It is not an archival interchange standard. DWG
  the *encoding* is portable; the DaVinci *rendering* is not, in the same sense.

### FilmLight TCS + T-CAM

FilmLight's [Truelight Color Spaces](vendor-color-management.md#filmlight-baselight-daylight-and-the-truelight-color-spaces):
an **E-Gamut / T-Log** working space and the **T-CAM v2** color-appearance display transform, in
Baselight and Daylight.

- **Benefits.** A scene-referred managed grade with a well-argued, **documented** CAM-based DRT
  (Kirk's book is in the reference library). More portable than most vendor systems: FilmLight
  publishes downloadable color-space and transform files, a **Truelight Colour Spaces OCIO config**,
  and a **Flame colour policy**, so TCS can be used outside Baselight. Interoperates with ACES
  (Baselight v7 added ACES 2.0 support). **[E-Gamut/T-Log/T-CAM-v2 names and portability details
  web-sourced — see the vendor chapter.]**
- **Drawbacks.** Still single-vendor in origin: the portable files are FilmLight deliverables under
  FilmLight's control, not a SMPTE/Academy standard independently implemented and certified. Native,
  ecosystem-wide support is not the same as OCIO's for ACES. Most commonly encountered because you
  are finishing at a Baselight facility, rather than chosen from scratch by a small production.

## Side-by-side

| | Un-color-managed | ACES | DaVinci RCM | FilmLight TCS |
| --- | --- | --- | --- | --- |
| **Working space** | None (camera-native / display) | ACEScg / ACEScct | DaVinci Wide Gamut + Intermediate | E-Gamut + T-Log |
| **Display transform** | Baked into grade | ACES Output Transform | DaVinci DRT (internal) | T-CAM v2 (CAM-based) |
| **Open standard?** | n/a | **Yes** — SMPTE ST 2065 | No — single vendor | No — single vendor |
| **Published?** | n/a | Fully (paywalled SMPTE + open CTL) | Encoding yes (white paper); rendering no | Color-space/DRT files + OCIO config; not a spec |
| **Cross-app native support** | n/a | **Broad** via OCIO | In-application (Resolve) | Via published files / OCIO config / Flame policy |
| **Neutral archival encoding** | No | **Yes** (ACES2065-1) | No | No |
| **In-app setup (single facility)** | None | A little config | Low (if in Resolve) | Low–moderate (if in Baselight) |
| **Multi-camera normalization** | Poor | Strong | Strong | Strong — *equal labor to ACES* |
| **Multi-vendor VFX (total effort)** | Fails | **Low — vendors already speak it** | High — colorist authors LUTs/guidance per vendor | High — same, despite portable files |
| **Interoperates with ACES** | — | is ACES | Yes (Resolve has ACES modes) | Yes (v7 ACES 2.0) |

Sources: the [ACES](aces.md) and [vendor color management](vendor-color-management.md) chapters and
their citations. The reference library corroborates the RCM workflow and DWG (design intent via the
*DaVinci Resolve 21 Reference Manual* (2026) and *Colorist Guide to Resolve 20* (2025); the numeric
DWG/Intermediate spec via the *Resolve 17 Wide Gamut Intermediate* white paper) and the T-CAM
philosophy via Kirk's FilmLight book. Only the FilmLight E-Gamut/T-Log/T-CAM-v2 product names remain
**[web-sourced]** — see those chapters for exactly which lines each source supports.

## Which should an independent production choose?

The decision reuses the same framing as the
[ACES chapter](aces.md#should-an-independent-production-use-aces), widened to four options.

**Reach for a managed pipeline** when:

- You have **multiple camera systems and/or multiple VFX vendors**. Interchange is the whole game,
  and only a managed pipeline gives everyone a common target. Between the three managed options,
  **ACES** wins as soon as the work must cross *applications and vendors* — that is precisely what an
  open, OCIO-delivered standard is for.
- You **lack the color-science resources to build and vet a bespoke workflow**. A documented,
  standardized pipeline you can adopt is safer than a homemade one you cannot fully test.

**Between the managed options:**

- Choose **ACES** for the widest, most vendor-neutral interchange and for a **neutral archival
  master** — the [Graded Archival Master](../production-workflow.md#graded-archival-master) case.
- Choose **DaVinci RCM** when the finish effectively lives in Resolve, the show is single-facility,
  and VFX come back as scene-referred EXRs on an agreed working space. It is the cheapest managed
  workflow to stand up and DWG is a solid working space. You can still switch Resolve into ACES if
  interchange needs grow.
- Choose **FilmLight TCS / T-CAM** when you finish at a Baselight house or specifically want T-CAM's
  rendering; its published files and OCIO config make it more portable than Resolve's DRT, and it
  interoperates with ACES.

**Simpler (un-color-managed) may be fine** when:

- You have a **single camera acquisition format** — much of what a managed pipeline buys you is
  interchange across disparate sources.
- You have a **strong creative reason to bake a look** and grade WYSIWYG, and no downstream vendor
  needs a neutral image.
- You have a **fixed, well-understood single deliverable** and the preparation to hit it. If nothing
  about the job needs neutral interchange or archival, the setup cost of a managed pipeline may not
  pay for itself.

!!! tip "The tie-breaker is usually interchange and archival, not the grade"
    All four can produce the same-looking picture on a simple job. Ask instead: *How many sources,
    tools, vendors, and deliverables will touch this, and will anyone need a neutral master later?*
    The more of those that are plural or uncertain, the further up the list (toward ACES) you should
    go. The fewer and more fixed they are, the more a simpler workflow is defensible.

Whatever you choose, the decision belongs in **pre-production**, written into the
[three format specifications](../turnover-vfx.md#format-specification), and proven with a
[confidence package](../production-workflow.md#visual-effects-production_1) before shot work begins.
A color pipeline nobody round-tripped is not a color pipeline — see the
[checks in the OCIO chapter](color-management.md#checking-that-it-works). The most expensive mistake
is not picking the "wrong" one of these four; it is not picking at all, and discovering at the DI
that the show never had a working space.
