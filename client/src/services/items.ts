import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";
import { ItemsType } from "@/types/items";
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
        toast.error(error.message)
        
    }

    return null
}