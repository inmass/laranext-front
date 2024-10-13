'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
// import { Instagram, Facebook, Twitter } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { getAppName } from '@/lib/helpers';
import AppRoutes from '@/constants/app-routes';

const Footer: React.FC = () => {
  const t = useTranslations('FrontOffice.Footer');
  return (
    <footer className="bg-foreground text-background py-8 ">
      <div className="container mx-auto px-10">
        <div className="text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {getAppName().toUpperCase()}
            </h2>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-gray-500 font-bold">
              {t('explore')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={AppRoutes.frontOffice.browse}>{t('browse')}</Link>
              </li>
              <li>
                <Link href={AppRoutes.frontOffice.about}>{t('aboutUs')}</Link>
              </li>
              <li>
                <Link href={AppRoutes.frontOffice.contact}>
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link href={AppRoutes.frontOffice.privacyPolicy}>
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-gray-500 font-bold">
              {t('contactUs')}
            </h3>
            <Link href={`mailto:${t('contact.email')}`}>
              klasikiat@gmail.com
            </Link>
            <br />
            <Link href={`tel:${t('contact.phone')}`}>+212 567898745</Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>
            {t('copyright', {
              year: new Date().getFullYear(),
              appName: getAppName(),
            })}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="https://instagram.com/klasikiat"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://facebook.com/klasikiat"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com/klasikiat"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
