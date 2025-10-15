// src/hooks/categories/useRemoveCategory.ts
import { removeCategory } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveCategory(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => removeCategory(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      
    },
  });
}
