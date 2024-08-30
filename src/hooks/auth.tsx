import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UserType } from '@/types/user';
import ApiEndpoints from '@/constants/ApiEndpoints';

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
    mutate: mutateUser,
  } = useSWR<UserType>(ApiEndpoints.auth.userData, () =>
    axios
      .get(ApiEndpoints.auth.userData)
      .then((res) => res.data.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        // router.push('/verify-email');
        router.push(ApiEndpoints.auth.verifyEmail);
      })
  );

  const register = async ({ setErrors, ...props }: RegisterProps) => {

    setErrors([]);

    axios
      .post(ApiEndpoints.auth.register, props)
      .then(() => mutateUser())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {

    setErrors([]);
    setStatus(null);

    axios
      .post(ApiEndpoints.auth.login, props)
      .then(() => mutateUser())
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

    setErrors([]);
    setStatus(null);

    axios
      .post(ApiEndpoints.auth.forgotPassword, { email })
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

    setErrors([]);
    setStatus(null);

    axios
      .post(ApiEndpoints.auth.resetPassword, { ...props, token: params.token })
      .then((response) =>
        router.push(ApiEndpoints.auth.login + '?reset=' + btoa(response.data.status))
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
      .post(ApiEndpoints.auth.emailVerificationNotification)
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post(ApiEndpoints.auth.logout).then(() => mutateUser());
    }

    window.location.pathname = ApiEndpoints.auth.login;
  };

  const socialLogin = async (provider: socialProviders) => {

    axios.post(ApiEndpoints.auth.SocialLogin(provider)).then((response) => {
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
      window.location.pathname === ApiEndpoints.auth.verifyEmail &&
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
    mutateUser,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    socialLogin,
  };
};
