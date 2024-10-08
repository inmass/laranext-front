'use client'

import React from 'react';
import { useTranslations } from 'next-intl';
import Button from '@/components/Button';

const ContactPage: React.FC = () => {
  const t = useTranslations('FrontOffice.Contact');

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-10">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="mb-4">{t('description')}</p>
          <ul className="space-y-2">
            <li>{t('address')}</li>
            <li>{t('phone')}</li>
            <li>{t('email')}</li>
          </ul>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">{t('form.name')}</label>
            <input type="text" id="name" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">{t('form.email')}</label>
            <input type="email" id="email" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">{t('form.message')}</label>
            <textarea id="message" rows={4} className="w-full p-2 border rounded"></textarea>
          </div>
          <Button type="submit">{t('form.submit')}</Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;