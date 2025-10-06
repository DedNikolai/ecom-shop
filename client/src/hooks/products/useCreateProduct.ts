import { create } from "@/services/product.service";
import { CreateProductType } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductType) => create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
