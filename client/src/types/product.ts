import { Category } from "./category";

export type ProductType = {
    id: string;
    title: string;
    metaTitle?: string;
    description: string;
    metaDescription?: string;
    price: number;
    inStock?: boolean;
    photos?: string[];
    mainPhoto: string;
    url: string;
    categories: Category [];
  };
  
  export type ProductListResponse = {
    items: ProductType[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };

  export type CreateProductType = Omit<ProductType, "id" | "categories"> | {categories: string[]};
  export type UpdateProductType = Omit<ProductType, "id" | "categories"> | {categories: string[]};