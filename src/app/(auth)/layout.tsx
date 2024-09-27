'use client'

import Button from '@/components/Button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { asset, getAppName } from '@/lib/helpers';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {

  useEffect(() => {
      document.title = getAppName() + ' - Authentication';
  }, []);

  return (
    <>
        <div
            className="p-4 w-full flex justify-end items-center gap-2 bg-transparent fixed z-10"
        >
            <ThemeToggle />
            <LanguageSwitcher />
        </div>
        <div className="relative h-screen">
            <Image
                src={ asset('images/layout/hero-image.jpeg') }
                alt="Luxury watch background"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-[0.7] flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    </>
  );
};

export default Layout;
