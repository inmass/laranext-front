import { Nunito } from 'next/font/google';
import '@/app/globals.css';
import { getAppName } from '@/lib/helpers';

const nunitoFont = Nunito({
  subsets: ['latin'],
  display: 'swap',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={nunitoFont.className}>
      <body className="dark flex min-h-screen w-full flex-col">{children}</body>
    </html>
  );
};

export const metadata = {
  title: getAppName(),
};

export default RootLayout;
