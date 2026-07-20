# Common Working Formats

## Movie-Based Formats

In studio feature and television production, frame-based image sequences are the standard
format for visual effects plates and renders, film scans, and even some Camera RAW formats.[^8]
However, in independent production, it is very common that visual effects plates, and even
final visual effects renders, are delivered as Apple ProRes 4444 in QuickTime movie wrappers.
While it is inadvisable for intermediate visual effects renders, especially CGI, to be rendered to
movie formats, it is an acceptable final delivery format in most cases.

[^8]: ARRIRAW (`.ari`), Panasonic V-RAW (`.vraw`), CinemaDNG (`.dng`)

As with any format, early roundtrip testing between production, visual effects vendors, and the
digital intermediate is important for verifying workflow integrity. Common issues arise when
unintentional gamma transforms are applied during transcoding.

Aside from visual effects, various flavors of ProRes, DNxHD, and DNxHR are suitable for offline
editorial and mastering.

### Apple ProRes

Apple ProRes codecs are resolution-independent, professional video codecs almost exclusively
in QuickTime (`.mov`) wrappers. Avid Media Composer is capable of rewrapping ProRes as MXF
OP-Atom per its media management system.

ProRes 4444 and ProRes 4444 XQ are commonly used as camera acquisition formats,[^9]
intermediate color grading formats, as well as visual effects plate and delivery formats. They
sustain multiple generations of encoding without meaningful image degradation and are
visually indistinguishable from equivalent uncompressed alternatives. Both are 12-bit codecs
capable of embedded alpha channel and supporting either RGBA or 4:4:4 Y'CbCrA image data.

[^9]: ARRI ALEXA/AMIRA ProRes, RED WEAPON, Blackmagic Design URSA, a variety of external
      third-party recorders, and more…

ProRes 422 HQ and ProRes 422 are frequently used as mastering formats for 10-bit 4:2:2 Y'CbCr
deliverables.

ProRes 422 LT and ProRes 422 Proxy, while also 10-bit 4:2:2, are significantly more compressed
and ideal for offline dailies and editorial proxies.

For more information on the Apple ProRes codecs, see the
[Apple ProRes white paper](https://www.apple.com/final-cut-pro/docs/Apple_ProRes.pdf).

!!! note "Newer than this edition"
    Apple introduced ProRes RAW in 2018, after this handbook was written. See
    [Notes for v1.1](v1.1-notes.md#codecs).

### Avid DNxHD and DNxHR

DNxHR is a replacement for the older, resolution-specific DNxHD codecs and is ideal for
display-referred imagery.

| Codec | Use |
| --- | --- |
| DNxHR 444 | 4:4:4 color space, ideal for high-quality color correction and finishing |
| DNxHR HQX | High quality extended, color correction and mastering |
| DNxHR HQ | High quality, smaller bandwidth for editorial |
| DNxHR SQ | Standard quality, ideal for editorial |
| DNxHR LB | Low bandwidth, ideal for remote workflows with the lowest storage impact |
| DNxHD 36 | Significantly compressed, designed for offline editorial |

Adapted from Avid's DNxHR and DNxHD documentation.

!!! warning "Compression artifacts and log material"
    Compression artifacts present in DNxHD and DNxHR, even at high bit rates, adversely affect
    log footage, producing keying artifacts. DNxHD and DNxHR are not advisable codecs for
    camera log material. They are well suited for delivering final, graded, display-referred image
    content, but are not a recommended intermediate format for color grading and visual
    effects.

Avid Media Composer natively manages media in MXF OP-Atom wrappers; however, Avid also
produces QuickTime codecs for DNxHD and DNxHR.

### H.264 / H.265 (HEVC)

H.264 and its Ultra High-Definition successor, H.265, are categorically
distribution/exhibition formats. While many prosumer and specialty cameras (DSLRs included) record to
H.264, this is not a desirable recording format for visual effects or digital intermediates. File sizes are kept
small through aggressive compression, often involving frame-interpolation techniques to
reduce the number of discrete raster frames stored in the movie container. H.264 and H.265 are
non-ideal for editing and post-production.

In practice, consumer H.264 and H.265 deliverables are 8-bit and 10-bit 4:2:0 respectively,
because that is what hardware decoders and streaming platforms support — but both standards
define higher-bit-depth, higher-chroma professional profiles (H.264 High 10 / Hi444PP up to
14-bit; HEVC Main 12 / Main 4:4:4 12) used in mezzanine and archival contexts. Neither commonly
supports an embedded alpha channel.

These codecs are commonly found in `.mov`, `.mp4`, `.m4v`, and `.mkv` file wrappers.

## Frame-Based Formats

### DPX (.dpx)

DPX has been the standard file format for digital intermediate scanning, color grading, and
finishing for over twenty years and is a common working format for digital intermediates as
well as serving as an intermediate format for transcoded Camera RAW media. It is the successor
to the legacy Cineon format (`.cin`) which preceded it as the standard film scanning format.

DPX file headers can store embedded timecode and tape name for assisting in conform.

Image data is routinely stored as fully uncompressed RGB 10-bit or 16-bit integer. Although the
DPX specification defines support for floating point data types, many software and digital
intermediate systems do not support floating point DPX. Alpha channel support is defined in
the specification, but many systems do not support DPX with embedded alpha.

DPX files are advantageous as they are completely uncompressed and, unlike lossy compressed
media, retain image fidelity across successive passes. File sizes are easily predicted, as all files of
a given raster dimension, bit depth, and header length will be the same size, regardless of the
image content.

### OpenEXR (.exr)

OpenEXR (more commonly referred to as EXR) is an open-source format developed by
Industrial Light &amp; Magic (ILM) as a replacement for legacy image formats commonly used in
visual effects. EXR is designed for multichannel 16-bit and 32-bit floating point — almost always
in scene-linear encoding.

EXRs support multiple layers in addition to an alpha channel, allowing VFX artists and studios to
integrate it into their pipeline in a customized way, unifying their workflow around a single file
rather than dozens of files representing individual channels and render passes per frame.

EXRs can store uncompressed, losslessly compressed, and variable lossy compressed image
data through a variety of compression schemes. This can be attractive, as 16-bit uncompressed
data takes up more space, and consequently more data bandwidth, than 10-bit alternatives.

!!! warning "Playback performance"
    The performance impact of compressed EXRs in a digital intermediate varies between
    compression schemes and can cause issues in achieving real-time playback with certain
    system configurations. As a result, it is encouraged that all final EXR renders delivered to the
    DI be uncompressed. Check with your digital intermediate facility or colorist about the
    implications of using EXR in their workflow.

EXRs with multi-channel render passes (AOVs — arbitrary output variables) such as normal maps
and z-depth are especially advantageous in visual effects workflows. However, they are rarely
included in final renders delivered to the DI, as those additional render passes are intended for
lighting and compositing and may serve little benefit to the colorist and will only increase the
size of the files.

EXRs, unlike most image formats, may contain image data (the "data window") outside the
visible frame area ("display window"). Conversely, a data window smaller than the display
window is also supported. This feature is designed for CGI compositing, particularly when
producing large-kernel blurs or 2D camera shake effects during compositing. Most DI systems
are incompatible with EXRs containing mismatched data and display window sizes. VFX vendors
must be informed that their final renders delivered to the DI must have matching data and
display window sizes. In some DI systems, mismatched window sizes can lead to image artifacts
and in some cases prevent the software from reading the files at all.

<figure markdown>
  ![OpenEXR display window vs. data window](figures/figure-09-exr-windows.png){ loading=lazy }
  <figcaption>Figure 9 — OpenEXR display window vs. data window.</figcaption>
</figure>

### TIFF (.tif, .tiff)

TIFF is an older image format that, within the context of visual effects and digital intermediate,
is almost a legacy format. In visual effects it has been completely replaced by DPX and EXR, and
in digital intermediates 16-bit TIFFs are the standard format for X'Y'Z' DCDMs (Digital Cinema
Distribution Masters). Aside from DCDMs, some studios prefer 16-bit DCI-P3 RGB TIFFs over
DPX as an archival master, but this is quickly being replaced by EXR.

TIFFs and other legacy graphics formats[^10] are often used for simple title graphics that are
comped over picture during the DI. In these cases, TIFF is chosen for its simplicity, as it supports
an alpha channel and is readily compatible with Photoshop, where most of those graphics are
generated.

[^10]: JPEG, PNG, Targa for example.

TIFFs should not be used as an intermediate working format for either visual effects or digital
intermediates, as DPX and EXR both provide advantages over TIFF.

TIFFs are commonly either RGB 8-bit or 16-bit integer, while 24-bit and 32-bit floating point
variants exist, with support for embedded alpha channel, but without support for tape name or
timecode metadata.

TIFFs can be uncompressed, losslessly compressed, or lossy compressed in a variety of ways,
and support multiple layers of image data.
