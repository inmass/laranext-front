'use client';

import Button from '@/components/Button';
import CardLayout from '@/components/layouts/CardLayout';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

const Page = () => {
  const { logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/dashboard',
  });

  const [status, setStatus] = useState<string | null>(null);

  return (
    <CardLayout
      className="w-full max-w-sm bg-card/85"
      title="Verify Email"
      description="Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just
                emailed to you? If you didn't receive the email, we will gladly
                send you another."
    >
      {status === 'verification-link-sent' && (
        <div className="mb-4 font-medium text-sm text-green-600">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <Button onClick={() => resendEmailVerification({ setStatus })}>
          Resend Verification Email
        </Button>

        <button
          type="button"
          className="underline text-sm text-muted-foreground hover:text-gray-900"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </CardLayout>
  );
};

export default Page;
