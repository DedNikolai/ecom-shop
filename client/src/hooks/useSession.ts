// src/hooks/useSession.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { AuthUserType } from "@/types/auth";

export function useSession(initial?: AuthUserType | null) {
  return useQuery<AuthUserType | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<AuthUserType>("/auth/me");
        return data ?? null;
      } catch {
        return null;
      }
    },
    initialData: initial ?? null, 
    staleTime: 60_000,
  });
}
