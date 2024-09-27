'use client'

import React from 'react';
import Image from 'next/image';
import Header from './header';
import { asset } from '@/lib/helpers';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';

// Hero component
const Hero: React.FC = () => {

  const t = useTranslations('FrontOffice.Hero');

  return (
    <>
      <Header isLandingPage={true} />
      <div className="relative h-screen">
        <Image
          src={ asset('images/layout/hero-image.jpeg') }
          alt="Luxury watch background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-[0.6] flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl mb-8">{t('description')}</p>
          <div className="flex space-x-4">
            <Button className='text-md'>
              {t('browseCars')}
            </Button>
            <Button className='bg-accent text-accent-foreground hover:bg-accent/80 text-md'>
              {t('sellYourCar')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;