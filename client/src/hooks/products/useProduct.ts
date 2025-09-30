import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/services/product.service";
import { ProductType } from "@/types/product";

export function useProduct(id: string) {
  const router = useRouter();

  const { data, isPending } = useQuery<ProductType | undefined>({
    queryKey: ["product", id],
    queryFn: async () => {
      const data = await fetchProduct(id);
      
      if (!data) {
        router.replace("/404");
      }
      return data;
    },

    refetchOnWindowFocus: false,
  });

  return { data, isPending };
}
