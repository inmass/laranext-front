'use client';

import React from 'react';
import Link from 'next/link';
import AppRoutes from '@/constants/app-routes';
import { getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Search, ShoppingCart, User } from 'lucide-react';

interface HeaderProps {
    isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
    const textClass = isLandingPage ? 'text-white' : 'text-foreground';
    const t = useTranslations('FrontOffice.Header');

    return (
      <header className={`flex justify-between items-center p-10 g-transparent ${textClass} fixed w-full z-10`}>
        <div className="text-xl font-bold">{String(getAppName()).toUpperCase()}</div>
        <nav>
          <ul className="flex space-x-10">
            <li><Link href={AppRoutes.dashboard.home}>{t('browseCars')}</Link></li>
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
            <Link href="#" className="flex items-center">
                <button aria-label="Search">
                    <Search />
                </button>
            </Link>
            <Link href="#" className="flex items-center">
                <button aria-label="Shopping cart">
                    <ShoppingCart />
                </button>
            </Link>
            <LanguageSwitcher />
            {
                !isLandingPage && (
                    <ThemeToggle />
                )
            }
        </div>
      </header>
    );
  };

export default Header;