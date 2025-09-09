import { cookies } from "next/headers";
import { serverRoutes } from "@/app/api/server.routes";
import { UserType } from "@/types/user";

export async function authMeServer(): Promise<UserType | null> {
  const cookieHeader = (await cookies()).toString(); 
  const res = await fetch(`${process.env.BACKEND_API_URL}${serverRoutes._AUTH_ME}`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
