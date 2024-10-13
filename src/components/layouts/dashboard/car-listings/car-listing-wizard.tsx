import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Tabs from '@radix-ui/react-tabs';
import Button from '@/components/button';
import { cn } from '@/lib/utils';
import BasicInfoStep from './steps/basic-info-step';
import VehicleDetailsStep from './steps/vehicle-details-step';
import PricingStep from './steps/pricing-step';
import ReviewStep from './steps/review-step';
import ImageUploadStep from './steps/image-upload-step';
import FeatureSelectionStep from './steps/feature-selection-step';
import AppearanceStep from './steps/appearance-step';
import DescriptionStep from './steps/description-step';
import { LookupProvider } from './context/lookup-context';
import { useCreateCarListing, useUpdateCarListing } from '@/hooks/api/car-listings';
import toast from 'react-hot-toast';
import { CarListingType } from '@/types/car-listing';

const addCarListingSchema = (t: (key: string) => string) => z.object({
    make_id: z.string().min(1, { message: t('validation.makeRequired') }),
    car_model_id: z.string().min(1, { message: t('validation.modelRequired') }),
    body_style_id: z.string().min(1, { message: t('validation.bodyStyleRequired') }),
    condition_id: z.string().min(1, { message: t('validation.conditionRequired') }),
    features: z.array(z.string()).min(1, { message: t('validation.featuresRequired') }),
    title: z.string().min(1, { message: t('validation.titleRequired') }),
    description: z.string().min(1, { message: t('validation.descriptionRequired') }),
    price: z.number().min(1, { message: t('validation.priceRequired') }),
    original_price: z.union([z.number(), z.nan()]),
    year: z.number()
        .min(1900, { message: t('validation.yearMin') })
        .max(new Date().getFullYear() + 1, { message: t('validation.yearMax') }),
    mileage: z.number().min(0, { message: t('validation.mileageMin') }),
    exterior_color: z.string().min(1, { message: t('validation.exteriorColorRequired') }),
    interior_color: z.string().min(1, { message: t('validation.interiorColorRequired') }),
    transmission: z.string().min(1, { message: t('validation.transmissionRequired') }),
    fuel_type: z.string().min(1, { message: t('validation.fuelTypeRequired') }),
    images: z.array(z.object({
        id: z.number().optional(),
        image: z.union([z.instanceof(File), z.string()]),
        is_primary: z.boolean()
    })).min(1, { message: t('validation.imagesRequired') })
    .refine(images => images.some(img => img.is_primary), { 
        message: t('validation.primaryImageRequired') 
    }),
    removed_image_ids: z.array(z.number()).optional(),
});

const placeholderT = (key: string) => key;
const initialSchema = addCarListingSchema(placeholderT);

export type CarListingFormData = z.infer<typeof initialSchema>;
export type UpdateCarListingFormData = CarListingFormData & { id: number };

interface CarListingWizardProps {
    onSubmitSuccess?: () => void;
    carListing?: UpdateCarListingFormData;
}

const CarListingWizard = ({ onSubmitSuccess, carListing }: CarListingWizardProps) => {

    const t = useTranslations('Dashboard.CarListings.Wizard');
    const schema = addCarListingSchema(t);

    const creatingSteps = [
        { id: 'basic-info', title: t('steps.basicInfo'), component: BasicInfoStep },
        { id: 'vehicle-details', title: t('steps.vehicleDetails'), component: VehicleDetailsStep },
        { id: 'features', title: t('steps.features'), component: FeatureSelectionStep },
        { id: 'appearance', title: t('steps.appearance'), component: AppearanceStep },
        { id: 'pricing', title: t('steps.pricing'), component: PricingStep },
        { id: 'description', title: t('steps.description'), component: DescriptionStep },
        { id: 'images', title: t('steps.images'), component: ImageUploadStep },
        { id: 'review', title: t('steps.review'), component: ReviewStep },
    ];

    const updatingSteps = creatingSteps.slice(0, -1);  // Exclude the review step for updates

    const steps = carListing ? updatingSteps : creatingSteps;

    const [currentStep, setCurrentStep] = useState(0);
    const defaultValues = carListing || {
        body_style_id: '',
        make_id: '',
        car_model_id: '',
        condition_id: '',
        features: [],
        title: '',
        year: 1900,
        price: 1,
        mileage: 1,
        images: [],
        description: '',
        original_price: NaN,
        exterior_color: '#000000',
        interior_color: '#000000',
        transmission: '',
        fuel_type: '',
        removed_image_ids: []
    };

    const methods = useForm<CarListingFormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: defaultValues,
    });

    const { handleSubmit, trigger, formState: { isDirty, isValid: formIsValid }  } = methods;

    const nextStep = async () => {
        const fields = getFieldsForStep(currentStep);
        const isStepValid = await trigger(fields);
        if (isStepValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const createCarListingMutation = useCreateCarListing(() => {
        if (onSubmitSuccess) onSubmitSuccess()
    });

    const updateCarListingMutation = useUpdateCarListing(() => {
        if (onSubmitSuccess) onSubmitSuccess()
    });

    const submitForm = async (data: CarListingFormData) => {
        try {
            if (carListing) {
                await updateCarListingMutation.mutateAsync({ ...data, id: carListing.id });
            } else {
                await createCarListingMutation.mutateAsync(data);
            }
        } catch (error) {
            // toast.error(t('errors.failedToCreate'));
            // #TODO: Add logging
            console.error(error);
        }
    };

    const getFieldsForStep = (step: number): (keyof CarListingFormData)[] => {
        switch (step) {
            case 0: // Basic Info
                return ['make_id', 'car_model_id', 'year', 'title'];
            case 1: // Vehicle Details
                return ['body_style_id', 'condition_id', 'mileage', 'transmission', 'fuel_type'];
            case 2: // Features
                return ['features'];
            case 3: // Appearance
                return ['exterior_color', 'interior_color'];
            case 4: // Pricing
                return ['price', 'original_price'];
            case 5: // Description
                return ['description'];
            case 6: // Images
                return ['images'];
            case 7: // Review
            default:
                return [];
        }
    };
      
    const canSkipSteps = !!carListing || formIsValid;

    return (
        <LookupProvider>
            <FormProvider {...methods}>
                <form>
                    <Tabs.Root value={steps[currentStep].id} onValueChange={(value) => setCurrentStep(steps.findIndex(step => step.id === value))}>
                        <Tabs.List className="flex space-x-1 rounded-xl bg-muted p-2 flex-wrap justify-center" aria-label="Manage your account">
                            {steps.map((step, index) => (
                            <Tabs.Trigger
                                key={step.id}
                                value={step.id}
                                disabled={!canSkipSteps && index > currentStep}
                                className={cn(
                                    "bg-card rounded-lg py-2.5 px-3 text-sm text-card-foreground font-medium leading-none focus:outline-none",
                                    "min-w-[100px] flex-grow max-w-[calc(20%-0.5rem)] break-words",
                                    index === currentStep
                                    ? "shadow bg-muted-foreground text-card"
                                    : "bg-muted",
                                    !(!canSkipSteps && index > currentStep) && "hover:bg-muted-foreground hover:text-card",
                                    index >= 5 && "mt-1"
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

                    <div className={cn(
                        'mt-6 flex',
                        currentStep > 0 ? 'justify-between' : 'justify-end'
                    )}>
                        {currentStep > 0 && (
                            <Button type="button" onClick={prevStep}>
                                {t('buttons.previous')}
                            </Button>
                        )}
                        {
                            currentStep === steps.length - 1 ? (
                                <Button type="button" onClick={handleSubmit(submitForm)} disabled={!isDirty}>{t('buttons.submit')}</Button>
                            ) : (
                                <Button type="button" onClick={nextStep}>
                                    {t('buttons.next')}
                                </Button>
                            )
                        }
                    </div>
                </form>
            </FormProvider>
        </LookupProvider>
    );
};

export default CarListingWizard;

export function mapCarListingForFormData(carListing: CarListingType): UpdateCarListingFormData {
    return {
        id: carListing.id,
        make_id: carListing.make_id.toString(),
        car_model_id: carListing.car_model_id.toString(),
        body_style_id: carListing.body_style_id.toString(),
        condition_id: carListing.condition_id.toString(),
        features: carListing.features.map(f => f.id.toString()),
        title: carListing.title,
        description: carListing.description,
        price: Number(carListing.price),
        original_price: Number(carListing.original_price),
        year: carListing.year,
        mileage: carListing.mileage,
        exterior_color: carListing.exterior_color,
        interior_color: carListing.interior_color,
        transmission: carListing.transmission,
        fuel_type: carListing.fuel_type,
        images: carListing.images.map(img => ({
            id: img.id,
            image: img.path,
            is_primary: img.is_primary
        })),
        removed_image_ids: []
    };
}