import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { CreateItemDto, ItemsType, UpdateItemDto } from "@/types/items";
import toast from "react-hot-toast";

export async function fetchItems(): Promise<ItemsType[] | null> {
    try {
        const response = await api.get<ItemsType[]>(serverRoutes._ITEMS);

        if (response.status === 200) {
            return response.data
        }
        toast.error('Cant get items');
    } catch(error: any) {
        console.log(error)
        toast.error(error.response.data.message)
        
    }

    return null
}

export async function patchItem(id: string, dto: UpdateItemDto): Promise<ItemsType | undefined> {
  try {
    const response = await api.put<ItemsType>(`${serverRoutes._ITEMS}/${id}`, dto);

    if (response.status === 200) {
        toast.success('Item was updated');
        return response.data
    }
  } catch(error: any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
  
}

export async function removeItem(id: string) {
  try {
    const response = await api.delete<ItemsType>(`${serverRoutes._ITEMS}/${id}`);

    if (response.status === 200) {
        toast.success('Item was deleted');
        return {status: true}
    }
  } catch(error: any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
  
}

export async function createItem(dto: CreateItemDto): Promise<ItemsType | undefined> {
  try {
    const response = await api.post<ItemsType>(serverRoutes._ITEMS, dto);

    if (response.status === 201) {
        toast.success('Item was cerated');
        return response.data
    }
  } catch(error: any) {
    console.log(error)
    toast.error(error.response.data.message)
  }
  
}