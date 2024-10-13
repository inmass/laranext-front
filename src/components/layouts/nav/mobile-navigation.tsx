import React, { useState } from 'react';
import Link from 'next/link';
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
import AppRoutes from '@/constants/app-routes';
import { useAuth } from '@/hooks/auth';
import { usePathname } from 'next/navigation';

const MobileNavigation = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const isActive = (path: string) => pathname === path;

  const NavLink = ({
    href,
    icon,
    children,
  }: {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-4 px-2.5 ${
        isActive(href)
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={closeMenu}
    >
      {icon}
      {children}
    </Link>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            onClick={closeMenu}
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <NavLink
            href={AppRoutes.dashboard.home}
            icon={<Home className="h-5 w-5" />}
          >
            Dashboard
          </NavLink>
          <NavLink
            href={AppRoutes.dashboard.carListings}
            icon={<Car className="h-5 w-5" />}
          >
            Listings
          </NavLink>
          {user?.role === 'admin' && (
            <>
              <NavLink
                href={AppRoutes.dashboard.management.makes}
                icon={<Badge className="h-5 w-5" />}
              >
                Makes
              </NavLink>
              <NavLink
                href={AppRoutes.dashboard.management.models}
                icon={<Layers className="h-5 w-5" />}
              >
                Models
              </NavLink>
              <NavLink
                href={AppRoutes.dashboard.management.features}
                icon={<Sparkles className="h-5 w-5" />}
              >
                Features
              </NavLink>
              <NavLink
                href={AppRoutes.dashboard.management.bodyStyles}
                icon={<Caravan className="h-5 w-5" />}
              >
                Body Styles
              </NavLink>
              <NavLink
                href={AppRoutes.dashboard.management.conditions}
                icon={<Thermometer className="h-5 w-5" />}
              >
                Conditions
              </NavLink>
              {/* <NavLink href={AppRoutes.dashboard.management.users} icon={<Users2 className="h-5 w-5" />}>
                Users
              </NavLink> */}
              <NavLink href="#" icon={<LineChart className="h-5 w-5" />}>
                Settings
              </NavLink>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
