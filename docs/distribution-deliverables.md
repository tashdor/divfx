# Distribution Deliverables for Independent Film

A distributor's *delivery schedule* is the itemized list of everything — picture masters, audio
stems, caption files, artwork, and a long tail of legal paperwork — that must be created, quality-
controlled, and handed over before a film is released and paid for. Treat it as a production schedule
of its own, not a hand-off checklist: the package is routinely underestimated, and it commonly gates
both the release date and the first payment.

The hard part for an independent production is that **you usually cannot know the exact
specifications until a distributor actually buys the film and gives you their schedule.** Distributors
and platforms each differ, schedules change year to year, and some line items are negotiable. Guessing
at a full deliverables package up front is a good way to pay for the same work twice.

!!! tip "The core strategy: finish archival-ready, produce specifics on demand"
    Get the **foundational, expensive-to-recreate** elements right during finishing — a clean
    high-quality archival master, textless elements, and a complete audio stem set — and **defer the
    format-specific deliverables until a buyer hands you real specs.** Done this way, whatever a
    distributor later asks for can be produced quickly and cheaply from materials you already have,
    without an expensive archival restore or a re-mix.

## What to lock now, and what to defer

**Lock during finishing** — costly or impossible to recreate later:

- A clean, well-organized **archival master** — graded, at your finishing resolution and color space,
  in a high-bit-depth format (16-bit DPX or OpenEXR, or ProRes 4444), with an **ungraded** archival
  master alongside. See [Archival](archival.md).
- **Textless elements** for every shot that has text over picture.
- The **audio mix session, discrete stems, and a fully-filled M&E** — printed while the mix stage is
  still open (see [Audio](#audio-what-to-mix-and-to-what-target) below).
- The **conform/finishing project** and a reliable archive (e.g. LTO), so any deliverable can be
  re-rendered without reconstructing the film.

**Defer until you have the buyer's spec** — cheap to produce from the above, and often varies or is
negotiable:

- the exact **ProRes flavor**, raster, and frame-rate build;
- **loudness-normalized near-field mixes** and specific channel maps;
- **caption / subtitle file formats** (`.scc` vs `.srt` vs `.itt`) and language versions;
- **head / tail builds**, slates, and distributor bumpers.

Producing these before you have the schedule risks doing them twice. Hold off — but only because the
foundation above lets you turn them around fast once the specs arrive.

## Master format: ProRes, not IMF

**Independent distributors overwhelmingly ask for a self-contained ProRes QuickTime (`.mov`), not an
[IMF](imf.md) package.** ProRes is the picture master across VOD, TVOD, and home-video distribution;
the distributor makes its own platform-specific encodes downstream. IMF is a studio-and-streamer
interchange format — produce it only when a studio, major streamer, broadcaster, or large catalog
aggregator specifically asks for it.

**ProRes 422 HQ is the common default.** Some distributors simply ask for ProRes 4444 or 4444 XQ
because they want a higher-quality master — the choice is fairly arbitrary and varies by house, not a
technical requirement of the deliverable itself. Your high-quality archival master is what lets you
output either flavor on request. See [Common Working Formats](working-formats.md#apple-prores).

## The picture master baseline

A few things hold across almost any HD picture master and are safe to assume before you have a spec:

- **Raster and rate.** 1920×1080, progressive, at the film's **native frame rate — 23.98 fps is the
  usual timebase.** Deliver at the original aspect ratio, letterboxed to *fill* the 1920×1080 raster
  (mattes baked in, not a cropped 1920×858 file).
- **No up-conversion.** A 4K master is meaningful only for a film actually *finished* in 4K; do not
  up-convert HD to 4K or SD to HD.
- **Color.** **Rec.709** for HD. 4K and HDR masters move to **BT.2020 with the
  [PQ / ST 2084](hdr.md#pq-and-hlg-are-not-interchangeable) EOTF** (Dolby Vision is the most common HDR
  flavor), at 10- to 16-bit, usually with an SDR derivation. See [HDR Mastering](hdr.md).
- **Heads and tails.** Modern file deliverables want the file *ready to play* — about one second of
  black at head and tail, no bars/tone/slate/2-pop — but some schedules still want a full broadcast
  head (bars, tone, slate, program at `01:00:00:00`). This is a classic per-buyer variable: **build it
  when you know the spec**, not before.

## Audio: what to mix, and to what target

Audio is the most under-budgeted part of an independent deliverables package, and the part where a
wrong assumption costs the most to fix later. Two ideas drive it: the **stem ladder** you must
produce, and the fact that a **theatrical mix and a near-field mix are different deliverables with
different loudness targets.**

### The stem ladder — build it during the mix

The baseline is **linear PCM, 48 kHz, 24-bit**, a **5.1 mix and a two-channel stereo/Lt-Rt fold-down**
(the stereo pair present even when 5.1 exists, and a true two-channel mix, not dual mono), plus
**discrete stems** — dialogue, music, and effects (DME) — and a **fully-filled M&E** (music and
effects) stem that reproduces *every* effect in the composite mix, not just a sum of the isolated
music and effects stems. A missing or partial M&E blocks foreign dubbing and kills international
licensing.

**Print all of this while the mix session is open.** Stems and a fully-filled M&E cost almost nothing
to bounce during the mix and are expensive to reconstruct once the session is torn down — this is the
audio half of "lock the foundation now."

### Theatrical vs. near-field — two mixes, two targets

A cinema mix and a home/streaming mix are not the same deliverable — the most important thing a
producer can understand before booking a stage:

- A **theatrical mix** is monitored on a dubbing stage at **reference level** (each screen channel at
  85 dB SPL from −20 dBFS pink noise, Dolby fader at 7) through the cinema **X-curve** (SMPTE ST 202).
  It is mixed *by ear* with wide dynamic range and is **not loudness-normalized to a number.** This is
  what feeds a [DCP](dcp.md).
- A **near-field mix** (home / home-theater / streaming) is monitored on near-field speakers at lower
  level and **delivered to a specific integrated-loudness target** measured per ITU-R BS.1770
  (LKFS/LUFS), with narrower dynamic range so it holds up on a TV, laptop, or phone.

You cannot simply hand a theatrical printmaster to a streamer — different monitoring, wider dynamics,
and no loudness normalization. The near-field mix is a **derived pass** off the theatrical mix: real
stage time, not a checkbox.

### Loudness targets by destination

| Destination | Integrated loudness | Max true peak |
| --- | --- | --- |
| **Theatrical / DCP** | Not normalized — mixed at calibrated reference (85 dB SPL, X-curve) | headroom; no fixed cap |
| **Netflix** (near-field mix) | **−27 LKFS** (±2 LU), whole program | **−2 dBTP** |
| **US broadcast** (ATSC A/85 / CALM Act) | **−24 LKFS** (±2 LU) | −2 dBTP |
| **EBU R128** (European broadcast) | **−23 LUFS** (±1) | −1 dBTP |

Netflix's **−27 LKFS** near-field target is the most-cited streaming spec and a safe number to plan
around before you know your platform; broadcast sits a few LU louder. Independent VOD/TVOD schedules
are far less consistent — some specify a LUFS target, some an old-style dBFS reference tone, some
nothing at all — which is exactly why you **confirm the number in the buyer's schedule and deliver to
it, rather than assuming any single value** (including "−24 LKFS").

### What to ask your mixer to bid

Tell the re-recording mixer, at bid time, what the film might become — it changes the bid:

- **If theatrical is at all possible, bid a theatrical mix *and* a near-field mix.** Mixing theatrical
  first and deriving the near-field is the cheaper order; retrofitting theatrical from a home mix is
  not.
- **Bid the full stem and M&E ladder** — 5.1 and stereo, discrete DME stems, and a fully-filled M&E —
  produced during the mix.
- **Bid the near-field loudness master to a real spec** (e.g. −27 LKFS for streaming), not "a stereo
  bounce."
- Even a streaming-only film needs that near-field mastering pass done to the platform's loudness
  target — budget it instead of discovering it at QC.

## Textless, forced narrative, and the "three masters" problem

"Textless" is not one thing, and conflating its variants is a classic delivery failure. Distributors
typically distinguish up to three separate picture versions:

- the **texted** master (titles, credits, and any on-picture text present),
- a **non-subtitled** master (all creative text present, but no burned-in subtitles), and
- a **fully textless** master — every shot that has text over picture supplied clean, so the
  distributor can localize it. (Rolling end-credit crawls are usually exempt; end-credit *cards over
  picture* are not.)

Newer VOD workflows add a fourth idea, the **"forced narrative"** — the subtitles that translate
on-screen foreign dialogue or signs — which must be separable so foreign versions can substitute their
own. The trap to avoid: **do not burn subtitles into your only master.** A burned-in-subtitle file
limits you to English-language territories, and producing a clean version afterward is treated as a
new package at additional cost. This is why textless elements belong in the "lock now" column.

## Captions and subtitles

Caption and localization files are their own deliverable stack:

- **Closed captions**, most often specified as **English SDH** (subtitles for the deaf and hard of
  hearing) in a format such as **`.scc`** — mandated for US distribution under the ADA/FCC rules.
  Typical constraints: ≤ 250 words/min, 32 characters per line, two lines maximum, and a 20-frame
  minimum / 10-second maximum caption duration.
- **Subtitles** in a format that varies by house — **`.srt`**, **`.stl`**, or **`.itt`** — with
  foreign-language subs (Latin-American Spanish and French are the most-requested) expanding the sale.
- A **CCSL** (combined continuity and spotting list) and/or **dialogue list** is a standard legal and
  localization deliverable; see the [DCP chapter](dcp.md) for how caption and continuity files also
  feed accessibility tracks (OCAP/CCAP) on the theatrical side.

### A caution on auto-transcription and AI captioning

Automatic captioning is the most tempting shortcut in the whole deliverables package — free or
near-free tools (built-in auto-captions, open-source speech-to-text, the AI tiers of transcription
services) produce a caption file in minutes. Modern speech-to-text is genuinely good at clean,
single-speaker English, and these tools have a real place: generating a **rough transcript to edit
from**, making cuts searchable, or roughing in timing.

!!! warning "AI captions are a draft, not a deliverable"
    Many distributors and VOD platforms **explicitly prohibit AI or auto-transcribed caption files**,
    because raw output fails platform QC on the things captioning is actually graded on:

    - **SDH non-speech information** — captions must identify speakers and describe music, sound
      effects, and off-screen audio; auto-transcription captures none of it.
    - **Reading speed and formatting** — hard limits on words-per-minute / characters-per-second, line
      length (≈ 32 characters), two lines, and minimum/maximum durations that raw output ignores.
    - **Timing and sync** — in/out must track the edit precisely; auto-timing drifts, especially over
      overlapping dialogue.
    - **Accuracy on the hard parts** — names, technical terms, accents, and homophones are exactly
      where it errs, and exactly what a viewer notices.

    And QC failures are not free: a distributor may repair the file and **charge it back, sometimes
    with a penalty.**

The workable path: **use AI to bootstrap the transcript if you like, but budget a professional
captioning / subtitling vendor — or at minimum a human conform-and-QC pass to spec — for the delivered
files.** Treat the free tools as a first draft, never as the master.

## Quality control

Almost every distributor requires the masters to **pass QC at an approved third-party facility**
before delivery is accepted, and the licensor usually pays for it. This is not a formality:

- Facilities are frequently **pre-approved** — some distributors will not accept delivery from a lab
  not on their list.
- QC failures are typically **recouped against you** — a distributor may repair a failing file and
  charge back the cost, sometimes with a penalty, before paying revenue.
- The bar can be a **specific standard** — an international-broadcast QC rather than a domestic-release
  pass, or a clause that HD masters are not approved until a Blu-ray QC pass.

Plan a QC cycle — and the possibility of a re-export and re-QC — inside your delivery timeline, not
after it.

## The legal and metadata package

The audiovisual files are the visible part; the legal and metadata deliverables are the bulk of the
list and the most common cause of a stalled delivery. A full schedule can run to **thirty-plus items**,
typically including:

- **E&O insurance** (errors & omissions) — effectively universal. Limits commonly cluster around
  **$1M per occurrence / $3M aggregate** with a deductible near $25K and a multi-year term, and can run
  higher at the top end. Confirm the exact limits and exclusions your distributor requires.
- **Chain of title** and a current (≤ 30-day) **copyright & title report**, proof of copyright
  registration, and often a **UCC search** confirming no secured creditor interests in the film.
- A **music cue sheet** and executed **music licenses** (and composer agreements).
- A **CCSL / dialogue list**, **metadata** sheet, **billing block**, **key art** (usually layered, with
  fonts), festival laurels, cast/crew list, and photo IDs & clearances.
- **Lab access letter**, **certificate of origin**, **talent agreements**, and — for some — an **ISAN**
  number.

Timelines are long and front-loaded: aggregators commonly want **all approved elements 90–120 days
before the street date**, and the delivery clock often does not start until *every* item is received
and QC'd. Set a release date only against a realistic deliverables schedule.

For a schedule this size, a **post-production supervisor or delivery coordinator** usually pays for
themselves — the deliverables package is a project of its own, and the paperwork gates the release as
hard as the picture master does.

## Trailer and marketing deliverables

The trailer is a deliverable in its own right and generally must **match the feature's aspect ratio,
frame rate, and finish quality**. Common rules: no MPAA/green-band or red-band rating cards unless
requested; no release dates, URLs, social handles, or "coming soon" text baked in; and, increasingly,
a **vertical 9:16 cutdown** for social platforms alongside the standard 16:9. Key art is specified per
platform with exact pixel dimensions, and an H.264 screener is often requested for review.
