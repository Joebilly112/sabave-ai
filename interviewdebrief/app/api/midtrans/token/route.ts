import { NextResponse } from "next/server";
import { createSnapCharge, midtransConfigured } from "@/lib/midtrans";
import { getDebrief, updateDebrief } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return NextResponse.json({ error: "Format kiriman tidak terbaca." }, { status: 400 });
  }

  const id = body.id || "";
  const record = await getDebrief(id);
  if (!record) return NextResponse.json({ error: "Debrief tidak ditemukan." }, { status: 404 });
  if (record.status === "paid") {
    return NextResponse.json({ redirectUrl: `/hasil/${record.id}` });
  }
  if (record.snapRedirectUrl) {
    return NextResponse.json({ redirectUrl: record.snapRedirectUrl });
  }
  if (!midtransConfigured()) {
    return NextResponse.json({ error: "Pembayaran belum dikonfigurasi." }, { status: 503 });
  }

  try {
    const charge = await createSnapCharge({
      orderId: record.orderId,
      debriefId: record.id,
      role: record.input.role,
    });
    await updateDebrief(record.id, { snapRedirectUrl: charge.redirectUrl });
    return NextResponse.json({ redirectUrl: charge.redirectUrl, token: charge.token });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal membuat pembayaran.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
