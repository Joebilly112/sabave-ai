import { NextResponse } from "next/server";
import { enrichScan } from "@/lib/enrich";
import { buildScan, parseScanInput } from "@/lib/scan";
import { saveScan } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Format kiriman tidak terbaca." }, { status: 400 });
  }

  const parsed = parseScanInput(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

  const drafted = buildScan(parsed);
  const result = await enrichScan(parsed, drafted);
  const saved = await saveScan(parsed, result);
  return NextResponse.json({ id: saved.id });
}
