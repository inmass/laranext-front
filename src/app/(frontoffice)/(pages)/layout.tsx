import React from 'react';
import Header from '@/components/layouts/front-office/header/header';

const FrontOfficeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
};

export default FrontOfficeLayout;