import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIMARY = process.env.PRIMARY_PUBLIC_URL || "https://ppgsiap.web.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const bare = host.split(":")[0]?.toLowerCase() ?? "";
  if (bare === "localhost" || bare === "127.0.0.1" || bare.endsWith(".local")) {
    return NextResponse.next();
  }

  const canonical = new URL(PRIMARY);
  if (bare !== canonical.host) {
    const url = request.nextUrl.clone();
    url.protocol = canonical.protocol;
    url.host = canonical.host;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|og.png|icon.svg).*)"],
};
