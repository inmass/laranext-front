'use client';

import { useTranslations } from 'next-intl';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { useAuth } from '@/hooks/auth';
import Head from 'next/head';
import { useEffect } from 'react';
import ProfilePictureEditCard from '@/components/layouts/auth/ProfilePictureEditCard';
import PasswordUpdateCard from '@/components/layouts/auth/PasswordUpdateCard';
import ProfileDetailsUpdateCard from '@/components/layouts/auth/ProfileDetailsUpdateCard';

const ProfilePage = () => {
    const { user } = useAuth({ middleware: 'auth' });
    const t = useTranslations('Dashboard');

    const breadcrumbItems = [
        { label: t('breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('breadcrumb.profile') },
    ];

    useEffect(() => {
        document.title = t('Profile.pageTitle');
    }, [t]);

    return (
        <>
            <Head>
                <title>{t('Profile.pageTitle')}</title>
            </Head>
            <DashboardBreadcrumb items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
                <div className="space-y-6">
                    <ProfilePictureEditCard userAvatar={user?.avatar} />
                </div>
                <div className="md:col-span-2 space-y-6">
                    <ProfileDetailsUpdateCard/>
                    <PasswordUpdateCard />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;