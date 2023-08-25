// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  const protectedPaths = ["/protected"];
  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  console.log(`middleware`, pathname, token);

  if (matchesProtectedPath && !token) {
    const t = request.nextUrl.clone();
    t.pathname = "/401"
    return NextResponse.redirect(t);
  }

  const protectedApi = ["/api/health"];
  const matchesProtectedApi = protectedApi.some((path) =>
    pathname.startsWith(path),
  );

  if (matchesProtectedApi && !token) {
    const t = request.nextUrl.clone();
    t.pathname = "/api/auth/unauthorized"
    return NextResponse.rewrite(t)
  }

  return NextResponse.next();
}
