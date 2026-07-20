---
tags:
  - draft
---

# Choosing a Color Management Approach

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).

The [ACES](aces.md), [OpenColorIO](color-management.md), and
[application-native color management](application-native-color-management.md) chapters each describe
one way to run color. This chapter puts five approaches side by side so an independent production can
pick deliberately rather than by default. The five are:

1. **Display Referred, un-color-managed** — the look baked into the grade, no working space, no route back to a neutral
   master. Listed here to be ruled out, not chosen.
2. **Manually Color Managed** — a hand-built pipeline: a consistent scene-referred working space with
   color-space transforms in, node- or layer-based grading, and a standard or bespoke display
   transform out.
3. **ACES** — an open, standardized, scene-referred pipeline (SMPTE ST 2065).
4. **DaVinci Resolve Color Management (RCM)** — Blackmagic's in-application managed workflow on
   DaVinci Wide Gamut / Intermediate.
5. **FilmLight Truelight Color Spaces (TCS) + T-CAM** — FilmLight's managed workflow on
   E-Gamut / T-Log with a color-appearance display transform.

The through-line of this handbook applies to all of them: the discipline that matters is knowing, at
every step, whether you are [scene-referred or display-referred](../digital-intermediates.md), and
applying the display transform once at the end. Four of these five keep a consistent scene-referred
working space and a recoverable master — the frameworks enforce it automatically, and a manually color-managed
pipeline holds it by the colorist's discipline. Only the first abandons it, which is why it is here
as a cautionary category rather than a real choice.

!!! note "This is a choice about interchange, not image quality"
    None of the managed systems guarantee a "better picture" on its own. What they buy you is a
    framework for consistency across cameras, vendors, applications, and deliverables — and, for
    ACES, a standard graded archival deliverable. A good colorist could arrive at approximately
    identical results under any of these frameworks, but the differences in ease of workflow or
    flexibility become apparent when multiple software products, tools, vendors, or deliverables
    are introduced.

## The five approaches

### Display Referred, un-color-managed

You grade the footage more or less as the camera and monitor present it — a camera-native log or
even a display-space signal — and bake the look directly into the grade. There is no defined working
space, no separately applied display transform, and — the part that matters most — **no route back to
a graded assembly master.** The master *is* the look; there is no neutral, scene-referred version to
re-render from.

- **What it is not.** This is not the same as a simple job done well. A single-camera short graded on
  a consistent working space with the display transform applied last is
  [Manually Color Managed](#manually-color-managed), not this — it keeps a recoverable master at
  almost no extra cost. Truly un-color-managed means that when a new deliverable, a new display, or an
  HDR pass is asked for later, the only source is a baked image.
- **Why it fails.** Technical and creative decisions are entangled: a white-balance fix and a look
  choice live in the same knob. It does not scale to multi-camera, multi-vendor, or multi-deliverable
  work, and it fails quietly rather than loudly — you discover the cost only when someone needs the
  neutral master that was never made.

!!! warning "Un-color-managed is not a responsible option"
    It is tempting to treat "no color management" as the zero-cost default for a simple job. For any
    production that intends to deliver professionally it is not a defensible choice — the moment
    anyone asks for a second deliverable, a re-grade, or an archival master, there is nothing neutral
    to go back to. What people usually mean by "keep it simple" is a **manually color-managed** pipeline with a
    consistent working space and a recoverable master, which costs almost nothing more to stand up and
    keeps every door open. Requirements, deliverables, and workflow are a conversation to have **with
    the colorist before you commit to working with them** — not a default to drift into.

### Manually Color Managed

A hand-built managed pipeline. The colorist assigns each source into a **common — or at least
semi-consistent — scene-referred working space** with color-space transforms, grades with node- or
layer-based tools, and renders through a display transform of their choosing: a **standard** DRT (an
ACES Output Transform, a print emulation such as Video Village's
[Filmbox](https://videovillage.com/filmbox/)) or a **bespoke** one. No vendor framework is doing this
automatically; the colorist assembles and maintains the chain by hand with CSTs, LUTs, and DCTLs — the
[manual pipeline](application-native-color-management.md) the application-native chapter describes.

- **Benefits.** Total control. Working space, tone mapping, and look are separable and deliberate —
  the same discipline a framework enforces, tuned by hand. Because the grade sits on a consistent
  scene-referred working space with the display transform applied last, there is still a **route back
  to a graded assembly master**: you can re-render to a new deliverable or display without
  re-deriving from a baked image. A skilled colorist can match or beat a framework's rendering for a
  specific show, and can build a house look a fixed framework DRT would fight.
- **Drawbacks.** It is only as disciplined as the person who built it — nothing enforces consistency,
  so it demands real color-science resources to design, document, and test. It is not a standard:
  another facility or VFX vendor cannot adopt it without the colorist's transforms and written
  guidance (the same cost as pushing a vendor framework across vendors). Undocumented, it is as
  fragile as unmanaged; documented and future-proofed, it is a legitimate managed pipeline and an
  archivable one.

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
  and adopting ACES badly is worse than a well-run manually color-managed pipeline. The standard Output
  Transform is a strong opinion; a look that fights it means working against the system. There is a
  learning curve, and version discipline matters (do not
  [switch versions mid-show](aces.md#aces-20)). With a single camera and a single deliverable, much
  of what it buys you goes unused.

### DaVinci Resolve Color Management

Blackmagic's [DaVinci YRGB Color Managed](application-native-color-management.md#davinci-resolve-color-management-rcm)
mode: per-clip Input Color Space → a **DaVinci Wide Gamut / Intermediate** timeline space → an
Output Color Space per deliverable, with the display transform applied last.

- **Benefits.** Lowest-friction managed workflow if you already finish in Resolve — no license, no
  separate config, on by a project setting. Normalizes many cameras into one working space. DWG is a
  genuinely large, **documented** working space (published white paper). Retargets cleanly to
  SDR/HDR and Rec.709/P3/Rec.2020 by changing the output space. Resolve can *also* run full ACES if
  you want it. **[DWG specifics web-sourced — see the application-native chapter.]**
- **Drawbacks.** It is a single-vendor, **in-application** system: a VFX vendor in Nuke is not "in
  RCM." The display rendering transform is internal, not published as an interoperable spec, so it is
  not something other tools implement identically. It is not an archival interchange standard. DWG
  the *encoding* is portable; the Resolve *rendering* is not, in the same sense.

### FilmLight TCS + T-CAM

FilmLight's [Truelight Color Spaces](application-native-color-management.md#filmlight-baselight-daylight-and-the-truelight-color-spaces):
an **E-Gamut / T-Log** working space and the **T-CAM v2** color-appearance display transform, in
Baselight and Daylight.

- **Benefits.** A scene-referred managed grade with a well-argued, **documented** CAM-based DRT
  (Kirk's book is in the reference library). More portable than most application-native systems: FilmLight
  publishes downloadable color-space and transform files, a **Truelight Colour Spaces OCIO config**,
  and a **Flame colour policy**, so TCS can be used outside Baselight. Interoperates with ACES
  (Baselight v7 added ACES 2.0 support). **[E-Gamut/T-Log/T-CAM-v2 names and portability details
  web-sourced — see the application-native chapter.]**
- **Drawbacks.** Still single-vendor in origin: the portable files are FilmLight deliverables under
  FilmLight's control, not a SMPTE/Academy standard independently implemented and certified. Native,
  ecosystem-wide support is not the same as OCIO's for ACES. Most commonly encountered because you
  are finishing at a Baselight facility, rather than chosen from scratch by a small production.

## Side-by-side

| | Display Referred, un-color-managed | Manually Color Managed | ACES | Resolve RCM | FilmLight TCS |
| --- | --- | --- | --- | --- | --- |
| **Working space** | None (camera-native / display) | Consistent scene-referred (colorist's choice) | ACEScg / ACEScct | DaVinci Wide Gamut + Intermediate | E-Gamut + T-Log |
| **Display transform** | Baked into grade | Chosen — standard or bespoke DRT | ACES Output Transform | Resolve DRT (internal) | T-CAM v2 (CAM-based) |
| **Enforces the discipline** | No | By the colorist | **Automatically** | **Automatically** | **Automatically** |
| **Route back to a neutral master** | **No** | Yes — if documented | **Yes** (ACES2065-1) | Yes (working-space master) | Yes (working-space master) |
| **Open standard?** | n/a | No — hand-built | **Yes** — SMPTE ST 2065 | No — single vendor | No — single vendor |
| **Published?** | n/a | As the colorist documents it | Fully (paywalled SMPTE + open CTL) | Encoding yes (white paper); rendering no | Color-space/DRT files + OCIO config; not a spec |
| **Cross-app native support** | n/a | Only via the colorist's exported transforms | **Broad** via OCIO | In-application (Resolve) | Via published files / OCIO config / Flame policy |
| **In-app setup (single facility)** | None | Moderate–high (build and test) | A little config | Low (if in Resolve) | Low–moderate (if in Baselight) |
| **Multi-camera normalization** | Poor | Strong (manual CSTs) | Strong | Strong | Strong — *equal labor to ACES* |
| **Multi-vendor VFX (total effort)** | Fails | High — colorist supplies transforms + guidance | **Low — vendors already speak it** | High — colorist authors LUTs or transforms + guidance per vendor | High — same, despite portable files |
| **Interoperates with ACES** | — | Yes, if built on ACES | is ACES | Yes (Resolve has ACES modes) | Yes (v7 ACES 2.0) |

Sources: the [ACES](aces.md) and [application-native color management](application-native-color-management.md) chapters and
their citations. The reference library corroborates the RCM workflow and DWG (design intent via the
*DaVinci Resolve 21 Reference Manual* (2026) and *Colorist Guide to Resolve 20* (2025); the numeric
DWG/Intermediate spec via the *Resolve 17 Wide Gamut Intermediate* white paper) and the T-CAM
philosophy via Kirk's FilmLight book. Only the FilmLight E-Gamut/T-Log/T-CAM-v2 product names remain
**[web-sourced]** — see those chapters for exactly which lines each source supports.

## Which should an independent production choose?

The decision reuses the same framing as the
[ACES chapter](aces.md#should-an-independent-production-use-aces), widened to the options above. The
first move is to rule one out.

**Rule out truly un-color-managed.** For a production that will deliver professionally, a baked,
unrecoverable master is not a real option. The floor is a **manually color-managed** pipeline: a consistent
scene-referred working space, the display transform applied last, and a documented master you can
re-render from. That floor costs almost nothing over "just grading," and it is the difference between
a show you can repurpose and one you cannot.

**Reach for a framework (ACES / RCM / TCS)** when:

- You have **multiple camera systems and/or multiple VFX vendors**. Interchange is the whole game,
  and only a managed pipeline gives everyone a common target. Among the frameworks, **ACES** wins as
  soon as the work must cross *applications and vendors* — that is precisely what an open,
  OCIO-delivered standard is for.
- You **lack the color-science resources to build and vet a bespoke workflow.** A documented,
  standardized pipeline you can adopt is safer than a homemade one you cannot fully test — a framework
  gives you the discipline of a manually color-managed pipeline without having to author it.

**Between the frameworks:**

- Choose **ACES** for the widest, most vendor-neutral interchange and for a **neutral archival
  master** — the [Graded Archival Master](../production-workflow.md#graded-archival-master) case.
- Choose **Resolve RCM** when the finish effectively lives in Resolve, the show is single-facility,
  and VFX come back as scene-referred EXRs on an agreed working space. It is the cheapest managed
  workflow to stand up and DWG is a solid working space. You can still switch Resolve into ACES if
  interchange needs grow.
- Choose **FilmLight TCS / T-CAM** when you finish at a Baselight house or specifically want T-CAM's
  rendering; its published files and OCIO config make it more portable than Resolve's DRT, and it
  interoperates with ACES.

**A manually color-managed pipeline earns its place** when:

- You have the **color-science resources** to design, document, and test it, and a specific reason to
  control the DRT or look by hand — a house print emulation like Filmbox, a bespoke show LUT — that a
  framework's fixed rendering would fight.
- The job is small enough that a full framework is overkill but you still want a consistent working
  space and a recoverable master: the responsible version of "keep it simple."
- Bear in mind it costs the same as a vendor framework to push across VFX vendors — the colorist has
  to supply the transforms and written guidance, just as with RCM or TCS.

!!! tip "The tie-breaker is usually interchange and archival, not the grade"
    Any of the managed approaches can produce the same-looking picture on a simple job. Ask instead:
    *How many sources, tools, vendors, and deliverables will touch this, and will anyone need a
    neutral master later?* The more of those that are plural or uncertain, the further toward a
    **framework** (and toward ACES) you should go. The fewer and more fixed they are, the more a
    lean **manually color-managed** pipeline is defensible — but a consistent working space and a recoverable master
    are non-negotiable either way.

Whatever you choose, the decision belongs in **pre-production**, written into the
[three format specifications](../turnover-vfx.md#format-specification), agreed **with the colorist**
before the show commits to them, and proven with a
[confidence package](../production-workflow.md#visual-effects-production_1) before shot work begins.
A color pipeline nobody round-tripped is not a color pipeline — see the
[checks in the OCIO chapter](color-management.md#checking-that-it-works). The most expensive mistake
is not picking the "wrong" one of these; it is not picking at all, and discovering at the DI that the
show never had a working space — or a master anyone can re-render from.
