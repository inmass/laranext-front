'use client';

import Button from '@/components/Button';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { DataTable } from '@/components/layouts/data-table';
import { useAuth } from '@/hooks/auth';
import { useCarListings } from '@/hooks/useCarListings';
import { CarListingType } from '@/types/car-listing';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Listings'}
];

const Dashboard = () => {
    const { user } = useAuth({ middleware: 'auth' });

    const [page, setPage] = useState(1);
    const perPage = 2;

    const { data, isLoading, isError, error } = useCarListings(page, perPage);

    const columns = [
        { header: 'Title', accessor: 'title' as const},
        { header: 'Year', accessor: 'year' as const},
        { header: 'Price', type: 'currency' as const,accessor: 'price' as const, className: 'table-cell' },
        { header: 'Mileage', accessor: (item: CarListingType) => `${item.mileage.toLocaleString()} miles`, className: 'table-cell' },
        { header: 'Created At', type: 'date' as const ,accessor: 'created_at' as const, className: 'table-cell' },
    ];

    const actions = [
        { name: 'View', accessor: (item: CarListingType) => (
            <Link href={`/car-listings/${item.id}`}>View</Link>
        )},
        { name: 'Delete', accessor: (item: CarListingType) => (
            <p onClick={() => console.log('Delete', item.id)}>Delete</p>
        )},
    ];
    
    useEffect(() => {
        document.title = 'Laravel - Profile';
    }, []);

    return (
        <>
            <Head>
                <title>Laravel - Profile</title>
            </Head>
            <DashboardBreadcrumb items={breadcrumbItems} />
            <DataTable
                title="Car Listings"
                description="Manage your car listings and view their details."
                columns={columns}
                actions={actions}
                data={data?.data || []}
                totalItems={data?.meta.total || 0}
                currentPage={page}
                itemsPerPage={perPage}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onPageChange={setPage}
            />
            
        </>
    );
};

export default Dashboard;
