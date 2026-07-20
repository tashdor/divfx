# Supplemental Reading & Resources

The documents, standards, books, and tools cited or referenced across this handbook, gathered in one place. Where a work is freely available, the link goes to the PDF or hosting page; where it is sold, the link goes to the publisher or vendor page that offers it.

!!! note "How sourcing is marked in the text"
    Claims in the newer chapters are checked against the primary sources below and cited inline. A claim that rests only on current web reporting — principally anything about **ACES 2.0**, which postdates the newest Academy ACES document cited here (2018) — is flagged **`[web-sourced]`** and should be re-verified against the primary specification before print.

## Standards

### SMPTE

As of 2025, SMPTE standards are **freely available** from the [SMPTE standards library](https://pub.smpte.org/) (the ACES set also has a curated [landing page](https://www.smpte.org/standards/aces-standards)). Cited here — each links to its document page:

- **[ST 2065-1](https://pub.smpte.org/pub/st2065-1/)** — Academy Color Encoding Specification (ACES2065-1), the AP0 interchange encoding
- **[ST 2065-4](https://pub.smpte.org/pub/st2065-4/)** — ACES image container file layout (the constrained OpenEXR container)
- **[ST 2065-5](https://pub.smpte.org/pub/st2065-5/)** — ACES clip-level metadata file (ACESclip)
- **[ST 2067-21](https://pub.smpte.org/pub/st2067-21/)** — IMF Application #2E (the streaming/versioning application)
- **[ST 2067-201](https://pub.smpte.org/pub/st2067-201/)** — IMF Immersive Audio Bitstream (IAB)
- **[ST 2084](https://pub.smpte.org/pub/st2084/)** — PQ (Perceptual Quantization) EOTF
- **[ST 2086](https://pub.smpte.org/pub/st2086/)** — Mastering-display color-volume metadata (static)
- **ST 2094** — Dynamic metadata for color-volume transform (Dolby Vision, HDR10+): [-1](https://pub.smpte.org/pub/st2094-1/), [-10](https://pub.smpte.org/pub/st2094-10/), [-40](https://pub.smpte.org/pub/st2094-40/)
- **[ST 428-1](https://pub.smpte.org/pub/st428-1/)** — D-Cinema Distribution Master (DCDM) X′Y′Z′ image encoding
- **[ST 379-1](https://pub.smpte.org/pub/st379-1/)** and **[ST 422](https://pub.smpte.org/pub/st422/)** — MXF generic container and JPEG 2000 mapping
- **[ST 2019-1](https://pub.smpte.org/pub/st2019-1/)** — VC-3 (Avid DNxHD) bitstream
- **[RP 431-2](https://pub.smpte.org/pub/rp431-2/)** — D-Cinema projection reference (P3 / 48 cd/m²)
- **SMPTE 195-1993** and **PH22.106** (1957, 1971) — anamorphic ("CinemaScope") aperture and aspect-ratio history

### ITU-R (freely downloadable at itu.int)

- **[BT.709](https://www.itu.int/rec/R-REC-BT.709)** — HDTV primaries, white point, and camera OETF
- **[BT.1886](https://www.itu.int/rec/R-REC-BT.1886)** — reference EOTF for flat-panel SDR displays
- **[BT.2020](https://www.itu.int/rec/R-REC-BT.2020)** — UHDTV wide-gamut primaries
- **[BT.2100](https://www.itu.int/rec/R-REC-BT.2100)** — HDR television (PQ and HLG)
- **[Report BT.2390](https://www.itu.int/pub/R-REP-BT.2390)** — high dynamic range television (the OETF/EOTF/OOTF discussion)

## Academy / ACES

- **[ACES documentation hub](https://docs.acescentral.com/)** — encodings ([ACES2065-1](https://docs.acescentral.com/encodings/aces2065-1/), [ACEScg](https://docs.acescentral.com/encodings/acescg/), [ACEScc](https://docs.acescentral.com/encodings/acescc/), [ACEScct](https://docs.acescentral.com/encodings/acescct/)), the [Input](https://docs.acescentral.com/system-components/input-transforms/) / [Output](https://docs.acescentral.com/system-components/output-transforms/) / [Look](https://docs.acescentral.com/system-components/look-transforms/) Transforms, [AMF](https://docs.acescentral.com/amf/specification/), [CLF](https://docs.acescentral.com/clf/specification/), [Reference Gamut Compression](https://docs.acescentral.com/rgc/specification/), and the [white point](https://docs.acescentral.com/white-point/)
- **[aces-dev](https://github.com/ampas/aces-dev)** — the reference transforms (CTL) and the technical documents cited here: Technical Bulletins **TB-2014-004**, **TB-2014-009**, **TB-2014-010**, **TB-2014-012**, **TB-2018-001**, and Specifications **S-2013-001**, **S-2014-003**, **S-2014-004**
- **[aces (ASWF)](https://github.com/aces-aswf/aces)** — the current Academy Software Foundation ACES project

## Books

- **[Cinematic Color: From Your Monitor to the Big Screen](https://cinematiccolor.org/)** — the VES/ASWF color primer (free; [PDF](https://github.com/jeremyselan/cinematiccolor/raw/master/ves/Cinematic_Color_VES.pdf))
- **[Color and Mastering for Digital Cinema](https://www.routledge.com/Color-and-Mastering-for-Digital-Cinema/Kennel/p/book/9780240808741)** — Glenn Kennel (Routledge/Focal Press, 2006); the DCI X′Y′Z′ encoding and the 52.37 normalization rationale. Also a [free borrow at the Internet Archive](https://archive.org/details/colormasteringfo0000kenn)
- **[Colour: Sense & Measurement](https://www.filmlight.ltd.uk/store/fl_product/colour-sense-measurement/)** — Richard Kirk (FilmLight, 2022); the T-CAM rationale and the "simplest model" argument. FilmLight also hosts a [free online/PDF edition](https://www.filmlight.ltd.uk/support/documents/colourbook/colourbook.php)

## Vendor documentation

- **[Blackmagic Design — DaVinci Resolve manuals & training](https://www.blackmagicdesign.com/products/davinciresolve/training)** — the *DaVinci Resolve Reference Manual* (Ch. on Data Levels, Color Management, and ACES), *The Colorist Guide to DaVinci Resolve*, and the *DaVinci Resolve 17 — Wide Gamut Intermediate* white paper (DWG/Intermediate primaries and matrices)
- **[FilmLight — Truelight / TCS / T-CAM](https://www.filmlight.ltd.uk/workflow/truelight.php)** — the Truelight Color Spaces, T-CAM display transform, downloadable color-space files, and OCIO config
- **[Dolby — Dolby Vision (professional)](https://professional.dolby.com/)** — the *Dolby Vision Color Grading Best Practices Guide* and *Dolby Vision Professional Tools User Manual* (provided to licensed facilities); trim-pass and metadata-level workflow

## Tools & platforms

- **[OpenColorIO](https://opencolorio.org/)** — the color-management engine that delivers ACES to VFX applications
- **[OpenEXR](https://openexr.com/)** — the scene-referred image format underlying the ACES container
- **[VFX Reference Platform](https://vfxplatform.com/)** — the annual specification pinning ACES, OCIO, OpenEXR, and the rest of the stack
- **[Filmbox](https://videovillage.com/filmbox/)** (Video Village) — a Kodak Vision3 film-print-emulation display transform
- **[Lattice](https://videovillage.com/lattice/)** (Video Village) — LUT authoring and conversion
- **[ColourSpace](https://www.lightillusion.com)** (Light Illusion) — display calibration and profiling (successor to LightSpace CMS)
- **[Codex Backbone](https://codex.online/products/backbone)** — on-set media management
- **[Apple ProRes white paper](https://www.apple.com/final-cut-pro/docs/Apple_ProRes.pdf)** — the ProRes family and data rates
- **[DCI — Digital Cinema Initiatives](https://www.dcimovies.com/)** — the digital-cinema specifications and compliance test plans
- **[Technicolor Pulse](https://pulse.technicolor.com/)** — remote review and dailies
- **[ASC CDL overview](https://en.wikipedia.org/wiki/ASC_CDL)** — the American Society of Cinematographers Color Decision List

## Digital cinema delivery (DCP)

- **[ISDCF](https://registry-page.isdcf.com/)** — the Inter-Society Digital Cinema Forum: the [Digital Cinema Naming Convention](https://registry-page.isdcf.com/) and the [Open and Closed Captions](https://registry-page.isdcf.com/openandclosedcaptions/) registry (OCAP / CCAP)
- **DTDC — [*Recommended Guidelines for Digital Cinema Source and DCP Content Delivery*](https://www.bydeluxe.com/)** (Deluxe Technicolor Digital Cinema, v4.08, 2019) — a practical DCP delivery spec: Interop vs SMPTE, audio channel layouts, subtitle/caption rules, accessibility tracks, and delivery media
- **[MOSAIC DCP Inspector](https://tools.colorbymosaic.com/dcp_inspector)** — browser-based DCP validation: checks the CPL/PKL/ASSETMAP, hashes, reels, frame rate, audio layout, and subtitle/caption references against the standards, and helps fix configuration errors before a theater QC
- **[Cinematiq — *Making a DCP: Accessibility*](https://www.cinematiq.com/posts/things-to-consider-before-making-a-dcp-accessibility)** — OCAP/CCAP, SDH, and described-audio in practice
- Festival DCP technical specs (confirm the current edition): **[Venice](https://static.labiennale.org/files/cinema/2024/Documenti/specs-dcp-2024.pdf)**, **[Berlinale](https://www.berlinale.de/en/film-entry/technical-specifications/festival-media.html)**, **[Sundance](https://www.sundance.org/wp-content/uploads/2022/11/Technical-Specifications-For-Festival-Presentation.pdf)**

## Displays, HDR, and theatrical

- **[HDR by Barco](https://www.barco.com/en/solutions/cinema/hdr-by-barco)** and the **[Barco LS4K](https://www.barco.com/en/product/ls4k)** Lightsteering projector
- **[RTINGS](https://www.rtings.com/)** — per-display Rec.2020 / DCI-P3 gamut-coverage measurements
- **[GDC — DCI-certified HDR for cinema](https://www.gdc-tech.com/blog-and-news/true-dci-certified-hdr-for-cinema/)** — direct-view LED HDR certification
- **[Samsung Onyx](https://www.avnetwork.com/avnetwork/samsung-leverages-led-strength-and-harman-to-launch-onyx-direct-view-led-cinema-screens)** and **[LG Miraclass](https://www.lg.com/us/business/direct-view-led-signage/indoor-direct-view-led-signage/miraclass-cinema-dvled)** — direct-view LED cinema displays
- Wide-gamut panel announcements: **[FlatpanelsHD](https://www.flatpanelshd.com/news.php?subaction=showfull&id=1725855010)**, **[TechRadar](https://www.techradar.com/televisions/this-new-oled-panel-hits-95-color-gamut-outshining-some-of-the-best-lg-and-samsung-tvs-by-10-25)**

## Articles & discussion

- **[Resolve Color Management vs ACES — Which Should You Choose?](https://blog.frame.io/2024/02/12/davinci-resolve-color-management-vs-aces-which-should-you-choose/)** (Frame.io Insider)
- **[ACES vs RCM](https://mixinglight.com/color-grading-tutorials/aces-vs-rcm-2026/)** (Mixing Light)
- **[RCM vs ACEScct discussion](https://community.acescentral.com/t/davinci-reslove-color-sceince-rcm-vs-acescct/2883)** (ACESCentral)
- **[FilmLight Baselight v7 Truelight Colour Space improvements](https://www.newsshooter.com/2026/02/03/filmlight-baselight-v7-truelight-colour-space-improvements/)** (Newsshooter)
- CinemaScope aspect-ratio history: the **[American WideScreen Museum](http://www.widescreenmuseum.com/widescreen/cinemascope_oar.htm)**
