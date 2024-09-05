import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Tabs from '@radix-ui/react-tabs';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import BasicInfoStep from './steps/basic-info-step';
import DetailsStep from './steps/details-step';
import PricingStep from './steps/pricing-step';
import ReviewStep from './steps/review-step';
import ImageUploadStep from './steps/image-upload-step';

const addCarListingSchema = z.object({
    make_id: z.string().min(1, 'Make is required'),
    car_model_id: z.string().min(1, 'Car Model is required'),
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
    // })).min(1, 'At least one image is required') // one of the images should be primary
    images: z.array(z.object({
        image: z.string().min(1, 'Image is required'),
        is_primary: z.boolean()
    })).min(1, 'At least one image is required').refine(images => images.some(img => img.is_primary), {
        message: 'At least one image must be primary',
    }),
});

export type CarListingFormData = z.infer<typeof addCarListingSchema>;


const steps = [
  { id: 'basic-info', title: 'Basic Info', component: BasicInfoStep },
  { id: 'details', title: 'Details', component: DetailsStep },
  { id: 'pricing', title: 'Pricing', component: PricingStep },
  { id: 'images', title: 'Images', component: ImageUploadStep },
  { id: 'review', title: 'Review', component: ReviewStep },
];


const CarListingWizard: React.FC = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const methods = useForm<CarListingFormData>({
        resolver: zodResolver(addCarListingSchema),
        mode: 'onChange',
        defaultValues: {
            body_style_id: '',
            make_id: '',
            car_model_id: '',
            condition_id: '',
            title: '',
            year: 1900,
            price: 1,
            mileage: 1,
            images: [],
        },
    });

    const { handleSubmit, trigger } = methods;

    const nextStep = async () => {
        const fields = getFieldsForStep(currentStep);
        const isStepValid = await trigger(fields);
        if (isStepValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));


    const submitForm = async (data: CarListingFormData) => {
        try {
            console.log('Add Listing', data);
            // reset();
        } catch (error) {
            console.error(error);
        }
    };

    const getFieldsForStep = (step: number): (keyof CarListingFormData)[] => {
        switch (step) {
            case 0:
                return ['make_id', 'car_model_id'];
            case 1:
                return ['body_style_id', 'condition_id', 'title'];
            case 2:
                return ['price', 'year', 'mileage'];
            case 3:
                return ['images'];
            case 4:
            default:
                return [];
        }
    };

    return (
        <FormProvider {...methods}>
            <form>
                <Tabs.Root value={steps[currentStep].id} onValueChange={(value) => setCurrentStep(steps.findIndex(step => step.id === value))}>
                    <Tabs.List className="flex space-x-1 rounded-xl bg-muted p-1" aria-label="Manage your account">
                        {steps.map((step, index) => (
                        <Tabs.Trigger
                            key={step.id}
                            value={step.id}
                            disabled={index > currentStep}
                            className={cn(
                            "w-full bg-card rounded-lg py-2.5 text-sm text-card-foreground font-medium leading-none focus:outline-none",
                            index === currentStep
                                ? "shadow bg-muted-foreground text-card"
                                : "bg-muted"
                            )}
                        >
                            {step.title}
                        </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {steps.map((step, index) => (
                        <Tabs.Content key={step.id} value={step.id} className="mt-6">
                            <step.component />
                        </Tabs.Content>
                    ))}
                </Tabs.Root>

                {/* <div className="mt-6 flex justify-between"> */}
                <div className={cn(
                    'mt-6 flex',
                    currentStep > 0 ? 'justify-between' : 'justify-end'
                )}>
                    {currentStep > 0 && (
                        <Button type="button" onClick={prevStep}>
                            Previous
                        </Button>
                    )}
                    {
                        currentStep === steps.length - 1 ? (
                            <Button type="button" onClick={handleSubmit(submitForm)}>Submit</Button>
                        ) : (
                            <Button type="button" onClick={nextStep}>
                                Next
                            </Button>
                        )
                    }
                </div>
            </form>
        </FormProvider>
    );
};

export default CarListingWizard;