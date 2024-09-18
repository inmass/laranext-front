import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Pen, Plus } from 'lucide-react';
import { ConditionType } from '@/types/condition';
import { useCreateCondition, useUpdateCondition } from '@/hooks/api/conditions';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ConditionFormDialogProps {
    condition?: ConditionType;
}

const ConditionFormDialog = ({ condition }: ConditionFormDialogProps) => {
    const t = useTranslations('Dashboard.Conditions.FormDialog');

    const [isOpen, setIsOpen] = useState(false);
    const schema = z.object({
        name: z.string().min(1, { message: t('validation.nameRequired') }),
    });
    type FormData = z.infer<typeof schema>;

    const defaultValues = condition ? {
        name: condition.name,
    } : {
        name: '',
    };
    const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    const createConditionMutation = useCreateCondition();
    const updateConditionMutation = useUpdateCondition();

    const onSubmit = async (data: FormData) => {
        try {
            if (condition) {
                await updateConditionMutation.mutateAsync({ id: condition.id, ...data });
            } else {
                await createConditionMutation.mutateAsync(data);
            }
            const newDefaultValues = condition ? { name: data.name } : { name: '' };
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

    const trigger = condition ? (
        <Pen className="h-5 w-5 cursor-pointer text-blue-300" />
    ) : (
        <Button className="p-1 sm:px-4 sm:py-2">
            <Plus className="w-6 h-6 inline-block sm:mr-2" />
            <span className='hidden sm:inline'>{t('addNewCondition')}</span>
        </Button>
    );

    return (
        <Dialog
            trigger={trigger}
            title={condition ? t('editTitle', { name: condition.name }) : t('addTitle')}
            description={condition ? t('editDescription') : t('addDescription')}
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

                    <div className="mt-6 flex justify-end space-x-4">
                        <Button type="button" onClick={handleClose}>{t('buttons.close')}</Button>
                        <Button type="button" onClick={handleSubmit(onSubmit)} disabled={!isDirty}>{t('buttons.submit')}</Button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default ConditionFormDialog;