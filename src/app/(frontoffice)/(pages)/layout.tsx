import React from 'react';
import Header from '@/components/layouts/front-office/header';

const FrontOfficeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default FrontOfficeLayout;