import { NextResponse } from "next/server";
import { createSnapCharge, midtransConfigured } from "@/lib/midtrans";
import { getScan, updateScan } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const record = await getScan(body.id || "");
  if (!record) return NextResponse.json({ error: "Audit tidak ditemukan." }, { status: 404 });
  if (record.status === "paid") return NextResponse.json({ alreadyPaid: true });
  if (!midtransConfigured()) {
    return NextResponse.json({ error: "Pembayaran belum dikonfigurasi." }, { status: 503 });
  }

  try {
    const charge = record.snapRedirectUrl
      ? { token: "", redirectUrl: record.snapRedirectUrl }
      : await createSnapCharge({ orderId: record.orderId, scanId: record.id, role: record.input.role });
    if (!record.snapRedirectUrl) {
      await updateScan(record.id, { snapRedirectUrl: charge.redirectUrl });
    }
    return NextResponse.json({ token: charge.token, redirectUrl: charge.redirectUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Midtrans menolak transaksi.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
