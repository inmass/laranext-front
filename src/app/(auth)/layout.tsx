'use client'

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { getAppName } from '@/lib/helpers';
import { ReactNode, useEffect } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {

  useEffect(() => {
      document.title = getAppName() + ' - Authentication';
  }, []);

  return (
    <>
        <div
            className="p-4 w-full flex justify-end items-center gap-2"
        >
            <ThemeToggle />
            <LanguageSwitcher />
        </div>
        <div className="min-h-screen flex justify-center items-start md:items-center p-8">
            {children}
        </div>
    </>
  );
};

export default Layout;
