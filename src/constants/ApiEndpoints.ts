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
    },
    profileDetailsUpdate: '/api/profilessss',
    profileAvatarUpdate: '/api/profile/avatar',
    profilePasswordUpdate: '/api/profile/password',

    carListings: '/api/backoffice/car-listings',
};

export default ApiEndpoints;