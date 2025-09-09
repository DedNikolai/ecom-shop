// src/hooks/useSession.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { serverRoutes } from "@/app/api/server.routes";
import { publicRoutes } from "@/app/api/client.routes";
import type { UserType } from "@/types/user";

export function useSession(initial?: UserType | null) {
  return useQuery<UserType>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<UserType>(serverRoutes._AUTH_ME);
        return data;
      } catch (e: any) {
       
        if (e?.response?.status === 401) {
          await fetch(publicRoutes._REFRESH, { credentials: "include" }); // /api/auth/refresh-gate
          const { data } = await api.get<UserType>(serverRoutes._AUTH_ME);
          return data;
        }
        throw e; 
      }
    },
    initialData: initial ?? undefined,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
