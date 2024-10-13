'use client';

import { useAuth } from '@/hooks/auth';
import { ReactNode } from 'react';

const ManagementLayout = ({ children }: { children: ReactNode }) => {
  useAuth({ requiredRole: ['admin'] });
  return children;
};

export default ManagementLayout;
