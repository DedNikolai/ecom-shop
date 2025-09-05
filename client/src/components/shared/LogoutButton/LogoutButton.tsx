"use client";
import { useLogout } from "@/hooks/useLogout";

export function LogoutButton() {
  const logout = useLogout();

  return (
    <button onClick={() => logout.mutate()}>
      Logout
    </button>
  );
}
