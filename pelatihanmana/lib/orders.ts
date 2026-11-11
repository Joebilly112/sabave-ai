import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { firestore } from "@/lib/firebase";
import type { Intake, OrderStatus, Recommendation, StoredOrder } from "@/lib/types";

const COLLECTION = "orders";

export function newOrderId(): string {
  return `pm_${randomBytes(9).toString("hex")}`;
}

export async function saveOrder(order: StoredOrder): Promise<void> {
  const db = firestore();
  if (!db) throw new Error("Firestore belum dikonfigurasi.");
  await db.collection(COLLECTION).doc(order.id).set(order);
}

export async function getOrder(id: string): Promise<StoredOrder | null> {
  const db = firestore();
  if (!db) return null;
  const snap = await db.collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return snap.data() as StoredOrder;
}

export async function markOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const db = firestore();
  if (!db) throw new Error("Firestore belum dikonfigurasi.");
  const patch: { status: OrderStatus; paidAt?: string } = { status };
  if (status === "paid") patch.paidAt = new Date().toISOString();
  await db.collection(COLLECTION).doc(id).set(patch, { merge: true });
}

export function buildOrder(input: Intake, result: Recommendation): StoredOrder {
  return {
    id: newOrderId(),
    status: "pending",
    amount: 19900,
    input,
    result,
    createdAt: new Date().toISOString(),
  };
}

export function verifyMidtransSignature(input: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
  serverKey: string;
}): boolean {
  const raw = `${input.orderId}${input.statusCode}${input.grossAmount}${input.serverKey}`;
  const expected = createHash("sha512").update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(input.signatureKey);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
