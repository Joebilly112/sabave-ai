import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getDb } from "@/lib/firebase";
import type { NilaiInput, NilaiResult } from "@/lib/nilai";

export type NilaiStatus = "pending" | "paid";

export type StoredNilai = {
  id: string;
  orderId: string;
  status: NilaiStatus;
  createdAt: string;
  paidAt: string | null;
  input: NilaiInput;
  result: NilaiResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};

const COLLECTION = "nilai";
const FILE = path.join(process.cwd(), ".data", "nilai.json");

function createId(): string {
  return randomBytes(9).toString("base64url");
}

async function readFileStore(): Promise<Record<string, StoredNilai>> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as Record<string, StoredNilai>;
  } catch {
    return {};
  }
}

async function writeFileStore(rows: Record<string, StoredNilai>): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(rows), "utf8");
}

export async function saveNilai(input: NilaiInput, result: NilaiResult): Promise<StoredNilai> {
  const id = createId();
  const record: StoredNilai = {
    id,
    orderId: `mgw-${id}`,
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

export async function getNilai(id: string): Promise<StoredNilai | null> {
  if (!/^[A-Za-z0-9_-]{8,24}$/.test(id)) return null;
  const db = await getDb();
  if (db) {
    const snap = await db.collection(COLLECTION).doc(id).get();
    return snap.exists ? (snap.data() as StoredNilai) : null;
  }
  const rows = await readFileStore();
  return rows[id] ?? null;
}

export async function getByOrderId(orderId: string): Promise<StoredNilai | null> {
  const db = await getDb();
  if (db) {
    const query = await db.collection(COLLECTION).where("orderId", "==", orderId).limit(1).get();
    if (query.empty) return null;
    return query.docs[0].data() as StoredNilai;
  }
  const rows = await readFileStore();
  return Object.values(rows).find((row) => row.orderId === orderId) ?? null;
}

export async function updateNilai(id: string, patch: Partial<StoredNilai>): Promise<StoredNilai | null> {
  const current = await getNilai(id);
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
