import { getDb } from "./firebase-admin";
import { softenNote } from "./deepseek";
import { buildUnlock, validateInput, type FormInput, type Unlock } from "./berkas";
import { SITE } from "./site";

export type HasilStatus = "pending" | "paid" | "failed";

export type HasilRecord = {
  id: string;
  input: FormInput;
  unlock: Unlock;
  status: HasilStatus;
  amount: number;
  orderId: string;
  createdAt: string;
  paidAt: string | null;
};

const COLLECTION = "hasil";

function asRecord(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== "object") return null;
  return data as Record<string, unknown>;
}

function docToRecord(id: string, data: unknown): HasilRecord | null {
  const row = asRecord(data);
  if (!row?.input || !row.unlock || !row.orderId) return null;
  const status: HasilStatus =
    row.status === "paid" || row.status === "failed" ? row.status : "pending";
  return {
    id,
    input: row.input as FormInput,
    unlock: row.unlock as Unlock,
    status,
    amount: typeof row.amount === "number" ? row.amount : SITE.priceIdr,
    orderId: String(row.orderId),
    createdAt: String(row.createdAt || ""),
    paidAt: row.paidAt ? String(row.paidAt) : null,
  };
}

export function storageConfigured(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS);
}

export async function createHasil(rawInput: unknown): Promise<HasilRecord> {
  const parsed = validateInput(rawInput);
  if (!parsed.ok) throw new Error(parsed.error);
  const db = getDb();
  if (!db) throw new Error("Firestore belum dikonfigurasi.");

  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  const unlock = buildUnlock(parsed.value, new Date());
  unlock.note = await softenNote(unlock);
  const record: HasilRecord = {
    id,
    input: parsed.value,
    unlock,
    status: "pending",
    amount: SITE.priceIdr,
    orderId: `np-${id}`,
    createdAt: new Date().toISOString(),
    paidAt: null,
  };
  await db.collection(COLLECTION).doc(id).set(record);
  return record;
}

export async function getHasil(id: string): Promise<HasilRecord | null> {
  if (!/^[a-f0-9]{20}$/.test(id)) return null;
  const db = getDb();
  if (!db) return null;
  const snap = await db.collection(COLLECTION).doc(id).get();
  return docToRecord(id, snap.data());
}

export async function markHasilPaid(id: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.collection(COLLECTION).doc(id).set(
    { status: "paid", paidAt: new Date().toISOString() },
    { merge: true },
  );
}

export async function markHasilFailed(id: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  await db.collection(COLLECTION).doc(id).set({ status: "failed" }, { merge: true });
}

export type PublicHasil =
  | { configured: false }
  | { configured: true; found: false }
  | {
      configured: true;
      found: true;
      id: string;
      status: HasilStatus;
      amount: number;
      input: FormInput;
      profileLabel: string;
      itemCount: number;
      visibleTitles: string[];
      unlock?: Unlock;
    };

export function toPublicHasil(record: HasilRecord | null, configured: boolean): PublicHasil {
  if (!configured) return { configured: false };
  if (!record) return { configured: true, found: false };
  const base = {
    configured: true as const,
    found: true as const,
    id: record.id,
    status: record.status,
    amount: record.amount,
    input: record.input,
    profileLabel: record.unlock.profileLabel,
    itemCount: record.unlock.items.length,
    visibleTitles: record.unlock.items.slice(0, 3).map((item) => item.title),
  };
  if (record.status !== "paid") return base;
  return { ...base, unlock: record.unlock };
}
