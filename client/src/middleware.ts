// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import type { Role } from "./types/role";

const needsAdmin = (p: string) => p === "/dashboard" || p.startsWith("/dashboard/");
const needsUser  = (p: string) => p === "/profile"  || p.startsWith("/profile/");
const isAuthPage = (p: string) => p === "/login" || p === "/register";

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
  const { pathname } = req.nextUrl;

  if (isAuthPage(pathname)) {
    const token = getAccess(req);
    if (!token) return NextResponse.next();

    try {
      await verifyJWT_HS(token);
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    } catch {
      if (hasRefresh(req)) {
        return NextResponse.redirect(new URL("/api/auth/refresh-gate", req.nextUrl.origin));
      }
      return NextResponse.next(); 
    }
  }

  const requiresAdmin = needsAdmin(pathname);
  const requiresUser  = needsUser(pathname);

  if (!requiresAdmin && !requiresUser) return NextResponse.next();

  const token = getAccess(req);
  if (!token) {
    if (hasRefresh(req)) {
      return NextResponse.redirect(new URL("/api/auth/refresh-gate", req.nextUrl.origin));
    }
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  try {
    const payload = await verifyJWT_HS(token);
    const role = payload.role;

    if ((requiresAdmin && role !== "ADMIN") || (requiresUser && role !== "USER")) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
    return NextResponse.next();
  } catch {
    if (hasRefresh(req)) {
      return NextResponse.redirect(new URL("/api/auth/refresh-gate", req.nextUrl.origin));
    }
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
