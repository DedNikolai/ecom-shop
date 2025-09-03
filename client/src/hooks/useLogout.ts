import { protectedRoutes, publicRoutes } from "@/app/api/client.routes";
import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // які маршрути вважаємо "захищеними"
  const isProtected = (path: string) =>
    path.startsWith(protectedRoutes._DASHBOARD) || path.startsWith(protectedRoutes._PROFILE);

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: async () => {
      qc.setQueryData(["me"], null);

      if (isProtected(pathname)) {
        router.replace(publicRoutes._LOGIN);
      } 
    },
  });
}
