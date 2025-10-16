'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProductByUrl } from "@/hooks/products/useProductByUrl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ProductType } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
  const { product } = useParams<{ product: string }>();
  const { data, isPending } = useProductByUrl(product);
  const currentProduct: Partial<ProductType> = data ?? {}

  const [quantity, setQuantity] = useState(1);

  // --- нове: діалог і навігація фото ---
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { title = '', price, description = '', metaTitle, metaDescription, mainPhoto, photos = [] } = currentProduct;

  // список фото
  const allPhotos = useMemo(() => [mainPhoto, ...photos], [mainPhoto, photos]);
  const currentSrc = `${API_URL}/${allPhotos[currentIndex]}`;

    // хендлери навігації
  const nextPhoto = () => setCurrentIndex((i) => (i + 1) % allPhotos.length);
  const prevPhoto = () => setCurrentIndex((i) => (i - 1 + allPhotos.length) % allPhotos.length);

  // клавіатура в модалці
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, allPhotos.length]);

  // SEO оновлення (можна лишити як було)
  const pageTitle = metaTitle || title;
  const pageDescription = metaDescription || description.slice(0, 150) + "...";
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

  if (isPending) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* ==== Фото та галерея ==== */}
        <div className="flex-1">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div
                className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => {
                  // відкриваємо модалку з тим фото, що вже вибране в превʼю
                  setIsOpen(true);
                }}
              >
                <Image
                  src={currentSrc}
                  alt={title}
                  fill
                  className="object-contain transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </DialogTrigger>

            {/* === Модалка з навігацією === */}
            <DialogContent
              aria-describedby=""
              className="bg-white p-0 rounded-xl shadow-lg sm:max-w-[90vw] max-w-[90vw] outline-none"
            >
              <VisuallyHidden>
                <DialogTitle>{title}</DialogTitle>
              </VisuallyHidden>

              <div className="relative w-[min(1000px,90vw)] h-[min(900px,85vh)] select-none">
                {/* Зображення */}
                <Image
                  key={allPhotos[currentIndex]} // форсує оновлення при зміні
                  src={currentSrc}
                  alt={`${title} ${currentIndex + 1}/${allPhotos.length}`}
                  fill
                  className="object-contain rounded-xl"
                  sizes="90vw"
                  priority={false}
                />

                {/* Ліва стрілка */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                  aria-label="Попереднє фото"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/60 focus:outline-none"
                >
                  {/* простий SVG-ікон */}
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                {/* Права стрілка */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                  aria-label="Наступне фото"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white grid place-items-center hover:bg-black/60 focus:outline-none"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </button>

                {/* Індикатор/лічильник */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 text-white text-xs px-3 py-1">
                  {currentIndex + 1} / {allPhotos.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* ---- Мініатюри ---- */}
          {allPhotos.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {allPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                  }}
                  className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden transition
                    ${currentIndex === idx ? "border-cyan-500" : "border-transparent hover:border-gray-300"}
                  `}
                  aria-label={`Перемкнути на фото ${idx + 1}`}
                >
                  <Image
                    src={`${API_URL}/${photo}`}
                    alt={`${title}-${idx}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    priority
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ==== Інформація про товар ==== */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-2xl font-bold text-cyan-500">${price}</p>

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

          <Button
            onClick={() => alert(`Added ${quantity} × ${title} to cart`)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-md"
          >
            Add to card
          </Button>

          <div className="pt-4 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Descripion</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
