import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Pen, Plus } from 'lucide-react';
import { FeatureType } from '@/types/feature';
import { useCreateFeature, useUpdateFeature } from '@/hooks/api/features';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import FeatureTypeSelect from '@/components/dynamic/feature-type-select';

interface FeatureFormDialogProps {
    feature?: FeatureType;
}

const FeatureFormDialog = ({ feature }: FeatureFormDialogProps) => {
    const t = useTranslations('Dashboard.Features.FormDialog');
    console.log(feature);

    const [isOpen, setIsOpen] = useState(false);
    const schema = z.object({
        name: z.string().min(1, { message: t('validation.nameRequired') }),
        feature_type_id: z.string().min(1, { message: t('validation.featureTypeRequired') }),
    });
    type FormData = z.infer<typeof schema>;

    const defaultValues = feature ? {
        name: feature.name,
        feature_type_id: String(feature.feature_type_id),
    } : {
        name: '',
        feature_type_id: '',
    };
    const { control, register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    const createFeatureMutation = useCreateFeature();
    const updateFeatureMutation = useUpdateFeature();

    const onSubmit = async (data: FormData) => {
        try {
            if (feature) {
                await updateFeatureMutation.mutateAsync({ id: feature.id, ...data });
            } else {
                await createFeatureMutation.mutateAsync(data);
            }
            const newDefaultValues = feature ? {
                name: data.name,
                feature_type_id: data.feature_type_id,
            } : {
                name: '',
                feature_type_id: '',
            };
            
            reset(newDefaultValues);
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            // #TODO: Add logging
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen]);

    const trigger = feature ? (
        <Pen className="h-5 w-5 cursor-pointer text-blue-300" />
    ) : (
        <Button className="p-1 sm:px-4 sm:py-2">
            <Plus className="w-6 h-6 inline-block sm:mr-2" />
            <span className='hidden sm:inline'>{t('addNewFeature')}</span>
        </Button>
    );

    return (
        <Dialog
            trigger={trigger}
            title={feature ? t('editTitle', { name: feature.name }) : t('addTitle')}
            description={feature ? t('editDescription') : t('addDescription')}
            className="max-w-[600px]"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name">{t('labels.name')}</label>
                        <Input
                            type="text"
                            id="name"
                            {...register('name')}
                            className={cn(errors.name ? 'border-red-500' : '')}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="feature_type_id">{t('labels.featureType')}</label>
                        <Controller
                            name="feature_type_id"
                            control={control}
                            render={({ field }) => (
                                <FeatureTypeSelect
                                    {...field}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    className={cn(errors.feature_type_id ? 'border-red-500' : '')}
                                />
                            )}
                        />
                        {errors.feature_type_id && <p className="text-red-500 text-sm">{errors.feature_type_id.message}</p>}
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <Button type="button" onClick={handleClose}>{t('buttons.close')}</Button>
                        <Button type="button" onClick={handleSubmit(onSubmit)} disabled={!isDirty}>{t('buttons.submit')}</Button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default FeatureFormDialog;