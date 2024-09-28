'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppRoutes from '@/constants/app-routes';
import { getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MenuIcon, Search, ShoppingCart, User } from 'lucide-react';
import {
  Badge,
  Car,
  Caravan,
  Home,
  Layers,
  LineChart,
  Package2,
  PanelLeft,
  Sparkles,
  Thermometer,
  Users2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/auth';
import { usePathname } from 'next/navigation';

interface MobileHeaderProps {
    isLandingPage?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ isLandingPage = false }) => {

    const t = useTranslations('FrontOffice.Header');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Link
      href={href}
      className={`flex items-center gap-4 px-2.5 ${
        isActive(href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={closeMenu}
    >
      {icon}
      {children}
    </Link>
  );

  return (
    <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
        <div className="fixed bg-transparent z-10 flex justify-between items-center w-full p-5">
            <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className={`hover:bg-transparent ${isLandingPage ? 'text-white hover:text-white' : ''}`}>
                    <MenuIcon className="h-7 w-7" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <div className="flex justify-end w-full gap-4 items-center">
                {/* <SearchInput /> */}
                <LanguageSwitcher />
                <ThemeToggle />
            </div>
        </div>
        <SheetContent side="left" className="sm:max-w-xs">
            <div className="text-xl font-bold my-10">{String(getAppName()).toUpperCase()}</div>
            <nav className="grid gap-6 text-lg font-medium z-50">
                <Link href={AppRoutes.dashboard.home}>{t('browseCars')}</Link>
                <Link href={AppRoutes.dashboard.home}>{t('sellYourCar')}</Link>
                <Link href={AppRoutes.dashboard.home}>{t('aboutUs')}</Link>
                <div className="flex space-x-5  items-center">
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
                </div>
            </nav>
        </SheetContent>
        </Sheet>
    </div>
  );
};

export default MobileHeader;