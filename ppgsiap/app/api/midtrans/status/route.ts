import { NextResponse } from "next/server";
import { syncOrderFromGateway } from "@/lib/midtrans";
import { getOrder, isOrderId } from "@/lib/orders";

export const runtime = "nodejs";

const message: Record<string, string> = {
  pending: "Pembayaran masih menunggu.",
  expire: "Pembayaran kedaluwarsa. Buat token baru.",
  cancel: "Pembayaran dibatalkan.",
  deny: "Pembayaran ditolak.",
};

export async function POST(request: Request) {
  let orderId = "";
  try {
    const body = (await request.json()) as { orderId?: unknown };
    if (typeof body.orderId === "string") orderId = body.orderId;
  } catch {
    return NextResponse.json({ error: "Permintaan tidak terbaca." }, { status: 400 });
  }
  if (!isOrderId(orderId)) {
    return NextResponse.json({ error: "Kode hasil tidak dikenal." }, { status: 400 });
  }

  const existing = await getOrder(orderId);
  if (!existing) return NextResponse.json({ error: "Pesanan tidak ada." }, { status: 404 });
  if (existing.status === "paid") return NextResponse.json({ status: "paid" });

  if (!process.env.MIDTRANS_SERVER_KEY) {
    return NextResponse.json({ error: "Kunci pembayaran belum dipasang." }, { status: 503 });
  }

  try {
    const status = await syncOrderFromGateway(orderId);
    if (status === "paid") return NextResponse.json({ status: "paid" });
    return NextResponse.json({
      status: status ?? existing.status,
      message: message[status ?? ""] ?? "Pembayaran belum masuk.",
    });
  } catch {
    return NextResponse.json({ error: "Status pembayaran belum terbaca." }, { status: 502 });
  }
}
