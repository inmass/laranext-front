import React from 'react';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import { cn } from '@/lib/utils';


const addCarListingSchema = z.object({
    // make_id: z.string().min(1, 'Make is required'),
    // car_model_id: z.string().min(1, 'Car Model is required'),
    body_style_id: z.string().min(1, 'Body Style is required'),
    condition_id: z.string().min(1, 'Condition is required'),
    // features: z.array(z.string()).min(1, 'At least one feature is required'),
    title: z.string().min(1, 'Title is required'),
    // description: z.string().min(1, 'Description is required'),
    price: z.number().min(1, 'Price is required'),
    // original_price: z.number().nullable(),
    year: z.number().min(1900, 'Year must be 1900 or later').max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
    mileage: z.number().min(0, 'Mileage cannot be negative'),
    // vin: z.string().min(1, 'VIN is required'),
    // exterior_color: z.string().min(1, 'Exterior Color is required'),
    // interior_color: z.string().min(1, 'Interior Color is required'),
    // transmission: z.string().min(1, 'Transmission is required'),
    // images: z.array(z.object({
    //     image: z.string().min(1, 'Image is required'),
    //     is_primary: z.boolean()
    // })).min(1, 'At least one image is required')
});

type AddCarListingFormData = z.infer<typeof addCarListingSchema>;

const AddCarListingDialog = () => {
    const { control, register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<AddCarListingFormData>({
        resolver: zodResolver(addCarListingSchema),
        mode: 'onChange',
        defaultValues: {
            body_style_id: '',
            title: '',
            year: undefined,
            price: undefined,
            mileage: undefined,
            condition_id: '',
        },
    });

    const submitForm = async (data: AddCarListingFormData) => {
        try {
            console.log('Add Listing', data);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const formContent = (
        <form onSubmit={handleSubmit(submitForm)}>
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
                    <label htmlFor="mileage">Mileage</label>
                    <Input
                        type="number"
                        id="mileage"
                        {...register('mileage', { valueAsNumber: true })}
                        className={cn(errors.mileage ? 'border-red-500' : '')}
                    />
                    {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
                </div>
                <div>
                    <label htmlFor="condition_id">Condition</label>
                    <select
                        id="condition_id"
                        {...register('condition_id')}
                        className={cn(
                            errors.condition_id ? 'border-red-500' : '',
                            'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        )}
                    >
                        <option value="">Select a condition</option>
                        <option value="1">New</option>
                        <option value="2">Used</option>
                        <option value="3">Certified Pre-Owned</option>
                    </select>
                    {errors.condition_id && <p className="text-red-500 text-sm">{errors.condition_id.message}</p>}
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <Button type="submit" disabled={isSubmitting || !isValid}>
                    {isSubmitting ? 'Submitting...' : 'Add Listing'}
                </Button>
            </div>
        </form>
    );

    const trigger = (
        <Button>
            <Plus className="w-6 h-6 mr-2 inline-block" />
            Add New Listing
        </Button>
    );

    return (
        <Dialog
            trigger={trigger}
            title="Add New Car Listing"
            description="Enter the details of the new car listing here."
        >
            {formContent}
        </Dialog>
    );
};

export default AddCarListingDialog;