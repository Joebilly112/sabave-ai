# Think Era Labs — Site Factory Playbook

Canonical instructions for the Site Factory agent. Live in sabave-ai at `site-factory/PLAYBOOK.md`. Cloud Automations should only say: follow this file.

You are the Think Era Labs Site Factory agent (cloud build + handoff + backlog).

Work ONLY in the connected sabave-ai repo. Each run builds EXACTLY ONE new app folder for the next unfinished idea. Do NOT create a new GitHub repo. Do NOT deploy Firebase / create Hosting / create Firestore this run.

═══════════════════════════════════════
STEP 0 — CLAIM NEXT IDEA (do this first, every run)
═══════════════════════════════════════
Sources:
1) Google Doc: documentId 10Vn05ZtE37XCLKSzmwjCP5iZwWmbUNHmASlFCP5Cx4M
   Tabs: Intro, Professionals, Students & Parents, Love & Relationships. Heading 2 site names are ideas (e.g. interviewdebrief.id → folder interviewdebrief).
   Optional filled long prompts (local paste): documentId 1laiFvg5tSKXXERaDpWs-J4YCAHQPITa0xatM_gb7zec — one HEADING_1 per website.
2) Backlog file in sabave-ai: site-factory/BACKLOG.md
   If missing, create it with a checklist of every Heading-2 product from Professionals + Students & Parents + Love & Relationships, format:
   - [ ] interviewdebrief
   - [ ] cvtolak
   … (FOLDER_NAME only, no .id)
   Also note already-existing app folders at repo root (or under apps/) as done: mark [x] if that folder already has a package.json / Next app.

Claiming rules:
- Treat an idea as DONE if ANY of: BACKLOG `- [x]`, app folder already exists with package.json, OR Google Doc Heading 2 already starts with ✅ / contains `DONE (site-factory)`.
- Scan BACKLOG.md (create from Doc Heading 2s if missing) top to bottom for the first not-done item.
- NEVER rebuild a done idea (including interviewdebrief if already built/marked).
- If EVERY item is done, stop and say “Backlog complete — no new apps to build.”
- Fill RUN INPUTS from that idea’s Google Doc bullets. RESEARCH_BRIEF = those bullets summarized.
- Announce: CLAIMED: <FOLDER_NAME> then proceed.

Do not invent products. Do not stay stuck on interviewdebrief.

═══════════════════════════════════════
RUN INPUTS (filled AFTER claim — not hard-coded forever)
═══════════════════════════════════════
PRODUCT_DOMAIN: <from doc, e.g. cvtolak.id>
FOLDER_NAME: <domain without .id>
PRODUCT_QUESTION / PRODUCT_EMOTION / UNLOCK_PRICE_IDR / INPUT_FIELDS / UNLOCK_OUTPUT / NICHE / BRAND_LOOK / RESEARCH_BRIEF: from the doc entry for that site
REPO: sabave-ai
APP_DIR: /FOLDER_NAME at repo root (or apps/FOLDER_NAME if apps/ layout already exists)
HOSTING_SITE_ID = FOLDER_NAME
FIRESTORE_DATABASE_ID = FOLDER_NAME
PRIMARY_PUBLIC_URL = https://FOLDER_NAME.web.app
FIREBASE_PROJECT_ID = skoolnow-ea6ff

═══════════════════════════════════════
HARD RULES
═══════════════════════════════════════
1. FROM SCRATCH in APP_DIR only. Do not copy other product folders for content/UI.
2. Folder name = FOLDER_NAME (no .id).
3. One emotion = one product. No sister links. Not a salary tool.
4. Deploy-ready configs only; NO live Firebase this run.
5. Indonesian UI lang=id.
6. Cost caps in config: minInstances 0, maxInstances 3, cpu 1, memoryMiB 512, region asia-southeast1.

═══════════════════════════════════════
STACK (inside APP_DIR)
═══════════════════════════════════════
Next.js 14 App Router, React 18, TypeScript strict, Node 22, npm, Tailwind 3, ui.tsx, framer-motion, lucide-react, Plus Jakarta Sans, firebase-admin pattern, Midtrans routes, /api/analytics, optional DeepSeek, static OG, middleware for PRIMARY_PUBLIC_URL, 5 typed TS articles, legal quartet noindex, /tentang, /hasil/[id], sitemap/robots, lib/seo.ts, LegalPage, firebase.json, .firebaserc (skoolnow-ea6ff), apphosting.yaml, firestore.rules, deploy script, .env.example, README.
Hero faux-UI for THIS product.

═══════════════════════════════════════
BUILD ORDER
═══════════════════════════════════════
1. STEP 0 claim next idea (Google Doc + BACKLOG.md).
2. Create APP_DIR; scaffold + build product.
3. npm install && npm run build in APP_DIR (must pass).
4. Mark complete in BOTH places (humans + future automations):
   a) site-factory/BACKLOG.md → `- [x] FOLDER_NAME` (date + cloud build finished).
   b) Google Doc 10Vn05ZtE37XCLKSzmwjCP5iZwWmbUNHmASlFCP5Cx4M → on that product’s Heading 2 line (e.g. `cvtolak.id`), prefix a visible done marker humans can see, e.g. change `cvtolak.id` to `✅ cvtolak.id` (or append ` — DONE (site-factory)`). Do not delete research bullets. If Docs edit fails, report it but still finish the repo work.
5. REQUIRED — commit AND push before finishing:
   - Stage APP_DIR + site-factory/BACKLOG.md + site-factory/PLAYBOOK.md (and any related files).
   - Commit with message like: `feat(site-factory): add <FOLDER_NAME> unlock app`.
   - Push to the remote sabave-ai branch this automation is on (create a PR only if the environment requires it; otherwise push the working branch).
   - Do not end the run with uncommitted or unpushed work. If push fails, report the error and retry once.
6. Print LOCAL DEPLOY HANDOFF PROMPT filled for THIS FOLDER_NAME. Do NOT deploy Firebase.

═══════════════════════════════════════
LOCAL DEPLOY HANDOFF PROMPT (fill FOLDER_NAME / domain / URLs for the claimed idea)
═══════════════════════════════════════
Print a copy-paste block:

You are deploying a Think Era Labs product on my Windows machine.
Repo remote: sabave-ai · App folder name: <FOLDER_NAME>
Local working directory (REQUIRED): C:\<FOLDER_NAME>
Do NOT use C:\sabave-ai\<FOLDER_NAME>. Do NOT nest under the sabave-ai clone. Work at the drive root only: cd C:\<FOLDER_NAME>
Firebase: skoolnow-ea6ff · Hosting site: <FOLDER_NAME> · URL: https://<FOLDER_NAME>.web.app
Firebase CLI already logged in.
1. cd C:\<FOLDER_NAME> · npm install && npm run build
2. firebase use skoolnow-ea6ff
3. hosting:sites:create <FOLDER_NAME> (suffix if needed); wire only this app’s firebase targets
4. Firestore DB <FOLDER_NAME> asia-southeast1 if missing
5. Cost caps minInstances 0 max 3 cpu 1 memory 512MiB
6. Deploy THIS site only · verify / and /artikel
7. Reply with live URL + Midtrans/DeepSeek/DNS leftovers
Do not copy other product folders.

═══════════════════════════════════════
DONE
═══════════════════════════════════════
Reply with: CLAIMED name, APP_DIR path, BACKLOG.md [x] + Google Doc ✅ confirmation, build result, commit SHA + push confirmation (branch/URL), handoff prompt.
If backlog was already all done, say so and create nothing.
