import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { PRODUCT } from "@/lib/config";
import { polishOutline } from "@/lib/deepseek";
import { firestore } from "@/lib/firebase";
import { parseIntake } from "@/lib/intake";
import { buildOutline } from "@/lib/outline";
import { buildOrder, getOrder, isOrderId, saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

function clientPayload(token: string | null) {
  return {
    token,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "",
    isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Isian tidak terbaca." }, { status: 400 });
  }

  if (!firestore()) {
    return NextResponse.json(
      { error: "Pembayaran belum dikonfigurasi di server. Coba lagi setelah peluncuran." },
      { status: 503 },
    );
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
  if (!serverKey || !clientKey) {
    return NextResponse.json({ error: "Kunci pembayaran belum dipasang." }, { status: 503 });
  }

  const raw = body as { orderId?: unknown };
  let orderId = "";

  if (typeof raw.orderId === "string" && raw.orderId) {
    if (!isOrderId(raw.orderId)) {
      return NextResponse.json({ error: "Kode hasil tidak dikenal." }, { status: 400 });
    }
    const existing = await getOrder(raw.orderId);
    if (!existing) return NextResponse.json({ error: "Pesanan tidak ada." }, { status: 404 });
    if (existing.status === "paid") {
      return NextResponse.json({ id: existing.id, error: "Kerangka ini sudah terbuka." }, { status: 409 });
    }
    orderId = existing.id;
  } else {
    const intake = parseIntake(body);
    if (!intake) {
      return NextResponse.json(
        { error: "Jenjang, mapel, kurikulum, topik, jumlah siswa, dan menit wajib diisi dengan benar." },
        { status: 400 },
      );
    }
    const draft = buildOutline(intake);
    const result = await polishOutline(draft);
    const order = buildOrder(intake, result);
    try {
      await saveOrder(order);
    } catch {
      return NextResponse.json({ error: "Kerangka belum bisa disimpan. Coba lagi." }, { status: 503 });
    }
    orderId = order.id;
  }

  try {
    const snap = new Midtrans.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey,
    });
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: PRODUCT.priceIdr,
      },
      item_details: [
        {
          id: "unlock-rpp",
          price: PRODUCT.priceIdr,
          quantity: 1,
          name: "Kerangka RPP malam ini",
        },
      ],
      customer_details: { first_name: "Guru" },
    });
    return NextResponse.json({ id: orderId, ...clientPayload(transaction.token ?? null) });
  } catch {
    return NextResponse.json(
      { id: orderId, ...clientPayload(null), error: "Token pembayaran gagal dibuat. Pesanan tetap tersimpan." },
      { status: 502 },
    );
  }
}
