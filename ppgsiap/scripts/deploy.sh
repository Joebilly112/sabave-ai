#!/usr/bin/env bash
# Deploy THIS site only. Requires Firebase CLI already logged in.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Building ppgsiap"
npm install
npm run build

firebase use skoolnow-ea6ff
firebase target:apply hosting ppgsiap ppgsiap --project skoolnow-ea6ff

echo "Deploying hosting target ppgsiap and Firestore database ppgsiap"
firebase deploy --only hosting:ppgsiap,firestore:ppgsiap --project skoolnow-ea6ff

echo "Live check: https://ppgsiap.web.app and https://ppgsiap.web.app/artikel"
