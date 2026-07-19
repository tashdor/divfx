/* Progressive enhancement for the interactive chromaticity figures.
 *
 * Each figure ships a static SVG (light + dark) so it works with no JS, in
 * print, and if the embed service is down. When JS runs, this upgrades the
 * figure to the live Color Plotter iframe (/embed/color_plotter), theme-matched
 * to the page, and swaps light/dark when the reader toggles the Material theme.
 * The static image is only hidden once the iframe actually loads, so a failed
 * or blocked embed leaves the static figure in place.
 *
 * Markup (in the Markdown, via md_in_html):
 *   <figure class="cp-embed" data-cp-light="URL" data-cp-dark="URL"
 *           data-cp-title="Figure N — …">
 *     <span class="cp-embed-mount">…static <img> fallbacks…</span>
 *     <figcaption>…</figcaption>
 *   </figure>
 */
(function () {
  function isDark() {
    return document.body.getAttribute('data-md-color-scheme') === 'slate';
  }

  function upgrade(fig) {
    if (fig.dataset.cpReady) return;
    var light = fig.getAttribute('data-cp-light');
    var dark = fig.getAttribute('data-cp-dark');
    var mount = fig.querySelector('.cp-embed-mount');
    if (!light || !mount) return;
    fig.dataset.cpReady = '1';

    var frame = document.createElement('iframe');
    frame.className = 'cp-embed-frame';
    frame.loading = 'lazy';
    frame.setAttribute('scrolling', 'no');
    frame.setAttribute('title', fig.getAttribute('data-cp-title') || 'Interactive color plot');
    frame.addEventListener('load', function () {
      fig.classList.add('cp-embed-live'); // CSS reveals the frame, hides the static img
    });
    frame.src = isDark() ? dark : light;
    mount.appendChild(frame);

    fig._cpApply = function () {
      var want = isDark() ? dark : light;
      if (frame.src !== want) {
        fig.classList.remove('cp-embed-live'); // show static again during the reload
        frame.src = want;
      }
    };
  }

  function initAll() {
    document.querySelectorAll('figure.cp-embed').forEach(upgrade);
  }

  // Re-apply theme to every already-upgraded figure when the palette toggles.
  var mo = new MutationObserver(function () {
    document.querySelectorAll('figure.cp-embed').forEach(function (fig) {
      if (fig._cpApply) fig._cpApply();
    });
  });
  mo.observe(document.body, { attributes: true, attributeFilter: ['data-md-color-scheme'] });

  // Material's instant navigation swaps page content without a full reload;
  // document$ (an RxJS Subject it exposes) fires on every page view.
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(initAll);
  } else if (document.readyState !== 'loading') {
    initAll();
  } else {
    document.addEventListener('DOMContentLoaded', initAll);
  }
})();
