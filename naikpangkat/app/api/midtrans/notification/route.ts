import { NextResponse } from "next/server";
import { getHasil, markHasilFailed, markHasilPaid } from "@/lib/hasil";
import { verifyMidtransSignature } from "@/lib/midtrans";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

type Notification = {
  order_id?: string;
  status_code?: string;
  gross_amount?: string;
  signature_key?: string;
  transaction_status?: string;
  fraud_status?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Notification | null;
  if (!body?.order_id || !body.status_code || !body.gross_amount || !body.signature_key) {
    return NextResponse.json({ error: "Notifikasi tidak lengkap." }, { status: 400 });
  }

  const valid = verifyMidtransSignature({
    orderId: body.order_id,
    statusCode: body.status_code,
    grossAmount: body.gross_amount,
    signatureKey: body.signature_key,
  });
  if (!valid) return NextResponse.json({ error: "Tanda tangan tidak cocok." }, { status: 401 });

  const amount = Number(body.gross_amount);
  if (amount !== SITE.priceIdr) {
    return NextResponse.json({ error: "Nominal tidak cocok." }, { status: 400 });
  }

  const id = /^np-([a-f0-9]{20})$/.exec(body.order_id)?.[1];
  if (!id) return NextResponse.json({ ok: true });
  const hasil = await getHasil(id);
  if (!hasil) return NextResponse.json({ ok: true });

  const status = body.transaction_status;
  if (status === "settlement" || (status === "capture" && body.fraud_status !== "deny")) {
    await markHasilPaid(id);
  } else if (status === "deny" || status === "cancel" || status === "expire") {
    await markHasilFailed(id);
  }

  return NextResponse.json({ ok: true });
}
