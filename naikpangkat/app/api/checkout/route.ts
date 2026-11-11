import { NextResponse } from "next/server";
import { createHasil, getHasil, toPublicHasil, storageConfigured } from "@/lib/hasil";
import { createSnapTransaction, midtransClientKey, midtransConfigured, midtransSnapScript } from "@/lib/midtrans";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Data formulir tidak terbaca." }, { status: 400 });
  }

  if (!storageConfigured()) {
    return NextResponse.json({ error: "Firestore belum dikonfigurasi." }, { status: 503 });
  }
  if (!midtransConfigured()) {
    return NextResponse.json({ error: "Midtrans belum dikonfigurasi." }, { status: 503 });
  }

  try {
    const hasil = await createHasil(body);
    const snap = await createSnapTransaction({ orderId: hasil.orderId, hasilId: hasil.id });
    return NextResponse.json({
      id: hasil.id,
      snapToken: snap.token,
      redirectUrl: snap.redirectUrl,
      clientKey: midtransClientKey(),
      snapScript: midtransSnapScript(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pembayaran belum bisa dibuat.";
    const status = message === "Firestore belum dikonfigurasi." ? 503 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id") || "";
  const record = storageConfigured() ? await getHasil(id) : null;
  return NextResponse.json(toPublicHasil(record, storageConfigured()));
}
