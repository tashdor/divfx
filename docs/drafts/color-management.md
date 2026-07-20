---
tags:
  - draft
---

# Color Management and OpenColorIO

!!! info "Draft — new in v1.1"
    This chapter is new material, not part of v1.0.1. See [Drafts for v1.1](index.md).
[ACES](aces.md) defines *what* the color transforms are. Something has to define *how* every application in the pipeline finds and applies them consistently. That is the job of a color management system, and in visual effects the de facto answer is **OpenColorIO** (OCIO).

This matters to a production for a reason that is easy to miss: a color pipeline is only as consistent as its least-configured application. A show can specify ACES precisely and still get mismatched renders because one artist's Nuke was pointed at a different config than everyone else's. OCIO is the mechanism by which "the show's color pipeline" becomes a single artifact that can be distributed, versioned, and checked.

## What OCIO is

OpenColorIO is an open-source color management library, originally developed at Sony Pictures Imageworks and now an Academy Software Foundation project. It is embedded in Nuke, Maya, Houdini, Katana, Blender, RV, and most other tools in a VFX pipeline.

The unit of configuration is an **OCIO config** — a file (plus, historically, associated LUTs) that enumerates the color spaces a show uses, the transforms between them, and the named roles that applications look up:

- **Color spaces** — `ACEScg`, `ACEScct`, `ARRI LogC4 / AWG4`, `sRGB - Display`, and so on.
- **Roles** — abstract names that decouple applications from specific spaces. `scene_linear`, `compositing_log`, `color_picking`, `data`. An application asks for `scene_linear`; the config decides what that means on this show.
- **Displays and views** — the viewing transforms available in an artist's viewer.

*Cinematic Color* — already cited in this handbook as further reading — describes the motivation directly: color management exists so that image encoding is explicit and consistent across the applications and vendors that touch a shot, rather than being an assumption each tool makes independently.

!!! note "Why roles matter more than they look"
    Roles are what let a config change without every artist changing their scripts. If the show moves from ACES 1.3 to a different working space, `scene_linear` is redefined once in the config rather than in every Nuke script on the show. On a distributed production this is the difference between a workflow change costing an afternoon and costing a week.
## How ACES is actually delivered

This is the practical point an independent production needs, and it is not obvious from the ACES documentation: **facilities do not implement ACES from the CTL reference transforms.** They consume it as an OCIO config.

The Academy publishes ACES as reference transforms in the Color Transformation Language (CTL), which is a specification language, not a production renderer. What ships to artists is an OCIO config that implements those transforms efficiently. In current practice these are the ACES **built-in configs** — commonly a `cg-config` (a smaller set aimed at CGI and compositing) and a `studio-config` (a fuller set including more camera vendors and display encodings). **[web-sourced — the built-in config naming and split postdates the reference library.]**

So the sentence "the show is ACES" resolves, in practice, to: *every application on the show is pointed at the same OCIO config, at the same version.*

## What to specify on a show

Alongside the [three format specifications](../turnover-vfx.md#format-specification), a color-managed show needs these written down:

| Item | Example | Why |
| --- | --- | --- |
| Config identity and version | ACES 1.3 `studio-config`, v2.1.0 | Two artists on different config versions can produce different renders from identical scripts |
| Working space | `ACEScg` | See the [AP0/AP1 warning](aces.md#color-primary-sets) |
| Grading space | `ACEScct` | ACEScc and ACEScct are not interchangeable |
| Plate color space | `ARRI LogC4 / AWG4` | Must match what the plate pull actually produced |
| Delivery color space | `ACES2065-1`, uncompressed EXR | The DI's requirement, not the vendor's preference |
| Viewing transform | Output Transform, P3-D65 or Rec.709 | Artists must review under the same view the DI uses |

Distribute the config itself with the plates, in `support_files/` alongside the Show LUT and CDLs as described in [Support Files](../turnover-vfx.md#support-files). A vendor who has to source their own config will source a different one.

## Versions

OCIO 2.x is a substantial rewrite of the 1.x line, with a proper transform architecture, GPU and CPU processing paths that match, and native support for the ACES transforms rather than baked LUT approximations. The **VFX Reference Platform** — the annual specification most facilities build against — pins the versions of the color stack for each calendar year: **ACES itself, OpenColorIO, and OpenEXR** are all named components, alongside Python and the rest of the stack. That ACES appears as a tracked component in its own right — not merely as something OCIO can be configured to do — is a fair measure of how settled it is as *the* interchange standard. **[web-sourced: CY2026 specifies ACES 2.0, OCIO 2.5.x, and OpenEXR 3.4.x.]**

!!! tip "The VFX Reference Platform is a useful negotiating tool"
    When a vendor and a facility disagree about library versions, the Reference Platform year is a neutral reference both can point at. For an independent production it is also a quick way to sanity-check that a vendor's stack is not several years stale — which usually predicts other problems.
## Checking that it works

Color management is testable, and should be tested before shot work — this is what a [confidence package](../production-workflow.md#visual-effects-production_1) is for. Three checks catch most pipeline faults:

1. **Round-trip a plate.** Plate → working space → back to delivery encoding, with no operations applied. Difference the result against the original. Anything other than zero (allowing for float precision) is a pipeline fault, not an artistic one. This is the [zero net change](../production-workflow.md#visual-effects-production_1) principle stated as a test.
2. **Round-trip an extreme.** Repeat with a plate containing genuine highlight clipping and deep shadow. Faults that are invisible on a mid-tone chart show up here as clamping.
3. **Compare viewers.** The same frame, under the same view transform, in Nuke and in the DI system. If they differ, resolve it before anyone grades anything.

The [difference check](../vfx-quality-control.md#difference-checking) technique this handbook already describes is exactly the right instrument for the first two.
