import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY = "https://tawaranaman.web.app";

const CANONICAL_HOSTS = new Set([
  "tawaranaman.firebaseapp.com",
  "tawaranaman.id",
  "www.tawaranaman.id",
]);

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  if (!host || host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next();
  }
  if (CANONICAL_HOSTS.has(host)) {
    const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, PRIMARY);
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|og.png|icon.svg).*)"],
};
