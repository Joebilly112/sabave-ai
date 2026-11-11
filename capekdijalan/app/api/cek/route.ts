import { NextResponse } from "next/server";
import { enrichSummary } from "@/lib/enrich";
import { parseStrain } from "@/lib/parse";
import { saveCheck } from "@/lib/store";
import { decideStrain } from "@/lib/verdict";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseStrain(body);
  if (!input) {
    return NextResponse.json({ error: "Isian perjalanan belum lengkap atau di luar batas." }, { status: 400 });
  }

  const scored = decideStrain(input);
  const result = await enrichSummary(input, scored);
  const saved = await saveCheck(input, result);
  return NextResponse.json({ id: saved.id });
}
