// src/services/categories.ts
import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { Category, CreateCategory } from "@/types/category";
import toast from "react-hot-toast";

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>(serverRoutes._CATEGORIES);
  return data;
}

export async function createCategory(dto: CreateCategory): Promise<Category | undefined> {
    try {
        const response = await api.post<Category>(serverRoutes._CATEGORIES, dto);
        if (response.status == 200) {
            toast.success('Category was created');
            return response.data;
        }
        toast.error('Category was not created');

    } catch(error: any) {
        toast.error(error.response.data.message);
        console.log(error)
    }
  
}

export async function updateCategory(id: string, dto: Category): Promise<Category | undefined> {
    try {
        const response = await api.patch<Category>(`${serverRoutes._CATEGORIES}/${id}`, dto);
        if (response.status == 200) {
            toast.success('Category was updated');
            return response.data;
        }
        toast.error('Category was not updated');

    } catch(error: any) {
        toast.error(error.response.data.message);
        console.log(error)
    }
}

export async function removeCategory(id: string): Promise<void> {
    try {
        const response = await api.delete(`${serverRoutes._CATEGORIES}/${id}`);
        if (response.status == 200) {
            toast.success('Category was updated');
        }
        
        toast.error('Category was not updated');

    } catch(error: any) {
        toast.error(error.response.data.message);
        console.log(error)
    }
  
}
