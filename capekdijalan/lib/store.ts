import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { getDb } from "@/lib/firebase";
import type { StoredCheck, StrainInput, StrainResult } from "@/lib/types";

const COLLECTION = "cek";
const FILE = path.join(process.cwd(), ".data", "cek.json");

function createId(): string {
  return randomBytes(9).toString("base64url");
}

async function readFileStore(): Promise<Record<string, StoredCheck>> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as Record<string, StoredCheck>;
  } catch {
    return {};
  }
}

async function writeFileStore(rows: Record<string, StoredCheck>): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(rows), "utf8");
}

export async function saveCheck(input: StrainInput, result: StrainResult): Promise<StoredCheck> {
  const id = createId();
  const record: StoredCheck = {
    id,
    orderId: `cdj-${id}`,
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

export async function getCheck(id: string): Promise<StoredCheck | null> {
  if (!/^[A-Za-z0-9_-]{8,24}$/.test(id)) return null;
  const db = await getDb();
  if (db) {
    const snap = await db.collection(COLLECTION).doc(id).get();
    return snap.exists ? (snap.data() as StoredCheck) : null;
  }
  const rows = await readFileStore();
  return rows[id] ?? null;
}

export async function getByOrderId(orderId: string): Promise<StoredCheck | null> {
  const db = await getDb();
  if (db) {
    const query = await db.collection(COLLECTION).where("orderId", "==", orderId).limit(1).get();
    if (query.empty) return null;
    return query.docs[0].data() as StoredCheck;
  }
  const rows = await readFileStore();
  return Object.values(rows).find((row) => row.orderId === orderId) ?? null;
}

export async function updateCheck(id: string, patch: Partial<StoredCheck>): Promise<StoredCheck | null> {
  const current = await getCheck(id);
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
