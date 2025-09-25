import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/types/category";
import { fetchCategory } from "@/services/category.service";
import { da } from "zod/v4/locales";

export function useCategory(id: string) {
  const {data, isPending} = useQuery<Category | undefined>({
    queryKey: ["category", id],
    queryFn: () => fetchCategory(id),
    refetchOnWindowFocus: false,
  });

  return {data, isPending} 
}
