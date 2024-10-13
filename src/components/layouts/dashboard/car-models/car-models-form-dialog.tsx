import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/button';
import { Pen, Plus } from 'lucide-react';
import { CarModelType } from '@/types/car-model';
import { useCreateCarModel, useUpdateCarModel } from '@/hooks/api/car-models';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import MakeSelect from '@/components/dynamic/make-select';

interface CarModelFormDialogProps {
    carModel?: CarModelType;
}

const CarModelFormDialog = ({ carModel }: CarModelFormDialogProps) => {
    const t = useTranslations('Dashboard.CarModels.FormDialog');

    const [isOpen, setIsOpen] = useState(false);
    const schema = z.object({
        name: z.string().min(1, { message: t('validation.nameRequired') }),
        make_id: z.string().min(1, { message: t('validation.makeRequired') }),
    });
    type FormData = z.infer<typeof schema>;

    const defaultValues = carModel ? {
        name: carModel.name,
        make_id: String(carModel.make_id),
    } : {
        name: '',
        make_id: '',
    };
    const { control, register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    const createCarModelMutation = useCreateCarModel();
    const updateCarModelMutation = useUpdateCarModel();

    const onSubmit = async (data: FormData) => {
        try {
            if (carModel) {
                await updateCarModelMutation.mutateAsync({ id: carModel.id, ...data });
            } else {
                await createCarModelMutation.mutateAsync(data);
            }
            const newDefaultValues = carModel ? {
                name: data.name,
                make_id: data.make_id,
            } : {
                name: '',
                make_id: '',
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

    const trigger = carModel ? (
        <Pen className="h-5 w-5 cursor-pointer text-blue-300" />
    ) : (
        <Button className="p-1 sm:px-4 sm:py-2">
            <Plus className="w-6 h-6 inline-block sm:mr-2" />
            <span className='hidden sm:inline'>{t('addNewCarModel')}</span>
        </Button>
    );

    return (
        <Dialog
            trigger={trigger}
            title={carModel ? t('editTitle', { name: carModel.name }) : t('addTitle')}
            description={carModel ? t('editDescription') : t('addDescription')}
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
                        <label htmlFor="make_id">{t('labels.carMake')}</label>
                        <Controller
                            name="make_id"
                            control={control}
                            render={({ field }) => (
                                <MakeSelect
                                    {...field}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    className={cn(errors.make_id ? 'border-red-500' : '')}
                                />
                            )}
                        />
                        {errors.make_id && <p className="text-red-500 text-sm">{errors.make_id.message}</p>}
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

export default CarModelFormDialog;