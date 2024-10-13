'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { asset, getAppName } from '@/lib/helpers';

const AboutUsPage: React.FC = () => {
  const t = useTranslations('FrontOffice.AboutUs');
  const appName = String(getAppName()).toUpperCase();

  return (
    <div className="container mx-auto py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-10">{t('title')}</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('ourStory.title')}</h2>
        <p className="mb-4">{t('ourStory.content', { appName })}</p>
        <Image
          src={asset('images/layout/luxury-cars-in-garage.webp')}
          alt={t('ourStory.imageAlt')}
          width={800}
          height={400}
          className="rounded-lg shadow-md mx-auto"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('ourMission.title')}</h2>
        <p>{t('ourMission.content', { appName })}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t('ourValues.title')}</h2>
        <ul className="pl-6 space-y-2 mx-auto">
          <li>{t('ourValues.value1')}</li>
          <li>{t('ourValues.value2')}</li>
          <li>{t('ourValues.value3')}</li>
          <li>{t('ourValues.value4')}</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;
