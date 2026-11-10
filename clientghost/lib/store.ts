import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/firebase";
import type { KasusInput, KasusResult, StoredKasus } from "@/lib/types";

const COLLECTION = "kasus";
const FILE = path.join(process.cwd(), ".data", "kasus.json");

function createId(): string {
  return randomBytes(9).toString("base64url");
}

async function readFileStore(): Promise<Record<string, StoredKasus>> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as Record<string, StoredKasus>;
  } catch {
    return {};
  }
}

async function writeFileStore(rows: Record<string, StoredKasus>): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(rows), "utf8");
}

export async function saveKasus(input: KasusInput, result: KasusResult): Promise<StoredKasus> {
  const id = createId();
  const record: StoredKasus = {
    id,
    orderId: `cg-${id}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    paidAt: null,
    input,
    result,
    transactionStatus: null,
    snapRedirectUrl: null,
  };

  const db = await getDb();
  if (db) {
    await db.collection(COLLECTION).doc(id).set(record);
    return record;
  }

  const rows = await readFileStore();
  rows[id] = record;
  await writeFileStore(rows);
  return record;
}

export async function getKasus(id: string): Promise<StoredKasus | null> {
  if (!/^[A-Za-z0-9_-]{8,24}$/.test(id)) return null;
  const db = await getDb();
  if (db) {
    const snap = await db.collection(COLLECTION).doc(id).get();
    return snap.exists ? (snap.data() as StoredKasus) : null;
  }
  const rows = await readFileStore();
  return rows[id] ?? null;
}

export async function getByOrderId(orderId: string): Promise<StoredKasus | null> {
  const db = await getDb();
  if (db) {
    const query = await db.collection(COLLECTION).where("orderId", "==", orderId).limit(1).get();
    if (query.empty) return null;
    return query.docs[0].data() as StoredKasus;
  }
  const rows = await readFileStore();
  return Object.values(rows).find((row) => row.orderId === orderId) ?? null;
}

export async function updateKasus(id: string, patch: Partial<StoredKasus>): Promise<StoredKasus | null> {
  const current = await getKasus(id);
  if (!current) return null;
  const next = { ...current, ...patch, id: current.id, orderId: current.orderId };
  const db = await getDb();
  if (db) {
    await db.collection(COLLECTION).doc(id).set(next, { merge: true });
    return next;
  }
  const rows = await readFileStore();
  rows[id] = next;
  await writeFileStore(rows);
  return next;
}
