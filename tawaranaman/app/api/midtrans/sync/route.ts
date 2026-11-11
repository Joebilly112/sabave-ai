import { NextResponse } from "next/server";
import { fetchTransaction, midtransConfigured } from "@/lib/midtrans";
import { getOffer, updateOffer } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const record = await getOffer(body.id || "");
  if (!record) return NextResponse.json({ ok: false }, { status: 404 });
  if (record.status === "paid" || !midtransConfigured()) {
    return NextResponse.json({ ok: true, status: record.status });
  }

  const state = await fetchTransaction(record.orderId);
  if (state?.paid) {
    await updateOffer(record.id, {
      status: "paid",
      paidAt: new Date().toISOString(),
      transactionStatus: state.transactionStatus,
    });
    return NextResponse.json({ ok: true, status: "paid" });
  }

  if (state) {
    await updateOffer(record.id, { transactionStatus: state.transactionStatus });
  }
  return NextResponse.json({ ok: true, status: "pending" });
}
