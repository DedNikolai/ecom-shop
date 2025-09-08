// src/components/item/ItemSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemSkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3">
        <Skeleton className="h-6 w-48 rounded" />      {/* title */}
        <div className="ml-auto flex gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />  {/* edit btn */}
          <Skeleton className="h-8 w-8 rounded-md" />  {/* delete btn */}
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-24 rounded" />      {/* price */}
      </CardContent>
    </Card>
  );
}
