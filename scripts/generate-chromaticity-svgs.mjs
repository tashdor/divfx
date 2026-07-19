/* Regenerate the CIE chromaticity figures (18 and 19) as SVG, light + dark.
 *
 * Renders headlessly from Color Plotter's own scene/SVG modules, so the geometry
 * matches what https://ditools.videovillage.com/color_plotter exports.
 *
 * Color Plotter's SVG backend deliberately omits the per-pixel spectral fill
 * ("that's the PNG path" — render_svg.js). To keep the wash from the original
 * v1.0.1 figures while leaving the geometry and text vector-clean, this script
 * emits the fill separately as a raster tile plus the locus clip path; the
 * companion step (embed_spectral_fill.py) embeds it into the SVG as a clipped
 * <image>. The tile is computed with the tool's own xyToSRGBByte/diagramToXy, so
 * it is the same chromaticity gradient the Canvas renderer draws.
 *
 *   node scripts/generate-chromaticity-svgs.mjs <outdir>
 *
 * Requires a checkout of the tashi-tools repo; set COLORPLOT_SRC if it does not
 * live at ~/Desktop/tashi-tools.
 */
import { writeFileSync } from 'node:fs';
import { homedir } from 'node:os';

const SRC = process.env.COLORPLOT_SRC || `${homedir()}/Desktop/tashi-tools`;
const { buildScene, fitPlotSize, projector } = await import(`${SRC}/src/lib/colorplot/scene.js`);
const { renderSVG } = await import(`${SRC}/src/lib/colorplot/render_svg.js`);
const { xyToSRGBByte, diagramToXy } = await import(`${SRC}/src/lib/colorplot/cie.js`);

const OUT = process.argv[2];
const FILL_MAX_SIDE = 560; // mirrors render_canvas2d.js

let n = 0; const uid = () => 'id' + (++n);

const sp = (ref, label, color, opts = {}) => ({
  id: uid(), enabled: true, kind: 'gamut', ref, label, color,
  fill: false, fillAlpha: 0.12, lineWidth: 1.8, lineStyle: 'solid',
  showWhite: true, white: '', maxNits: 100, minNits: 0.1, ...opts
});

function mkProject(spaces, name) {
  return {
    name, desc: '', nameAuto: false, descAuto: false, showTitle: false,
    diagram: '1931', mode: '2d', space3d: 'chroma', logY: false,
    spaces, points: [], whites: [], annotations: [],
    planck: { show: false, kMin: 1500, kMax: 15000, isotherms: false },
    locus: { show: true, wavelengthTicks: true },
    labelPrimaries: false, labelSpaces: false,
    fill: { show: true },   // exposes scene.fill.locusPoly for the clip path
    contain: { show: false, referenceId: null, color: '#ff4d4d', hatch: false, opacity: 0.85, coverage: false },
    titleOutside: false, image: null
  };
}

function mkView(vp, theme, w = 1000, h = 900) {
  const ps = fitPlotSize(w, h, vp);
  return Object.assign({}, vp, {
    camera: { theta: 3.92, phi: 0.62, dist: 3.4, target: [0, 0, 0] },
    theme, transparent: false, width: w, height: h, scale: 1,
    grid: true, axes: true, labels: true, legend: true,
    plotW: ps.w, plotH: ps.h, labelPos: {},
    vol3d: true, floor3d: true, img3d: true, vhsHud: true,
    cropExport: false, fillOpacity: theme === 'dark' ? 0.92 : 1,
    _t2: { grid: true, axes: true, labels: true, legend: true },
    _t3: { grid: true, axes: true, labels: true, legend: true }
  });
}

/* The chromaticity gradient, as a raw RGB tile over the locus bounding box.
 * Same loop as render_canvas2d.js spectralTile(). */
function spectralTile(scene) {
  const poly = scene.spectralPoly || (scene.fill && scene.fill.locusPoly);
  if (!poly) return null;
  let da0 = Infinity, db0 = Infinity, da1 = -Infinity, db1 = -Infinity;
  for (const p of poly) {
    if (p.a < da0) da0 = p.a; if (p.a > da1) da1 = p.a;
    if (p.b < db0) db0 = p.b; if (p.b > db1) db1 = p.b;
  }
  const dA = da1 - da0, dB = db1 - db0;
  if (dA <= 0 || dB <= 0) return null;
  const aspect = dA / dB;
  const tw = Math.max(1, Math.round(aspect >= 1 ? FILL_MAX_SIDE : FILL_MAX_SIDE * aspect));
  const th = Math.max(1, Math.round(aspect >= 1 ? FILL_MAX_SIDE / aspect : FILL_MAX_SIDE));
  const rgb = Buffer.alloc(tw * th * 3);
  for (let ty = 0; ty < th; ty++) {
    const b = db1 - (ty + 0.5) / th * dB;      // top row = max b
    for (let tx = 0; tx < tw; tx++) {
      const a = da0 + (tx + 0.5) / tw * dA;
      const xy = diagramToXy(a, b, scene.diagram);
      const c = xyToSRGBByte(xy[0], xy[1]);
      const i = (ty * tw + tx) * 3;
      rgb[i] = c[0]; rgb[i + 1] = c[1]; rgb[i + 2] = c[2];
    }
  }
  return { rgb, tw, th, da0, db0, da1, db1 };
}

// Figure 18 — display color spaces (original plots Rec.709, DCI-P3, Rec.2020)
const fig18 = () => mkProject([
  sp('rec709', 'Rec. 709', '#5a4fcf'),
  sp('p3dci',  'DCI-P3',   '#1f9d55'),
  sp('rec2020','Rec. 2020','#d62828')
], 'Display Color Spaces');

// Figure 19 — camera color spaces and delivery color spaces
const fig19 = () => mkProject([
  sp('awg3',   'ARRI Wide Gamut 3',  '#7b3fe4'),
  sp('redwg',  'REDWideGamutRGB',    '#1f8fd0'),
  sp('sgamut3cine','Sony S-Gamut3.Cine','#1f9d55'),
  sp('rec709', 'Rec. 709',           '#e07b1f'),
  sp('p3dci',  'DCI-P3',             '#d62828')
], 'Camera and Delivery Color Spaces');

const jobs = [
  ['figure-18-display-gamuts', fig18, { vx0: -0.06, vx1: 0.83, vy0: -0.06, vy1: 0.90 }],
  ['figure-19-camera-gamuts',  fig19, { vx0: -0.06, vx1: 0.83, vy0: -0.12, vy1: 0.90 }]
];

const manifest = [];
for (const [base, mk, vp] of jobs) {
  for (const theme of ['light', 'dark']) {
    const project = mk();
    const view = mkView(vp, theme);
    const scene = buildScene(project, view);
    const svg = renderSVG(scene, 1);
    const pr = projector(scene);
    const tile = spectralTile(scene);

    const name = `${base}-${theme}`;
    writeFileSync(`${OUT}/${name}.svg`, svg);
    writeFileSync(`${OUT}/${name}.rgb`, tile.rgb);
    manifest.push({
      name, tw: tile.tw, th: tile.th,
      // data bbox projected to device px (mapB flips y, so the top edge is db1)
      rect: {
        x: pr.mapA(tile.da0), y: pr.mapB(tile.db1),
        w: pr.mapA(tile.da1) - pr.mapA(tile.da0),
        h: pr.mapB(tile.db0) - pr.mapB(tile.db1)
      },
      locus: scene.fill.locusPoly.map((p) => [pr.mapA(p.a), pr.mapB(p.b)]),
      opacity: scene.fill.opacity != null ? scene.fill.opacity : 1,
      spaces: project.spaces.length
    });
    console.log(`${name}.svg  ${(svg.length / 1024).toFixed(1)}KB  tile ${tile.tw}x${tile.th}  spaces=${project.spaces.length}`);
  }
}
writeFileSync(`${OUT}/fill-manifest.json`, JSON.stringify(manifest, null, 1));
