import { NextResponse } from "next/server";
import { enrichNilai } from "@/lib/enrich";
import { buildNilai, parseNilaiInput } from "@/lib/nilai";
import { saveNilai } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format kiriman tidak terbaca." }, { status: 400 });
  }

  const parsed = parseNilaiInput(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

  const drafted = buildNilai(parsed);
  const result = await enrichNilai(parsed, drafted);
  const saved = await saveNilai(parsed, result);
  return NextResponse.json({ id: saved.id });
}
