import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";

const LIMIT = 10;

export default function Loading() {
  return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>    
  )
}
