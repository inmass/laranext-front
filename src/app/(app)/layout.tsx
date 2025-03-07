'use client';

import { useAuth } from '@/hooks/auth';
import Loading from '@/components/loading';
import { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { User } from '@/components/user';
import AppProvider from '@/providers/AppProvider';
import { SearchInput } from '@/components/search';
import DesktopNavigation from '@/components/layouts/nav/desktop-navigation';
import MobileNavigation from '@/components/layouts/nav/mobile-navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Toaster } from 'react-hot-toast';
import { LanguageSwitcher } from '@/components/language-switcher';

const AppLayout = ({ children }: { children: ReactNode }) => {
  const { user, isMounted } = useAuth({ middleware: 'auth' });

  if (!user || !isMounted) {
    return <Loading />;
  }

  return (
    <AppProvider>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNavigation />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNavigation />
            <div className="flex justify-end w-full gap-4">
              {/* <SearchInput /> */}
              <LanguageSwitcher />
              <ThemeToggle />
              <User />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 ">
            {children}
            <Toaster
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </main>
        </div>
        <Analytics />
      </main>
    </AppProvider>
  );
};

export default AppLayout;
