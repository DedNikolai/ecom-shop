"use client";

import { useProducts } from "@/hooks/products/useProducts";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { useCategoryByUrl } from "@/hooks/categories/useCategoryByUrl";

const LIMIT = 16;

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useProducts({ page: 1, limit: LIMIT, categoryUrl: id });
  const category = useCategoryByUrl(id)

  if (isLoading || category.isPending)
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center md:text-left">
        {category.data?.title}
      </h1>
    {
        !data?.items?.length ?
        <div className="text-center text-gray-500 py-10 text-lg">
            No products found in this category.
        </div> :

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {data.items.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
          >
            <div className="relative w-full h-44 sm:h-52 bg-gray-100">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${product.mainPhoto}`}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        20vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col flex-1 justify-between p-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                {product.title}
              </h3>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-cyan-600 font-bold text-sm sm:text-base">
                  ${product.price}
                </span>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base px-3 py-1.5">
                  Buy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    }
    </div>
  );
}
