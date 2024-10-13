import { useTranslations } from 'next-intl';
import CardLayout from '@/components/layouts/card-layout';
import { Input } from '@/components/ui/input';
import Button from '@/components/button';
import InputError from '@/components/input-error';
import { useProfile } from '@/hooks/api/profile';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PhoneInput } from '@/components/ui/phone-input';

const ProfileDetailsUpdateCard = () => {
    const t = useTranslations('Dashboard.Profile.ProfileDetailsUpdateCard');

    const ProfileDetailsSchema = z.object({
        name: z.string().min(1, t('validation.nameRequired')),
        phone: z.string().min(1, t('validation.phoneRequired')),
    });

    type ProfileDetailsFormData = z.infer<typeof ProfileDetailsSchema>;

    const { user, updateProfileDetails, loading } = useProfile();

    const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset, control } = useForm<ProfileDetailsFormData>({
        resolver: zodResolver(ProfileDetailsSchema),
        defaultValues: {
            name: user?.name,
            phone: user?.phone
        },
        mode: 'onChange'
    });

    const onSubmit = async (data: ProfileDetailsFormData) => {
        if (await updateProfileDetails({ name: data.name, phone: data.phone })) {
            const formDefaults = { 
                name: data.name,
                phone: data.phone
            };
            reset(formDefaults);
        }
    };

    return (
        <CardLayout
            className="md:col-span-2"
            title={t('title')}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">{t('name')}</label>

                    <Input
                        id="name"
                        type="text"
                        className={`block mt-1 w-full ${errors.name ? 'border-red-500' : ''}`}
                        {...register('name')}
                    />

                    <InputError messages={errors.name?.message ? [errors.name.message] : []} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label htmlFor="phone">{t('phone')}</label>

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <PhoneInput
                                {...field}
                                onChange={(value) => field.onChange(value)}
                                className={`block mt-1 w-full ${errors.phone ? 'border-red-500' : ''}`}
                            />
                        )}
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="email">{t('email')}</label>

                    <Input
                        id="email"
                        type="email"
                        value={user?.email}
                        className="block mt-1 w-full"
                        readOnly
                    />

                    <InputError messages={['']} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Button
                        type="submit"
                        disabled={loading || !isValid || !isDirty}
                    >
                        {loading ? t('updating') : t('updateProfile')}
                    </Button>
                </div>
            </form>
        </CardLayout>
    );
}

export default ProfileDetailsUpdateCard;