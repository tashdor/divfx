# Scene-Referred vs. Display-Referred (Output-Referred) Imagery

There are two primary image states with which we can categorize most images as they pertain
to digital production workflows.

!!! quote
    "We categorize color spaces by the 'direction' of this relationship to real world
    quantities, which we refer to as image state. Color spaces which are defined in
    relation to display characteristics are called display-referred, while color
    spaces which are defined in relation to input devices (scenes) are scene-referred."

    — Jeremy Selan, Sony Pictures Imageworks, *Cinematic Color VES*, 2012

## Display-Referred Imagery

We are most familiar with display-referred images. Images we commonly view on the web, our
phones, on a television, or in a movie theater are display-referred. These are images which are
numerically described based on their relationship to the way they are represented on a given
display. These images no longer have a numeric relationship to real-world exposure values. A
display-referred image can be accurately represented on a target display without the need for
any additional conversions or look-ups. It is very much a what-you-see-is-what-you-get
scenario.

Almost all reference displays have a built-in gamma encoding. These encodings are different
depending on the display, its usage and intention, and the assumed viewing environment. For
example, an sRGB image on a computer monitor or phone display is viewed at roughly gamma 2.2,
home video Rec.709 material through a display EOTF of about gamma 2.4 (BT.1886), and standard
dynamic range digital cinema through gamma 2.6.

In analog terms, a display-referred image is our film print.

An image intended for exhibition will ultimately be display-referred.

## Scene-Referred Imagery

If display-referred imagery is our ultimate goal for exhibition, why is scene-referred imagery
important?

Scene-referred imagery is not encoded to produce a desirable result on a display. Rather it is
designed to encode values that correspond to real-world exposure values of a given "scene."
("Scene" can refer to a real-life scene in front of a camera or a virtual one in front of a CG
camera.) Scene-referred imagery does not equate pixel values with absolute measures of light,
only relative measures of light. For example, a camera sensor cannot measure how many
photons are reflected from an object in a given period, but it can quantify the brightness of a
reference object compared to another in the scene. The relative relationship of light values in
the scene is described in scene-referred imagery.

Scene-referred images in the context of digital cinema workflow are any camera original images
(or visual effects shots encoded in camera original encoding) that retain the camera's native
dynamic range and tonal response.

Camera RAW images are inherently scene-referred, while traditional video images are
display-referred.

Scene-referred images can come in two major flavors: scene-linear (linear light space) or any
number of camera log encoding schemes (such as REDlogFilm, LogC, Canon Log, S-Log3).

## Scene-Linear

Scene-linear encoding is a purely linear (no gamma) encoding of relative light values, expressed
in floating point values. Middle gray is mapped to 0.18 and each stop of light doubles upon that
and may exceed 1.0. Scene-linear images are commonly written to 16-bit OpenEXR files rather
than historically integer-based formats like DPX or QuickTime.

Scene-linear is not to be confused with normalized linear, or camera linear, which are float or
integer encoded values ranging from 0.0 to 1.0 and correspond directly to a camera's sensor
raw analog-to-digital output values prior to encoding.

## Camera Log

Logarithmic encoding is a method designed to express scene-referred imagery within a smaller
or more convenient data type. In order to represent the dynamic range of modern film negative
or digital cinema cameras without quantization, 16-bit encoding is necessary when encoding in
scene-linear. By encoding scene data logarithmically (describing relative intensities of light in
terms of stops rather than linear values) the same dynamic range can be encoded to a lower bit
depth like 10-bit or 12-bit. There are many historical reasons integer-based image encoding was
important. Most of those are irrelevant now, and modern digital intermediate systems are fully
compatible with 16-bit floating point images. It can, however, still be more convenient to use
log-based integer encodings.

As the dynamic range of new cameras increases, the need for 16-bit image encoding increases.
10-bit log is insufficient for incredibly high dynamic range encodings, as it can produce
quantization artifacts (or banding) if too much dynamic range is compressed into a small range
of code values. This is particularly problematic in EDR (extended dynamic range, theatrical) and
HDR (high dynamic range, home video) mastering. In those situations 12-bit log should really be
the minimum bit depth of camera original images, with 16-bit log or 16-bit scene-linear being
ideal.

The major reason we still use logarithmically encoded images is that it allows us to capture
scene-referred imagery to a variety of convenient formats without the overhead of Camera
RAW. The ARRI ALEXA 35, RED V-RAPTOR, and Blackmagic URSA Cine cameras allow for native ProRes
capture, while Sony's VENICE 2 and BURANO allow native capture to other raster image
formats like XAVC. External recorders provide even more options for
capturing scene-referred imagery without Camera RAW.

As Camera RAW typically exhibits higher data rates than ProRes and necessitates more
intensive dailies processing, Camera RAW may be an expensive luxury for some productions. In
particular, broadcast television productions rarely utilize the full benefits of RAW and instead
record in a camera log based format like ProRes at a convenient resolution and format.

Camera log images are analogous to log film scans and fit in with established workflows very
easily.

## Video ≠ Linear

You won't receive many impassioned pleas from this document. But this is one! An
embarrassingly common misconception (or casual misuse of the terminology) is usage of the
shorthand term "linear" in reference to "video" images. Many people who should know better
refer to a Rec.709 display-referred video image as "linear." It is patently false to call an image
with a gamma "linear." Display-referred images are almost always gamma referred, so they are
by definition not linear.

People make this misconception because if there were to be an opposite to logarithmic in this
context it would be linear, and, well, standard dynamic range display-referred images aren't
logarithmic… so one could mistake them for "linear."

In many casual conversations this misuse is benign, as professionals usually understand what
you mean by "linear." However, in the context of visual effects production, color management
planning, and delivery specifications this imprecision can be very costly.

!!! example
    When a client tells you they are providing "linear plates" you would naturally expect a
    scene-linear, scene-referred workflow centered around OpenEXRs. But if they really mean
    video, not linear, there are some serious ramifications for your visual effects and color
    grading workflow.

    Casually, people often refer to concrete and cement to mean the same thing. But if a
    builder ordered 100 lbs of cement and 100 lbs of concrete, they would receive two very
    different things that, while related, require a certain specificity when it comes to
    purchasing.
