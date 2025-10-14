// src/services/products.ts
import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { CreateProductType, ProductListResponse, ProductType, UpdateProductType } from "@/types/product";
import toast from "react-hot-toast";

export type ProductsQuery = {
  page?: number;
  limit?: number;
  categoryId?: string | null;
  categoryUrl?: string | null;
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

export async function create(product: CreateProductType): Promise<ProductType | undefined> {
  try {
    const response = await api.post<ProductType>(`${serverRoutes._PRODUCTS}`, product);

    if (response.status === 201) {
      toast.success('Product was created');
      return response.data;
    }
  } catch(error) {
    toast.error('Product was not created');
    console.log(error)
  }
}

export async function fetchProduct(id: string):Promise<ProductType | undefined> {
  try {
    const response = await api.get(`${serverRoutes._PRODUCTS}/${id}`)

    if (response.status === 200) {
      return response.data;
    }

    toast.error('Cant get Product')

  } catch(error: any) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}

export async function update(id: string, dto: UpdateProductType): Promise<ProductType | undefined> {
  try {
    const response = await api.put(`${serverRoutes._PRODUCTS}/${id}`, dto)

    if (response.status === 200) {
      toast.success('Produc was updated')
      return response.data;
    }

    toast.error('Cant update Product')

  } catch(error: any) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}
