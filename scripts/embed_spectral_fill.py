#!/usr/bin/env python3
"""Embed the spectral (chromaticity) fill into the Color Plotter SVGs.

generate-chromaticity-svgs.mjs writes, per figure/theme:
  <name>.svg   vector plot, no fill (Color Plotter's SVG backend omits it)
  <name>.rgb   raw RGB tile of the chromaticity gradient
  fill-manifest.json  tile size, device rect, locus polygon, opacity

This encodes the tile as PNG, embeds it as a data URI, and clips it to the
spectral locus so the wash sits under the geometry — matching the original
v1.0.1 figures while keeping every line and label vector.

    python3 scripts/embed_spectral_fill.py <dir>
"""
import base64
import io
import json
import pathlib
import sys

from PIL import Image


def fmt(v: float) -> str:
    return f"{v:.2f}".rstrip("0").rstrip(".")


def main(outdir: str) -> None:
    d = pathlib.Path(outdir)
    manifest = json.loads((d / "fill-manifest.json").read_text())

    for entry in manifest:
        name = entry["name"]
        svg_path = d / f"{name}.svg"
        rgb_path = d / f"{name}.rgb"
        svg = svg_path.read_text()

        tw, th = entry["tw"], entry["th"]
        img = Image.frombytes("RGB", (tw, th), rgb_path.read_bytes())
        buf = io.BytesIO()
        img.save(buf, "PNG", optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")

        pts = " ".join(f"{fmt(x)},{fmt(y)}" for x, y in entry["locus"])
        r = entry["rect"]
        clip_id = f"cp-locus-{name}"

        # SVGs loaded through <img> are parsed as strict XML, so xlink:href
        # requires its namespace to be declared on the root element.
        if "xmlns:xlink" not in svg:
            svg = svg.replace(
                '<svg xmlns="http://www.w3.org/2000/svg"',
                '<svg xmlns="http://www.w3.org/2000/svg" '
                'xmlns:xlink="http://www.w3.org/1999/xlink"',
                1,
            )

        # The locus clip path goes in the existing <defs>.
        assert "</defs>" in svg, f"{name}: no <defs> to extend"
        svg = svg.replace(
            "</defs>",
            f'<clipPath id="{clip_id}"><polygon points="{pts}"/></clipPath></defs>',
            1,
        )

        # The fill is inserted before the first plot-clipped group, so it sits
        # beneath the grid, gamut traces, locus outline and labels. Nesting it in
        # the existing cp-plot clip stops the horseshoe spilling into the axis
        # pads; the locus clip gives it its shape.
        marker = '<g clip-path="url(#cp-plot)">'
        assert marker in svg, f"{name}: no plot-clipped group to anchor to"
        image = (
            f'<g clip-path="url(#cp-plot)">'
            f'<image x="{fmt(r["x"])}" y="{fmt(r["y"])}" '
            f'width="{fmt(r["w"])}" height="{fmt(r["h"])}" '
            f'clip-path="url(#{clip_id})" opacity="{entry["opacity"]}" '
            f'preserveAspectRatio="none" image-rendering="optimizeQuality" '
            f'xlink:href="data:image/png;base64,{b64}"/></g>'
        )
        svg = svg.replace(marker, image + marker, 1)

        svg_path.write_text(svg)
        rgb_path.unlink()
        size_kb = len(svg.encode()) / 1024
        print(f"{name}.svg  {size_kb:7.1f}KB  fill {tw}x{th} @ {entry['opacity']}")

    (d / "fill-manifest.json").unlink()


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "docs/figures/svg")
