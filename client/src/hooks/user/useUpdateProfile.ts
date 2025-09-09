import { updateProfile } from "@/services/user.servise";
import { UpdateUserType, UserType } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateUserType) => updateProfile(dto),
    onMutate: async (dto) => {
      await qc.cancelQueries({ queryKey: ["me"] });
      const prev = qc.getQueryData<UserType>(["me"]);
      if (prev) {
        qc.setQueryData<UserType>(["me"], { ...prev, ...dto });
      }
      return { prev };
    },
    onError: (_e, _dto, ctx) => {
      if (ctx?.prev) qc.setQueryData(["me"], ctx.prev);
    },
  });
}
