import { NextRequest, NextResponse } from "next/server";

type Role = "ADMIN" | "USER";
type Session = { id: string; email: string; role: Role; name?: string } | null;

// Які маршрути якою роллю захищаємо
const guards: Record<string, Role> = {
  "/dashboard": "ADMIN",
  "/profile": "USER",
};

function requiredRoleFor(pathname: string): Role | null {
  for (const base in guards) {
    if (pathname === base || pathname.startsWith(base + "/")) return guards[base];
  }
  return null;
}

async function getSession(req: NextRequest): Promise<Session> {
  try {
    // ВАЖЛИВО: звертаємось до проксійованого бекенду під тим самим доменом
    const url = new URL("/_api/auth/me", req.nextUrl.origin);
    const r = await fetch(url, {
      headers: { cookie: req.headers.get("cookie") ?? "" },
      cache: "no-store",
    });
    if (!r.ok) return null;
    return (await r.json()) as Session;
  } catch {
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const needed = requiredRoleFor(pathname);

  // Якщо маршрут публічний — пропускаємо
  if (!needed) return NextResponse.next();

  const session = await getSession(req);

  // Нема сесії або не та роль — шлемо на /login з next=первісний шлях
  if (!session || session.role !== needed) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    const nextPath = pathname + (search || "");
    loginUrl.searchParams.set("next", nextPath);
    return NextResponse.redirect(loginUrl);
  }

  // Все ок — пускаємо далі
  return NextResponse.next();
}

// Слухаємо тільки потрібні маршрути
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
