import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CarModelSelect from '@/components/dynamic/car-model-select';
import { cn } from '@/lib/utils';
import MakeSelect from '@/components/dynamic/make-select';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';
import { Input } from '@/components/ui/input';
import { useLookup } from '../context/lookup-context';

const BasicInfoStep: React.FC = () => {
  const { control, watch, formState: { errors }, register } = useFormContext<CarListingFormData>();
  const make_id = watch('make_id');

  const { addLookupData } = useLookup();

  const handleMakeChange = (field: any, value: string, label: string) => {
    field.onChange(value);
    addLookupData('makes', value, label);
  };

  const handleModelChange = (field: any, value: string, label: string) => {
    field.onChange(value);
    addLookupData('models', value, label);
  }

  return (
    <div className="space-y-4">
        <div>
            <label htmlFor="make_id">Car Make</label>
            <Controller
                name="make_id"
                control={control}
                render={({ field }) => (
                    <MakeSelect
                        {...field}
                        value={field.value}
                        onChange={(value, label) => handleMakeChange(field, value, label)}
                        className={cn(errors.make_id ? 'border-red-500' : '')}
                    />
                )}
            />
            {errors.make_id && <p className="text-red-500 text-sm">{errors.make_id.message}</p>}
        </div>

        <div>
            <label htmlFor="car_model_id">Model</label>
            <Controller
                name="car_model_id"
                control={control}
                render={({ field }) => (
                    <CarModelSelect
                        make_id={make_id}
                        value={field.value}
                        onChange={(value, label) => handleModelChange(field, value, label)}
                        className={cn(errors.car_model_id && "border-red-500")}
                    />
                )}
            />
            {errors.car_model_id && <p className="text-red-500 text-sm">{errors.car_model_id.message}</p>}
        </div>

        <div>
          <label htmlFor="title">Title</label>
          <Input
              type="text"
              id="title"
              {...register('title')}
              className={cn(errors.title ? 'border-red-500' : '')}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
    </div>
  );
};

export default BasicInfoStep;