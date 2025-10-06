// src/hooks/categories/useUpdateCategory.ts
import { update } from "@/services/product.service";
import { UpdateProductType } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProduct(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateProductType) => update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
