import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  price: number;
  inStock: boolean;
  photo?: string | null;
  onRemove: (id: string) => void;
};

export function ProductCard({ id, title, price, inStock, photo, onRemove }: Props) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-neutral-50">
        {photo ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${photo}`}
            alt={title}
            fill
            className="object-contain"
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

      <CardFooter className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href={`/dashboard/products/edit/${id}`}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Link>
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onRemove(id)}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

