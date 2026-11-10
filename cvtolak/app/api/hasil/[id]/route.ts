import { NextResponse } from "next/server";
import { midtransConfigured } from "@/lib/midtrans";
import { UNLOCK_PRICE_IDR } from "@/lib/price";
import { getScan } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: { id: string } }) {
  const record = await getScan(context.params.id);
  if (!record) {
    return NextResponse.json({ error: "Audit tidak ditemukan." }, { status: 404 });
  }

  const base = {
    id: record.id,
    price: UNLOCK_PRICE_IDR,
    paymentReady: midtransConfigured(),
    input: {
      role: record.input.role,
      years: record.input.years,
    },
    visibility: record.result.visibility,
    teaser: record.result.teaser,
  };

  if (record.status !== "paid") {
    return NextResponse.json({ ...base, status: "pending" as const });
  }

  return NextResponse.json({ ...base, status: "paid" as const, result: record.result });
}
