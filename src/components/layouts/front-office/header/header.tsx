'use client';

import React from 'react';
import DesktopHeader from '@/components/layouts/front-office/header/desktop-header';
import MobileHeader from '@/components/layouts/front-office/header/mobile-header';

interface HeaderProps {
    isLandingPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLandingPage = false }) => {

    return (
        <>
            <DesktopHeader isLandingPage={isLandingPage} />
            <MobileHeader isLandingPage={isLandingPage} />
        </>
    );
  };

export default Header;