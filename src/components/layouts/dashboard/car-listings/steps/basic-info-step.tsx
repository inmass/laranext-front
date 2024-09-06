import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import CarModelSelect from '@/components/dynamic/car-model-select';
import { cn } from '@/lib/utils';
import MakeSelect from '@/components/dynamic/make-select';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';
import Select from '@/components/layouts/select';

const BasicInfoStep: React.FC = () => {
  const { control, watch, formState: { errors } } = useFormContext<CarListingFormData>();
  const make_id = watch('make_id');

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
                        onChange={(value) => field.onChange(value)}
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
                        onChange={field.onChange}
                        className={cn(errors.car_model_id && "border-red-500")}
                    />
                )}
            />
            {errors.car_model_id && <p className="text-red-500 text-sm">{errors.car_model_id.message}</p>}
        </div>

        <div>
            <label htmlFor="transmission">Transmission</label>
            <Controller
                name="transmission"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={[
                            { label: 'Automatic', value: 'automatic' },
                            { label: 'Manual', value: 'manual' },
                        ]}
                        searchable={false}
                        className={cn(errors.transmission ? 'border-red-500' : '')}
                    />
                )}
            />
            {errors.transmission && <p className="text-red-500 text-sm">{errors.transmission.message}</p>}
        </div>
    </div>
  );
};

export default BasicInfoStep;