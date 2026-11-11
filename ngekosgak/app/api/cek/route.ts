import { NextResponse } from "next/server";
import { enrichSummary } from "@/lib/enrich";
import { parseCommute } from "@/lib/parse";
import { saveCheck } from "@/lib/store";
import { decideCommute } from "@/lib/verdict";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseCommute(body);
  if (!input) return NextResponse.json({ error: "Isian perjalanan belum lengkap atau di luar batas." }, { status: 400 });

  const scored = decideCommute(input);
  const result = await enrichSummary(input, scored);
  const saved = await saveCheck(input, result);
  return NextResponse.json({ id: saved.id });
}
