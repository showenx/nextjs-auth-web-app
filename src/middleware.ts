// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/protected"];
  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  const token = await getToken({ req: request });

  console.log(`middleware`, pathname, token);

  // if (matchesProtectedPath) {

  //   const url = new URL(`/`, request.url);
  //   return NextResponse.rewrite(url);

  // }
  return NextResponse.next();
}
