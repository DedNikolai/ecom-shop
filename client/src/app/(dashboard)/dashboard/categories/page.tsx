'use client'

import { CategoryCard } from "@/components/category/CategoryCard";
import { Button } from "@/components/ui/button";
import styles from './categories.module.css';
import Link from "next/link";
import { protectedRoutes } from "@/app/api/client.routes";
import { useCategories } from "@/hooks/categories/useCategories";
import { CategoryCardSkeleton } from "@/components/category/CategoryCardSkeleton";

const LIMIT = 8;

export default function CategoriesPage() {
  const {data, isLoading} = useCategories();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[28px] font-bold">Categories</h1>
        <Link href={protectedRoutes._CATEGORIES_CREATE}><Button className={styles.btn}>Add New</Button></Link>
      </div>
      {
        isLoading ?         
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div> :
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map(cat => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>    
      }  
    </div>
  );
}
