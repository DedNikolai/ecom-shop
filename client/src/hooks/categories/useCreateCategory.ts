// src/hooks/categories/useCreateCategory.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCategory } from "@/types/category";
import { createCategory } from "@/services/category.service";

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCategory) => createCategory(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
