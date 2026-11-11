import { NextResponse } from "next/server";
import { decideOffer } from "@/lib/band";
import { enrichScript } from "@/lib/enrich";
import { parseOffer } from "@/lib/parse";
import { saveOffer } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseOffer(body);
  if (!input) return NextResponse.json({ error: "Isian tawaran belum lengkap atau di luar batas." }, { status: 400 });

  const scored = decideOffer(input);
  const result = await enrichScript(input, scored);
  const saved = await saveOffer(input, result);
  return NextResponse.json({ id: saved.id });
}
