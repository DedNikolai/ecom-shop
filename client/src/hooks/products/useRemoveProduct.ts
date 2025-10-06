import { removeProduct } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveProduct(paramsKey: any) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products", paramsKey] }),
  });
}
