'use client';

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProductByUrl } from "@/hooks/products/useProductByUrl";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const { product } = useParams<{ product: string }>();
  const { data: currentProduct, isPending } = useProductByUrl(product);
  const [quantity, setQuantity] = useState(1);

  if (isPending) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  if (!currentProduct) {
    return <div className="p-8 text-center text-gray-500">Product not found</div>;
  }

  const {
    title,
    price,
    description,
    metaTitle,
    metaDescription,
    mainPhoto,
    photos = [],
  } = currentProduct;

  // --- SEO title & description ---
  const pageTitle = metaTitle || title;
  const pageDescription = metaDescription || description.slice(0, 150) + "...";

  // --- Set <title> and <meta> dynamically ---
  if (typeof document !== "undefined") {
    document.title = pageTitle;
    const meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", pageDescription);
    else {
      const metaTag = document.createElement("meta");
      metaTag.name = "description";
      metaTag.content = pageDescription;
      document.head.appendChild(metaTag);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* --- Головна секція --- */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* --- Фото товару --- */}
        <div className="flex-1">
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${mainPhoto}`}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* --- Галерея --- */}
          {photos.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {photos.map((photo: string, idx: number) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 flex-shrink-0 cursor-pointer border rounded-md overflow-hidden"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${photo}`}
                    alt={`${title}-${idx}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Інформація про товар --- */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-2xl font-bold text-cyan-500">${price}</p>

          {/* --- Кількість --- */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border rounded-md p-1 text-center"
            />
          </div>

          {/* --- Кнопка Купити --- */}
          <Button
            onClick={() => alert(`Added ${quantity} × ${title} to cart`)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-md"
          >
            Купити
          </Button>

          {/* --- Опис --- */}
          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Опис товару</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
