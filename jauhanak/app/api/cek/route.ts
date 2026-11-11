import { NextResponse } from "next/server";
import { decideCloseness } from "@/lib/band";
import { enrichScript } from "@/lib/enrich";
import { parseCloseness } from "@/lib/parse";
import { saveCheck } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseCloseness(body);
  if (!input) return NextResponse.json({ error: "Isian kedekatan belum lengkap atau di luar batas." }, { status: 400 });

  const scored = decideCloseness(input);
  const result = await enrichScript(input, scored);
  const saved = await saveCheck(input, result);
  return NextResponse.json({ id: saved.id });
}
