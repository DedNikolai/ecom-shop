import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByUrl } from "@/services/product.service";
import { ProductType } from "@/types/product";

export function useProductByUrl(url: string) {
  const router = useRouter();

  const { data, isPending } = useQuery<ProductType | undefined>({
    queryKey: ["product", url],
    queryFn: async () => {
      const data = await fetchProductByUrl(url);
      
      if (!data) {
        router.replace("/404");
      }
      return data;
    },

    refetchOnWindowFocus: false,
  });

  return { data, isPending };
}
