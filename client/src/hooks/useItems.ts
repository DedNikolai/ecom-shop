import { fetchItems } from '@/services/items';
import { ItemsType } from '@/types/items';
import { useQuery } from '@tanstack/react-query';

export function useItems() {
    const {data, isLoading} = useQuery<ItemsType[] | null>({
        queryKey: ['items'],
        queryFn: async () => {
            return await fetchItems()
        },
        refetchOnWindowFocus: false
    })

    return {data, isLoading}
}