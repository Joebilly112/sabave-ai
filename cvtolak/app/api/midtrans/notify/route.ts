import { NextResponse } from "next/server";
import { notificationSignature } from "@/lib/midtrans";
import { UNLOCK_PRICE_IDR } from "@/lib/price";
import { getByOrderId, updateScan } from "@/lib/store";

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
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const orderId = body.order_id || "";
  const statusCode = body.status_code || "";
  const grossAmount = body.gross_amount || "";
  const expected = notificationSignature({ orderId, statusCode, grossAmount });
  if (!body.signature_key || expected !== body.signature_key) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  const record = await getByOrderId(orderId);
  if (!record) return NextResponse.json({ ok: true });

  const amount = Number(grossAmount);
  const paid =
    amount === UNLOCK_PRICE_IDR &&
    (body.transaction_status === "settlement" ||
      (body.transaction_status === "capture" && body.fraud_status !== "deny"));

  await updateScan(record.id, {
    transactionStatus: body.transaction_status || null,
    status: paid ? "paid" : record.status,
    paidAt: paid ? record.paidAt || new Date().toISOString() : record.paidAt,
  });

  return NextResponse.json({ ok: true });
}
