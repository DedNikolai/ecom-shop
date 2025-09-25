import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function CategorySkeleton() {
  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Title */}
          <div className="grid gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Photo (preview + buttons) */}
          <div className="grid gap-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex items-start gap-4">
              <Skeleton className="h-32 w-32 rounded-md" />
              <div className="flex flex-col gap-2">
                <Button variant="outline" disabled>
                  <Skeleton className="h-4 w-20" />
                </Button>
                <Button variant="outline" disabled>
                  <Skeleton className="h-4 w-16" />
                </Button>
              </div>
            </div>
          </div>

          {/* Meta title */}
          <div className="grid gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Meta description */}
          <div className="grid gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-20 w-full" />
          </div>

          {/* Sort order */}
          <div className="grid gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Actions */}
          <div className="ml-auto flex gap-2">
            <Button variant="outline" disabled>
              <Skeleton className="h-4 w-14" />
            </Button>
            <Button disabled>
              <Skeleton className="h-4 w-16" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
