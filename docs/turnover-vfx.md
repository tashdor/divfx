# Editorial Turnover for VFX Plate Pulls

There is no standard method for producing VFX plate pulls. Whether you are preparing a pull
order for a vendor, like your digital intermediate facility, or pulling the shots yourself, there are
several practices which can be of benefit.

The VFX producer and VFX supervisor are responsible for dictating the workflow and the
imaging pipeline that will be used for visual effects. It is important that the decision comes from
them and ripples downstream to the various artists and vendors, rather than multiple artists
and vendors working autonomously in different resolutions and formats without a cohesive and
compatible workflow.

## The Bid Package

A vendor needs enough information to understand the work and quote it accurately, and that
information is the bid package. Bidding is how a production decides which vendor gets the job — the
work of pulling plates and assembling reference has to happen regardless — so it is often worth
pulling the plates first, or at least representative frames, so a vendor can assess the actual
material rather than a written description of it. On studio films the bid package is assembled by
the VFX producer and their coordinators. On an independent production it usually falls to the
acting VFX supervisor or the editor, and it is worth the effort, because a vague request produces a
vague bid.

A complete bid package, covering each shot or group of shots, includes:

- Storyboards or previz that show the intended staging and action.
- Reference photography — on-set stills, cleanplates, texture and lighting reference, and any
  witness-camera or survey material captured during production.
- Visual examples: temp composites (slap comps), frame grabs from other films, or concept art
  that communicate the target look.
- The relevant cut or edit, so the vendor can see each shot in the context of the scene and
  understand its timing and its neighbors.
- The plate or plates the shot will be built from, or at minimum representative frames at the
  working resolution.
- A detailed written description of the desired effect for every shot: what was shot practically,
  what needs to be created or removed, how long it runs, and what the shot has to accomplish in
  the story.

When a vendor receives a complete package, they can bid against a clear scope rather than
guessing. Guesses get padded — a careful vendor prices in the uncertainty, and a careless one
underbids and discovers the real complexity halfway through the shot. Either way the production
pays for the ambiguity. Describing each shot precisely up front produces accurate bids,
comparable quotes across vendors, and far fewer surprises once the work is underway.

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
producing visual effects for those extra handle frames can add up significantly. Ultimately
the number of comp handle frames is subject to production budget and schedule.

A common example of how visual effects plates might be pulled and numbered:

<figure class="fseq-fig">
<div class="fseq"><span class="fcell h">1001</span><span class="fcell h">1002</span><span class="fcell h">1003</span><span class="fcell h">1004</span><span class="fcell e">1005</span><span class="fcell e">1006</span><span class="fcell e">1007</span><span class="fcell e">1008</span><span class="fcell e">1009</span><span class="fcell e">1010</span><span class="fcell e">1011</span><span class="fcell e">1012</span><span class="fcell e">1013</span><span class="fcell e">1014</span><span class="fcell e">1015</span><span class="fcell h">1016</span><span class="fcell h">1017</span><span class="fcell h">1018</span><span class="fcell h">1019</span></div>
<p class="fseq-key"><span class="sw" style="background:#e0912f26;border-color:#e0912f8c"></span> plate/comp handle frames<span class="sw" style="background:#4c7ef526;border-color:#4c7ef58c"></span> edit frames</p>
</figure>

It is often mandated that the visual effects artists and vendors return a completed shot with a
slate frame containing information about the shot, revisions made, the company name, artist's
initials, and a framing chart. In this case, the slate frame is prepended to the file sequence
without offsetting the frame numbering.

<figure class="fseq-fig">
<div class="fseq"><span class="fcell s">1000</span><span class="fcell h">1001</span><span class="fcell h">1002</span><span class="fcell h">1003</span><span class="fcell h">1004</span><span class="fcell e">1005</span><span class="fcell e">1006</span><span class="fcell e">1007</span><span class="fcell e">1008</span><span class="fcell e">1009</span><span class="fcell e">1010</span><span class="fcell e">1011</span><span class="fcell e">1012</span><span class="fcell e">1013</span><span class="fcell e">1014</span><span class="fcell e">1015</span><span class="fcell h">1016</span><span class="fcell h">1017</span><span class="fcell h">1018</span><span class="fcell h">1019</span></div>
<p class="fseq-key"><span class="sw" style="background:#e0912f26;border-color:#e0912f8c"></span> plate/comp handle frames<span class="sw" style="background:#4c7ef526;border-color:#4c7ef58c"></span> edit frames<span class="sw" style="background:#7a869544;border-color:#7a8695aa"></span> slate frame</p>
</figure>

It is common to start the first frame of comp handle or the first main frame at 1001 and work
backwards to the slate frame. This allows for a scenario in which the shot has been started but
frames are added to the head during editorial and VFX must add new frames to their work.
Starting at 1001 rather than 0001 allows for extension of head frames while preserving file
numbering of previously existing frames. For example: even after a change in shot duration,
frame 1034 will still be the same frame as in the initial pull.

Alternatively, it may be desired that the first main frame (first frame of the edit) is 1001 with
handles working backwards.

<figure class="fseq-fig">
<div class="fseq"><span class="fcell h">0997</span><span class="fcell h">0998</span><span class="fcell h">0999</span><span class="fcell h">1000</span><span class="fcell e">1001</span><span class="fcell e">1002</span><span class="fcell e">1003</span><span class="fcell e">1004</span><span class="fcell e">1005</span><span class="fcell e">1006</span><span class="fcell e">1007</span><span class="fcell e">1008</span><span class="fcell e">1009</span><span class="fcell e">1010</span><span class="fcell e">1011</span><span class="fcell h">1012</span><span class="fcell h">1013</span><span class="fcell h">1014</span><span class="fcell h">1015</span></div>
<p class="fseq-key"><span class="sw" style="background:#e0912f26;border-color:#e0912f8c"></span> plate/comp handle frames<span class="sw" style="background:#4c7ef526;border-color:#4c7ef58c"></span> edit frames</p>
</figure>

In some situations, you may intentionally provide more handle frames in the plate than are
required in the final comp.

```
Plate:  0993 … 0999 1000 1001 … 1015 1016 1017 1018 1019
Comp:        0996 … 1000 1001 … 1015
```

## Versioning

A costly mistake in visual effects shot management is losing track of versions, or not having
version numbers at all. It is impossible to have complete confidence in a conform — that is, that
the intended versions of shots are in a film — if there are no version numbers.[^7]
Version numbering practices are generally ubiquitous among artists and vendors, but occasionally there
is confusion.

[^7]: Some nameless vendors have been guilty of delivering entire feature films without version
      numbers, leaving the conform editors to rely solely on the delivery date to know whether
      they are using the most up to date shot.

Any revision to a shot, even a simple correction in render settings, or a redelivery because of a
corrupt frame, needs to have a new version number. Otherwise it is confusing for the production editorial team and conform editor to
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

## Turnovers and Count Sheets

The plate pull produces the media; the turnover is how that media, and the information that goes
with it, reaches the vendor. Each turnover packages the pulled plates, a locked reference video of
the cut, the relevant reference and support files, and a count sheet that tells the vendor exactly
what they are receiving.

The count sheet is the master list of every shot in the turnover. It tells the vendor about every
shot being requested, what materials they will need, where to find them, and exactly what each shot
involves. Per shot it typically carries:[^countsheet]

- **Shot code** (see [Visual Effects Shot Naming](#visual-effects-shot-naming) above), and the
  **sequence, scene, and reel** it belongs to.
- **Master (record) timecode** — where the shot sits in the cut — and the **source timecode** of
  the plate, plus the frame range, duration, and the number of **handle frames** on head and tail.
- The **plate ID or IDs** that make up the shot and where to find them (path or drive), and a
  **thumbnail** so the shot is identifiable at a glance.
- A description of the shot and, more usefully, a description of the **effect** required — broken
  out per element when a shot combines several.
- Technical notes that change the scope of the work: **retimes / speed changes**, **resizes and
  repositions**, **frame extensions**, split-screens, and any **elements arriving from another
  vendor**.
- The **assigned vendor**, the current **version**, and the shot's **status** (bid, awarded, in
  progress, in review, final).

The count sheet travels with the plates so the vendor can reconcile what they were told against
what actually landed on their drive, and it is the production's own record of what went out, to
whom, and when. Turnovers are usually built per vendor, containing only the shots assigned to
that vendor along with their plates, cleanplates, reference, and the Show LUT and CDL sidecars
described under [Support Files](#support-files). Keeping each vendor's turnover self-contained
avoids sending an artist material for shots they are not working on and keeps the delivery small
enough to transmit efficiently.

In practice the count sheet is rarely a separate document at all — it is a view of the same tracking
sheet the production is already using to manage the show, filtered down to the shots in that
turnover.

[^countsheet]: Expected count-sheet (or "turnover sheet" / "lineup sheet") content follows common
    feature practice — see, for example, [Evan Schiff, *Feature Turnover Guide — VFX*](https://www.evanschiff.com/articles/feature-turnover-guide-vfx/)
    and Park Road Post's [*Guide to VFX Handovers*](https://workflow.deganz.co.nz/wp-content/uploads/2020/08/PRPP_Guide_to_VFXHandovers_v0.4_20200222.pdf). **[web-sourced.]**

## Coordination and Tracking

None of this holds together without someone whose job is to keep it organized. On a large show
that is the VFX coordinator, working under the VFX producer; on an independent production the
role usually collapses into the VFX producer, the VFX editor, or whoever is acting as supervisor.
Whatever the title, someone has to own the list of shots, the versions in play, the outstanding
notes, and the deadlines, and keep all of it current as work comes and goes.

Full production-tracking platforms — Autodesk Flow Production Tracking (formerly Shotgun, then
ShotGrid) and ftrack — are built for exactly this and do it well, with shot databases, review
tools, and pipeline APIs. They are also heavy and complex, and the overhead of running one
rarely pays off on a show with a few dozen shots and a handful of artists. Most independent
productions run the whole thing on a Google Sheet instead: one row per shot, columns for the
information that would otherwise live on the count sheet, and a status column that everyone
reads from. It is low-tech, but it is shared, it is current, and it is the single source of truth the
count sheets and turnovers are drawn from. Production tracking is covered in more depth in
[Visual Effects Production Management](vfx-production-management.md).

Organization is also leverage. Independent productions routinely ask vendors and individual
artists for discounted or gifted work, and the ones who get it are the ones who make the work easy
to say yes to. Every hour a vendor spends deciphering a disorganized turnover, chasing a missing
plate, or reconciling contradictory notes is unpaid overhead — and it is exactly the menial work a
favor is not meant to cover. A production that hands over clean, complete, well-labeled material and
keeps its notes and versions straight is asking a vendor to donate their craft, not their patience,
and is far more likely to get the discount.

The count sheet is a good example. It should be detailed but easy to read, well organized, and lead
with the critical information. If it lists the source in and out timecodes of a plate but omits the
frame count, every bidder has to do the arithmetic themselves to work out how many frames they are
being asked to price. It is a small inconvenience, but a small inconvenience repeated across every
shot and every vendor is exactly the kind of friction to remove when you are asking someone to work
on your film for less than it is worth.

## The Creative Review Cycle

While a shot is being built, the filmmakers review it in progress. These early and in-progress
creative reviews are not about technical quality control; they are about content, design, and
whether the shot is working. The vendor renders a QuickTime with the Show LUT — the display
transform — baked in, so that the director, VFX supervisor, and editor see the shot in its intended
look rather than as a flat log image. The editor can cut that QuickTime into the timeline and
review it in the context of the surrounding scene.

Because the artists are usually remote, these reviews happen over the internet. Frame.io (now an
Adobe product) and cineSync are the common platforms: the vendor uploads a version, the
reviewers play it back and leave frame-accurate notes, and the vendor turns those notes into the
next version. That loop repeats until the shot is approved.

The loop is where things fall apart without discipline. Notes get left in an email, a text message,
and a review platform all at once; two people refer to the same shot by two different names; a
vendor delivers a new version against notes that have already been superseded. Every one of
these is an organizational failure rather than a creative one, and every one of them costs a
revision. The defenses are simple and non-negotiable: clear version numbers on every delivery
(see [Versioning](#versioning) above), one source of truth for notes so nobody is working from a
stale list, and unambiguous shot naming so there is never a question of which shot is being
discussed. This is what the coordinator and the tracking sheet exist to enforce.

## Final Turnover into the DI

Creative approval is not the finish line. When a shot is creatively approved in review, the vendor
turns it over in the agreed final format — typically EXR, at the delivery resolution, color space,
and handle length settled on at the start of the show (see
[Format Specification](#format-specification) above). That final render is conformed and cut into
the DI against the offline reference, graded by the colorist in the context of the finished
sequence, and put through quality control on the DI's calibrated pipeline.

That last step matters because a shot can look finished in a review platform and still fail in the
DI. Graded up on a theater screen or a reference monitor, matte lines, grain mismatches, and
black-point errors that were invisible in a compressed QuickTime become obvious — the same
issues covered under [Visual Effects Quality Control Practices](vfx-quality-control.md). A shot is
only truly final once it has been conformed, graded, and QC'd in the DI and confirmed to work in
the finished picture. Until then it is a creatively approved shot that has not yet proven itself in
context.
