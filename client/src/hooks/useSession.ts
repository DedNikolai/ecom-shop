import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { AuthUserType } from "@/types/auth";
import { serverRoutes } from "@/app/api/server.routes";

export function useSession(initial?: AuthUserType | null) {
  return useQuery<AuthUserType | null>({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<AuthUserType>(serverRoutes._AUTH_ME);
        return data ?? null;
      } catch {
        return null;
      }
    },
    initialData: initial ?? null, 
    staleTime: 60_000,
    refetchOnWindowFocus: false
  });
}
