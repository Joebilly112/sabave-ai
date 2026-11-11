import { applicationDefault, cert, getApps, initializeApp, type App, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { SITE } from "./site";

function readServiceAccount(): ServiceAccount | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const decoded = raw.trim().startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    const parsed = JSON.parse(decoded) as {
      project_id?: string;
      client_email?: string;
      private_key?: string;
    };
    if (!parsed.client_email || !parsed.private_key) return null;
    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch {
    return null;
  }
}

export function getAdminApp(): App | null {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_PROJECT_ID || SITE.firebaseProject;
  const account = readServiceAccount();
  if (!account && !process.env.GOOGLE_APPLICATION_CREDENTIALS) return null;

  if (account) {
    return initializeApp({
      credential: cert(account),
      projectId,
    });
  }

  return initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

export function getDb(): Firestore | null {
  const app = getAdminApp();
  if (!app) return null;
  const databaseId = process.env.FIRESTORE_DATABASE_ID || SITE.firestoreDatabase;
  return getFirestore(app, databaseId);
}
