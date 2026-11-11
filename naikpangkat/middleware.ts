import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE } from "@/lib/site";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) {
    return NextResponse.next();
  }
  const canonicalHost = new URL(SITE.url).host;
  if (host !== canonicalHost) {
    const destination = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, SITE.url);
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|og.png).*)"],
};
