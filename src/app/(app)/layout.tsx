'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Loading'
import { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react';
import { User } from '@/components/user';
import Providers from '@/providers/providers';
import { SearchInput } from '@/components/search';
import DesktopNavigation from '@/components/layouts/nav/DesktopNavigation';
import MobileNavigation from '@/components/layouts/nav/MobileNavigation';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';


const AppLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        // <div className="min-h-screen bg-gray-100">
        //     <Navigation user={user} />

        //     <main>{children}</main>
        // </div>
        <Providers>
        <main className="flex min-h-screen w-full flex-col bg-muted/40">
            <DesktopNavigation />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <MobileNavigation />
                <DashboardBreadcrumb />
                <SearchInput />
                <User />
            </header>
            <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                {children}
            </main>
            </div>
            <Analytics />
        </main>
        </Providers>
    )
}

export default AppLayout


// import Link from 'next/link';
// import {
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PanelLeft,
//   Settings,
//   ShoppingCart,
//   Users2
// } from 'lucide-react';

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator
// } from '@/components/ui/breadcrumb';
// import { Button } from '@/components/ui/button';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger
// } from '@/components/ui/tooltip';
// import { Analytics } from '@vercel/analytics/react';
// import { User } from './user';
// import { VercelLogo } from '@/components/icons';
// import Providers from './providers';
// import { NavItem } from './nav-item';
// import { SearchInput } from './search';

// export default function DashboardLayout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Providers>
//       <main className="flex min-h-screen w-full flex-col bg-muted/40">
//         <DesktopNavigation />
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//             <MobileNav />
//             <DashboardBreadcrumb />
//             <SearchInput />
//             <User />
//           </header>
//           <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
//             {children}
//           </main>
//         </div>
//         <Analytics />
//       </main>
//     </Providers>
//   );
// }