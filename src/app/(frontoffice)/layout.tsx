import AppProvider from '@/providers/AppProvider';

export const metadata = {
  title: 'Laravel',
};

const FrontOfficeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <main className='bg-background'>
       {children}
      </main>
    </AppProvider>
  );
};

export default FrontOfficeLayout;
