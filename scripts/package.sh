#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
VERSION="$(python3 -c 'import json, pathlib, sys; print(json.loads(pathlib.Path(sys.argv[1]).read_text())["version"])' \
  "$ROOT_DIR/manifest.json" \
  < /dev/null)"
ZIP_PATH="$DIST_DIR/yt-shorts-redirect-$VERSION.zip"

mkdir -p "$DIST_DIR"
rm -f "$ZIP_PATH"

cd "$ROOT_DIR"
zip -qr "$ZIP_PATH" manifest.json background.js icons LICENSE
zip -d "$ZIP_PATH" icons/icon.svg icons/icon-1024.png >/dev/null

echo "Created $ZIP_PATH"
