# Color Management and OpenColorIO

[ACES](aces.md) defines the transforms; **OpenColorIO** (OCIO) distributes and applies them consistently across applications. A show can specify ACES correctly and still produce mismatched renders if one artist uses a different config.

## What OCIO is

OpenColorIO is an open-source color management library, originally developed at Sony Pictures Imageworks and now an Academy Software Foundation project. It is embedded in Nuke, Maya, Houdini, Katana, Blender, RV, and most other tools in a VFX pipeline.

The unit of configuration is an **OCIO config** — a file (plus, historically, associated LUTs) that enumerates the color spaces a show uses, the transforms between them, and the named roles that applications look up:

- **Color spaces** — `ACEScg`, `ACEScct`, `ARRI LogC4 / AWG4`, `sRGB - Display`, and so on.
- **Roles** — abstract names that decouple applications from specific spaces. `scene_linear`, `compositing_log`, `color_picking`, `data`. An application asks for `scene_linear`; the config decides what that means on this show.
- **Displays and views** — the viewing transforms available in an artist's viewer.

Roles allow a working space to change without editing every artist's scripts. Redefine `scene_linear` once in the config instead of changing it in each Nuke script.
## How ACES is actually delivered

**Facilities consume ACES as an OCIO config**, not by implementing the CTL reference transforms directly.

The Academy publishes ACES as reference transforms in the Color Transformation Language (CTL), which is a specification language, not a production renderer. What ships to artists is an OCIO config that implements those transforms efficiently. In current practice these are the ACES **built-in configs** — commonly a `cg-config` (a smaller set aimed at CGI and compositing) and a `studio-config` (a fuller set including more camera vendors and display encodings). (The built-in config naming and split is documented by the [OCIO ACES config project](https://github.com/AcademySoftwareFoundation/OpenColorIO-Config-ACES), not the core ACES standards.)

"The show is ACES" therefore requires every application to use the same OCIO config and version.

## What to specify on a show

Alongside the [three format specifications](turnover-vfx.md#format-specification), a color-managed show needs these written down:

| Item | Example | Why |
| --- | --- | --- |
| Config identity and version | ACES 1.3 `studio-config`, v2.1.0 | Two artists on different config versions can produce different renders from identical scripts |
| Working space | `ACEScg` | See the [AP0/AP1 warning](aces.md#color-primary-sets) |
| Grading space | `ACEScct` | ACEScc and ACEScct are not interchangeable |
| Plate color space | `ARRI LogC4 / AWG4` | Must match what the plate pull actually produced |
| Delivery color space | `ACES2065-1`, uncompressed EXR | The DI's requirement, not the vendor's preference |
| Viewing transform | Output Transform, P3-D65 or Rec.709 | Artists must review under the same view the DI uses |

Distribute the config itself with the plates, in `support_files/` alongside the Show LUT and CDLs as described in [Support Files](turnover-vfx.md#support-files). A vendor who has to source their own config will source a different one.

## Versions

OCIO 2.x replaces baked LUT approximations with native ACES transforms and matching GPU and CPU processing paths. Use the annual [VFX Reference Platform](https://vfxplatform.com/) to align ACES, OCIO, and OpenEXR versions across vendors. CY2026 specifies ACES 2.0, OCIO 2.5.x, and OpenEXR 3.4.x.
## Checking that it works

Color management is testable, and should be tested before shot work — this is what a [confidence package](production-workflow.md#visual-effects-production_1) is for. Three checks catch most pipeline faults:

1. **Round-trip a plate.** Plate → working space → back to delivery encoding, with no operations applied. Difference the result against the original. Anything other than zero (allowing for float precision) is a pipeline fault, not an artistic one. This is the [zero net change](production-workflow.md#visual-effects-production_1) principle stated as a test.
2. **Round-trip an extreme.** Repeat with a plate containing genuine highlight clipping and deep shadow. Faults that are invisible on a mid-tone chart show up here as clamping.
3. **Compare viewers.** The same frame, under the same view transform, in Nuke and in the DI system. If they differ, resolve it before anyone grades anything.

The [difference check](vfx-quality-control.md#difference-checking) technique this handbook already describes is exactly the right instrument for the first two.
