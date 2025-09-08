
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ItemsType, UpdateItemDto } from "@/types/items";
import { patchItem, removeItem } from "@/services/items";

export function useRemoveItem(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => removeItem(id),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["items"] });
      const prev = qc.getQueryData<ItemsType[]>(["items"]);
      qc.setQueryData<ItemsType[]>(["items"], (old) =>
        (old ?? []).filter((item) => item.id !== id)
      );
      return { prev };
    },

  });
}
