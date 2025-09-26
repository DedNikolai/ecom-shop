// src/types/products.ts
export type ProductType = {
    id: string;
    title: string;
    price: number;
    inStock: boolean;
    // photo?: string | null;
    mainPhoto: string;
    categories: { id: string; title: string }[];
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
  