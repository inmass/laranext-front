'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import AppRoutes from '@/constants/app-routes';
import { getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesktopHeaderProps {
    isLandingPage?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isLandingPage = false }) => {
    const textClass = isLandingPage ? 'text-white' : 'text-foreground bg-background';
    const t = useTranslations('FrontOffice.Header');
    const headerRef = useRef<HTMLElement>(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const handleScroll = () => {
            const headerHeight = header.offsetHeight;
            setIsFixed(window.scrollY > headerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header 
                ref={headerRef}
                className={cn(
                    `hidden lg:flex justify-between items-center p-6 px-10 ${textClass} w-full z-10`,
                    'transition-all duration-300 ease-in-out', // Add transition
                    {
                        'fixed': isFixed || isLandingPage,
                        'bg-[#020817]/95 text-white': isFixed && isLandingPage,
                    }
                )}
            >
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
            {isFixed && <div style={{ height: headerRef.current?.offsetHeight }} />}
        </>
    );
};

export default DesktopHeader;