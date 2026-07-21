# Glossary

Terms as used in this handbook. This page is new to the wiki edition and was assembled from
definitions given throughout the text.

## A

**AAF** — Advanced Authoring Format. A SMPTE open standard primarily used by Avid for picture
and audio turnovers. Binary, supports multi-layer timelines and baked speed-ramp keyframes.
See [Edit List Generation](turnover-di.md#aaf).

**AOV** — Arbitrary Output Variable. A supplementary render pass (normal maps, z-depth, and so
on) stored as an additional channel in an OpenEXR file.
See [OpenEXR](working-formats.md#openexr-exr).

**ASC CDL** — American Society of Cinematographers Color Decision List. A deliberately
restrictive color correction interchange format limited to slope, offset, power, and saturation —
ten values that transfer predictably across grading systems.
See [Plate Pre-Grading](production-workflow.md#visual-effects-plate-pre-grading-optional).

## C

**Camera RAW** — Unprocessed sensor data preserved for creative interpretation later. Inherently
scene-referred. Inefficient as a VFX working format because it must be debayered on every
access. See [Camera RAW](digital-intermediates.md#camera-raw).

**CBB** — Could Be Better. A visual effects shot deemed passable as-is but slated for
improvement if schedule permits. See [Digital Intermediate](production-workflow.md#digital-intermediate).

**Concatenation** — The collapsing of multiple successive image transforms into a single net
operation, avoiding the cumulative softening of repeated resampling. Broken by interposing
color or shader nodes. See [Concatenated Image Transforms](vfx-quality-control.md#concatenated-image-transforms).

**Conform** — Reconstructing the show's timeline at full quality from camera original and VFX
elements, using metadata from the offline edit.
See [Editorial Turnover for DI](turnover-di.md).

## D

**DCDM** — Digital Cinema Distribution Master. Uncompressed, unencrypted 16-bit TIFF render in
DCI-X'Y'Z', used only to produce a DCP.
See [Theatrical Distribution Masters](production-workflow.md#dcdm-digital-cinema-distribution-master).

**DCP** — Digital Cinema Package. The compressed, usually encrypted package delivered to
theaters. See [DCP](production-workflow.md#dcp-digital-cinema-package).

**Data window / display window** — In OpenEXR, the region containing image data versus the
visible frame area. These may differ, which most DI systems cannot handle.
See [OpenEXR](working-formats.md#openexr-exr).

**Display-referred** — Image encoding defined in relation to display characteristics, with no
numeric relationship to real-world exposure. The state of any image intended for exhibition.
See [Display-Referred Imagery](scene-referred.md#display-referred-imagery).

**DIT** — Digital Imaging Technician. Responsible for on-set ingest, backup, and often on-set look
creation. See [Digital Dailies](production-workflow.md#digital-dailies).

**DSM** — Digital Source Master. Uncompressed graded render, typically DCI-P3 RGB, often
skipped in favor of producing a DCDM directly.
See [DSM](production-workflow.md#dsm-digital-source-master).

## E

**EDL** — Edit Decision List. The oldest and simplest interchange format; universally supported,
human readable, but unable to describe variable speed ramps or geometric effects.
See [EDL](turnover-di.md#edl).

## F

**FFOP** — First Frame of Picture. The reference point marking where the program picture begins,
used to align head leaders and the 2-pop. See [Leaders and Tail-Pop](turnover-di.md#leaders-and-tail-pop).

**Framing chart** — A photographed chart or generated pixel-accurate reticle communicating
intended framing unambiguously. See [Framing Charts](resolutions.md#framing-charts).

**Frame padding** — Deliberately recording image area outside the intended frame lines to
preserve latitude for stabilization and reframing.
See [Frame Padding](resolutions.md#frame-padding).

## H

**Handles** — Extra frames beyond the edit at the head and tail of a plate or comp, giving
editorial room to roll a cut. See [Frame Numbering and Handles](turnover-vfx.md#frame-numbering-and-handles).

## L

**LFOP** — Last Frame of Picture. The reference point marking where the program picture ends, used
to align tail leaders and the tail pop. See [Leaders and Tail-Pop](turnover-di.md#leaders-and-tail-pop).

**Longplay** — The film assembled as a single continuous sequence rather than divided into reels.
See [Working in Reels](turnover-di.md#working-in-reels).

**LUT** — Look Up Table. A pre-computed color transformation, either technical (standards-based)
or creative (subjective, s-shaped, scene-to-display).
See [Look Up Tables](luts.md).

## M

**Matte** — A channel isolating an element of a composite, delivered to the DI so the colorist can
grade composite regions selectively without re-rotoscoping.
See [Working with Visual Effects Mattes](digital-intermediates.md#working-with-visual-effects-mattes).

## O

**Opticals** — Effects reproducible during conform — resizes, repositions, stabilization, flips,
flops, simple timewarps, dissolves, locked-off split screens. Named for the optical printing
required in the negative-assembly era. See [Opticals List](turnover-di.md#opticals-list).

**OTT** — Over-the-top. Streaming distribution outside traditional broadcast and cable.

## P

**Plate** — Camera original footage delivered to visual effects as the basis for a shot.
See [Visual Effects Plate Pulls](production-workflow.md#visual-effects-plate-pulls).

**Previz** — Previsualization. CGI animatics used to plan complex shots and sequences before
production. See [Pre-Production / Visualization](production-workflow.md#pre-production-visualization).

## R

**Reel** — A ~20-minute division of a feature, inherited from the physical limits of print stock and
retained because it parallelizes editorial and grading labor.
See [Working in Reels](turnover-di.md#working-in-reels).

## S

**Scene-linear** — Linear encoding of relative light values in floating point, with middle gray at
0.18 and each stop doubling. Values may exceed 1.0.
See [Scene-Linear](scene-referred.md#scene-linear).

**Scene-referred** — Image encoding defined in relation to the scene's relative exposure values,
retaining the camera's native dynamic range.
See [Scene-Referred Imagery](scene-referred.md#scene-referred-imagery).

**Show LUT** — The single scene-to-display transformation chosen for a project. Drives on-set
monitoring and sits at the end of the grading pipeline; the digital equivalent of print stock.
See [The Show LUT](luts.md#the-show-lut).

**Slap comp** — A rough temporary composite made in editorial to convey a story beat before the
real shot exists. See [Creative Editorial](production-workflow.md#creative-editorial).

**Slate frame** — An informational frame prepended to a delivered comp carrying shot, version,
vendor, artist, and framing details.
See [Frame Numbering and Handles](turnover-vfx.md#frame-numbering-and-handles).

## T

**Tape name** — The unique source identifier that, with timecode, links a timeline clip back to
camera original media. Without it, conform is guesswork.
See [Edit List Generation](turnover-di.md#edit-list-generation).

**TD** — Technical Director. At a VFX studio, the person responsible for defining and vetting the
imaging pipeline. See [Visual Effects Quality Control](vfx-quality-control.md).

**Turnover** — The delivery of edit lists, media, and references from editorial to the DI or to VFX.
See [Editorial Turnover for DI](turnover-di.md).

**Two-pop** — A single-frame audio and picture sync reference two seconds before first frame of
picture. See [Leaders and Tail-Pop](turnover-di.md#leaders-and-tail-pop).

## W

**WIP** — Work in progress. An unfinished VFX shot delivered so grading can begin in parallel.
See [Digital Intermediate](production-workflow.md#digital-intermediate).

## Z

**Zero net change** — The principle that non-VFX regions of a plate must survive the compositing
pipeline bit-identical, with no unintended color space or encoding shift.
See [Visual Effects Production](production-workflow.md#visual-effects-production_1).
