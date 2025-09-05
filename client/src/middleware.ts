// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import type { Role } from "./types/role";
import { protectedRoutes, publicRoutes } from "./app/api/client.routes";

const needsAdmin = (p: string) => p === protectedRoutes._DASHBOARD || p.startsWith(`${protectedRoutes._DASHBOARD}/`);
const needsUser  = (p: string) => p === protectedRoutes._PROFILE  || p.startsWith(`${protectedRoutes._PROFILE}/`);
const isAuthPage = (p: string) => p === publicRoutes._LOGIN || p === publicRoutes._REGISTER;

function getAccess(req: NextRequest) {
  const name = process.env.JWT_COOKIE_NAME || "access_token";
  return req.cookies.get(name)?.value ?? null;
}
function hasRefresh(req: NextRequest) {
  const name = process.env.REFRESH_COOKIE_NAME || "refresh_token";
  return !!req.cookies.get(name)?.value;
}

async function verifyJWT_HS(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  const key = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, key, {
    algorithms: [process.env.JWT_ALG || "HS256"],
  });
  return payload as JWTPayload & { role?: Role };
}

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const requiresAdmin = needsAdmin(pathname);
  const requiresUser  = needsUser(pathname);
  const current = pathname + (search || ""); // ← куди повернутись після refresh

  // --- /login | /register ---
  if (isAuthPage(pathname)) {
    const token = getAccess(req);
    if (!token) return NextResponse.next();

    try {
      await verifyJWT_HS(token);
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    } catch {
      if (hasRefresh(req)) {
        const url = new URL(publicRoutes._REFRESH, req.nextUrl.origin);
        url.searchParams.set("next", "/");     // ← для auth-сторінок хочемо на головну
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }

  // --- захищені ---
  if (!requiresAdmin && !requiresUser) return NextResponse.next();

  const token = getAccess(req);
  if (!token) {
    if (hasRefresh(req)) {
      const url = new URL(publicRoutes._REFRESH, req.nextUrl.origin);
      url.searchParams.set("next", current);   // ← ДОДАЛИ
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL(publicRoutes._LOGIN, req.nextUrl.origin));
  }

  try {
    const payload = await verifyJWT_HS(token);
    const role = payload.role;

    if ((requiresAdmin && role !== "ADMIN") || (requiresUser && role !== "USER")) {
      return NextResponse.redirect(new URL(publicRoutes._LOGIN, req.nextUrl.origin));
    }
    return NextResponse.next();
  } catch {
    if (hasRefresh(req)) {
      const url = new URL(publicRoutes._REFRESH, req.nextUrl.origin);
      url.searchParams.set("next", current);   // ← ДОДАЛИ
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL(publicRoutes._LOGIN, req.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    protectedRoutes._DASHBOARD,
    `${protectedRoutes._DASHBOARD}/:path*`,
    protectedRoutes._PROFILE,
    `${protectedRoutes._PROFILE}/:path*`,
    publicRoutes._LOGIN,
    publicRoutes._REGISTER, 
  ],
};

