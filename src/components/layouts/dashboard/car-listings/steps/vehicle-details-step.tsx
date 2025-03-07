import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import { Input } from '@/components/ui/input';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';
import ConditionSelect from '@/components/dynamic/condition-select';
import Select from '@/components/layouts/select';
import { useLookup } from '../context/lookup-context';
import { useTranslations } from 'next-intl';
import { FuelTypes, TransmissionTypes } from '@/constants/constants';

const VehicleDetailsStep: React.FC = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<CarListingFormData>();

  const { addLookupData } = useLookup();
  const t = useTranslations(
    'Dashboard.CarListings.Wizard.steps.VehicleDetailsStep'
  );

  const handleConditionChange = (field: any, value: string, label: string) => {
    field.onChange(value);
    addLookupData('conditions', value, label);
  };

  const handleBodyStyleChange = (field: any, value: string, label: string) => {
    field.onChange(value);
    addLookupData('bodyStyles', value, label);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="body_style_id">{t('bodyStyle')}</label>
        <Controller
          name="body_style_id"
          control={control}
          render={({ field }) => (
            <BodyStyleSelect
              {...field}
              onChange={(value, label) =>
                handleBodyStyleChange(field, value, label)
              }
              className={cn(errors.body_style_id ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.body_style_id && (
          <p className="text-red-500 text-sm">{errors.body_style_id.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="condition_id">{t('condition')}</label>
        <Controller
          name="condition_id"
          control={control}
          render={({ field }) => (
            <ConditionSelect
              {...field}
              onChange={(value, label) =>
                handleConditionChange(field, value, label)
              }
              className={cn(errors.condition_id ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.condition_id && (
          <p className="text-red-500 text-sm">{errors.condition_id.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="mileage">{t('mileage')}</label>
        <Input
          type="number"
          id="mileage"
          {...register('mileage', { valueAsNumber: true })}
          className={cn(errors.mileage ? 'border-red-500' : '')}
        />
        {errors.mileage && (
          <p className="text-red-500 text-sm">{errors.mileage.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="transmission">{t('transmission')}</label>
        <Controller
          name="transmission"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={TransmissionTypes.map((type) => ({
                label: t(`transmissionOptions.${type}`),
                value: type,
              }))}
              searchable={false}
              className={cn(errors.transmission ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.transmission && (
          <p className="text-red-500 text-sm">{errors.transmission.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="fuel_type">{t('fuelType')}</label>
        <Controller
          name="fuel_type"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={FuelTypes.map((type) => ({
                label: t(`fuelTypeOptions.${type}`),
                value: type,
              }))}
              searchable={false}
              className={cn(errors.fuel_type ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.fuel_type && (
          <p className="text-red-500 text-sm">{errors.fuel_type.message}</p>
        )}
      </div>
    </div>
  );
};

export default VehicleDetailsStep;
