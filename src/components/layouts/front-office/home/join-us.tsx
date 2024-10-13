
'use client'

import React from 'react';
import Image from 'next/image';
import Header from '@/components/layouts/front-office/header/header';
import { asset, getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import Button from '@/components/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import AppRoutes from '@/constants/app-routes';

const JoinUs: React.FC<{ className?: string }> = ({ className }) => {

  const t = useTranslations('FrontOffice.JoinUs');

  return (
    <div className={cn(
        // 'py-20 p-10 md:p-20 lg:p-40 text-center bg-white text-[#020817]',
        'py-20 p-10 md:p-20 lg:p-40 text-center bg-[#020817] text-white',
        className
    )}>
        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="mb-4">
            {t('description', { appName: String(getAppName()).toUpperCase() })}
        </p>
        <Link href={AppRoutes.dashboard.home}>
            <Button className='md:text-md'>
                {t('registerNow')}
            </Button>
        </Link>
    </div>
  );
};

export default JoinUs;