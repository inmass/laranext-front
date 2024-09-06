import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import { Input } from '@/components/ui/input';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';
import ConditionSelect from '@/components/dynamic/condition-select';
import Editor from '@/components/ui/editor';
import { SliderPicker } from 'react-color';

const DetailsStep: React.FC = () => {
  const { control, formState: { errors }, register } = useFormContext<CarListingFormData>();

  return (
    <div className="space-y-4">
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
      
      <div>
        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Editor
              onChange={field.onChange}
              value={field.value}
              className={cn(errors.description ? 'border-red-500' : '')}
            />
          )}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      
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
                  <ConditionSelect
                      {...field}
                      onChange={(value) => field.onChange(value)}
                      className={cn(errors.condition_id ? 'border-red-500' : '')}
                  />
              )}
          />
          {errors.condition_id && <p className="text-red-500 text-sm">{errors.condition_id.message}</p>}
        </div>
        <div>
          <label htmlFor="exterior_color">Exterior Color</label>
          <Controller
            name="exterior_color"
            control={control}
            render={({ field }) => (
                <SliderPicker
                    color={field.value}
                    onChange={(color) => field.onChange(color.hex)}
                />
            )}
          />
          {errors.exterior_color && <p className="text-red-500 text-sm">{errors.exterior_color.message}</p>}
        </div>
        <div>
          <label htmlFor="interior_color">Interior Color</label>
          <Controller
            name="interior_color"
            control={control}
            render={({ field }) => (
                <SliderPicker
                    color={field.value}
                    onChange={(color) => field.onChange(color.hex)}
                />
            )}
          />
          {errors.interior_color && <p className="text-red-500 text-sm">{errors.interior_color.message}</p>}
        </div>
    </div>
  );
};

export default DetailsStep;