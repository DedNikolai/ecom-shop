import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export type Me = { id: string; email: string; role: "ADMIN" | "USER" };

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async (): Promise<Me> => {
      const { data } = await api.get("/auth/me");
      return data;
    },
    retry: false,
  });
}
