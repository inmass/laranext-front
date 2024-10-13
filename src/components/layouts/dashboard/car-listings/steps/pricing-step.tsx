import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';

const PricingStep: React.FC = () => {
  const t = useTranslations('Dashboard.CarListings.Wizard.steps.Pricing');
  const {
    register,
    formState: { errors },
  } = useFormContext<CarListingFormData>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="price">{t('price')}</label>
        <Input
          type="number"
          id="price"
          {...register('price', { valueAsNumber: true })}
          className={cn(errors.price ? 'border-red-500' : '')}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="original_price">{t('originalPrice')}</label>
        <Input
          type="number"
          id="original_price"
          {...register('original_price', { valueAsNumber: true })}
          className={cn(errors.original_price ? 'border-red-500' : '')}
        />
        {errors.original_price && (
          <p className="text-red-500 text-sm">
            {errors.original_price.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="year">{t('year')}</label>
        <Input
          type="number"
          id="year"
          {...register('year', { valueAsNumber: true })}
          className={cn(errors.year ? 'border-red-500' : '')}
        />
        {errors.year && (
          <p className="text-red-500 text-sm">{errors.year.message}</p>
        )}
      </div>
    </div>
  );
};

export default PricingStep;
