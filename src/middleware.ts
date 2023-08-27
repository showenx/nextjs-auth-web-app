// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import {
  resolveAuthenticatedResource,
  validateAuthorizedResource,
} from "./lib/authHelper";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const resource = resolveAuthenticatedResource(pathname);

  if (!resource) return NextResponse.next();

  const token = await getToken({ req: request });
  const nextUrl = request.nextUrl.clone();

  if (!token && resource.type === "AuthenticatedPage") {
    nextUrl.pathname = "/401"; // login
    return NextResponse.redirect(nextUrl);
  }

  if (!token && resource.type === "AuthenticatedApi") {
    nextUrl.pathname = "/api/auth/unauthorized";
    return NextResponse.rewrite(nextUrl);
  }

  const isAuthorized = validateAuthorizedResource(
    pathname,
    token?.role as string
  );

  if (!isAuthorized && resource.type === "AuthenticatedPage") {
    nextUrl.pathname = "/401";
    return NextResponse.redirect(nextUrl);
  }

  if (!isAuthorized && resource.type === "AuthenticatedApi") {
    nextUrl.pathname = "/api/auth/unauthorized";
    return NextResponse.rewrite(nextUrl);
  }

  return NextResponse.next();
}
