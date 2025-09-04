'use client'

import { useItems } from "@/hooks/useItems"

export default function Dashboard() {
    const {data, isLoading} = useItems();

    return (
        <>
            <h1>Dashboard</h1>
            {
                isLoading ? <div>Loading...</div> :
                <ul>
                    {
                        data?.map((item, index) => (
                            <li key={item.id}>
                                {`${index}. ${item.title}: ${item.price}`}
                            </li>
                        ))
                    }
                </ul>
            }
        </>
    )
}