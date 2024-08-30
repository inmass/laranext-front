'use client';

import TooltipProvider from '@/providers/TooltipProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <TooltipProvider>
                {children}
            </TooltipProvider>
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    );
}
