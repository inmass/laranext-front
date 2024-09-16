'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { locales, defaultLocale } from '@root/i18n';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(defaultLocale);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    // Load language from localStorage or user preferences
    const savedLocale = localStorage.getItem('language') || defaultLocale;
    setLocale(savedLocale);

    // Load messages for the language
    import(`@root/locales/${savedLocale}.json`)
      .then((messages) => setMessages(messages.default))
      .catch(console.error);
  }, []);

  const changeLocale = (newLocale: string) => {
    if (locales.includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('language', newLocale);
      // Load new messages
      import(`@root/locales/${newLocale}.json`)
        .then((messages) => setMessages(messages.default))
        .catch(console.error);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}