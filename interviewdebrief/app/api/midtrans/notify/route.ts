import { NextResponse } from "next/server";
import { notificationSignature } from "@/lib/midtrans";
import { UNLOCK_PRICE_IDR } from "@/lib/price";
import { getByOrderId, updateDebrief } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    order_id?: string;
    status_code?: string;
    gross_amount?: string;
    signature_key?: string;
    transaction_status?: string;
    fraud_status?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload tidak terbaca." }, { status: 400 });
  }

  const orderId = body.order_id || "";
  const statusCode = body.status_code || "";
  const grossAmount = body.gross_amount || "";
  const signature = body.signature_key || "";
  if (!orderId || !statusCode || !grossAmount || !signature) {
    return NextResponse.json({ error: "Notifikasi tidak lengkap." }, { status: 400 });
  }

  const expected = notificationSignature({ orderId, statusCode, grossAmount });
  if (expected !== signature) {
    return NextResponse.json({ error: "Tanda tangan tidak cocok." }, { status: 403 });
  }

  const record = await getByOrderId(orderId);
  if (!record) return NextResponse.json({ ok: true });

  const amount = Number(grossAmount);
  const paid =
    amount === UNLOCK_PRICE_IDR &&
    (body.transaction_status === "settlement" ||
      (body.transaction_status === "capture" && body.fraud_status !== "deny"));

  await updateDebrief(record.id, {
    transactionStatus: body.transaction_status || null,
    status: paid ? "paid" : record.status,
    paidAt: paid ? record.paidAt || new Date().toISOString() : record.paidAt,
  });

  return NextResponse.json({ ok: true });
}
