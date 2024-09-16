import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';
import { CirclePicker } from 'react-color';
import { useTranslations } from 'next-intl';

const AppearanceStep: React.FC = () => {
  const t = useTranslations('Dashboard.CarListings.Wizard.steps.AppearanceStep');
  const { control, formState: { errors } } = useFormContext<CarListingFormData>();

  const exteriorColors = [
    '#000000', '#FFFFFF', '#C0C0C0', '#003366', '#990000',
    '#616161', '#111111', '#004225', '#FF7722', '#72A0C1',
    '#E6BE8A', '#800020', '#614051', '#0047AB', '#32CD32',
    '#F0EAD6',
  ];
  
  const interiorColors = [
    '#000000', '#FFFFFF', '#F5F5DC', '#808080', '#D2B48C',
    '#964B00', '#FFFDD0', '#990000', '#000080', '#8B4513',
    '#36454F', '#FFFFF0', '#800020',
  ];

  return (
    <div className="space-y-4">
        <div>
          <label htmlFor="exterior_color">{t('exteriorColor')}</label>
          <div className='bg-muted p-2 rounded-md w-80 mb-2 mt-2'>
            <Controller
              name="exterior_color"
              control={control}
              render={({ field }) => (
                  <CirclePicker
                      color={field.value}
                      onChange={(color: any) => field.onChange(color.hex)}
                      width="100%"
                      colors={exteriorColors}
                  />
              )}
            />
          </div>
          {errors.exterior_color && <p className="text-red-500 text-sm">{errors.exterior_color.message}</p>}
        </div>
        <div>
          <label htmlFor="interior_color">{t('interiorColor')}</label>
          <div className='bg-muted p-2 rounded-md w-80 mb-2 mt-2'>
            <Controller
              name="interior_color"
              control={control}
              render={({ field }) => (
                  <CirclePicker
                      color={field.value}
                      onChange={(color: any) => field.onChange(color.hex)}
                      width="100%"
                      colors={interiorColors}
                  />
              )}
            />
          </div>
          {errors.interior_color && <p className="text-red-500 text-sm">{errors.interior_color.message}</p>}
        </div>
    </div>
  );
};

export default AppearanceStep;