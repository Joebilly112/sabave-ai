import { NextResponse } from "next/server";
import { decideCek } from "@/lib/band";
import { enrichDraft } from "@/lib/enrich";
import { parseCek } from "@/lib/parse";
import { saveCek } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseCek(body);
  if (!input) {
    return NextResponse.json({ error: "Isian suspend belum lengkap atau di luar batas." }, { status: 400 });
  }

  const scored = decideCek(input);
  const result = await enrichDraft(input, scored);
  const saved = await saveCek(input, result);
  return NextResponse.json({ id: saved.id });
}
