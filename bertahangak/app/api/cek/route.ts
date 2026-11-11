import { NextResponse } from "next/server";
import { decideStay } from "@/lib/band";
import { enrichSummary } from "@/lib/enrich";
import { parseStay } from "@/lib/parse";
import { saveCheck } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseStay(body);
  if (!input) return NextResponse.json({ error: "Isian situasi belum lengkap atau di luar batas." }, { status: 400 });

  const scored = decideStay(input);
  const result = await enrichSummary(input, scored);
  const saved = await saveCheck(input, result);
  return NextResponse.json({ id: saved.id });
}
