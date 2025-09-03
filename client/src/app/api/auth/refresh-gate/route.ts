import { NextRequest, NextResponse } from "next/server";
import { publicRoutes } from "../../client.routes";
import { serverRoutes } from "../../server.routes";

export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next") || publicRoutes._HOME;
  const backend = process.env.BACKEND_API_URL; // напр. http://localhost:4000
  if (!backend) return NextResponse.redirect(new URL(publicRoutes._LOGIN, req.url));

  // 1) сервер-сервером звертаємось до бекенду за рефрешем, передаємо куки користувача
  const res = await fetch(`${backend}${serverRoutes._AUTH_REFRESH}`, {
    method: "POST",
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL(publicRoutes._LOGIN, req.url));
  }

  // 3) проксіємо Set-Cookie від бекенда до браузера та повертаємо користувача назад
  const setCookies = (res.headers as any).getSetCookie?.() ?? [];
  const redirect = NextResponse.redirect(new URL(next, req.url), { status: 303 });
  for (const sc of setCookies) redirect.headers.append("Set-Cookie", sc);
  return redirect;
}
