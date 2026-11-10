import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ScanInput, ScanResult } from "@/lib/scan";
import { getDb } from "@/lib/firebase";

export type ScanStatus = "pending" | "paid";

export type StoredScan = {
  id: string;
  orderId: string;
  status: ScanStatus;
  createdAt: string;
  paidAt: string | null;
  input: ScanInput;
  result: ScanResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};

const COLLECTION = "scans";
const FILE = path.join(process.cwd(), ".data", "scans.json");

function createId(): string {
  return randomBytes(9).toString("base64url");
}

async function readFileStore(): Promise<Record<string, StoredScan>> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as Record<string, StoredScan>;
  } catch {
    return {};
  }
}

async function writeFileStore(rows: Record<string, StoredScan>): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(rows), "utf8");
}

export async function saveScan(input: ScanInput, result: ScanResult): Promise<StoredScan> {
  const id = createId();
  const record: StoredScan = {
    id,
    orderId: `cvt-${id}`,
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

export async function getScan(id: string): Promise<StoredScan | null> {
  if (!/^[A-Za-z0-9_-]{8,24}$/.test(id)) return null;
  const db = await getDb();
  if (db) {
    const snap = await db.collection(COLLECTION).doc(id).get();
    return snap.exists ? (snap.data() as StoredScan) : null;
  }
  const rows = await readFileStore();
  return rows[id] ?? null;
}

export async function getByOrderId(orderId: string): Promise<StoredScan | null> {
  const db = await getDb();
  if (db) {
    const query = await db.collection(COLLECTION).where("orderId", "==", orderId).limit(1).get();
    if (query.empty) return null;
    return query.docs[0].data() as StoredScan;
  }
  const rows = await readFileStore();
  return Object.values(rows).find((row) => row.orderId === orderId) ?? null;
}

export async function updateScan(id: string, patch: Partial<StoredScan>): Promise<StoredScan | null> {
  const current = await getScan(id);
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
