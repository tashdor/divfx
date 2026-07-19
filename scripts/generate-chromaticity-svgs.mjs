/* Regenerate the CIE chromaticity figures (18 and 19) as SVG.
 *
 * Renders headlessly from Color Plotter's own scene/SVG modules, so the output
 * matches what https://ditools.videovillage.com/color_plotter exports.
 *
 *   node scripts/generate-chromaticity-svgs.mjs docs/figures/svg
 *
 * Requires a checkout of the tashi-tools repo; set COLORPLOT_SRC if it does not
 * live at ~/Desktop/tashi-tools.
 */
import { writeFileSync } from 'node:fs';
import { homedir } from 'node:os';

const SRC = process.env.COLORPLOT_SRC || `${homedir()}/Desktop/tashi-tools`;
const { buildScene, fitPlotSize } = await import(`${SRC}/src/lib/colorplot/scene.js`);
const { renderSVG } = await import(`${SRC}/src/lib/colorplot/render_svg.js`);

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
    fill: { show: false },
    contain: { show: false, referenceId: null, color: '#ff4d4d', hatch: false, opacity: 0.85, coverage: false },
    titleOutside: false, image: null
  };
}

function mkView(vp, w = 1000, h = 900) {
  const ps = fitPlotSize(w, h, vp);
  return Object.assign({}, vp, {
    camera: { theta: 3.92, phi: 0.62, dist: 3.4, target: [0, 0, 0] },
    theme: 'light', transparent: false, width: w, height: h, scale: 1,
    grid: true, axes: true, labels: true, legend: true,
    plotW: ps.w, plotH: ps.h, labelPos: {},
    vol3d: true, floor3d: true, img3d: true, vhsHud: true,
    cropExport: false, fillOpacity: 0.3,
    _t2: { grid: true, axes: true, labels: true, legend: true },
    _t3: { grid: true, axes: true, labels: true, legend: true }
  });
}

// Figure 18 — display color spaces (original plots Rec.709, DCI-P3, Rec.2020)
const fig18 = mkProject([
  sp('rec709', 'Rec. 709', '#6a5acd'),
  sp('p3dci',  'DCI-P3',   '#3cb371'),
  sp('rec2020','Rec. 2020','#e03131')
], 'Display Color Spaces');

// Figure 19 — camera color spaces and delivery color spaces
const fig19 = mkProject([
  sp('awg3',   'ARRI Wide Gamut 3',  '#8a4fff'),
  sp('redwg',  'REDWideGamutRGB',    '#22a7e0'),
  sp('sgamut3','Sony S-Gamut3',      '#3cb371'),
  sp('rec709', 'Rec. 709',           '#f08c34'),
  sp('p3dci',  'DCI-P3',             '#e03131')
], 'Camera and Delivery Color Spaces');

const jobs = [
  ['figure-18-display-gamuts.svg', fig18, { vx0: -0.06, vx1: 0.83, vy0: -0.06, vy1: 0.90 }],
  ['figure-19-camera-gamuts.svg',  fig19, { vx0: -0.06, vx1: 0.83, vy0: -0.12, vy1: 0.90 }]
];

for (const [file, project, vp] of jobs) {
  const view = mkView(vp);
  const scene = buildScene(project, view);
  const svg = renderSVG(scene, 1);
  writeFileSync(process.argv[2] + '/' + file, svg);
  console.log(file, (svg.length / 1024).toFixed(1) + 'KB',
              'spaces=' + project.spaces.length);
}
