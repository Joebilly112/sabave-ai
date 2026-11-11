import type { Firestore } from "firebase-admin/firestore";

function readPrivateKey(): string {
  let key = process.env.FIREBASE_PRIVATE_KEY ?? "";
  if (key.startsWith('"') && key.endsWith('"')) key = key.slice(1, -1);
  return key.replace(/\\n/g, "\n");
}

export async function getDb(): Promise<Firestore | null> {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = readPrivateKey();
  if (!clientEmail || !privateKey) return null;

  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID || "skoolnow-ea6ff",
        clientEmail,
        privateKey,
      }),
    });

  return getFirestore(app, process.env.FIRESTORE_DATABASE_ID || "ratingturun");
}
