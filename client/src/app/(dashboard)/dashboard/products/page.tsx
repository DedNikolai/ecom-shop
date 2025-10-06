"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/products/useProducts";
import { useRemoveProduct } from "@/hooks/products/useRemoveProduct";
import Link from "next/link";
import { useCategories } from "@/hooks/categories/useCategories";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton";
import { ProductsFilters } from "@/components/product/ProductsFilters";
import { protectedRoutes } from "@/app/api/client.routes";

const LIMIT = 10;

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const params = useMemo(() => ({ page, limit: LIMIT, title: query || null, categoryId }), [page, query, categoryId]);

  const { data, isLoading, isFetching } = useProducts(params);
  const { data: categories } = useCategories();
  const remove = useRemoveProduct(params); 
  const items = data?.items ?? [];
  const meta = data?.meta;

  const onFilters = useCallback(
    (v: { query: string; categoryId: string | null }) => {
      setQuery(v.query);
      setCategoryId(v.categoryId);
      setPage(1);
    },
    [] 
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ProductsFilters categories={categories} onChange={onFilters} />
        <Button asChild className="ml-auto">
          <Link href={protectedRoutes._PRODUCTS_CREATE}>Create product</Link>
        </Button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              inStock={p.inStock}
              photo={p.mainPhoto ?? undefined}
              onRemove={(id) => remove.mutate(id)}
              isLoading={remove.isPending}
            />
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-sm text-muted-foreground">Nothing found.</div>
          )}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={!meta.hasPrev || isFetching} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <span className="text-sm">
            Page <b>{meta.page}</b> / {meta.pages}
          </span>
          <Button variant="outline" size="sm" disabled={!meta.hasNext || isFetching} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
