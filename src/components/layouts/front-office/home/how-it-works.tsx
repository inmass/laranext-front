'use client';

import React from 'react';
import Image from 'next/image';
import { Check, Car, UserCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { asset } from '@/lib/helpers';
import { cn } from '@/lib/utils';

const HowItWorks: React.FC<{ className?: string }> = ({ className }) => {

  const t = useTranslations('FrontOffice.HowItWorks');
  const steps = [
    {
      icon: <Check className="w-14 h-14" />,
      title: t('step1'),
    },
    {
      icon: <Car className="w-14 h-14" />,
      title: t('step2'),
    },
    {
      icon: <UserCheck className="w-14 h-14" />,
      title: t('step3'),
    },
  ];

    return (
        <section className={cn("relative bg-foreground text-background py-16 overflow-hidden md:p-40", className)}>
            <Image
                src={ asset('images/layout/bmw-classic.webp') }
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="opacity-10"
            />
            <div className="container mx-auto px-4 z-10">
                <h2 className="text-3xl font-bold mb-12 text-center">{t('title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="text-center">
                    <div className="mb-4 flex items-center justify-center">
                        {step.icon}
                    </div>
                    <p className="">{step.title}</p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
