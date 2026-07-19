#!/usr/bin/env bash
# Build the published layout locally: landing page at /, wiki at /wiki.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf publish && mkdir -p publish
cp -R landing/. publish/
.venv/bin/mkdocs build --strict -d publish/wiki
touch publish/.nojekyll
echo "built -> publish/  (serve with: python3 -m http.server 8899 --directory publish)"
