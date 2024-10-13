import { Poppins } from 'next/font/google';
import '@/app/globals.css';
import { getAppName } from '@/lib/helpers';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LanguageProvider } from '@/providers/LanguageProvider';

const poppinsFont = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={poppinsFont.className}>
      <body className="flex min-h-screen w-full flex-col ease-in-out">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export const metadata = {
  title: getAppName(),
};

export default RootLayout;
