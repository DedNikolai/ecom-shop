"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
import { useState } from "react";
import NextTopLoader from 'nextjs-toploader';


export default function Providers({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={client}>
            <NextTopLoader showSpinner={false} color="#000"/>
            {children}
            <Toaster />
        </QueryClientProvider>
    );
}