// src/services/products.ts
import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { ProductListResponse } from "@/types/product";
import toast from "react-hot-toast";

export type ProductsQuery = {
  page?: number;
  limit?: number;
  categoryId?: string | null;
  query?: string | null;
};

export async function fetchProducts(params: ProductsQuery): Promise<ProductListResponse | undefined> {
    try {
        const response = await api.get<ProductListResponse>(serverRoutes._PRODUCTS, { params });
    
        if (response.status === 200) {
            return response.data
        }
    } catch(error: any) {
        toast.error('Cant get products');
        console.log(error)
    }
}

export async function removeProduct(id: string) {
  try {
    const response = await api.delete(`${serverRoutes._PRODUCTS}/${id}`);

    if (response.status === 200) {
        toast.success('Product was deleted')
    }
  } catch(error) {
    toast.error('Product was not deleted')
    console.log(error)
  } 
  
}
