# Editorial Turnover for VFX Plate Pulls

There is no standard method for producing VFX plate pulls. Whether you are preparing a pull
order for a vendor, like your digital intermediate facility, or pulling the shots yourself, there are
several practices which can be of benefit.

The VFX producer and VFX supervisor are responsible for dictating the workflow and the
imaging pipeline that will be used for visual effects. It is important that the decision comes from
them and ripples downstream to the various artists and vendors, rather than multiple artists
and vendors working autonomously in different resolutions and formats without a cohesive and
compatible workflow.

## Timeline Preparation

In order to facilitate an accurate plate pull, edit lists must be derived from simplified timelines.
Like a normal DI turnover, lists should not contain any nested sequences. Image effects, resizes,
and repositions should all be removed.

Typically pull lists do not include handles; rather the handles are specified to the vendor
performing the pulls and added at that time. The pull lists should reflect the frames in the edit,
not the handle frames.

Timewarps should be removed and the clips extended or shortened to precisely match the
frames necessary to produce the timewarp.

It is common that separate pull orders are made for each visual effects sequence in a film as
those sequences are soft-locked. This often happens out of narrative chronological order, and
in smaller subdivisions than reels.

Unique VFX shot names are given to each clip, often designated by a timeline marker or other
agreed-upon clip list to communicate that information to the operator performing the pulls.

## Visual Effects Shot Naming

Shot naming conventions vary from project to project and are at the VFX supervisor's and VFX
producer's discretion. Some like to subdivide a film based on scene number, but as scenes are
frequently reordered during editorial, they have the potential to lose significance. Additionally,
scene breaks may occur in rapid fashion, intercut throughout a sequence. Therefore, it is
common to subdivide based on sequence names, giving each shot a sequence ID prefix so the
artists and producers know what story moment those elements pertain to. The logical divisions
are typically decided upon by the visual effects producer, coordinators, and other production
managers.

Shot numbering is relative to a specific sequence. Shots are often started at 0010 and
increment in tens (0020, 0030…) in sequence order. This is done so that if a new shot (or
multiple shots) is inserted in between pre-existing VFX shots, there are available numbers to
assign to the new shot without breaking the sequence numbering logic.

In situations where a certain, more specialized and non-scene-descriptive class of visual effect is
utilized — for example mobile phone message overlay graphics or other forced narrative titles —
it may be more convenient to label those as a single sequence name throughout the entire
show. That way all of those similar graphics are logically named and grouped together,
regardless of their underlying plate or scene content. This is valid whether the graphics are
supplied prematted with an alpha channel or pre-composited into the scene.

There is no golden rule to VFX shot naming and it is completely dependent on the needs of the
production and the people managing it.

Establishing and adhering to a well-defined naming convention is critical for success when
working with even a small number of visual effects shots. If all vendors and artists follow that
naming convention, it is easier to build reliable pipeline tools and consistently translate
information between artists and systems.

### File Naming Conventions

While many operating systems support the use of special characters and punctuation in file and
folder names, they often present issues for professional post-production systems, databases,
and software running on Linux operating systems. Most Linux distributions are case-sensitive
and the files `myProject` and `myproject` would be two valid files and would not collide.

It is preferable to use underscores (`_`) in place of spaces, and periods (`.`) to delineate
between file name, frame numbers, and extension. The use of parentheses and other special
characters is highly discouraged.

VFX producers will provide vendors with documentation prescribing file naming conventions for
their project. A common naming convention, used with subtle variations between projects and
producers:

```
<SEQ><SHOT#4>_<CLASS>_V<VER#3>_<OPTIONAL>_<POLARITY>.#4.ext
```

Example: `ABC0130_V002.0012.dpx`, `ABC0150_bg1.0123.dpx`

| Token | Meaning |
| --- | --- |
| `<SEQ>` | The sequence prefix is a 3-letter abbreviation of the sequence name. |
| `<SHOT>` | The shot number is a 4-digit zero-padded enumerator. Incremented in multiples of 10. |
| `<CLASS>` | Descriptor used to denote specific plate classifications. |
| `V<VER#3>` | The version number is a 3-digit padded enumerator preceded by `V`. |
| `<OPTIONAL>` | Additional descriptor. |
| `<POLARITY>` | Stereo 3D polarity flag written as a full lowercase word. |
| `#4` | Frame number is a 4-digit zero-padded enumerator. Preceded and followed by dots (`.`) as divisors, not underscores (`_`). |
| `ext` | The file extension. |

Plate classifications:

| Class | Meaning |
| --- | --- |
| `bg#` | Background plate |
| `fg#` | Foreground plate |
| `comp` | Composite (render) |

Optional descriptors:

| Descriptor | Meaning |
| --- | --- |
| `matte#` | Matte (i.e. `_matte1`, `_matte2`, `_matte123`, `_matte456`) |

Stereo 3D polarity flags: `left`, `right`.

Example plate pull:

```
./plates/kxn0010_bg1/3072x1280/kxn0010_bg1.1001-1073.dpx
```

Example comp:

```
./renders/kxn0010_comp_v001/3072x1280/kxn0010_comp_v001.1000-1073.dpx
```

## Frame Numbering and Handles

Depending on the needs of the project and the budgetary constraints, visual effects frame
handles (padding) can vary from 4–8 frames, or even none at all. Typically handles are desired
so that if there is any last minute need to roll an edit by a frame or two, the picture editor has
that flexibility. However, over the course of an entire feature film, the work that goes into
producing visual effects for those extra handle frames can add up to be significant. Ultimately
the number of comp handle frames is subject to production budget and schedule.

A common example of how visual effects plates might be pulled and numbered:

```
1001 1002 1003 1004 1005 1006 1007 1008 1009 1010 1011 1012 1013 1014 1015 1016 1017 1018 1019
└── PLATE HANDLE ──┘└──────────── PLATE EDIT FRAMES ────────────┘└───── PLATE HANDLE ─────┘
```

It is often mandated that the visual effects artists and vendors return a completed shot with a
slate frame containing information about the shot, revisions made, the company name, artist's
initials, and a framing chart. In this case, the slate frame is prepended to the file sequence
without offsetting the frame numbering.

```
1000 1001 1002 1003 1004 1005 1006 1007 1008 1009 1010 1011 1012 1013 1014 1015 1016 1017 1018 1019
SLTE └─ COMP HANDLE ─┘└──────────── COMP EDIT FRAMES ────────────┘└────── COMP HANDLE ──────┘
```

It is common to start the first frame of comp handle or the first main frame at 1001 and work
backwards to the slate frame. This allows for a scenario in which the shot has been started but
frames are added to the head during editorial and VFX must add new frames to their work.
Starting at 1001 rather than 0001 allows for extension of head frames while preserving file
numbering of previously existing frames. For example: even after a change in shot duration,
frame 1034 will still be the same frame as in the initial pull.

Alternatively, it may be desired that the first main frame (first frame of the edit) is 1001 with
handles working backwards.

```
0997 0998 0999 1000 1001 1002 1003 1004 1005 1006 1007 1008 1009 1010 1011 1012 1013 1014 1015
└── PLATE HANDLE ──┘└──────────── PLATE EDIT FRAMES ────────────┘└───── PLATE HANDLE ─────┘
```

In some situations, you may intentionally provide more handle frames in the plate than are
required in the final comp.

```
Plate:  0993 … 0999 1000 1001 … 1015 1016 1017 1018 1019
Comp:        0996 … 1000 1001 … 1015
```

## Versioning

A costly mistake in visual effects shot management is losing track of versions, or not having
version names at all. It is impossible to have complete confidence in a conform — that is, that
the intended versions of shots are in a film — if there are no version numbers.[^7]
Version numbering practices are generally ubiquitous among artists and vendors, but occasionally there
is confusion.

[^7]: Some nameless vendors have been guilty of delivering entire feature films without version
      numbers, leaving the conform editors to rely solely on the delivery date to know whether
      they are using the most up to date shot.

Any revision to a shot, even if it is just a change in render settings, needs to have a new version
number. Otherwise it is confusing for the production editorial team and conform editor to
know which version should be cut in if they have received multiple deliveries of shots with the
same version number.

Sometimes when working with multiple VFX vendors, a producer will institute a version
numbering policy in which each vendor starts their version numbers differently. That way
anyone involved can tell which vendor did the work just by looking at the file name.

For example Vendor A may start their version numbers at 1001, while Vendor B starts at 2001.

```
Vendor A    kxn0010_comp_v1001
Vendor B    kxn0020_comp_v2001
```

## Format Specification

Many cameras now acquire images in resolutions greater than 4K. However, many studio
features are still finishing at 2K, while preserving archival masters at camera native resolutions
for future releases. Often, 2K or 1080p HD are the final finishing resolutions of an independent
feature.

4K VFX production is often prohibitively expensive and production will need to decide on an
imaging pipeline that suits their budgetary goals as well as the delivery requirements of their
distributor(s). This decision has an impact on how visual effects plates will be pulled, as well as
how visual effects artists and vendors will deliver shots back to production and the digital
intermediate.

Data transfer time (a billable resource) is also a factor in what specifications your plates and
shots fall into.

It is quite common for the camera acquisition format, visual effects plate format, and vendor
delivery format to all differ.

For example: you may shoot 6K on a RED Dragon, pull plates at 4K, and receive 2K final VFX
back from your artists and vendors. This provides the vendors with a high resolution plate with
enough detail for tracking, even though the ultimate deliverable is 2K.

Clearly defining these three critical formats is essential:

1. Acquisition format
2. VFX plate pull format
3. VFX vendor delivery format

Each of these formats is defined by:

- Raster dimensions (resolution)
- Scaling methods used to achieve that raster from the source media (scaled or cropped)
- File type (DPX, EXR, ProRes)
- Bit depth (10-bit, 12-bit, 16-bit)
- Color space and transfer function (encoding)

Before any plate pulls or visual effects work begins, make sure these formats and requirements
are clearly defined to all parties involved.

## Support Files

In addition to the plates themselves, it is common to supply the Show LUT and ASC CDL values
in sidecar XMLs (`.cc`) and/or LUTs, so they are easily accessible by whichever artists are
delivered the plate(s). Alternatively, a Color Correction Collection XML (`.ccc`) "codebook" can be
generated containing a lookup of all VFX shots and their corresponding CDL values. This is rarely
distributed to individual artists, as it is more convenient to supply them with only the
information they need for their specific shots (e.g. a `.cc` file per shot).

Frames are commonly contained in a resolution subdirectory. This is common practice even
when only a single plate format is used and is complementary to traditional digital intermediate
workflows. It is particularly useful in situations where proxy resolutions are generated to
accelerate compositing. Various resolutions can be contained within a single shot directory.

Example plate pull directory structure:

```
./support_files/kxn_RedLogFilm_to_Rec709_FF.cube

./kxn_0010_bg1/3072x1280/kxn_0010_bg1.1001-1073.dpx
./kxn_0010_bg1/support_files/kxn_0010_bg1.cc
./kxn_0010_bg1/support_files/kxn_0010_bg1.cube
```
