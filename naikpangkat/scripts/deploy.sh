#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
echo "Deploy naikpangkat only · skoolnow-ea6ff · asia-southeast1"
npm install
npm run build
firebase use skoolnow-ea6ff
firebase hosting:sites:create naikpangkat || true
firebase target:apply hosting naikpangkat naikpangkat
firebase firestore:databases:create naikpangkat --location=asia-southeast1 || true
firebase deploy --only hosting:naikpangkat,firestore:naikpangkat --project skoolnow-ea6ff
