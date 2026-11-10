import { NextResponse } from "next/server";
import { enrichMessage } from "@/lib/enrich";
import { parseKasus } from "@/lib/parse";
import { scoreKasus } from "@/lib/score";
import { saveKasus } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format tidak terbaca." }, { status: 400 });
  }

  const input = parseKasus(body);
  if (!input) return NextResponse.json({ error: "Isian brief belum lengkap." }, { status: 400 });

  const scored = scoreKasus(input);
  const result = await enrichMessage(input, scored);
  const saved = await saveKasus(input, result);
  return NextResponse.json({ id: saved.id });
}
