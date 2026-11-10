import { NextResponse } from "next/server";
import { companyLabel, payLabel, supervisorLabel } from "@/lib/labels";
import { midtransConfigured } from "@/lib/midtrans";
import { UNLOCK_PRICE_IDR } from "@/lib/price";
import { getNilai } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: { id: string } }) {
  const record = await getNilai(context.params.id);
  if (!record) {
    return NextResponse.json({ error: "Hasil tidak ditemukan." }, { status: 404 });
  }

  const base = {
    id: record.id,
    price: UNLOCK_PRICE_IDR,
    paymentReady: midtransConfigured(),
    teaser: record.result.teaser,
    input: {
      role: record.input.role,
      company: companyLabel(record.input.companyType),
      pay: payLabel(record.input.pay),
      durationWeeks: record.input.durationWeeks,
      supervisor: supervisorLabel(record.input.supervisor),
    },
  };

  if (record.status !== "paid") {
    return NextResponse.json({ ...base, status: "pending" as const });
  }

  return NextResponse.json({
    ...base,
    status: "paid" as const,
    result: {
      band: record.result.band,
      headline: record.result.headline,
      summary: record.result.summary,
      signals: record.result.signals,
      skills: record.result.skills,
      script: record.result.script,
    },
  });
}
