import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/auth.client";
import { Role } from "@/types/role";
import { LoginType } from "@/types/auth";
import { protectedRoutes } from "@/app/api/client.routes";

export function useAuth() {
    const router = useRouter();

    const qc = useQueryClient();
  
    const loginMutation = useMutation({
      mutationFn: async (values: LoginType) => {
        const res = await login(values)
        return res;
      },
      onSuccess: async (data) => {
        await qc.invalidateQueries({ queryKey: ["me"] });
        if (data) {
          let role: Role | null = null;
          if (data?.role) role = data.role as Role;
          const target = role === "ADMIN" ? protectedRoutes._DASHBOARD : role === "USER" ? protectedRoutes._PROFILE : "/";
          router.replace(target); 
        }
      },
    });

    return loginMutation;
}