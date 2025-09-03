// БЕЗ "use client" !!!
// Не імпортуй тут axios, toast, React тощо.

import { cookies } from "next/headers";
import type { AuthUserType } from "@/types/auth";

export async function authMeServer(): Promise<AuthUserType | null> {
  const cookieHeader = (await cookies()).toString(); // куки з поточного запиту
  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
