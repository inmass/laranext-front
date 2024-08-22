import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AuthCard from '@/components/AuthCard';

interface DefaultLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const DefaultLayout = ({
  title,
  description,
  children,
}: DefaultLayoutProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <AuthCard>{children}</AuthCard>
      </CardFooter>
    </Card>
  );
};

export default DefaultLayout;
