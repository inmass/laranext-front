'use client';

import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useState, FormEvent, useEffect, useRef } from 'react';
import SectionDivider from '@/components/SectionDivider';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import CardLayout from '@/components/layouts/CardLayout';
import { useTranslations } from 'next-intl';
import ClipLoader from 'react-spinners/ClipLoader';
import { PhoneInput } from '@/components/ui/phone-input';

interface Errors {
  name?: string[];
  email?: string[];
  phone?: string[];
  password?: string[];
  password_confirmation?: string[];
}

const Page = () => {
  const t = useTranslations('Register');
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    register({
      name,
      email,
      phone,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setLoading(false);
    }
  }, [errors]);

  return (
    <CardLayout
      className="w-full max-w-sm bg-card/85"
      title={t('title')}
      description={t('description')}
    >
      <form onSubmit={submitForm}>
        {/* Name */}
        <div>
          <Label htmlFor="name">{t('name')}</Label>

          <Input
            id="name"
            type="text"
            value={name}
            className="block mt-1 w-full"
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
          />

          <InputError messages={errors.name} className="mt-2" />
        </div>

        {/* Email Address */}
        <div className="mt-4">
          <Label htmlFor="email">{t('email')}</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <InputError messages={errors.email} className="mt-2" />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <Label htmlFor="phone">{t('phone')}</Label>


          <PhoneInput
            value={phone || ''}
            ref={phoneInputRef}
            onChange={(value) => setPhone(value)}
            inputProps={{
              required: true,
            }}
          />

          <InputError messages={errors.phone} className="mt-2" />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label htmlFor="password">{t('password')}</Label>

          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />

          <InputError messages={errors.password} className="mt-2" />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label htmlFor="passwordConfirmation">{t('confirmPassword')}</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="block mt-1 w-full"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
          />

          <InputError
            messages={errors.password_confirmation}
            className="mt-2"
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href="/login"
            className="underline text-sm text-muted-foreground hover:text-foreground"
          >
            {t('alreadyRegistered')}
          </Link>

          <Button className="ml-4" disabled={loading}>
            {loading ? <ClipLoader className='text-white' size={20} /> : t('registerButton')}
          </Button>
        </div>
      </form>
      <SectionDivider dividerText={t('dividerText')} />
      <SocialLoginButtons />
    </CardLayout>
  );
};

export default Page;