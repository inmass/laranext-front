import React from 'react';
import Link from 'next/link';
import AppRoutes from '@/constants/app-routes';
import { getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
    isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {
    const bgClass = isLandingPage ? 'bg-transparent' : 'bg-gray-900';
    const t = useTranslations('FrontOffice.Header');

    return (
      <header className={`flex justify-between items-center p-10 ${bgClass} text-white fixed w-full z-10`}>
        <div className="text-xl font-bold">{String(getAppName()).toUpperCase()}</div>
        <nav>
          <ul className="flex space-x-10">
            <li><Link href={AppRoutes.dashboard.home}>{t('browseCars')}</Link></li>
            <li><Link href={AppRoutes.dashboard.home}>{t('sellYourCar')}</Link></li>
            <li><Link href={AppRoutes.dashboard.home}>{t('aboutUs')}</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-5 justify-end items-center">
            <Link href={AppRoutes.dashboard.home}>
                <button aria-label="User account">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </button>
            </Link>
            <Link href="#">
                <button aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </Link>
            <Link href="#">
                <button aria-label="Shopping cart">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
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