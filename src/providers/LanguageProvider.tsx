'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { locales, defaultLocale } from '@root/i18n';
import { useAuth } from '@/hooks/auth';
import Loading from '@/components/loading';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [locale, setLocaleState] = useState(defaultLocale);
  const [messages, setMessages] = useState({});
  const { user, setLocale: setLocaleHook } = useAuth();

  useEffect(() => {
    // Load language from user preference if logged in, otherwise from localStorage
    const savedLocale = user?.locale || localStorage.getItem('language') || defaultLocale;
    setLocaleState(savedLocale);

    // Load messages for the language
    import(`@root/locales/${savedLocale}.json`)
      .then((messages) => setMessages(messages.default))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const setLocale = async (newLocale: string) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('language', newLocale);

      // Load new messages
      const newMessages = await import(`@root/locales/${newLocale}.json`).catch(console.error);
      if (newMessages) {
        setMessages(newMessages.default);
      }

      // If user is logged in, update language preference in the database
      if (user) {
        await setLocaleHook(newLocale);
      }

      setLoading(false)
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {
        loading ?
        <Loading /> : (
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        )
      }
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