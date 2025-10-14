import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/types/category";
import { fetchCategoryByUrl } from "@/services/category.service";

export function useCategoryByUrl(url: string) {
  const {data, isPending} = useQuery<Category | undefined>({
    queryKey: ["category", url],
    queryFn: () => fetchCategoryByUrl(url),
    refetchOnWindowFocus: false,
  });

  return {data, isPending} 
}
