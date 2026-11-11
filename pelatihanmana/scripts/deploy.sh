#!/usr/bin/env bash
# Deploy THIS site only. Requires Firebase CLI already logged in.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building pelatihanmana"
npm install
npm run build

firebase use skoolnow-ea6ff
firebase target:apply hosting pelatihanmana pelatihanmana --project skoolnow-ea6ff

echo "Deploying hosting target pelatihanmana and Firestore database pelatihanmana"
firebase deploy --only hosting:pelatihanmana,firestore:pelatihanmana --project skoolnow-ea6ff

echo "Live check: https://pelatihanmana.web.app and https://pelatihanmana.web.app/artikel"
