import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { event?: unknown; path?: unknown } | null;
  const event = typeof body?.event === "string" ? body.event.slice(0, 40) : "";
  const path = typeof body?.path === "string" ? body.path.slice(0, 120) : "";
  if (!/^[a-z0-9_-]+$/.test(event) || !path.startsWith("/")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const db = getDb();
    if (db) {
      await db.collection("events").add({
        event,
        path,
        createdAt: new Date().toISOString(),
      });
    }
  } catch {
    // Analytics must not break the page when Firestore is absent.
  }

  return NextResponse.json({ ok: true });
}
