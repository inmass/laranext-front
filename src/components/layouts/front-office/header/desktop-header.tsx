'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppRoutes from '@/constants/app-routes';
import { getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, ShoppingCart, User } from 'lucide-react';

interface DesktopHeaderProps {
    isLandingPage?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isLandingPage = false }) => {
    const textClass = isLandingPage ? 'text-white' : 'text-foreground';
    const t = useTranslations('FrontOffice.Header');


    // on scroll header should have a background
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <header className={`hidden md:flex justify-between items-center p-10 ${textClass} fixed w-full z-10 ${scrollY > 0 && isLandingPage ? 'bg-[#020817]/95 text-white' : ''}`}>
        <div className="text-xl font-bold"><Link href={AppRoutes.frontOffice.home}>{String(getAppName()).toUpperCase()}</Link></div>
        <nav>
          <ul className="flex space-x-10">
            <li><Link href={AppRoutes.frontOffice.browse}>{t('browseCars')}</Link></li>
            <li><Link href={AppRoutes.dashboard.home}>{t('sellYourCar')}</Link></li>
            <li><Link href={AppRoutes.dashboard.home}>{t('aboutUs')}</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-5 justify-end items-center">
            <Link href={AppRoutes.dashboard.home} className="flex items-center">
                <button aria-label="User account">
                    <User />
                </button>
            </Link>
            {/* <Link href="#" className="flex items-center">
                <button aria-label="Search">
                    <Search />
                </button>
            </Link>
            <Link href="#" className="flex items-center">
                <button aria-label="Shopping cart">
                    <ShoppingCart />
                </button>
            </Link> */}
            <LanguageSwitcher />
            <ThemeToggle />
            {/* {
                !isLandingPage && (
                )
            } */}
        </div>
      </header>
    );
  };

export default DesktopHeader;