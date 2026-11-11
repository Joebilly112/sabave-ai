import { NextResponse } from "next/server";
import { getHasil, storageConfigured, toPublicHasil } from "@/lib/hasil";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const configured = storageConfigured();
  const record = configured ? await getHasil(params.id) : null;
  return NextResponse.json(toPublicHasil(record, configured));
}
