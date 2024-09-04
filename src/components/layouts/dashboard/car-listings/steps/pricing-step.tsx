import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const PricingStep: React.FC = () => {
  const { control, formState: { errors }, register } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="price">Price</label>
        <Input
            type="number"
            id="price"
            {...register('price', { valueAsNumber: true })}
            className={cn(errors.price ? 'border-red-500' : '')}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <Input
            type="number"
            id="year"
            {...register('year', { valueAsNumber: true })}
            className={cn(errors.year ? 'border-red-500' : '')}
        />
        {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
      </div>

        <div>
            <label htmlFor="mileage">Mileage</label>
            <Input
                type="number"
                id="mileage"
                {...register('mileage', { valueAsNumber: true })}
                className={cn(errors.mileage ? 'border-red-500' : '')}
            />
            {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
        </div>
    </div>
  );
};

export default PricingStep;