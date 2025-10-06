// src/hooks/categories/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/types/category";
import { getCategories } from "@/services/category.service";

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
  });
}
