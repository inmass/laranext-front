'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { asset } from '@/lib/helpers';
import { useLanguage } from '@/providers/LanguageProvider';
import { locales } from '@root/i18n';
import Image from 'next/image';

const flagUrls: { [key: string]: string } = {
  en: asset('flags/en.svg'),
  fr: asset('flags/fr.svg'),
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const getLanguageName = (code: string) => {
    const names: { [key: string]: string } = {
      en: 'English',
      fr: 'Français',
    };
    return names[code] || code.toUpperCase();
  };

  const otherLocales = locales.filter((loc) => loc !== locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-2 justify-center rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-transparent p-0"
        >
          <Image
            src={flagUrls[locale]}
            alt={locale}
            width={24}
            height={24}
            className="rounded"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-32 text-center border-none rounded-full min-w-[0px] w-max bg-transparent shadow-none"
      >
        {otherLocales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className="flex items-center rounded-full cursor-pointer focus:bg-transparent"
          >
            <Image
              src={flagUrls[loc]}
              alt={loc}
              width={24}
              height={24}
              className="rounded"
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
