// src/hooks/products/useProducts.ts
import { ProductsQuery, fetchProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params: ProductsQuery) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
  });
}
