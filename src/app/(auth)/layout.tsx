// 'use client'

import Button from '@/components/button';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { asset, getAppName } from '@/lib/helpers';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: getAppName() + ' - Authentication',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex justify-between items-center bg-transparent z-10 fixed p-4 w-full">
        <div className="flex justify-start items-center gap-2">
          <Link href="/" className="text-white">
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex  items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
      <div className="relative h-screen">
        <Image
          src={asset('images/layout/hero-image.webp')}
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
