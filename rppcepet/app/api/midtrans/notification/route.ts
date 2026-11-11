import { NextResponse } from "next/server";
import { PRODUCT } from "@/lib/config";
import { mapTransactionStatus } from "@/lib/midtrans";
import { getOrder, markOrderStatus, verifyMidtransSignature } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "Server key hilang." }, { status: 503 });
  }

  const payload = (await request.json()) as {
    order_id?: string;
    status_code?: string;
    gross_amount?: string;
    signature_key?: string;
    transaction_status?: string;
    fraud_status?: string;
  };

  const orderId = payload.order_id ?? "";
  const statusCode = payload.status_code ?? "";
  const grossAmount = payload.gross_amount ?? "";
  const signature = payload.signature_key ?? "";
  const transactionStatus = payload.transaction_status ?? "";

  if (!orderId || !statusCode || !grossAmount || !signature) {
    return NextResponse.json({ error: "Notifikasi tidak lengkap." }, { status: 400 });
  }

  const valid = verifyMidtransSignature({
    orderId,
    statusCode,
    grossAmount,
    signatureKey: signature,
    serverKey,
  });
  if (!valid) {
    return NextResponse.json({ error: "Tanda tangan tidak cocok." }, { status: 403 });
  }

  if (Number(grossAmount) !== PRODUCT.priceIdr) {
    return NextResponse.json({ error: "Nominal tidak sesuai." }, { status: 400 });
  }

  const order = await getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Pesanan tidak ada." }, { status: 404 });
  }

  const next = mapTransactionStatus(transactionStatus, payload.fraud_status);
  if (!next) return NextResponse.json({ ok: true, ignored: true });
  if (order.status !== "paid") await markOrderStatus(orderId, next);
  return NextResponse.json({ ok: true });
}
