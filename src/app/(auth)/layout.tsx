import { ThemeToggle } from '@/components/ThemeToggle';
import { getAppName } from '@/lib/helpers';
import { ReactNode } from 'react';

export const metadata = {
  title: getAppName() + ' - Authentication',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
        <div
            className="absolute top-0 right-0 p-4"
        >
            <ThemeToggle />
        </div>
        <div className="min-h-screen flex justify-center items-start md:items-center p-8">
            {children}
        </div>
    </>
  );
};

export default Layout;
