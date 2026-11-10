import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DebriefInput, DebriefResult } from "@/lib/debrief";
import { getDb } from "@/lib/firebase";

export type DebriefStatus = "pending" | "paid";

export type StoredDebrief = {
  id: string;
  orderId: string;
  status: DebriefStatus;
  createdAt: string;
  paidAt: string | null;
  input: DebriefInput;
  result: DebriefResult;
  transactionStatus: string | null;
  snapRedirectUrl: string | null;
};

const COLLECTION = "debriefs";
const FILE = path.join(process.cwd(), ".data", "debriefs.json");

function createId(): string {
  return randomBytes(9).toString("base64url");
}

async function readFileStore(): Promise<Record<string, StoredDebrief>> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as Record<string, StoredDebrief>;
  } catch {
    return {};
  }
}

async function writeFileStore(rows: Record<string, StoredDebrief>): Promise<void> {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(rows), "utf8");
}

export async function saveDebrief(input: DebriefInput, result: DebriefResult): Promise<StoredDebrief> {
  const id = createId();
  const record: StoredDebrief = {
    id,
    orderId: `idb-${id}`,
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

export async function getDebrief(id: string): Promise<StoredDebrief | null> {
  if (!/^[A-Za-z0-9_-]{8,24}$/.test(id)) return null;
  const db = await getDb();
  if (db) {
    const snap = await db.collection(COLLECTION).doc(id).get();
    return snap.exists ? (snap.data() as StoredDebrief) : null;
  }
  const rows = await readFileStore();
  return rows[id] ?? null;
}

export async function getByOrderId(orderId: string): Promise<StoredDebrief | null> {
  const db = await getDb();
  if (db) {
    const query = await db.collection(COLLECTION).where("orderId", "==", orderId).limit(1).get();
    if (query.empty) return null;
    return query.docs[0].data() as StoredDebrief;
  }
  const rows = await readFileStore();
  return Object.values(rows).find((row) => row.orderId === orderId) ?? null;
}

export async function updateDebrief(id: string, patch: Partial<StoredDebrief>): Promise<StoredDebrief | null> {
  const current = await getDebrief(id);
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
