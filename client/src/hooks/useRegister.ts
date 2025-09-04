import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/auth.client";
import { AuthRegisterType } from "@/types/auth";
import { publicRoutes } from "@/app/api/client.routes";

export function useRegister() {
    const router = useRouter();
  
    const authMutation = useMutation({
      mutationFn: async (values: AuthRegisterType) => {
        const res = await register(values)
        return res;
      },
      onSuccess: async (data) => {
        if (data) {
          router.replace(publicRoutes._LOGIN); 
        }
      },
    });

    return authMutation;
}