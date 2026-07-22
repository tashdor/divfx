# Digital Intermediates and VFX for Modern Independent Film Production

**A Production Handbook** by [Tashi Trieu](https://tashitrieu.com)

This handbook presents studio-level production and post-production practices — and
methods for implementing them — in a form relevant to independent feature films and
short-form projects. It covers the path an image takes from acquisition through dailies,
editorial, visual effects, digital intermediate finishing, and distribution.

## Why this matters, even on a small production

Visual effects are no longer just for big-budget studio films. Invisible cleanup, set
extensions, sky and screen replacements, beauty work, composited elements, and full CG shots
now appear in the smallest independent features, documentaries, and even short-form and social
content — usually without the audience ever noticing they are there. VFX has trickled all the
way down.

What has *not* trickled down is the studio infrastructure that keeps those productions on schedule and on budget, while achieving high quality:
scene-referred color pipelines, shot-naming and turnover conventions, format discipline, and
clear communication between editorial, the VFX vendors, and the colorist and finishing house. On an independent
production, the difference between a visual effects shot that costs a few hundred dollars and
one that spirals is almost always decided *before a single frame is pulled* — in planning,
format choices, and how cleanly the hand-offs are organized.

This handbook is about that forethought: making studio-grade decisions early, when they cost
almost nothing, instead of paying to unwind them later. It is written for independent
producers, editors, colorists, and freelance visual effects artists who want to adapt studio
practice to productions that do not have studio budgets or staffing.

## Where to start

Not everyone should read this front to back. Pick the thread that matches your role or your
question:

- **New here, or want the big picture** → [Introduction](introduction.md), then the
  [Generalized Production Workflow](production-workflow.md).
- **Editors & assistant editors** → [Editorial Turnover for DI](turnover-di.md) and
  [for VFX Plate Pulls](turnover-vfx.md).
- **VFX artists & vendors** → [VFX Plate Pulls](turnover-vfx.md),
  [Common Working Formats](working-formats.md),
  [Color Management](color-management.md), [Visual Effects QC](vfx-quality-control.md), and
  [VFX Production Management](vfx-production-management.md).
- **Colorists & finishing artists** → [An Overview of Digital Intermediates](digital-intermediates.md),
  [Color Spaces and Transfer Functions](color.md), [ACES](aces.md), and [HDR Mastering](hdr.md).
- **Producers & post supervisors** → [Generalized Production Workflow](production-workflow.md),
  [Distribution Deliverables](distribution-deliverables.md), and
  [VFX Production Management](vfx-production-management.md).
- **Delivering to theaters or platforms** → [IMF](imf.md), [DCP](dcp.md), and
  [Distribution Deliverables for Independent Film](distribution-deliverables.md).
- **Just need a quick answer** → use the **search box** at the top of the page (it indexes every
  chapter), or jump to the [Glossary](glossary.md) or
  [Supplemental Reading & Resources](resources.md).

## Full contents

**Foundations**

- [Introduction](introduction.md) — what the handbook covers and who it is for.
- [Generalized Production Workflow](production-workflow.md) — the full path from previsualization
  through archival, and where things typically go wrong.
- [An Overview of Digital Intermediates](digital-intermediates.md) — the colorist's role, Camera
  RAW, scene-referred vs. display-referred imagery, and LUTs.

**Editorial Turnover**

- [For Digital Intermediates](turnover-di.md) — preparing timelines, generating edit lists, and
  delivering media for conform.
- [For VFX Plate Pulls](turnover-vfx.md) — shot naming, frame numbering, handles, versioning, and
  format specification.

**Formats & Resolution**

- [Common Working Formats](working-formats.md) — ProRes, Avid DNx, H.264/H.265, DPX, OpenEXR, and TIFF.
- [Working and Delivery Resolutions](resolutions.md) — HD, UHD, digital cinema containers, frame
  padding, and anamorphic workflows.

**Color & Color Management**

- [Color Spaces and Transfer Functions](color.md) — display and camera gamuts, log encodings, and DCI-X'Y'Z'.
- [ACES](aces.md) — the Academy Color Encoding System as an interchange and finishing standard.
- [Color Management and OpenColorIO](color-management.md) — how OCIO implements ACES in practice.
- [Application-Native Color Management](application-native-color-management.md) — DaVinci RCM and FilmLight TCS.
- [Choosing a Color Management Approach](color-management-comparison.md) — which system fits your pipeline.
- [HDR Mastering](hdr.md) — PQ and HLG, mastering displays, and SDR derivation.

**Mastering & Delivery**

- [IMF — The Interoperable Master Format](imf.md) — the studio/streamer interchange master.
- [DCP — The Digital Cinema Package](dcp.md) — the theatrical deliverable and festival delivery.
- [Distribution Deliverables for Independent Film](distribution-deliverables.md) — what real indie
  distributor delivery schedules actually require.

**Visual Effects**

- [Visual Effects Quality Control](vfx-quality-control.md) — scaling, concatenated transforms, and
  gamma, exposure, and difference checking.
- [Visual Effects Production Management](vfx-production-management.md) — asset management, production
  tracking, and running a virtual studio.

**Reference**

- [Supplemental Reading & Resources](resources.md) — every standard, white paper, and document the
  wiki cites, with links.
- [Glossary](glossary.md) — the terminology, defined.
- [Change List](changelog.md) and [Notes for v1.1](v1.1-notes.md) — what has changed and what is
  being revised.

## A living edition

The handbook was originally published as a PDF. This site is the same material restructured as a
searchable, linkable wiki that is corrected and extended over time — so it can stay current with
cameras, codecs, color standards, and delivery specs in a way a fixed PDF cannot. Use the search
box at the top of any page to jump straight to a term or format.

The original typeset editions remain available for download:

- [English (PDF, 21 MB)](https://github.com/tashdor/divfx/releases/download/1.0.1/DigitalIntermediates_VisualEffects_Independent_v1.0.1.pdf) — v1.0.1, Fall 2017
- [Simplified Chinese 简体中文 (PDF, 24 MB)](https://github.com/tashdor/divfx/releases/download/1.0.1_cn/DigitalIntermediates_VisualEffects_Independent_v1.0.1_cn.pdf) — translation by Xiyu Fan

!!! note "Version status"
    This wiki began as **v1.0.1 (Fall 2017)** and is being revised chapter by chapter toward a
    modern edition. Where a section still reflects older practice it is flagged, and
    [Notes for v1.1](v1.1-notes.md) tracks what is changing — worth a glance before you rely on a
    specific product name, camera model, or delivery specification.

## Contact

Questions, comments, and errata are welcome — send a note below.

<form class="contact-form" action="https://formspree.io/f/mpqvljlq" method="POST">
  <input type="hidden" name="_subject" value="divfx Inquiry">
  <div class="cf-grid">
    <label class="cf-field">
      <span>Name</span>
      <input type="text" name="name" required autocomplete="name">
    </label>
    <label class="cf-field">
      <span>Email</span>
      <input type="email" name="email" required autocomplete="email">
    </label>
  </div>
  <label class="cf-field">
    <span>Message</span>
    <textarea name="message" rows="5" required></textarea>
  </label>
  <button type="submit" class="cf-submit">Send message</button>
</form>

<script>
(function () {
  var form = document.querySelector('form.contact-form');
  if (!form || !window.fetch || !window.FormData) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('.cf-submit');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.innerHTML = '<p class="cf-success">Thanks — your message was sent. We’ll get back to you soon.</p>';
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = 'Send message'; }
      var err = form.querySelector('.cf-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'cf-error';
        form.appendChild(err);
      }
      err.textContent = 'Something went wrong sending your message — please try again.';
    });
  });
})();
</script>
