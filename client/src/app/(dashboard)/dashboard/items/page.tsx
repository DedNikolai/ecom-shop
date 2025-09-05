'use client'

import { useItems } from "@/hooks/useItems";
import { Item } from "@/components/item/Item";

export default function Items() {
    const {data, isLoading} = useItems();

    return (
        <>
            <h1 className="text-[28px] font-bold">ITEMS</h1>
            {
                isLoading ? <div>Loading...</div> :
                <ul>
                    {
                        data?.map((item, index) => (
                            <li key={item.id}>
                                <Item item={item}/>
                            </li>
                        ))
                    }
                </ul>
            }
        </>
    )
}