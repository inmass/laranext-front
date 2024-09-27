import React from 'react';
import Header from '@/components/layouts/front-office/header';

const FrontOfficeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default FrontOfficeLayout;