# Archival

Once a project is completed and delivered, it is still necessary to archive and preserve working
files and various additional renders to provide an easy path towards future remastering.

Different studios have different requirements and specifications for archival elements.
However, most require some variation of the following in addition to the video distribution
master:

## Ungraded Archival Master

A complete, uncompressed, ungraded render of the conformed project, containing completed
visual effects, opticals, titles, and other picture elements. Textless elements should be included
as well. Rendered at the highest resolution applicable — often the project's most common
camera original resolution. In camera native log or scene-linear. Typically rendered as 16-bit
DPX (log) or 16-bit float EXR (scene-linear).

The Ungraded Archival Master serves as the digital equivalent of a negative assembly. It differs
from other deliverables primarily in that it is fully uncompressed and not color corrected.

## Graded Archival Master

Typically the same format and resolution as the Ungraded Archival Master, differing in that it
contains color graded images. However, this master is required to be in the DI's original working
color space (i.e. camera native color space). In order to produce this deliverable, a project's
color pipeline must be completely scene-referred, relying on a forward display-referred
transform at the end of the pipeline. Any color grading operations must happen before the
display transformation LUT.

## Show Look Up Tables (LUTs)

In order to reproduce a graded video master, the project's display transformation LUT(s) must
be provided. Archive **every working LUT and transform the project relied on** — not just the final
Show LUT, but creative looks, per-camera normalizations, technical conversions, and any **DCTLs**
(DaVinci Color Transform Language scripts) used in the grade. Without the complete set, a future
session cannot rebuild the pipeline the master was made under.

Two dependency traps are worth checking before an archive is considered complete:

- **Encrypted DCTLs (`.dctle`)** can carry an **expiry date** or a machine/license lock — they may
  simply stop working after a certain date or on a different system, silently breaking a re-grade
  years later. Treat an encrypted DCTL as an archival liability and obtain an unencrypted or
  license-free equivalent wherever possible.
- **OpenFX (OFX) plugin dependencies.** A grade that leans on third-party OFX plugins will not
  reproduce without those plugins — and their correct versions and licenses — present. It is the
  same failure mode as a missing LUT.

LUTs and their dependencies can be gathered and bundled for archive with Video Village's
[DRP Inspector](https://ditools.videovillage.com/drp_inspector), which reads a DaVinci Resolve
project and **reports any unexpected or at-risk dependencies** (external LUTs, DCTLs, OFX plugins) so
they can be collected before the project is stored.

## Reference EDLs

Flattened EDLs of the finalized DI timeline, matching the master and archival renders, are
generated so that they may be easily split (or notched) at edit points in a later session, possibly
on a different platform than the initial DI.

## Storage: LTO, cloud, and the trouble with hard drives

An archive is only as good as the medium it lives on and the number of copies you keep. There are
three realistic media for holding finished masters and project files: **LTO tape**, **cloud cold
storage**, and **hard drives**. They differ enormously in cost *structure* — and the sticker price is
usually the least important number.

The calculator below estimates the cost of **archiving a given amount of data once, holding it, then
fully restoring it** — drag the sliders for your data size and retention period. It is a planning aid,
not a quote: cloud rates and egress tiers change often, and the LTO figures separate the tape stock
(hard costs) from a per-TB service rate.[^ltocost]

<style>
.archive-calc{border:1px solid var(--md-default-fg-color--lightest);border-radius:6px;padding:1rem 1.1rem;margin:1.4em 0;}
.archive-calc .ac-controls{display:flex;flex-wrap:wrap;gap:1.4rem;margin-bottom:1rem;}
.archive-calc .ac-ctrl{flex:1 1 240px;}
.archive-calc .ac-ctrl label{font-size:.78rem;font-weight:700;display:block;}
.archive-calc .ac-ctrl input[type=range]{width:100%;margin-top:.45rem;accent-color:var(--md-accent-fg-color,#e0912f);}
.archive-calc .ac-num{width:5.5em;padding:.1rem .35rem;font:inherit;font-weight:700;text-align:right;border:1px solid var(--md-default-fg-color--lighter);border-radius:3px;background:var(--md-default-bg-color);color:var(--md-default-fg-color);}
.archive-calc .ac-scroll{overflow-x:auto;}
.archive-calc table{width:100%;min-width:32rem;margin:0;table-layout:fixed;}
.archive-calc th,.archive-calc td{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums;width:13.6%;}
.archive-calc th:first-child,.archive-calc td:first-child{text-align:left;white-space:normal;width:32%;}
.archive-calc tr.ac-best td{background:var(--md-accent-fg-color--transparent,rgba(224,145,47,.14));font-weight:600;}
.archive-calc .ac-note{font-size:.7rem;color:var(--md-default-fg-color--light);margin:.7rem 0 0;line-height:1.45;}
</style>

<div class="archive-calc" id="archive-calc">
  <div class="ac-controls">
    <div class="ac-ctrl">
      <label>Data archived: <input type="number" id="ac-tb" class="ac-num" min="1" step="1" value="100"> TB</label>
      <input type="range" id="ac-tb-range" min="1" max="1000" step="1" value="100">
    </div>
    <div class="ac-ctrl">
      <label>Retention: <span id="ac-yr-val">3</span> years</label>
      <input type="range" id="ac-yr" min="1" max="15" step="1" value="3">
    </div>
  </div>
  <div class="ac-scroll">
    <table class="ac-t">
      <thead><tr><th>Option</th><th>Hard costs</th><th>Archive</th><th>Storage</th><th>Restore</th><th>Total</th></tr></thead>
      <tbody id="ac-body"></tbody>
    </table>
  </div>
  <p class="ac-note">Estimates at mid-2026 rates for a single full restore to the open internet; cloud storage is each provider's cold/archive tier. Egress tiers and provider rates vary — verify before budgeting. Backblaze and Wasabi assume the restore falls within their included free-egress ratio. LTO assumes you keep the tapes (no vault fee); see the footnote for the service-rate assumptions.</p>
</div>

<script>
(function(){
  var providers = [
    {name:'LTO-9 (you keep the tapes)', hard:function(T){return Math.ceil(T/18)*105;}, ingest:function(T){return Math.max(T,20)*50;}, storage:function(){return 0;}, restore:function(T){return Math.max(T,20)*50;}},
    {name:'AWS Glacier Deep Archive', hard:function(){return 0;}, ingest:function(){return 0;}, storage:function(T,Y){return T*0.99*12*Y;}, restore:function(T){return T*82;}},
    {name:'AWS Glacier Flexible Retrieval', hard:function(){return 0;}, ingest:function(){return 0;}, storage:function(T,Y){return T*3.6*12*Y;}, restore:function(T){return T*77.9;}},
    {name:'Azure Blob Archive', hard:function(){return 0;}, ingest:function(){return 0;}, storage:function(T,Y){return T*1.833*12*Y;}, restore:function(T){return T*103;}},
    {name:'Google Cloud Archive', hard:function(){return 0;}, ingest:function(){return 0;}, storage:function(T,Y){return T*1.2*12*Y;}, restore:function(T){return T*145;}},
    {name:'Backblaze B2', hard:function(){return 0;}, ingest:function(){return 0;}, storage:function(T,Y){return T*6.95*12*Y;}, restore:function(){return 0;}},
    {name:'Wasabi', hard:function(){return 0;}, ingest:function(){return 0;}, storage:function(T,Y){return T*7.99*12*Y;}, restore:function(){return 0;}}
  ];
  function fmt(n){ return '$'+Math.round(n).toLocaleString('en-US'); }
  function init(){
    var root = document.getElementById('archive-calc');
    if(!root || root.dataset.acInit){ return; }
    root.dataset.acInit = '1';
    var tb = document.getElementById('ac-tb'), tbRange = document.getElementById('ac-tb-range');
    var yr = document.getElementById('ac-yr'), yrVal = document.getElementById('ac-yr-val');
    var body = document.getElementById('ac-body');
    var tbMax = +tbRange.max;
    function render(){
      var T = Math.max(1, Math.round(+tb.value || 1)), Y = +yr.value;
      yrVal.textContent = Y;
      var rows = providers.map(function(p){
        var h=p.hard(T,Y), i=p.ingest(T,Y), s=p.storage(T,Y), r=p.restore(T,Y);
        return {name:p.name, h:h, i:i, s:s, r:r, total:h+i+s+r};
      });
      rows.sort(function(a,b){ return a.total-b.total; });
      body.innerHTML = rows.map(function(row,idx){
        return '<tr'+(idx===0?' class="ac-best"':'')+'><td>'+row.name+'</td><td>'+fmt(row.h)+'</td><td>'+fmt(row.i)+'</td><td>'+fmt(row.s)+'</td><td>'+fmt(row.r)+'</td><td><b>'+fmt(row.total)+'</b></td></tr>';
      }).join('');
    }
    tb.addEventListener('input', function(){
      var T = Math.max(1, Math.round(+tb.value || 1));
      tbRange.value = Math.min(T, tbMax);
      render();
    });
    tbRange.addEventListener('input', function(){ tb.value = tbRange.value; render(); });
    yr.addEventListener('input', render);
    render();
  }
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    if (!window.__acSub){ window.__acSub = true; window.document$.subscribe(init); } else { init(); }
  } else if (document.readyState !== 'loading') { init(); }
  else { document.addEventListener('DOMContentLoaded', init); }
})();
</script>

[^ltocost]: **LTO hard cost** = tape stock only (`ceil(TB ÷ 18)` cartridges at ~$105 each). **Archive**
    and **restore** are a managed-service rate (~$50/TB each way, per 2025–26 rate cards), typically
    with a ~20 TB minimum or an hourly rate for smaller jobs; in-house instead means buying your own
    deck, software, and hardware. You keep the tapes, so there is no vault fee. **Cloud** figures use
    each provider's cold/archive tier; egress assumes one full download. Prices mid-2026 — verify
    before budgeting.

**Read the total, not the headline rate.** Cold-cloud tiers are cheap to *store* (~$1/TB/month) but
bill heavily on retrieval and egress to get data back; the flat-rate clouds (Backblaze, Wasabi) flip
that — free egress, but 5–7× the storage. LTO inverts both: you pay a service to write and read the
tapes, but the stock is ~$6/TB and holding is free, so its total stays flat and, at any realistic
multi-year retention, it is the cheapest option — Glacier Deep Archive only undercuts it for holds under
~two years (drag the years slider to see the crossover). Cloud's real value is as an *offsite* copy —
managed redundancy, no hardware to migrate — but it is a permanent bill exposed to price hikes and
account risk.

**Hard drives are not an archive.** Unpowered, a consumer drive holds a few years at best (bearings
seize, magnetic charge fades), it is a shock-sensitive single point of failure, and bit rot is silent
without checksums. Fine as a nearline copy — never as your only long-term one.

**On a bonded or financed film, proper archival is contractual, not optional.** A completion guarantor
guarantees delivery *to spec* — preservation elements included — and negative / digital-media insurance
assumes professional storage, so archival masters generally must live on **LTO with checksums,
redundant copies, and offsite/vaulted storage**. A lone hard drive satisfies neither guarantor,
distributor QC, nor insurer.

**LTO is the archival standard — with a treadmill.** Tape is offline and air-gapped, rated ~15–30
years, and self-describing via **LTFS**; the catch is that drives read only about one to two
generations back, so plan to migrate every **~7–10 years**.

!!! tip "The smart default: 3-2-1, not one of anything"
    Keep **three copies, on two different media, with one offsite.** For an independent film that
    usually means **two LTO copies — or one LTO plus a cold-cloud copy for the offsite** — each
    verified with checksums (an **MHL**, media hash list), holding the graded and ungraded archival
    masters, textless elements, the audio stems and M&E, and the conform project. Whatever you choose,
    do not let a single hard drive be the only thing standing between you and a future remaster.
