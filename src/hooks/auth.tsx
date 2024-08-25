import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UserType } from '@/types/User';

interface AuthProps {
  middleware?: 'auth' | 'guest';
  redirectIfAuthenticated?: string;
}

interface RegisterProps {
  setErrors: (errors: any) => void;
  [key: string]: any;
}

interface LoginProps extends RegisterProps {
  setStatus: (status: string | null) => void;
}

interface ForgotPasswordProps {
  setErrors: (errors: any) => void;
  setStatus: (status: string | null) => void;
  email: string;
}

interface ResetPasswordProps extends LoginProps {
  token: string;
}

type socialProviders = 'facebook' | 'google';

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: AuthProps = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<UserType>('/api/user', () =>
    axios
      .get('/api/user')
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push('/verify-email');
      })
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const register = async ({ setErrors, ...props }: RegisterProps) => {
    await csrf();

    setErrors([]);

    axios
      .post('/register', props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/login', props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({
    setErrors,
    setStatus,
    email,
  }: ForgotPasswordProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/forgot-password', { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({
    setErrors,
    setStatus,
    ...props
  }: ResetPasswordProps) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post('/reset-password', { ...props, token: params.token })
      .then((response) =>
        router.push('/login?reset=' + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({
    setStatus,
  }: {
    setStatus: (status: string) => void;
  }) => {
    axios
      .post('/email/verification-notification')
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate());
    }

    window.location.pathname = '/login';
  };

  const socialLogin = async (provider: socialProviders) => {
    await csrf();

    axios.post(`/auth/${provider}/redirect`).then((response) => {
      if (!response.data?.url) {
        throw new Error('Invalid response');
      }
      window.location.href = response.data.url;
    });
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }

    if (
      window.location.pathname === '/verify-email' &&
      user?.email_verified_at &&
      redirectIfAuthenticated
    ) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === 'auth' && error) {
      logout();
    }
  }, [user, error, middleware, redirectIfAuthenticated]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    socialLogin,
  };
};
