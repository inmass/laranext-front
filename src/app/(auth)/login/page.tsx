'use client';

import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthSessionStatus from '@/components/AuthSessionStatus';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import SectionDivider from '@/components/SectionDivider';
import DefaultLayout from '@/components/layouts/auth/DefaultLayout';

interface Errors {
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

const Login = () => {
  // const router = useRouter()
  const router: any = useRouter();

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [shouldRemember, setShouldRemember] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (router.reset?.length > 0 && Object.keys(errors).length === 0) {
      setStatus(atob(router.reset));
    } else {
      setStatus(null);
    }
  });

  const submitForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    login({
      email,
      password,
      remember: shouldRemember,
      setErrors,
      setStatus,
    });
  };

  return (
    <DefaultLayout
      title="Login"
      description="Use your email to login to your account."
    >
      <div id="email-login">
        <AuthSessionStatus className="mb-4" status={status} />
        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event) => setEmail(event.target.value)}
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Remember Me */}
          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(event) => setShouldRemember(event.target.checked)}
              />

              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href="/forgot-password"
              className="underline text-sm text-gray-600 hover:text-white"
            >
              Forgot your password?
            </Link>

            <Button className="ml-3">Login</Button>
          </div>
        </form>
      </div>
      <SectionDivider dividerText="Or continue with" />
      <SocialLoginButtons />
    </DefaultLayout>
  );
};

export default Login;
