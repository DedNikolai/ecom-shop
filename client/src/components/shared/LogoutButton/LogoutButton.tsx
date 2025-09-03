"use client";
import { useLogout } from "@/hooks/useLogout";

export function LogoutButton() {
  const logout = useLogout();

  return (
    <button onClick={() => logout.mutate()} className="underline">
      Вийти
    </button>
  );
}
