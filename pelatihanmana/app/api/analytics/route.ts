import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let name = "page_view";
  let path = "/";
  try {
    const body = (await request.json()) as { name?: unknown; path?: unknown };
    if (typeof body.name === "string") name = body.name.slice(0, 40);
    if (typeof body.path === "string") path = body.path.slice(0, 120);
  } catch {
    // Beacon kosong tetap diterima.
  }

  const db = firestore();
  if (db) {
    try {
      await db.collection("analytics").add({
        name,
        path,
        createdAt: new Date().toISOString(),
      });
    } catch {
      // Analitik tidak boleh mengganggu pengunjung.
    }
  }

  return new NextResponse(null, { status: 204 });
}
