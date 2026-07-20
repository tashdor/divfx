# Distribution Deliverables for Independent Film

Between finishing a film and earning revenue from it stands a document usually called the
*delivery schedule* or *schedule of deliverables*. It is the distributor's itemized list of
everything — picture masters, audio stems, caption files, artwork, and a long tail of legal
paperwork — that must be created, quality-controlled, and handed over before the film can be
sold. For an independent production the deliverables package is frequently underestimated: the
video file is a small fraction of the work, and the schedule routinely gates the release date and
the first payment.

This chapter is built from a survey of real independent-distributor delivery schedules and
filmmaker handbooks spanning 2016–2025 — theatrical/VOD aggregators, home-video and TVOD
labels, and a couple of per-title contractual schedules at the studio-specialty tier. The specifics
below (formats, loudness targets, insurance limits) are drawn directly from those documents; the
point is not any one distributor's rules but the pattern across them, and where that pattern
diverges enough to hurt you.

!!! note "What this is not"
    A delivery schedule is a contract exhibit, and the numbers move year to year and label to
    label. Treat everything here as the *shape* of what to expect, and always deliver to the
    signed schedule in your own agreement — not to a remembered spec.

## The master format reality: ProRes, not IMF

The single most useful thing to know is that **the independent world runs on Apple ProRes, not
[IMF](imf.md).** Across every distributor surveyed, the required picture master is a self-contained
ProRes QuickTime (`.mov`) delivered on a hard drive or by upload. Not one of these independent
schedules requires an IMF package as a deliverable. IMF is real and it matters — but it is a
*studio-and-streamer* interchange format (Netflix, the major broadcasters, the large catalog
aggregators). The label releasing an independent feature to iTunes, Amazon, and the TVOD
platforms almost always wants a ProRes file, and its own house does the platform-specific
encoding downstream. Very few independent distributors want, or can even ingest, an IMP.

Which flavor of ProRes varies, and it is worth getting right:

| Distributor (tier) | Required picture master |
| --- | --- |
| Gravitas Ventures (VOD/home-video) | **ProRes 422 HQ** strongly preferred; ProRes 4444 accepted |
| Artist View Entertainment (sales agent) | **ProRes 422 HQ** HD master; ProRes 4444 for 4K |
| Monkey Wrench Films (VOD aggregator) | **ProRes 422 HQ, 4444, or 4444 XQ** |
| Freestyle Digital Media (VOD/home-video) | **ProRes 422 HQ** (textless master ≥ 160 Mbit/s); HDCAM-SR in older schedules |
| Utopia (theatrical + VOD) | **ProRes 4444, 16-bit** for *every* video master, plus a **SMPTE DCP** |
| Studio-specialty per-title (theatrical) | **ProRes 4444** OAR master + **ProRes 422 HQ** marketing master, over a DPX/EXR archival tier |

The takeaway: **ProRes 422 HQ is the workhorse deliverable**, ProRes 4444 (or 4444 XQ) is what you
supply when there is an alpha, a higher-end finish, or a distributor like Utopia that standardizes
on it, and 4K masters move up to 4444. See [Common Working Formats](working-formats.md#apple-prores)
for the codec details.

## The technical baseline of a master

Underneath the codec choice, the surveyed schedules agree on a remarkably consistent HD master:

- **Raster and rate.** 1920×1080, progressive, at the film's **native frame rate — 23.98 fps is the
  assumed and strongly preferred timebase.** Deliver at the original aspect ratio, letterboxed to
  *fill* the 1920×1080 raster (i.e. 1920×1080 with mattes baked in, not a cropped 1920×858 file).
- **No up-conversion, ever.** Every technical schedule that addresses it forbids up-converting SD to
  HD or HD to 4K. A 4K master is accepted only for a film actually *finished* in 4K — and one
  distributor requires the 4K and HD masters to be delivered as two separate sets.
- **Color.** **Rec.709** is the HD standard. 4K and HDR masters move to **BT.2020 with the
  [PQ / ST 2084](hdr.md#pq-the-hdr-eotf) EOTF**, with **Dolby Vision** the most commonly named HDR
  flavor; those tiers ask for 10- to 16-bit and, at the top end, a full HDR master with an SDR
  derivation. See [HDR Mastering](hdr.md).
- **Heads and tails — read the specific document.** Modern file-based schedules (2019–2025) want the
  file *ready to play*: roughly **one second of black at head and tail, and no bars, tone, slate, or
  2-pop** on the picture master. Older, tape-derived schedules (2016–2018) demand the opposite — a
  full broadcast head with program starting exactly at `01:00:00:00`, preceded by bars and tone,
  black, and a slate. Do not reuse one distributor's head build for another.
- **Distributor bumpers.** Several labels require their animated logo/bumper to be conformed onto the
  head of every master (and the DCP). Budget the re-export.

## Audio: 5.1 + stereo, stems, and fully-filled M&E

Audio is where independent deliverables get laborious. The near-universal baseline is **linear PCM,
48 kHz, 24-bit** (16-bit is sometimes still permitted), and a **5.1 mix plus a two-channel
stereo/Lt-Rt fold-down is expected as the floor** — with the stereo pair required to be present
*even when 5.1 exists*, and to be a true two-channel mix, not dual mono.

Beyond the mix embedded in the picture master, the schedules ask for **discrete audio stems as
separate WAV/AIFF files**: dialogue, music, and effects (DME), and — critically for any hope of
international sales — a **fully-filled M&E (music and effects) stem.** "Fully-filled" is emphatic in
these documents: the M&E must reproduce every effect the composite mix contains so the film can be
dubbed into another language, not merely a sum of the isolated music and effects stems. A missing or
partial M&E blocks foreign licensing.

Channel mapping is where houses differ; two conventions dominate. One is an **8-channel embedded
layout** — `L, R, C, LFE, Ls, Rs, Lt, Rt`. The other front-loads the fold-down and M&E, then the
5.1, running to **10–16 channels** — e.g. stereo on 1–2, M&E on 3–4, the 5.1 on 5–10, and a 5.1 M&E
on 11–16. Map to the exact table in your schedule.

### Loudness is inconsistent — do not assume a single number

The one place these schedules genuinely conflict is loudness, and several of them do not even
express it in the modern integrated-loudness unit:

| Source | Loudness / level target |
| --- | --- |
| Sales-agent schedule (2019) | **−23 LUFS integrated (±1 dB)**, true peak −10 dBFS; HDR ref −18 dBFS |
| VOD aggregator (2025) | Levels in **dBFS**: DCP ≈ −20, broadcast/streaming ≈ −23, VOD **peaking at −7** |
| Tape-era / per-title schedules | **−20 dBFS** reference tone; no integrated-loudness target |
| Several handbooks | **No loudness figure at all** |

Two practical warnings follow. First, a mix delivered at one distributor's loudness will *not*
automatically satisfy another's — confirm the number in your schedule and re-measure. Second, the
familiar broadcast/streaming target of **−24 LKFS** (US ATSC A/85) and the −23 LUFS EBU R128 figure
belong to the *broadcast and major-streamer* world; in this independent survey they appear only
patchily, so do not assume "−24 LKFS" is what your indie distributor wants without checking.

## Textless, forced narrative, and the "three masters" problem

"Textless" is not one thing, and conflating its variants is a classic delivery failure. The
schedules distinguish up to three separate picture versions:

- the **texted** master (titles, credits, and any on-picture text present),
- a **non-subtitled** master (all creative text present, but no burned-in subtitles), and
- a **fully textless** master — every shot that has text over picture supplied clean, so the
  distributor can localize it. (Rolling end-credit crawls are usually exempt; end-credit *cards over
  picture* are not.)

Newer VOD schedules add a fourth idea, the **"English forced narrative"** — the subtitles that
translate on-screen foreign dialogue or signs — which must be separable so foreign versions can
substitute their own. The trap to avoid: **do not burn subtitles into your only master.** A
burned-in-subtitle file limits you to English-language territories, and producing a clean version
afterward is processed as a new package at additional cost.

## Captions, subtitles, and continuity

Caption and localization files are their own deliverable stack:

- **Closed captions** in **`.scc`** are effectively universal, most often specified as **English SDH**
  (subtitles for the deaf and hard of hearing) — mandated for US distribution under the ADA/FCC
  rules. Typical constraints: ≤ 250 words/min, 32 characters per line, two lines maximum, and a
  20-frame minimum / 10-second maximum caption duration.
- **Subtitles** vary by house — **`.srt`**, **`.stl`**, or **`.itt`** — and foreign-language subs
  (Latin-American Spanish and French are the most-requested) expand the sale.
- A **CCSL** (combined continuity and spotting list) and/or **dialogue list** is a standard legal and
  localization deliverable; see the [DCP chapter](dcp.md) for how caption and continuity files also
  feed accessibility tracks (OCAP/CCAP) on the theatrical side.

!!! warning "Caption sourcing"
    One aggregator's guidelines explicitly warn against generating captions with consumer
    auto-transcription services (naming Rev.com) or AI, on the grounds that they fail platform QC.
    Independent-platform QC is unforgiving of caption timing and formatting errors — budget a human
    captioning vendor.

## QC is a gate, and failures cost money

Almost every schedule requires the masters to **pass QC at a distributor-approved third-party
facility** before delivery is accepted, and the licensor usually pays for it. This is not a
formality:

- Labs are **pre-approved** — several distributors will not accept delivery from a facility not on
  their list.
- QC failures are **recouped against you.** One schedule reserves the right to fix a failing caption
  file and charge the cost back *plus a 50% penalty*; others recoup all QC and repair costs before
  any revenue is paid.
- The bar can be a **specific standard** — "International Broadcast Standard" QC rather than a
  domestic-release pass, or a masters-not-approved-until-**Blu-ray-QC-pass** clause.

Plan for a QC cycle (and the possibility of a re-export and re-QC) inside your delivery timeline, not
after it.

## The paperwork is most of the package

The audiovisual files are the visible part; the legal and metadata deliverables are the bulk of the
list and the most common cause of a stalled delivery. A representative documents list runs to
**thirty-plus items** and typically includes:

- **E&O insurance** (errors & omissions) — universal, and the limits cluster tightly:

    | Tier | E&O requirement |
    | --- | --- |
    | Common independent (Gravitas, Freestyle, Monkey Wrench) | ~**$1M per occurrence / $3M aggregate**, ≤ $25K deductible, 3-year (or Term + years) minimum |
    | Higher (Utopia) | **$3M per occurrence / $5M aggregate**, no title/music/home-video exclusions |

- **Chain of title** and a current (≤ 30-day) **copyright & title report**, proof of copyright
  registration, and often a **UCC search** confirming no secured creditor interests in the film;
- a **music cue sheet** and executed **music licenses** (and composer agreements);
- a **CCSL / dialogue list**, **metadata** sheet, **billing block**, **key art** (usually layered,
  with fonts), festival laurels, cast/crew list, and photo IDs & clearances;
- **lab access letter**, **certificate of origin**, **talent agreements**, and — for some — an
  **ISAN** number.

The timelines are long and front-loaded: aggregators commonly want **all approved
elements 90–120 days before the VOD street date**, and the delivery clock does not start until
*every* item is received and QC'd. Set a release date only against a realistic deliverables schedule
— several distributors will not move a date once it is booked.

## Trailer and marketing deliverables

The trailer is a deliverable in its own right and generally must **match the feature's aspect ratio,
frame rate, and finish quality**. Common rules across the schedules: no MPAA/green-band or red-band
rating cards unless requested; no release dates, URLs, social handles, or "coming soon" text baked
in; and, increasingly, a **vertical 9:16 cutdown** for social platforms alongside the standard
16:9. Key art is specified per platform (iTunes/Apple, Amazon, Google Play, Fandango/Vudu, Tubi, and
others) with exact pixel dimensions, and an H.264 screener is often requested for review.

## Recommendations and warnings

- **Master to ProRes, not IMF, for independent distribution.** Deliver ProRes 422 HQ as the
  workhorse; supply ProRes 4444 / 4444 XQ where an alpha, a higher-end finish, a 4K master, or a
  4444-standardized distributor requires it. Reserve IMF for a studio or major-streamer deal that
  actually asks for it.
- **Build the audio ladder early.** A 5.1 mix, a true stereo fold-down, discrete DME stems, and a
  *fully-filled* M&E are the difference between a domestic-only sale and an international one. Retrofitting
  M&E after the mix is dismantled is expensive.
- **Never deliver a single subtitle-burned master.** Keep titles, forced-narrative subtitles, and
  creative text separable so you can produce texted, non-subtitled, and fully-textless versions.
- **Confirm the loudness number in your own schedule** and re-measure — there is no universal indie
  target, and "−24 LKFS" is a broadcast/streamer figure, not a given here.
- **Read the head/tail spec for each distributor** — modern file masters want clean black and no
  slate; tape-lineage schedules want a full bars/tone/slate head.
- **Use approved captioning and QC vendors, and budget for a re-QC.** Auto/AI captions and
  non-approved labs get rejected, and failures are charged back to you.
- **Start the paperwork with the film, not after it.** E&O, chain of title, copyright and title
  reports, cue sheets, and clearances gate the release as hard as the picture master does.
- **Hire a post-production supervisor or delivery coordinator** if the schedule is large. The
  handbooks themselves recommend it; the deliverables list is a project unto itself.

## Catalog of surveyed delivery schedules

The synthesis above draws on the following documents. Filmmaker-facing handbooks and spec sheets are
named; per-title contractual schedules are described generically to respect their confidential and
contract-specific nature.

| Source | Type | ~Date | Master format | Notable |
| --- | --- | --- | --- | --- |
| **Gravitas Ventures** — Standard Specs (HD) | Tech spec sheet | 2017–18 | ProRes 422 HQ preferred | Rec.709; native fps; no up-conversion; textless rules |
| **Gravitas Ventures** — 4K Standard Specs | Tech spec sheet | 2018 | Native 4K DCI/UHD | 4K only if shot 4K; HD set also required; JPEG 2000 "IMF Profile" reference; Dolby Vision |
| **Gravitas Ventures** — Distribution Handbook | Filmmaker handbook | 2018 | (points to spec sheets) | Approved-labs-only QC; E&O $1M/$3M |
| **Utopia** — Delivery Schedule (Utopia Select) | Contract schedule | 2025 | **ProRes 4444, 16-bit** | SMPTE DCP (ST 428-1/ST 429-2) + OCAP/CCAP; full stem set; V01–V09 + D01–D32; E&O $3M/$5M |
| **Utopia** — Filmmaker Deliverables FAQ | Deliverables FAQ | 2025 | (companion to schedule) | Explains 32 document deliverables; SDH `.scc`; Vitac/Rev/SDI vendors |
| **Artist View Entertainment** — Schedule of Delivery | Contract schedule | 2016 | ProRes 422 HQ + HDCAM-SR | Tape-era head format; 4×3 title-safe; fully-filled M&E |
| **Artist View Entertainment** — Schedule of Delivery | Contract schedule | 2019 | ProRes 422 HQ (4444 for 4K) | −23 LUFS; 16-channel audio; scope must also ship 1.78; file-based |
| **Freestyle Digital Media** — VOD Delivery (Schedule A) | Contract schedule | 2017 | HDCAM-SR + ProRes | Mojo QC (prepaid); ProRes textless ≥ 160 Mbit/s; DA-88/DVD-R audio |
| **Monkey Wrench Films** — Required Deliverables | Deliverables handbook | 2025 | ProRes 422 HQ / 4444 / 4444 XQ | HD or 4K only (no 2K); per-platform key art; "no Rev.com/AI captions"; forced-narrative rules |
| Studio-specialty per-title schedule | Contract exhibit | 2019 | ProRes 4444 + 422 HQ | Archival tier: DPX/EXR DI, DSM, DCDM (16-bit TIFF X′Y′Z′), LTO-7, Dolby Vision, nearfield mix; Fotokem QC |
| Independent per-title strategy memo | Confidential strategy | 2025 | (points to aggregator specs) | ≥ 120 days pre-TVOD delivery; Fr./LatAm-Spanish subs for international |
