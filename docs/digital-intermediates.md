# An Overview of Digital Intermediates

Digital intermediate color grading is now far past its infancy and is the standard method
for finishing feature films. In years past, film negative was cut, spliced, and timed by a color
timer at the lab. Thanks to advances in digital technology, feature films can be color graded
with much greater flexibility and control than before, and without generation loss or successive
image degradation. It is a non-destructive, non-linear, creative process that frees filmmakers to
work more organically.

It is often debated whether the term "digital intermediate" still has relevance, as fewer films
originate on film negative and even fewer exhibit on film prints. However, it arguably does
retain merit, as it is the central nexus where all forms of digital acquisition must funnel through
before the myriad digital distribution deliverables can be made. This confluence of formats,
resolutions, and bit depths is managed and streamlined during the digital intermediate process.

## Responsibilities of the Colorist

The colorist is a visual artist with an experienced eye and a skillset that blends the visual
narrative continuity strengths of a cinematographer and the problem solving skills of a VFX
compositor. Their eye is on the big picture, both literally and figuratively. They are responsible
for crafting the final look of the film with the filmmakers on a theatrical projector (or large
television if it is not a theatrical film). They manage color continuity so the film has a
cohesiveness that is natural and enjoyable to watch. This involves color matching and balancing
shots that otherwise would not match due to inevitable camera, lighting, or other
environmental discrepancies.

They are heavily involved in developing the look of the film. This is ideally a collaboration that
begins early in pre-production as the cinematographer performs camera, lighting, and
wardrobe tests. They want to see what the results are when projected on the big screen and
what kind of creative latitude they have to express that image in a different way. Colorists can
weigh in and help a cinematographer choose a camera based on the specific visual
requirements of the film. The digital intermediate is an extension of the cinematographer's
toolset, and the colorist can interactively explore different creative looks and moods, both
subtle and extravagant.

## Camera RAW

As the digital intermediate shoulders the responsibility of uniting many disparate camera and
image formats, it is common for camera original media to be processed natively during the
digital intermediate. Most modern digital cinema cameras rely on a form of RAW encoding,
collecting raw sensor data and preserving it for creative interpretation at a later time. This
presents many advantages over a traditional video workflow where colorimetric decisions are
pre-baked into the footage during acquisition, confining you to a specific look whether
intentionally or not.

Common examples of such cameras recording in a RAW format include:

| Camera family | RAW format |
| --- | --- |
| ARRI ALEXA 35 (also Mini LF, ALEXA 265) | ARRIRAW |
| Sony VENICE 2 (also BURANO) | X-OCN (16-bit) |
| RED V-RAPTOR / V-RAPTOR [X] (also KOMODO-X) | R3D (REDCODE RAW) |
| Blackmagic URSA Cine family | Blackmagic RAW (BRAW) |
| Canon EOS C400 / C500 Mark II | Cinema RAW Light |

The ARRI ALEXA 35 records ARRIRAW with **LogC4 / ARRI Wide Gamut 4** (ARRI REVEAL color science);
LogC3 / AWG3 remains correct for the ALEXA Mini LF and earlier bodies. Sony's VENICE 2 and BURANO
record 16-bit **X-OCN**. RED — acquired by Nikon in 2024 — records **R3D (REDCODE RAW)** across the
V-RAPTOR line. Blackmagic dropped CinemaDNG for **Blackmagic RAW (BRAW)** in 2018, now recorded
across the **URSA Cine** family. Canon's current Cinema EOS bodies record **Cinema RAW Light**.[^cameras]

[^cameras]: Current-generation bodies and formats as of 2025–26.

Camera RAW recording has become a ubiquitous standard in studio productions. Camera RAW
allows for greater workflow flexibility later in post while preserving the maximum image
resolution and quality the camera can produce. However, with added options comes added
potential for misinterpretation of the image data that can prove detrimental to the final
product.

The added flexibility of user-selectable color spaces and transfer functions requires diligence
and expertise to properly manage. It is not uncommon to hear of independent productions
where visual effects clip pulls are accidentally decoded using incorrect color spaces or transfer
functions. The worst case scenario is one in which the pulls are performed in a display-referred
setting, reducing the original dynamic range of the camera through a tone map. If this issue is
not identified early, it runs the risk of making it all the way through the VFX pipeline. Once the
shot finally makes it back to the digital intermediate, the colorist and the filmmakers will find
those shots severely limited and may be unable to match the creative look of the rest of the
scene.

Expertise in color management is necessary to properly maintain a film's image pipeline
integrity from acquisition all the way through to distribution. It isn't rocket science — it is color
science! When in doubt, involve your colorist or digital intermediate facility during
pre-production or production to sort out issues.

The two ideas that underpin the rest of this handbook — [scene-referred vs. display-referred imagery](scene-referred.md) and [look-up tables](luts.md) — are covered in their own chapters.

## Working with Visual Effects Mattes

When grading visual effects shots, it is often helpful to have mattes provided by the visual
effects artists and vendors to enable easy and accurate isolation of CGI elements, foregrounds, and
backgrounds in the composite. By utilizing the detailed mattes that were used in the
compositing process, a colorist can execute detailed color corrections very quickly without
resorting to complex rotoscoping, keying, and tracking that may otherwise be too time
consuming.

Mattes are delivered in the same working format and resolution as the delivered composite.
Typically, mattes are limited to three channels (RGB) and should be delivered in a normalized
linear encoding.[^4] Alternatively, OpenEXR supports multiple channels in addition to the primary
RGB layer. So mattes intended for the DI can actually be combined and delivered in the same
file as the comp, reducing conform time.

[^4]: 0.0–1.0 representing a percentage of opacity. Log mattes produce undesirable results or
      require pre-conversion to linear.

<figure markdown>
  ![RGB composite](figures/figure-02-rgb-composite.png){ loading=lazy }
  <figcaption>Figure 2 — RGB composite.</figcaption>
</figure>

<figure markdown>
  ![Three-channel DI matte](figures/figure-03-di-matte.png){ loading=lazy }
  <figcaption>Figure 3 — Three-channel DI matte.</figcaption>
</figure>

<figure markdown>
  ![Three-channel DI matte with separated RGB channels](figures/figure-04-di-matte-channels.png){ loading=lazy }
  <figcaption>Figure 4 — Three-channel DI matte (separated RGB channels).</figcaption>
</figure>
