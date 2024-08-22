import { Nunito } from 'next/font/google';
import '@/app/globals.css';
import { getAppName } from '@/lib/helpers';
import { ThemeProvider } from '@/providers/ThemeProvider';

const nunitoFont = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={nunitoFont.className}>
      <body className="flex min-h-screen w-full flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export const metadata = {
  title: getAppName(),
};

export default RootLayout;
