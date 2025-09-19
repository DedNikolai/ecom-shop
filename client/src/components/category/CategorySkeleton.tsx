// src/components/category/CategorySkeleton.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategorySkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3">
        <Skeleton className="h-12 w-12 rounded" />
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-24" />
      </CardContent>
    </Card>
  );
}
