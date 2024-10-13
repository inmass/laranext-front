import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Editor from '@/components/ui/editor';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';

const DescriptionStep: React.FC = () => {
  const t = useTranslations(
    'Dashboard.CarListings.Wizard.steps.DescriptionStep'
  );
  const {
    control,
    formState: { errors },
  } = useFormContext<CarListingFormData>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="description" className="text-gray-500">
          {t('descriptionLabel')}
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: t('descriptionRequired') }}
          render={({ field }) => (
            <Editor
              onChange={field.onChange}
              value={field.value}
              className={cn('mt-2', errors.description ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionStep;
