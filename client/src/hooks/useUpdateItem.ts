
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ItemsType, UpdateItemDto } from "@/types/items";
import { patchItem } from "@/services/items";

export function useUpdateItem(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateItemDto) => patchItem(id, dto),
    // оптимістичне оновлення (опційно)
    onMutate: async (dto) => {
      await qc.cancelQueries({ queryKey: ["items"] });
      const prev = qc.getQueryData<ItemsType[]>(["items"]);
      if (prev) {
        qc.setQueryData<ItemsType[]>(["items"], prev.map(i => i.id === id ? { ...i, ...dto } as ItemsType : i));
      }
      return { prev };
    },
    onError: (_e, _dto, ctx) => {
      if (ctx?.prev) qc.setQueryData(["items"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
