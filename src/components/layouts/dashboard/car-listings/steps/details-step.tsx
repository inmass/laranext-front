import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import { Input } from '@/components/ui/input';
import Select from '@/components/layouts/select';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';

const DetailsStep: React.FC = () => {
  const { control, formState: { errors }, register } = useFormContext<CarListingFormData>();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="body_style_id">Body Style</label>
        <Controller
          name="body_style_id"
          control={control}
          render={({ field }) => (
            <BodyStyleSelect
              {...field}
              onChange={(value) => field.onChange(value)}
              className={cn(errors.body_style_id ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.body_style_id && <p className="text-red-500 text-sm">{errors.body_style_id.message}</p>}
      </div>

      <div>
            <label htmlFor="condition_id">Condition</label>
            <Controller
                name="condition_id"
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={[
                            { label: 'New', value: '1' },
                            { label: 'Used', value: '2' },
                            { label: 'Certified Pre-Owned', value: '3' },
                        ]}
                        placeholder="Select a condition"
                        className={cn(errors.condition_id ? 'border-red-500' : '')}
                        searchable={false}
                    />
                )}
            />
            {errors.condition_id && <p className="text-red-500 text-sm">{errors.condition_id.message}</p>}
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

export default DetailsStep;