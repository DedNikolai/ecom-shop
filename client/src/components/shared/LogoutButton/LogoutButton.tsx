"use client";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function LogoutButton() {
  const qc = useQueryClient();
  const logout = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout"); // бек чистить cookies
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] });
      window.location.href = "/login"; // або router.replace("/")
    },
  });

  return (
    <button onClick={() => logout.mutate()} className="underline">
      Вийти
    </button>
  );
}
