import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getMakes } from '@/hooks/api/makes';
import CarModelSelect from '@/components/dynamic/car-model-select';
import { cn } from '@/lib/utils';
import MakeSelect from '@/components/dynamic/make-select';

const BasicInfoStep: React.FC = () => {
  const { control, watch, formState: { errors } } = useFormContext();
  const make_id = watch('make_id');

  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message && typeof error.message === 'string') return error.message;
    return 'This field has an error';
  };

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
            {errors.make_id && errors.make_id.message && <p className="text-red-500 text-sm">{getErrorMessage(errors.make_id.message)}</p>}
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
            {errors.car_model_id && <p className="text-red-500 text-sm">{getErrorMessage(errors.car_model_id.message)}</p>}
        </div>
    </div>
  );
};

export default BasicInfoStep;