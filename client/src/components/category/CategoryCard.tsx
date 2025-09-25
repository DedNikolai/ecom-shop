// src/components/category/CategoryCard.tsx
"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRemoveCategory } from "@/hooks/categories/useRemoveCategory";
import type { Category } from "@/types/category";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { SERVER_API } from "@/app/api/server.routes";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { protectedRoutes } from "@/app/api/client.routes";
import { ca } from "zod/v4/locales";

export function CategoryCard({ cat }: { cat: Category }) {
  const remove = useRemoveCategory(cat.id);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center gap-3">
        <CardAction>
          <Link href={`${protectedRoutes._CATEGORIES_EDIT}/${cat.id}`}>
            <PencilIcon className="h-4 w-4" />
          </Link>
        </CardAction>
        <div className="relative h-12 w-12 overflow-hidden rounded">
          {/* якщо не хочеш next/image — заміни на <img> */}
          <Image src={`${SERVER_API}/${cat.photo}`} alt={cat.title} className="object-cover" width={100} height={100}/>
        </div>
        <div className="font-medium">{cat.title}</div>
        <div className="ml-auto flex gap-2">
          {/* <EditCategoryDialog cat={cat} /> */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={remove.isPending}>
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete “{cat.title}”?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => remove.mutate()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {remove.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <CardContent>
        {/* якщо треба — будь-який додатковий контент */}
      </CardContent>
    </Card>
  );
}
