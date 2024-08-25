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
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const CardLayout = ({
  className,
  title,
  description,
  children,
}: DefaultLayoutProps) => {
  return (
    <Card className={className}>
      {
        title || description ?
        <CardHeader>
          {
            title ?
            <CardTitle className="text-2xl">{title}</CardTitle> :
            null
          }
          {
            description ?
            <CardDescription>{description}</CardDescription> :
            null
          }
        </CardHeader> :
        null
      }
      <CardFooter>
        <AuthCard>{children}</AuthCard>
      </CardFooter>
    </Card>
  );
};

export default CardLayout;
