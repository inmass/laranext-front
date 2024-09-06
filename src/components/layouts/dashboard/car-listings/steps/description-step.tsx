import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import { Input } from '@/components/ui/input';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';
import ConditionSelect from '@/components/dynamic/condition-select';
import Editor from '@/components/ui/editor';
import Select from '@/components/layouts/select';

const DescriptionStep: React.FC = () => {
  const { control, formState: { errors }, register } = useFormContext<CarListingFormData>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="description" className='text-gray-500'>Write a description for your listing</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Editor
              onChange={field.onChange}
              value={field.value}
              className={cn(
                'mt-2',
                errors.description ? 'border-red-500' : ''
              )}
            />
          )}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
    </div>
  );
};

export default DescriptionStep;