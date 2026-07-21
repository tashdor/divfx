# Look Up Tables (LUTs)

LUTs are pre-computed color transformations that can contain technical color space
conversions, or creative transformations from scene-referred to display-referred states.

## Creative Transformations

The umbrella of creative transformations includes any s-shaped curves used to tone map a
scene-referred image into a desirable display-referred image. These transforms are subjectively
designed to give the image an aesthetic look. Any time you are viewing a camera image in a
display-referred setting (e.g. ALEXA camera monitoring in Rec.709 on a studio monitor or
viewfinder) you are viewing through a creative transformation.

Film print emulations and other stylistic color correction looks can be baked into LUTs for
convenient use and exchange between various software and hardware.

We commonly reference a scene-to-display transform as a "forward" function, while we refer
to any display-to-scene transform as an "inverse" function. While it is possible to derive
inverses of many functions, once an image undergoes an s-shaped transformation in which
values are clipped or multiple input values mapped to a single output value, the inverse will not
yield the full dynamic range or a true scene reference.

Inverses are commonly used for converting display-referred graphics so they appear correct
when viewed under a global Show LUT, or to convert a display-referred image to log for
film-out.

## The Show LUT

The Show LUT, referred to often in this document, is a type of creative display reference
transformation. Its major distinction is that it is the singular scene-to-display
transformation decided upon for a given project. In many theatrical grading examples, all
grading operations occur underneath (or prior to) that LUT. This LUT is used on set to drive
video village monitor previews and is essentially the digital equivalent of the print stock. There
are endless possible creative transformations and there is no singularly "correct" or ideal
transformation. It is important for the filmmakers and the colorist to work together to choose a
Show LUT, or design one themselves, that they feel best represents the camera material, as shot
by the cinematographer, in an ideal way in accordance with the project's particular aesthetic
values. This means shaping an s-curve to tone map scene-referred values in an aesthetically
driven way and may include color gamut reshaping through a film print emulation if desired.

Show LUTs are display-referred, so they are intended for specific mastering displays and color
spaces. Variations of the Show LUT will be tailored for the various display methods and
deliverables applicable to a given project (e.g. Rec.709, DCI-P3, Rec.2020).

Examples of common creative transformations:

- ARRI LogC to Rec.709 (K1S1)
- `Slog3SGamut3.CineToLC-709TypeA`
- REDlogFilm to REDgamma4

## Technical Transformations

Typically, transformations that do not cross the barrier between scene-referred and
display-referred image states are "technical" transformations. Technical transformations rely on
published math formulas and defined standards, so there is no subjectivity involved.

Technical transformations on display-referred images are necessary to convert between
different display types (e.g. digital cinema to home video).

A common display-referred technical transformation:

```
Rec.709 / Gamma 2.4  →  DCI-P3 / Gamma 2.6
```

Similarly, transformations on scene-referred data can convert from camera log to scene-linear,
for compositing, and back again without compromising meaningful colorimetric data.
Additionally, it is possible to convert from one camera's native log encoding and color space
into another.

A common scene-referred technical transformation:

```
Sony S-Log3 / S-Gamut3  →  ARRI LogC / ALEXA Wide Gamut
```

This can be particularly helpful in maintaining color continuity when intercutting different
cameras in the same scene. Even more helpful when multiple VFX plates are shot from different
types of cameras for the same shot and the comparable colors are expected to match. It is
common for feature productions involving multiple cameras to pre-transform their visual
effects plates during clip pulls, and relevant original camera footage in the DI timelines.

When intercutting Camera RAW with scene-linear OpenEXR visual effects shots, it is common to
transform the scene-linear visual effects into the camera log encoding (or vice versa) to
maintain continuity in the working environment. This makes the visual effects shots match the
original camera media and allows for grades to be copied between VFX shots and non-VFX
shots with predictable results.

## LUT Tools

Most modern color grading systems are capable of generating LUTs based on creative or
technical transformations. However, every developer has its preferred LUT format, and many
LUT formats are not cross-compatible with all of the systems commonly in use. When working
with multiple artists, editors, vendors, and colorists at different companies, it's important to be
able to exchange commonly needed LUTs (like the Show LUT) in formats that work on
everyone's various platforms.

Apps like [Lattice](https://videovillage.com/lattice/) and
[ColourSpace](https://www.lightillusion.com) (Light Illusion's ground-up successor to LightSpace
CMS) are useful for converting LUTs for use in a variety of systems and applications. Additionally,
they are capable of performing a multitude of technical transformations and color space
conversions. These precise transformations are often difficult to do accurately using normal
grading tools.
