'use client';

import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { useAuth } from '@/hooks/auth';
import Head from 'next/head';
import { useEffect } from 'react';
import ProfilePictureEditCard from '@/components/layouts/auth/ProfilePictureEditCard';
import PasswordUpdateCard from '@/components/layouts/auth/PasswordUpdateCard';
import ProfileDetailsUpdateCard from '@/components/layouts/auth/ProfileDetailsUpdateCard';

const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Profile' },
];

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });

    useEffect(() => {
        document.title = 'Laravel - Profile';
    }, []);

    return (
        <>
            <Head>
                <title>Laravel - Profile</title>
            </Head>
            <DashboardBreadcrumb items={breadcrumbItems} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
                <div className="space-y-6">
                    <ProfilePictureEditCard userAvatar={user?.avatar} />
                </div>
                <div className="md:col-span-2 space-y-6">
                    <ProfileDetailsUpdateCard user={user} />
                    <PasswordUpdateCard />
                </div>
                
            </div>
        </>
    );
};

export default Dashboard;
