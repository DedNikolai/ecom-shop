"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";


export default function Providers({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={client}>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}