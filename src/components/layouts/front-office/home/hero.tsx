'use client'

import React from 'react';
import Image from 'next/image';
import Header from '@/components/layouts/front-office/header/header';
import { asset } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';

// Hero component
const Hero: React.FC = () => {

  const t = useTranslations('FrontOffice.Hero');

  return (
    <>
      <Header isLandingPage={true} />
      <div className="relative h-[90vh]">
        <Image
          src={ asset('images/layout/hero-image.webp') }
          alt="Luxury watch background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-[0.6] flex flex-col justify-center items-center text-white px-6">
          <h1 className="text-3xl font-bold mb-4 text-center">{t('title')}</h1>
          <p className="text-xl mb-8 text-center">{t('description')}</p>
          <div className="flex space-x-4">
            <Button className='md:text-md'>
              {t('browseCars')}
            </Button>
            <Button className='bg-[#F1F5F9] text-[#10172A] hover:bg-[#F1F5F9]/80 md:text-md'>
              {t('sellYourCar')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;