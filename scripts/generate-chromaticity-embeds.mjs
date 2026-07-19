/* Build interactive-embed URLs for the chromaticity figures (18, 19).
 *
 * The Color Plotter's /embed/color_plotter viewer runs the full engine
 * read-only, with the plot encoded in the URL fragment:
 *   /embed/color_plotter#p=<base64url(JSON.stringify({project, view}))>
 * (see server/routes/colorplot-api.js in the tashi-tools repo). The fragment
 * is client-side only and never hits the server. This mirrors that encoder so
 * the URLs are reproducible and testable rather than pasted blobs.
 *
 *   node scripts/generate-chromaticity-embeds.mjs
 *
 * Prints a JSON map { fig18: {light,dark}, fig19: {light,dark} } that
 * color.md carries in data-cp-light / data-cp-dark attributes. Set
 * COLORPLOT_EMBED_HOST to point at a different deployment.
 */
const HOST = process.env.COLORPLOT_EMBED_HOST || 'https://ditools.videovillage.com';

let n = 0;
const uid = () => 'id' + (++n);
const sp = (ref, label, color) => ({
  id: uid(), enabled: true, kind: 'gamut', ref, label, color,
  fill: false, fillAlpha: 0.12, lineWidth: 1.8, lineStyle: 'solid',
  showWhite: true, white: '', maxNits: 100, minNits: 0.1,
});
const project = (spaces, name) => ({
  name, desc: '', nameAuto: false, descAuto: false, showTitle: false,
  diagram: '1931', mode: '2d', space3d: 'chroma', logY: false,
  spaces, points: [], whites: [], annotations: [],
  planck: { show: false, kMin: 1500, kMax: 15000, isotherms: false },
  locus: { show: true, wavelengthTicks: true },
  labelPrimaries: false, labelSpaces: false, fill: { show: true },
  contain: { show: false, referenceId: null, color: '#ff4d4d', hatch: false, opacity: 0.85, coverage: false },
  titleOutside: false, image: null,
});
const view = (vp, theme) => Object.assign({}, vp, {
  camera: { theta: 3.92, phi: 0.62, dist: 3.4, target: [0, 0, 0] },
  theme, transparent: false, width: 900, height: 820, scale: 2,
  grid: true, axes: true, labels: true, legend: true,
});

const FIGS = {
  fig18: {
    make: () => project([
      sp('rec709', 'Rec. 709', '#5a4fcf'),
      sp('p3dci', 'DCI-P3', '#1f9d55'),
      sp('rec2020', 'Rec. 2020', '#d62828'),
    ], 'Display Color Spaces'),
    vp: { vx0: -0.06, vx1: 0.83, vy0: -0.06, vy1: 0.90 },
  },
  fig19: {
    make: () => project([
      sp('awg3', 'ARRI Wide Gamut 3', '#7b3fe4'),
      sp('redwg', 'REDWideGamutRGB', '#1f8fd0'),
      sp('sgamut3', 'Sony S-Gamut3', '#1f9d55'),
      sp('rec709', 'Rec. 709', '#e07b1f'),
      sp('p3dci', 'DCI-P3', '#d62828'),
    ], 'Camera and Delivery Color Spaces'),
    vp: { vx0: -0.06, vx1: 0.83, vy0: -0.12, vy1: 0.90 },
  },
};

const frag = (proj, vp, theme) =>
  Buffer.from(JSON.stringify({ project: proj, view: view(vp, theme) }), 'utf8').toString('base64url');

const out = {};
for (const [key, def] of Object.entries(FIGS)) {
  out[key] = {};
  for (const theme of ['light', 'dark']) {
    const url = `${HOST}/embed/color_plotter#p=${frag(def.make(), def.vp, theme)}`;
    out[key][theme] = url;
    if (url.length > 60000) throw new Error(`${key}/${theme}: fragment exceeds 60k`);
  }
}
console.log(JSON.stringify(out, null, 2));
