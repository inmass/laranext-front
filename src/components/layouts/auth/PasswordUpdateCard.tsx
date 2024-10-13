import { useTranslations } from 'next-intl';
import CardLayout from '@/components/layouts/card-layout';
import { Input } from '@/components/ui/input';
import Button from '@/components/button';
import InputError from '@/components/input-error';
import { useProfile } from '@/hooks/api/profile';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const PasswordUpdateCard: React.FC = () => {
  const t = useTranslations('Dashboard.Profile.PasswordUpdateCard');

  const passwordSchema = z
    .object({
      currentPassword: z
        .string()
        .min(1, t('validation.currentPasswordRequired')),
      newPassword: z
        .string()
        .min(8, t('validation.passwordMinLength'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          t('validation.passwordComplexity')
        ),
      confirmPassword: z
        .string()
        .min(1, t('validation.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validation.passwordsMismatch'),
      path: ['confirmPassword'],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: t('validation.newPasswordDifferent'),
      path: ['newPassword'],
    });

  type PasswordFormData = z.infer<typeof passwordSchema>;

  const { updatePassword, loading } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const watchAllFields = watch();

  const onSubmit = async (data: PasswordFormData) => {
    if (
      await updatePassword({
        current_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      })
    ) {
      reset();
    }
  };

  const shouldShowError = () => {
    return Object.values(watchAllFields).some((value) => value !== '');
  };

  return (
    <CardLayout title={t('title')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="currentPassword">{t('currentPassword')}</label>
          <Input
            id="currentPassword"
            type="password"
            className={`block mt-1 w-full ${shouldShowError() && errors.currentPassword ? 'border-red-500' : ''}`}
            {...register('currentPassword')}
          />
          <InputError
            messages={
              shouldShowError() && errors.currentPassword?.message
                ? [errors.currentPassword.message]
                : []
            }
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="newPassword">{t('newPassword')}</label>
          <Input
            id="newPassword"
            type="password"
            className={`block mt-1 w-full ${shouldShowError() && errors.newPassword ? 'border-red-500' : ''}`}
            {...register('newPassword')}
          />
          <InputError
            messages={
              shouldShowError() && errors.newPassword?.message
                ? [errors.newPassword.message]
                : []
            }
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
          <Input
            id="confirmPassword"
            type="password"
            className={`block mt-1 w-full ${shouldShowError() && errors.confirmPassword ? 'border-red-500' : ''}`}
            {...register('confirmPassword')}
          />
          <InputError
            messages={
              shouldShowError() && errors.confirmPassword?.message
                ? [errors.confirmPassword.message]
                : []
            }
            className="mt-2"
          />
        </div>

        <div className="mt-4">
          <Button type="submit" disabled={loading || !isValid || !isDirty}>
            {loading ? t('updating') : t('updatePassword')}
          </Button>
        </div>
      </form>
    </CardLayout>
  );
};

export default PasswordUpdateCard;
