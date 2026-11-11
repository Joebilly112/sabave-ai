#!/usr/bin/env bash
# Deploy THIS site only. Requires Firebase CLI already logged in.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building rppcepet"
npm install
npm run build

firebase use skoolnow-ea6ff
firebase target:apply hosting rppcepet rppcepet --project skoolnow-ea6ff

echo "Deploying hosting target rppcepet and Firestore database rppcepet"
firebase deploy --only hosting:rppcepet,firestore:rppcepet --project skoolnow-ea6ff

echo "Live check: https://rppcepet.web.app and https://rppcepet.web.app/artikel"
