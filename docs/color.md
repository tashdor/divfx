# Color Spaces and Color Transfer Functions

Color spaces and color transfer functions (also referred to as color encoding) are often
combined under the umbrella term "color space". While the terminology is a little context
dependent, the important thing to understand is that color spaces and transfer functions are
methods of relating real-world values to RGB pixels and vice versa. An RGB value is meaningless
without association with a color space and a transfer function.

Color spaces are often, but not always, implicitly coupled with a transfer function. For
example, it is rare to find DCI-P3 images encoded with a gamma other than 2.6. However, it is
important to explicitly state the color space and transfer function of an image when
referencing it on a technical level to ensure precision of communication.

It is easy to underestimate the importance or value of these concepts, as they are obfuscated
from most casual usage of computer graphics. But the reality is that color spaces and transfer
functions are what define how objectively red the color "red" appears on a computer display,
phone, television, or projector.

RGB values are an abstraction of real-world colorimetric values as they relate to human vision.

For a more detailed explanation of color science and the processes involved, see
[*Cinematic Color*](https://github.com/jeremyselan/cinematiccolor/raw/master/ves/Cinematic_Color_VES.pdf)
by Jeremy Selan.

!!! warning "Major omission"
    This chapter predates the widespread adoption of ACES and OpenColorIO as the default
    color management framework in visual effects. Any 2026 workflow discussion should start
    there. See [Notes for v1.1](v1.1-notes.md#aces-and-opencolorio).

## Color Spaces

Color spaces define the gamut, or range of colors, a given camera or display is able to capture or
reproduce. Different cameras are capable of capturing and recording colors differently based
on their particular sensor engineering.

Below are examples of some common color spaces you are likely to encounter.

### Display Color Spaces

| Color space | Description |
| --- | --- |
| **sRGB** | The standard color space used by most computer and mobile phone displays, with an implied approximate gamma of 2.2. |
| **Rec.709** | The standard HDTV color space, the reference target for home video and broadcast mastering; the same color primaries and white point as sRGB, with an implied approximate gamma of 2.4. |
| **Rec.2020** | The wide gamut standard for future UHDTVs. Currently in early adoption; few displays are capable of reproducing many of the colors represented in the Rec.2020 space. |
| **DCI-P3** | The standard gamut and white point used in theatrical digital cinema projection. Slightly bigger than Rec.709, with an implicit gamma of 2.6. |

!!! danger "Technically imprecise"
    The Rec.709 entry conflates the camera-side OETF with the display-side EOTF. See
    [Notes for v1.1](v1.1-notes.md#rec709-and-the-oetfeotf-conflation).

Two common, but informal, derivations of the P3 color space are often used in finishing:

| Color space | Description |
| --- | --- |
| **P3D60** or **D60P3** | P3 color primaries with a D60 creative white point |
| **P3D65** or **D65P3** | P3 color primaries with a D65 creative white point (common for HDR home video) |

<figure markdown>
  ![A comparison of display color spaces](figures/figure-18-display-gamuts.png){ loading=lazy }
  <figcaption>Figure 18 — A comparison of display color spaces.</figcaption>
</figure>

### Camera Color Spaces

Camera gamuts are defined as "virtual primaries" as they are not necessarily indicative of color
ranges a camera sensor can register. The primaries often exceed the human vision spectrum as
plotted on a CIE 1931 chromaticity diagram. Comparing the virtual primaries of different
cameras does not indicate whether a camera actually has broader sensitivity than another, but
rather serves as a comparison of the color encoding models used by each camera.

| Color space | Description |
| --- | --- |
| **ARRI Wide Gamut** | The native acquisition color space of the ALEXA and AMIRA cameras when recording in LogC mode. |
| **RED DRAGONcolor2** | A popular color space that can be decoded from RED RAW files. |
| **REDWideGamutRGB** | A camera color space designed to contain all colors a RED camera can capture without clipping. |
| **Sony S-Gamut3** | A wide color space used by the Sony professional cinema cameras. |

<figure markdown>
  ![A comparison of camera color spaces and delivery color spaces](figures/figure-19-camera-gamuts.png){ loading=lazy }
  <figcaption>Figure 19 — A comparison of camera color spaces and delivery color spaces.</figcaption>
</figure>

## Transfer Functions

Transfer functions define the relationship between RGB tonal values and their equivalents
either in the "scene" if scene-referred, or on a display if display-referred. Transfer functions are
often called color encodings, encoding spaces, and gamma spaces.

### Camera Transfer Functions

| Transfer function | Description |
| --- | --- |
| **Cineon** | The standard log encoding of film scans. |
| **ARRI LogC** | The standard log encoding of ARRIRAW or ALEXA ProRes recorded in LogC. |
| **REDlogFilm** | The standard logarithmic encoding of RED footage. Identical to the Cineon transfer function. |
| **RED Log3G10** | An alternate log curve optimized for HDR grading applications. (Also see Log3G12.) |
| **Sony S-Log3** | The latest logarithmic encoding utilized by Sony professional cinema cameras. |

### Display Transfer Functions

| Transfer function | Description |
| --- | --- |
| **Gamma 2.2** | Material mastered for sRGB computer displays. Viewed in a normal, bright surround (office or home interior). |
| **Gamma 2.4** | A target for material mastered for Rec.709 displays. Viewed in a dim surround (dim room with low ambient light). |
| **Gamma 2.6** | Digital cinema projection gamma. Viewed in a dark room (theater, little or no ambient light). |

### Linear Transfer Functions

| Transfer function | Description |
| --- | --- |
| **Scene-Linear** | Gamma 1.0 with middle grey encoded at 0.18. Floating point values exceed 1.0. |
| **Normalized Linear** | Gamma 1.0 with arbitrary mapping of signal bounded between 0.0 and 1.0. |

## DCI-X'Y'Z'

Special attention needs to be provided to DCI-X'Y'Z', as it is not a color space in the traditional
sense like the RGB color spaces previously mentioned, but rather the container space that color
spaces fit within. XYZ values relate to human perception of color and can be thought of as an
absolute reference for real-world color reproduction, unlike abstracted RGB color
spaces. The DCI (Digital Cinema Initiatives[^18]) agreed that Digital Cinema Packages should be
delivered in a method that requires no proprietary translation between the encoded image
data and the projector, reducing the potential for the wrong color space to be applied during
projection, maintaining greater consistency across projectors and theaters, and ensuring the
format is manufacturer agnostic.

[^18]: <https://www.dcimovies.com/>

DCI-X'Y'Z' is implicitly encoded as gamma 2.6[^19] with an additional compensation factor to
increase the range of producible white points.

[^19]: Hence X'Y'Z' (pronounced X-prime, Y-prime, Z-prime), prime implying a gamma, rather
       than XYZ.

DCI-X'Y'Z' is a display-referred space that is specifically designed for digital projection and is
thus used as a deliverable and projection format only, not as an intermediate working space.

DCDMs (Digital Cinema Distribution Masters) and DCPs (Digital Cinema Packages) are produced
in DCI-X'Y'Z' space.

!!! note "Worth stating precisely"
    The "compensation factor" has a specific derivation worth spelling out. See
    [Notes for v1.1](v1.1-notes.md#dci-xyz-encoding).
