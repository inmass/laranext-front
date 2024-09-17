import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Pen, Plus } from 'lucide-react';
import { MakeType } from '@/types/make';
import { useCreateMake, useUpdateMake } from '@/hooks/api/makes';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MakeFormDialogProps {
    make?: MakeType;
}

const MakeFormDialog = ({ make }: MakeFormDialogProps) => {
    const t = useTranslations('Dashboard.Makes.FormDialog');

    const [isOpen, setIsOpen] = useState(false);
    const schema = z.object({
        name: z.string().min(1, { message: t('validation.nameRequired') }),
    });
    type FormData = z.infer<typeof schema>;

    const defaultValues = make ? {
        name: make.name,
    } : {
        name: '',
    };
    const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    const createMakeMutation = useCreateMake();
    const updateMakeMutation = useUpdateMake();

    const onSubmit = async (data: FormData) => {
        try {
            if (make) {
                await updateMakeMutation.mutateAsync({ id: make.id, ...data });
            } else {
                await createMakeMutation.mutateAsync(data);
            }
            const newDefaultValues = make ? { name: data.name } : { name: '' };
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

    const trigger = make ? (
        <Pen className="h-5 w-5 cursor-pointer text-blue-300" />
    ) : (
        <Button className="p-1 sm:px-4 sm:py-2">
            <Plus className="w-6 h-6 inline-block sm:mr-2" />
            <span className='hidden sm:inline'>{t('addNewMake')}</span>
        </Button>
    );

    return (
        <Dialog
            trigger={trigger}
            title={make ? t('editTitle', { name: make.name }) : t('addTitle')}
            description={make ? t('editDescription') : t('addDescription')}
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

export default MakeFormDialog;