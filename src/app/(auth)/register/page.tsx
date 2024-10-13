'use client';

import Button from '@/components/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import Label from '@/components/label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useState, useEffect } from 'react';
import SectionDivider from '@/components/section-divider';
import SocialLoginButtons from '@/components/social-login-buttons';
import CardLayout from '@/components/layouts/card-layout';
import { useTranslations } from 'next-intl';
import ClipLoader from 'react-spinners/ClipLoader';
import { PhoneInput } from '@/components/ui/phone-input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/utils';


const registerSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(1, { message: t('validation.nameRequired') }),
  email: z.string().email({ message: t('validation.emailInvalid') }),
  phone: z.string().min(1, { message: t('validation.phoneRequired') })
  .refine((value) => {
    // return /^\+212\d*$/.test('+'+value) && value.length == 12;
    return /^212\d{9}$/.test(value);
  }, { message: t('validation.phoneInvalid') }),
  password: z.string().min(8, { message: t('validation.passwordMinLength') }),
  password_confirmation: z.string().min(1, { message: t('validation.confirmPasswordRequired') })
}).refine((data) => data.password == data.password_confirmation, {
    message: t('validation.passwordsMismatch'),
    path: ["password_confirmation"],
})

const placeholderT = (key: string) => key;
const initialSchema = registerSchema(placeholderT);
type FormData = z.infer<typeof initialSchema>;

const Page = () => {
  const t = useTranslations('Register');
  const schema = registerSchema(t);
  const { register: registerUser } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const { register, control, handleSubmit, setError, formState: { errors, isValid, isSubmitting } } = useForm<FormData>(
    {
      defaultValues: {
        name: '',
        email: '',
        phone: '+212',
        password: '',
        password_confirmation: '',
      },
      resolver: zodResolver(schema),
      mode: 'onChange',
    }
  );

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    registerUser({
      ...data,
      setErrors: (errors) => {
        Object.keys(errors).forEach((key) => {
          setError(key as keyof FormData, { 
            type: 'manual', 
            message: errors[key][0] 
          });
        });
      },
    });
    setLoading(false);
  };

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     setLoading(false);
  //   }
  // }, [errors]);

  return (
    <CardLayout
      className="w-full max-w-sm bg-card/85"
      title={t('title')}
      description={t('description')}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            {...register('name')}
            className={cn(errors.name ? 'border-red-500' : '')}
            id="name"
            type="text"
          />
          <InputError messages={errors.name?.message ? [errors.name.message] : []} className="mt-2" />
        </div>

        {/* Email Address */}
        <div className="mt-4">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            {...register('email')}
            id="email"
            type="email"
            className={cn(errors.email ? 'border-red-500' : '')}
          />
          <InputError messages={errors.email?.message ? [errors.email.message] : []} className="mt-2" />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <Label htmlFor="phone">{t('phone')}</Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Phone is required' }}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                countryCodeEditable={false}
                inputProps={{
                  required: true,
                  ref: field.ref
                }}
              />
            )}
          />
          <InputError messages={errors.phone?.message ? [errors.phone.message] : []} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            type="password"
            className={cn(errors.password ? 'border-red-500' : '')}
            {...register('password')}
            autoComplete="new-password"
          />
          <InputError messages={errors.password?.message ? [errors.password.message] : []} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="password_confirmation">{t('confirmPassword')}</Label>
          <Input
            {...register('password_confirmation')}
            id="confirmPassword"
            type="password"
            className={cn(errors.password_confirmation ? 'border-red-500' : '')}
          />
          <InputError messages={errors.password_confirmation?.message ? [errors.password_confirmation.message] : []} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href="/login"
            className="underline text-sm text-muted-foreground hover:text-foreground"
          >
            {t('alreadyRegistered')}
          </Link>

          <Button className="ml-4" disabled={isSubmitting || !isValid || loading}>
            {isSubmitting ? <ClipLoader className='text-white' size={20} /> : t('registerButton')}
          </Button>
        </div>
      </form>
      <SectionDivider dividerText={t('dividerText')} />
      <SocialLoginButtons />
    </CardLayout>
  );
};

export default Page;