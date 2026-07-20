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
| **Rec.709** | The standard HDTV color space and the reference target for home video and broadcast mastering; the same primaries and white point as sRGB. It specifies a camera-side OETF, not a display gamma — the reference display EOTF is BT.1886, approximately 2.4. |
| **Rec.2020** | The wide gamut standard for future UHDTVs. Currently in early adoption; few displays are capable of reproducing many of the colors represented in the Rec.2020 space. |
| **DCI-P3** | The standard gamut and white point used in theatrical digital cinema projection. Slightly bigger than Rec.709, with an implicit gamma of 2.6. |

Two common, but informal, derivations of the P3 color space are often used in finishing:

| Color space | Description |
| --- | --- |
| **P3D60** or **D60P3** | P3 color primaries with a D60 creative white point |
| **P3D65** or **D65P3** | P3 color primaries with a D65 creative white point (common for HDR home video) |

<figure class="cp-embed"
  data-cp-title="Figure 18 — display color spaces"
  data-cp-light="https://ditools.videovillage.com/embed/color_plotter#p=eyJwcm9qZWN0Ijp7Im5hbWUiOiJEaXNwbGF5IENvbG9yIFNwYWNlcyIsImRlc2MiOiIiLCJuYW1lQXV0byI6ZmFsc2UsImRlc2NBdXRvIjpmYWxzZSwic2hvd1RpdGxlIjpmYWxzZSwiZGlhZ3JhbSI6IjE5MzEiLCJtb2RlIjoiMmQiLCJzcGFjZTNkIjoiY2hyb21hIiwibG9nWSI6ZmFsc2UsInNwYWNlcyI6W3siaWQiOiJpZDEiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJyZWM3MDkiLCJsYWJlbCI6IlJlYy4gNzA5IiwiY29sb3IiOiIjNWE0ZmNmIiwiZmlsbCI6ZmFsc2UsImZpbGxBbHBoYSI6MC4xMiwibGluZVdpZHRoIjoxLjgsImxpbmVTdHlsZSI6InNvbGlkIiwic2hvd1doaXRlIjp0cnVlLCJ3aGl0ZSI6IiIsIm1heE5pdHMiOjEwMCwibWluTml0cyI6MC4xfSx7ImlkIjoiaWQyIiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoicDNkY2kiLCJsYWJlbCI6IkRDSS1QMyIsImNvbG9yIjoiIzFmOWQ1NSIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkMyIsImVuYWJsZWQiOnRydWUsImtpbmQiOiJnYW11dCIsInJlZiI6InJlYzIwMjAiLCJsYWJlbCI6IlJlYy4gMjAyMCIsImNvbG9yIjoiI2Q2MjgyOCIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX1dLCJwb2ludHMiOltdLCJ3aGl0ZXMiOltdLCJhbm5vdGF0aW9ucyI6W10sInBsYW5jayI6eyJzaG93IjpmYWxzZSwia01pbiI6MTUwMCwia01heCI6MTUwMDAsImlzb3RoZXJtcyI6ZmFsc2V9LCJsb2N1cyI6eyJzaG93Ijp0cnVlLCJ3YXZlbGVuZ3RoVGlja3MiOnRydWV9LCJsYWJlbFByaW1hcmllcyI6ZmFsc2UsImxhYmVsU3BhY2VzIjpmYWxzZSwiZmlsbCI6eyJzaG93Ijp0cnVlfSwiY29udGFpbiI6eyJzaG93IjpmYWxzZSwicmVmZXJlbmNlSWQiOm51bGwsImNvbG9yIjoiI2ZmNGQ0ZCIsImhhdGNoIjpmYWxzZSwib3BhY2l0eSI6MC44NSwiY292ZXJhZ2UiOmZhbHNlfSwidGl0bGVPdXRzaWRlIjpmYWxzZSwiaW1hZ2UiOm51bGx9LCJ2aWV3Ijp7InZ4MCI6LTAuMDYsInZ4MSI6MC44MywidnkwIjotMC4wNiwidnkxIjowLjksImNhbWVyYSI6eyJ0aGV0YSI6My45MiwicGhpIjowLjYyLCJkaXN0IjozLjQsInRhcmdldCI6WzAsMCwwXX0sInRoZW1lIjoibGlnaHQiLCJ0cmFuc3BhcmVudCI6ZmFsc2UsIndpZHRoIjo5MDAsImhlaWdodCI6ODIwLCJzY2FsZSI6MiwiZ3JpZCI6dHJ1ZSwiYXhlcyI6dHJ1ZSwibGFiZWxzIjp0cnVlLCJsZWdlbmQiOnRydWV9fQ"
  data-cp-dark="https://ditools.videovillage.com/embed/color_plotter#p=eyJwcm9qZWN0Ijp7Im5hbWUiOiJEaXNwbGF5IENvbG9yIFNwYWNlcyIsImRlc2MiOiIiLCJuYW1lQXV0byI6ZmFsc2UsImRlc2NBdXRvIjpmYWxzZSwic2hvd1RpdGxlIjpmYWxzZSwiZGlhZ3JhbSI6IjE5MzEiLCJtb2RlIjoiMmQiLCJzcGFjZTNkIjoiY2hyb21hIiwibG9nWSI6ZmFsc2UsInNwYWNlcyI6W3siaWQiOiJpZDQiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJyZWM3MDkiLCJsYWJlbCI6IlJlYy4gNzA5IiwiY29sb3IiOiIjNWE0ZmNmIiwiZmlsbCI6ZmFsc2UsImZpbGxBbHBoYSI6MC4xMiwibGluZVdpZHRoIjoxLjgsImxpbmVTdHlsZSI6InNvbGlkIiwic2hvd1doaXRlIjp0cnVlLCJ3aGl0ZSI6IiIsIm1heE5pdHMiOjEwMCwibWluTml0cyI6MC4xfSx7ImlkIjoiaWQ1IiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoicDNkY2kiLCJsYWJlbCI6IkRDSS1QMyIsImNvbG9yIjoiIzFmOWQ1NSIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkNiIsImVuYWJsZWQiOnRydWUsImtpbmQiOiJnYW11dCIsInJlZiI6InJlYzIwMjAiLCJsYWJlbCI6IlJlYy4gMjAyMCIsImNvbG9yIjoiI2Q2MjgyOCIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX1dLCJwb2ludHMiOltdLCJ3aGl0ZXMiOltdLCJhbm5vdGF0aW9ucyI6W10sInBsYW5jayI6eyJzaG93IjpmYWxzZSwia01pbiI6MTUwMCwia01heCI6MTUwMDAsImlzb3RoZXJtcyI6ZmFsc2V9LCJsb2N1cyI6eyJzaG93Ijp0cnVlLCJ3YXZlbGVuZ3RoVGlja3MiOnRydWV9LCJsYWJlbFByaW1hcmllcyI6ZmFsc2UsImxhYmVsU3BhY2VzIjpmYWxzZSwiZmlsbCI6eyJzaG93Ijp0cnVlfSwiY29udGFpbiI6eyJzaG93IjpmYWxzZSwicmVmZXJlbmNlSWQiOm51bGwsImNvbG9yIjoiI2ZmNGQ0ZCIsImhhdGNoIjpmYWxzZSwib3BhY2l0eSI6MC44NSwiY292ZXJhZ2UiOmZhbHNlfSwidGl0bGVPdXRzaWRlIjpmYWxzZSwiaW1hZ2UiOm51bGx9LCJ2aWV3Ijp7InZ4MCI6LTAuMDYsInZ4MSI6MC44MywidnkwIjotMC4wNiwidnkxIjowLjksImNhbWVyYSI6eyJ0aGV0YSI6My45MiwicGhpIjowLjYyLCJkaXN0IjozLjQsInRhcmdldCI6WzAsMCwwXX0sInRoZW1lIjoiZGFyayIsInRyYW5zcGFyZW50IjpmYWxzZSwid2lkdGgiOjkwMCwiaGVpZ2h0Ijo4MjAsInNjYWxlIjoyLCJncmlkIjp0cnVlLCJheGVzIjp0cnVlLCJsYWJlbHMiOnRydWUsImxlZ2VuZCI6dHJ1ZX19">
  <span class="cp-embed-mount">
    <img class="cp-embed-static" src="../figures/svg/figure-18-display-gamuts-light.svg#only-light" alt="A comparison of display color spaces" loading="lazy">
    <img class="cp-embed-static" src="../figures/svg/figure-18-display-gamuts-dark.svg#only-dark" alt="" loading="lazy">
  </span>
  <figcaption>Figure 18 — A comparison of display color spaces. <span class="cp-embed-hint">Interactive — drag to pan, scroll to zoom.</span> <a href="../figures/svg/figure-18-display-gamuts-light.svg">Static version</a>.</figcaption>
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
| **REDWideGamutRGB** | A camera color space designed to contain all colors a RED camera can capture without clipping. It has replaced the earlier DRAGONcolor / DRAGONcolor2 encodings. |
| **Sony S-Gamut3.Cine** | The practical de facto working space for Sony professional cinema cameras — a slightly smaller, more grading-friendly variant of the fuller S-Gamut3. |

<figure class="cp-embed"
  data-cp-title="Figure 19 — camera and delivery color spaces"
  data-cp-light="https://ditools.videovillage.com/embed/color_plotter#p=eyJwcm9qZWN0Ijp7Im5hbWUiOiJDYW1lcmEgYW5kIERlbGl2ZXJ5IENvbG9yIFNwYWNlcyIsImRlc2MiOiIiLCJuYW1lQXV0byI6ZmFsc2UsImRlc2NBdXRvIjpmYWxzZSwic2hvd1RpdGxlIjpmYWxzZSwiZGlhZ3JhbSI6IjE5MzEiLCJtb2RlIjoiMmQiLCJzcGFjZTNkIjoiY2hyb21hIiwibG9nWSI6ZmFsc2UsInNwYWNlcyI6W3siaWQiOiJpZDciLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJhd2czIiwibGFiZWwiOiJBUlJJIFdpZGUgR2FtdXQgMyIsImNvbG9yIjoiIzdiM2ZlNCIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkOCIsImVuYWJsZWQiOnRydWUsImtpbmQiOiJnYW11dCIsInJlZiI6InJlZHdnIiwibGFiZWwiOiJSRURXaWRlR2FtdXRSR0IiLCJjb2xvciI6IiMxZjhmZDAiLCJmaWxsIjpmYWxzZSwiZmlsbEFscGhhIjowLjEyLCJsaW5lV2lkdGgiOjEuOCwibGluZVN0eWxlIjoic29saWQiLCJzaG93V2hpdGUiOnRydWUsIndoaXRlIjoiIiwibWF4Tml0cyI6MTAwLCJtaW5OaXRzIjowLjF9LHsiaWQiOiJpZDkiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJzZ2FtdXQzY2luZSIsImxhYmVsIjoiU29ueSBTLUdhbXV0My5DaW5lIiwiY29sb3IiOiIjMWY5ZDU1IiwiZmlsbCI6ZmFsc2UsImZpbGxBbHBoYSI6MC4xMiwibGluZVdpZHRoIjoxLjgsImxpbmVTdHlsZSI6InNvbGlkIiwic2hvd1doaXRlIjp0cnVlLCJ3aGl0ZSI6IiIsIm1heE5pdHMiOjEwMCwibWluTml0cyI6MC4xfSx7ImlkIjoiaWQxMCIsImVuYWJsZWQiOnRydWUsImtpbmQiOiJnYW11dCIsInJlZiI6InJlYzcwOSIsImxhYmVsIjoiUmVjLiA3MDkiLCJjb2xvciI6IiNlMDdiMWYiLCJmaWxsIjpmYWxzZSwiZmlsbEFscGhhIjowLjEyLCJsaW5lV2lkdGgiOjEuOCwibGluZVN0eWxlIjoic29saWQiLCJzaG93V2hpdGUiOnRydWUsIndoaXRlIjoiIiwibWF4Tml0cyI6MTAwLCJtaW5OaXRzIjowLjF9LHsiaWQiOiJpZDExIiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoicDNkY2kiLCJsYWJlbCI6IkRDSS1QMyIsImNvbG9yIjoiI2Q2MjgyOCIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX1dLCJwb2ludHMiOltdLCJ3aGl0ZXMiOltdLCJhbm5vdGF0aW9ucyI6W10sInBsYW5jayI6eyJzaG93IjpmYWxzZSwia01pbiI6MTUwMCwia01heCI6MTUwMDAsImlzb3RoZXJtcyI6ZmFsc2V9LCJsb2N1cyI6eyJzaG93Ijp0cnVlLCJ3YXZlbGVuZ3RoVGlja3MiOnRydWV9LCJsYWJlbFByaW1hcmllcyI6ZmFsc2UsImxhYmVsU3BhY2VzIjpmYWxzZSwiZmlsbCI6eyJzaG93Ijp0cnVlfSwiY29udGFpbiI6eyJzaG93IjpmYWxzZSwicmVmZXJlbmNlSWQiOm51bGwsImNvbG9yIjoiI2ZmNGQ0ZCIsImhhdGNoIjpmYWxzZSwib3BhY2l0eSI6MC44NSwiY292ZXJhZ2UiOmZhbHNlfSwidGl0bGVPdXRzaWRlIjpmYWxzZSwiaW1hZ2UiOm51bGx9LCJ2aWV3Ijp7InZ4MCI6LTAuMDYsInZ4MSI6MC44MywidnkwIjotMC4xMiwidnkxIjowLjksImNhbWVyYSI6eyJ0aGV0YSI6My45MiwicGhpIjowLjYyLCJkaXN0IjozLjQsInRhcmdldCI6WzAsMCwwXX0sInRoZW1lIjoibGlnaHQiLCJ0cmFuc3BhcmVudCI6ZmFsc2UsIndpZHRoIjo5MDAsImhlaWdodCI6ODIwLCJzY2FsZSI6MiwiZ3JpZCI6dHJ1ZSwiYXhlcyI6dHJ1ZSwibGFiZWxzIjp0cnVlLCJsZWdlbmQiOnRydWV9fQ"
  data-cp-dark="https://ditools.videovillage.com/embed/color_plotter#p=eyJwcm9qZWN0Ijp7Im5hbWUiOiJDYW1lcmEgYW5kIERlbGl2ZXJ5IENvbG9yIFNwYWNlcyIsImRlc2MiOiIiLCJuYW1lQXV0byI6ZmFsc2UsImRlc2NBdXRvIjpmYWxzZSwic2hvd1RpdGxlIjpmYWxzZSwiZGlhZ3JhbSI6IjE5MzEiLCJtb2RlIjoiMmQiLCJzcGFjZTNkIjoiY2hyb21hIiwibG9nWSI6ZmFsc2UsInNwYWNlcyI6W3siaWQiOiJpZDEyIiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoiYXdnMyIsImxhYmVsIjoiQVJSSSBXaWRlIEdhbXV0IDMiLCJjb2xvciI6IiM3YjNmZTQiLCJmaWxsIjpmYWxzZSwiZmlsbEFscGhhIjowLjEyLCJsaW5lV2lkdGgiOjEuOCwibGluZVN0eWxlIjoic29saWQiLCJzaG93V2hpdGUiOnRydWUsIndoaXRlIjoiIiwibWF4Tml0cyI6MTAwLCJtaW5OaXRzIjowLjF9LHsiaWQiOiJpZDEzIiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoicmVkd2ciLCJsYWJlbCI6IlJFRFdpZGVHYW11dFJHQiIsImNvbG9yIjoiIzFmOGZkMCIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX0seyJpZCI6ImlkMTQiLCJlbmFibGVkIjp0cnVlLCJraW5kIjoiZ2FtdXQiLCJyZWYiOiJzZ2FtdXQzY2luZSIsImxhYmVsIjoiU29ueSBTLUdhbXV0My5DaW5lIiwiY29sb3IiOiIjMWY5ZDU1IiwiZmlsbCI6ZmFsc2UsImZpbGxBbHBoYSI6MC4xMiwibGluZVdpZHRoIjoxLjgsImxpbmVTdHlsZSI6InNvbGlkIiwic2hvd1doaXRlIjp0cnVlLCJ3aGl0ZSI6IiIsIm1heE5pdHMiOjEwMCwibWluTml0cyI6MC4xfSx7ImlkIjoiaWQxNSIsImVuYWJsZWQiOnRydWUsImtpbmQiOiJnYW11dCIsInJlZiI6InJlYzcwOSIsImxhYmVsIjoiUmVjLiA3MDkiLCJjb2xvciI6IiNlMDdiMWYiLCJmaWxsIjpmYWxzZSwiZmlsbEFscGhhIjowLjEyLCJsaW5lV2lkdGgiOjEuOCwibGluZVN0eWxlIjoic29saWQiLCJzaG93V2hpdGUiOnRydWUsIndoaXRlIjoiIiwibWF4Tml0cyI6MTAwLCJtaW5OaXRzIjowLjF9LHsiaWQiOiJpZDE2IiwiZW5hYmxlZCI6dHJ1ZSwia2luZCI6ImdhbXV0IiwicmVmIjoicDNkY2kiLCJsYWJlbCI6IkRDSS1QMyIsImNvbG9yIjoiI2Q2MjgyOCIsImZpbGwiOmZhbHNlLCJmaWxsQWxwaGEiOjAuMTIsImxpbmVXaWR0aCI6MS44LCJsaW5lU3R5bGUiOiJzb2xpZCIsInNob3dXaGl0ZSI6dHJ1ZSwid2hpdGUiOiIiLCJtYXhOaXRzIjoxMDAsIm1pbk5pdHMiOjAuMX1dLCJwb2ludHMiOltdLCJ3aGl0ZXMiOltdLCJhbm5vdGF0aW9ucyI6W10sInBsYW5jayI6eyJzaG93IjpmYWxzZSwia01pbiI6MTUwMCwia01heCI6MTUwMDAsImlzb3RoZXJtcyI6ZmFsc2V9LCJsb2N1cyI6eyJzaG93Ijp0cnVlLCJ3YXZlbGVuZ3RoVGlja3MiOnRydWV9LCJsYWJlbFByaW1hcmllcyI6ZmFsc2UsImxhYmVsU3BhY2VzIjpmYWxzZSwiZmlsbCI6eyJzaG93Ijp0cnVlfSwiY29udGFpbiI6eyJzaG93IjpmYWxzZSwicmVmZXJlbmNlSWQiOm51bGwsImNvbG9yIjoiI2ZmNGQ0ZCIsImhhdGNoIjpmYWxzZSwib3BhY2l0eSI6MC44NSwiY292ZXJhZ2UiOmZhbHNlfSwidGl0bGVPdXRzaWRlIjpmYWxzZSwiaW1hZ2UiOm51bGx9LCJ2aWV3Ijp7InZ4MCI6LTAuMDYsInZ4MSI6MC44MywidnkwIjotMC4xMiwidnkxIjowLjksImNhbWVyYSI6eyJ0aGV0YSI6My45MiwicGhpIjowLjYyLCJkaXN0IjozLjQsInRhcmdldCI6WzAsMCwwXX0sInRoZW1lIjoiZGFyayIsInRyYW5zcGFyZW50IjpmYWxzZSwid2lkdGgiOjkwMCwiaGVpZ2h0Ijo4MjAsInNjYWxlIjoyLCJncmlkIjp0cnVlLCJheGVzIjp0cnVlLCJsYWJlbHMiOnRydWUsImxlZ2VuZCI6dHJ1ZX19">
  <span class="cp-embed-mount">
    <img class="cp-embed-static" src="../figures/svg/figure-19-camera-gamuts-light.svg#only-light" alt="A comparison of camera color spaces and delivery color spaces" loading="lazy">
    <img class="cp-embed-static" src="../figures/svg/figure-19-camera-gamuts-dark.svg#only-dark" alt="" loading="lazy">
  </span>
  <figcaption>Figure 19 — A comparison of camera color spaces and delivery color spaces. <span class="cp-embed-hint">Interactive — drag to pan, scroll to zoom.</span> <a href="../figures/svg/figure-19-camera-gamuts-light.svg">Static version</a>.</figcaption>
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
| **Scene-Linear** | Gamma 1.0 with middle gray encoded at 0.18. Floating point values exceed 1.0. |
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

!!! note "Correct, and worth spelling out"
    The "compensation factor" is exactly what the sentence says it is — the constant 52.37 is
    what allows D65 to be encoded at 48 cd/m². The derivation is in
    [Notes for v1.1](v1.1-notes.md#dci-xyz-encoding).
