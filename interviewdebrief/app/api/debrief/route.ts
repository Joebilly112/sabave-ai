import { NextResponse } from "next/server";
import { buildDebrief, parseDebriefInput } from "@/lib/debrief";
import { enrichDebrief } from "@/lib/enrich";
import { saveDebrief } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format kiriman tidak terbaca." }, { status: 400 });
  }

  const parsed = parseDebriefInput(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

  const drafted = buildDebrief(parsed);
  const result = await enrichDebrief(parsed, drafted);
  const saved = await saveDebrief(parsed, result);
  return NextResponse.json({ id: saved.id });
}
