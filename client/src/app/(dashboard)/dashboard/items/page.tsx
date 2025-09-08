'use client'

import { useItems } from "@/hooks/items/useItems";
import { Item } from "@/components/item/Item";
import { CreateItemDialog } from "@/components/item/CreateItemDialog";
import styles from './items.module.css';
import { ItemSkeleton } from "@/components/item/ItemSkeleton";

export default function Items() {
    const {data, isLoading, isFetching } = useItems();

    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title}>ITEMS</h1>
                <CreateItemDialog />
            </div>
            {
                (isLoading || isFetching) ? Array.from({ length: 4 }).map((_, index) => <ItemSkeleton key={index}/>) :
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