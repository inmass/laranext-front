import React from 'react';
import Image from 'next/image';
import Header from './header';
import { asset } from '@/lib/helpers';
import { useTranslations } from 'next-intl';

// Hero component
const Hero: React.FC = () => {

  // const t = useTranslations('FrontOffice.Hero');
  // place holder for now
  const t = (key: string) => key;

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
        <div className="absolute inset-0 bg-black bg-opacity-[0.7] flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl mb-8">{t('description')}</p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {t('browseWatches')}
            </button>
            <button className="bg-transparent hover:bg-white hover:text-black border border-white text-white font-bold py-2 px-4 rounded">
              {t('sellYourWatch')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;