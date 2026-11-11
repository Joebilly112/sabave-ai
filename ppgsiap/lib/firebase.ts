import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function adminApp(): App | null {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;
  if (getApps().length > 0) return getApps()[0] ?? null;
  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function firestore(): Firestore | null {
  const app = adminApp();
  if (!app) return null;
  const databaseId = process.env.FIRESTORE_DATABASE_ID || "ppgsiap";
  return getFirestore(app, databaseId);
}
