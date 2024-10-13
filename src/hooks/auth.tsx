import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { UserType } from '@/types/user';
import ApiEndpoints from '@/constants/api-endpoints';
import AppRoutes from '@/constants/app-routes';

type RoleType = 'admin' | 'user';

interface AuthProps {
  middleware?: 'auth' | 'guest';
  redirectIfAuthenticated?: string;
  requiredRole?: RoleType | RoleType[];
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
  requiredRole,
}: AuthProps = {}) => {
  const router = useRouter();
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

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

        router.push(ApiEndpoints.auth.verifyEmail);
      })
  );

  const userCanAccess = (): boolean => {
    if (!user) {
      return false;
    }

    if (!requiredRole) {
      return true;
    }

    return typeof requiredRole === 'string'
      ? user.role === requiredRole
      : requiredRole.includes(user.role);
  };

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
        router.push(
          ApiEndpoints.auth.login + '?reset=' + btoa(response.data.status)
        )
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

  const logout = async (withRedirect = false) => {
    if (!error) {
      await axios.post(ApiEndpoints.auth.logout).then(() => mutateUser());
    }
    const next =
      window.location.pathname !== ApiEndpoints.auth.login && withRedirect
        ? window.location.pathname
        : '';

    window.location.href = `${ApiEndpoints.auth.login}?next=${next}`;
  };

  const socialLogin = async (provider: socialProviders) => {
    axios.post(ApiEndpoints.auth.SocialLogin(provider)).then((response) => {
      if (!response.data?.url) {
        throw new Error('Invalid response');
      }
      window.location.href = response.data.url;
    });
  };

  const setLocale = async (newLocale: string) => {
    await axios
      .post(ApiEndpoints.auth.setLocale, { locale: newLocale })
      .then((response) => {
        mutateUser();
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
      logout(true);
    }

    if (user && requiredRole && !userCanAccess()) {
      router.push(AppRoutes.dashboard.home);
    }

    // wait few milliseconds to avoid flickering
    setTimeout(() => {
      setIsMounted(true);
    }, 500);
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
    setLocale,
    isMounted,
  };
};
