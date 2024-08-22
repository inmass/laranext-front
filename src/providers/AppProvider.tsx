'use client';

import TooltipProvider from '@/providers/TooltipProvider';

export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <TooltipProvider>
            {children}
        </TooltipProvider>
    );
}
