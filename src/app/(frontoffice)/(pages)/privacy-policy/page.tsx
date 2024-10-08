'use client'

import React from 'react';
import { useTranslations } from 'next-intl';

const PrivacyPolicyPage: React.FC = () => {
  const t = useTranslations('FrontOffice.PrivacyPolicy');

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-10">{t('title')}</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('dataCollection.title')}</h2>
          <p>{t('dataCollection.content')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('dataUsage.title')}</h2>
          <p>{t('dataUsage.content')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('dataSecurity.title')}</h2>
          <p>{t('dataSecurity.content')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('cookies.title')}</h2>
          <p>{t('cookies.content')}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-3">{t('changes.title')}</h2>
          <p>{t('changes.content')}</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;