import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

type Role = "ADMIN" | "USER";

// ---- Налаштування доступів чітко під твоє ТЗ ----
const needsAdmin = (pathname: string) =>
  pathname === "/dashboard" || pathname.startsWith("/dashboard/");
const needsUser = (pathname: string) =>
  pathname === "/profile" || pathname.startsWith("/profile/");

// ---- Звідки беремо токен ----
function getToken(req: NextRequest) {
  const name = process.env.JWT_COOKIE_NAME || "access_token";
  return req.cookies.get(name)?.value ?? null;
}

// ---- HMAC (HS256) верифікація ----
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

  // Публічні маршрути — пропускаємо
  const requiresAdmin = needsAdmin(pathname);
  const requiresUser = needsUser(pathname);
  if (!requiresAdmin && !requiresUser) return NextResponse.next();

  // Нема токена → редірект на логін
  const token = getToken(req);
  if (!token) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("next", pathname + (search || ""));
    return NextResponse.redirect(url);
  }

  try {
    const payload = await verifyJWT_HS(token);
    const role = payload.role;

    // Чітка перевірка ролі під маршрут
    if ((requiresAdmin && role !== "ADMIN") || (requiresUser && role !== "USER")) {
      const url = new URL("/login", req.nextUrl.origin);
      url.searchParams.set("next", pathname + (search || ""));
      return NextResponse.redirect(url);
    }

    // все гаразд
    return NextResponse.next();
  } catch {
    // невалідний/протухлий токен → на логін
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("next", pathname + (search || ""));
    return NextResponse.redirect(url);
  }
}

// Застосовуємо тільки до потрібних роутів (менше накладних витрат)
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/profile", "/profile/:path*"],
};
