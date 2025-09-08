import { createItem } from "@/services/items";
import { CreateItemDto } from "@/types/items";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateItemDto) => createItem(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
    },
  });
}
