import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { protectedRoutes } from "@/app/api/client.routes";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

type Props = {
  id: string;
  title: string;
  price: number;
  inStock?: boolean;
  photo?: string | null;
  onRemove: (id: string) => void;
  isLoading: boolean
};

export function ProductCard({ id, title, price, inStock, photo, onRemove, isLoading }: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-neutral-50">
        {photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${photo}`}
            alt={title}
            fill
            className="object-contain"
            priority
            unoptimized
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between py-2">
        <div className="text-lg font-semibold">${price}</div>
        <Badge variant={inStock ? "default" : "secondary"}>
          {inStock ? "In stock" : "Out of stock"}
        </Badge>
      </CardContent>

      <CardFooter className="flex gap-2 justify-between">
        <Button asChild size="sm" variant="outline">
          <Link href={`${protectedRoutes._PRODUCTS_EDIT}/${id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
        </Button>
        
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isLoading}>
                Delete
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete “{title}”?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The category may be affected.
              </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onRemove(id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      </CardFooter>
    </Card>
  );
}

