#!/usr/bin/env bash
# Deploy THIS Next.js app only. Does not create a Firebase project.
# Create the Hosting site and the named Firestore database before the first deploy.
set -euo pipefail
cd "$(dirname "$0")/.."
npm install
npm run build
firebase use skoolnow-ea6ff
firebase deploy --only hosting:oncallbidan --project skoolnow-ea6ff
