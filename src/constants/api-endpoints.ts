const ApiEndpoints = {
  auth: {
    csrf: '/sanctum/csrf-cookie',
    userData: '/api/user',
    login: '/login',
    register: '/register',
    logout: '/logout',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    verifyEmail: '/verify-email',
    emailVerificationNotification: '/email/verification-notification',
    SocialLogin: (provider: string) => `/auth/${provider}/redirect`,
    setLocale: '/api/locale',
  },
  profileDetailsUpdate: '/api/profile',
  profileAvatarUpdate: '/api/profile/avatar',
  profilePasswordUpdate: '/api/profile/password',

  carListings: '/api/backoffice/car-listings',
  carListingStatus: (carListing: number) =>
    `/api/backoffice/car-listings/${carListing}/status`,

  bodyStyles: '/api/backoffice/body-styles',

  makes: '/api/backoffice/makes',

  carModels: '/api/backoffice/car-models',

  conditions: '/api/backoffice/conditions',

  features: '/api/backoffice/features',

  featureTypes: '/api/backoffice/feature-types',
};

export default ApiEndpoints;
