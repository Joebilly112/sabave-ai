import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";

export const runtime = "nodejs";

const ALLOWED = new Set(["page_view", "kasus_submit", "unlock_paid"]);

export async function POST(request: Request) {
  let body: { name?: string; path?: string };
  try {
    body = (await request.json()) as { name?: string; path?: string };
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = body.name || "";
  const pathName = (body.path || "/").slice(0, 120);
  if (!ALLOWED.has(name)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const db = await getDb();
  if (db) {
    await db.collection("analytics").add({
      name,
      path: pathName,
      createdAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true });
}
