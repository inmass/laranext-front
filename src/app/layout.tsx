import { Nunito } from 'next/font/google';
import '@/app/globals.css';
import { getAppName } from '@/lib/helpers';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';

const nunitoFont = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={nunitoFont.className}>
      <body className="flex min-h-screen w-full flex-col">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export const metadata = {
  title: getAppName(),
};

export default RootLayout;
