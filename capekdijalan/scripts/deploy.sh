#!/usr/bin/env bash
# Deploy THIS Next.js app only. Does not create a Firebase project,
# Hosting site, or Firestore database.
set -euo pipefail
cd "$(dirname "$0")/.."
npm install
npm run build
firebase use skoolnow-ea6ff
firebase deploy --only hosting:capekdijalan --project skoolnow-ea6ff
