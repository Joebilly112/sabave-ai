import { NextResponse } from "next/server";
import { enrichNote } from "@/lib/enrich";
import { parseCek } from "@/lib/parse";
import { saveCek } from "@/lib/store";
import { decideCek } from "@/lib/verdict";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseCek(body);
  if (!input) return NextResponse.json({ error: "Isian musim lapor belum lengkap." }, { status: 400 });

  const scored = decideCek(input);
  const result = await enrichNote(input, scored);
  const saved = await saveCek(input, result);
  return NextResponse.json({ id: saved.id });
}
