import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { PRODUCT } from "@/lib/config";
import { polishRecommendation } from "@/lib/deepseek";
import { parseIntake } from "@/lib/intake";
import { firestore } from "@/lib/firebase";
import { buildOrder, saveOrder } from "@/lib/orders";
import { recommend } from "@/lib/recommend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Isian tidak terbaca." }, { status: 400 });
  }

  const intake = parseIntake(body);
  if (!intake) {
    return NextResponse.json({ error: "Unit, lama kerja, dan tujuan wajib diisi." }, { status: 400 });
  }

  if (!firestore()) {
    return NextResponse.json(
      { error: "Pembayaran belum dikonfigurasi di server. Coba lagi setelah peluncuran." },
      { status: 503 },
    );
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) {
    return NextResponse.json({ error: "Kunci pembayaran belum dipasang." }, { status: 503 });
  }

  const draft = recommend(intake);
  const result = await polishRecommendation(draft);
  const order = buildOrder(intake, result);

  try {
    await saveOrder(order);
  } catch {
    return NextResponse.json({ error: "Hasil belum bisa disimpan. Coba lagi." }, { status: 503 });
  }

  try {
    const snap = new Midtrans.Snap({
      isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
      serverKey,
    });
    const transaction = (await snap.createTransaction({
      transaction_details: {
        order_id: order.id,
        gross_amount: PRODUCT.priceIdr,
      },
      item_details: [
        {
          id: "unlock-pelatihan",
          price: PRODUCT.priceIdr,
          quantity: 1,
          name: "Tiga pelatihan berikutnya",
        },
      ],
      customer_details: {
        first_name: intake.nickname || "Perawat",
      },
    })) as { token?: string };

    return NextResponse.json({ id: order.id, token: transaction.token ?? null });
  } catch {
    return NextResponse.json(
      { id: order.id, token: null, error: "Token pembayaran gagal dibuat. Pesanan tetap tersimpan." },
      { status: 502 },
    );
  }
}
