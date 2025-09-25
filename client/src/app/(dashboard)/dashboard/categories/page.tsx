// src/app/dashboard/categories/page.tsx
"use client";

import { useCategories } from "@/hooks/categories/useCategories";
import { CategoryCard } from "@/components/category/CategoryCard";
import { CategoryCardSkeleton } from "@/components/category/CategoryCardSkeleton";
import { Button } from "@/components/ui/button";
import styles from './categories.module.css';
import Link from "next/link";
import { protectedRoutes } from "@/app/api/client.routes";

export default function CategoriesPage() {
  const { data, isLoading, isFetching } = useCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold">Categories</h1>
        <Link href={protectedRoutes._CATEGORIES_CREATE}><Button className={styles.btn}>Add New</Button></Link>
      </div>

      {isLoading || isFetching ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CategoryCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map(cat => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}
