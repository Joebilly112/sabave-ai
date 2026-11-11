import { NextResponse } from "next/server";
import { enrichNote } from "@/lib/enrich";
import { parseCek } from "@/lib/parse";
import { decideCek } from "@/lib/plan";
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
    return NextResponse.json({ error: "Tanggal atau angka kredit belum lengkap atau di luar batas." }, { status: 400 });
  }

  const drafted = decideCek(input);
  const result = await enrichNote(input, drafted);
  const record = await saveCek(input, result);
  return NextResponse.json({ id: record.id });
}
