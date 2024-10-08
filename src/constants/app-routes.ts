const AppRoutes = {
    dashboard: {
        home: '/dashboard',
        profile: '/dashboard/profile',
        carListings: '/dashboard/car-listings',
        management: {
            makes: '/dashboard/management/makes',
            models: '/dashboard/management/car-models',
            features: '/dashboard/management/features',
            featureTypes: '/dashboard/management/feature-types',
            bodyStyles: '/dashboard/management/body-styles',
            conditions: '/dashboard/management/conditions',
            users: '/dashboard/management/users',
        },
    },
    frontOffice: {
        home: '/',
        browse: '/browse',
        about: '/about-us',
        contact: '/contact-us',
        privacyPolicy: '/privacy-policy',
        listing: (slug: string) => `/listing/${slug}`,
    },
};

export default AppRoutes;