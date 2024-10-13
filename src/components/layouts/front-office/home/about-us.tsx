'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/layouts/front-office/header/header';
import { asset, getAppName } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import Button from '@/components/button';

// Hero component
const AboutUs: React.FC = () => {
  const t = useTranslations('FrontOffice.AboutUs');

  return (
    <div className="relative py-20 p-10 md:p-20 lg:p-40 lg:grid lg:grid-cols-2 lg:gap-10 bg-white text-[#020817]">
      <div className="relative z-10 max-w-3xl z-[1]">
        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="mb-4">
          {t('description', { appName: String(getAppName()).toUpperCase() })}
        </p>
        <Button>{t('learnMore')}</Button>
      </div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold opacity-10 overflow-hidden whitespace-nowrap w-full">
        {String(getAppName() + '. ')
          .toUpperCase()
          .repeat(10)}
      </div>
      <div className="absolute top-0 right-0 w-full h-full flex justify-end items-center opacity-30 hidden md:flex md:opacity-100 md:relative md:w-auto md:h-auto md:z-[1]">
        <Image
          src={asset('images/layout/jaguar-car.webp')}
          alt="Luxury Watch"
          objectFit="contain"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default AboutUs;
