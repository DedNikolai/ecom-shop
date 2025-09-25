// src/hooks/categories/useUpdateCategory.ts
import { updateCategory } from "@/services/category.service";
import { Category, UpdateCategory } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateCategory) => updateCategory(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
