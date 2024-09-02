'use client';

import CardLayout from '@/components/layouts/CardLayout';
import AddCarListingDialog from '@/components/layouts/dashboard/car-listings/new-car-listing-dialog';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import { CarListingsParams, getCarListings } from '@/hooks/api/car-listings';
import { CarListingType } from '@/types/car-listing';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Listings'}
];

const CarListings = () => {
    const [params, setParams] = useState<CarListingsParams>({
        page: 1,
        perPage: 10,
        sort: null as { key: string; direction: 'asc' | 'desc' } | null,
        filters: {} as Record<string, string>,
        include: ['primaryImage'],
    });

    const { data, isLoading, isError, error } = getCarListings(params);

    const columns = [
        { header: 'Image', type: 'image' as const, accessor: (item: CarListingType) => item.primary_image?.path, className: 'w-1/6' },
        { header: 'Title', accessor: 'title' as const, sortable: true, filterable: true, filterType: 'text' as const, className: 'w-1/4' },
        { header: 'Year', accessor: 'year' as const, sortable: true, filterable: true, filterType: 'number' as const },
        { header: 'Price', type: 'currency' as const,accessor: 'price' as const, className: 'table-cell', sortable: true },
        { header: 'Mileage', accessor: (item: CarListingType) => `${item.mileage.toLocaleString()} miles`, className: 'table-cell' },
        { header: 'Created At', type: 'date' as const ,accessor: 'created_at' as const, className: 'table-cell', sortable: true },
    ];

    const actions = [
        { name: 'View', accessor: (item: CarListingType) => (
            <Link href={`/car-listings/${item.id}`}>View</Link>
        )},
        { name: 'Delete', accessor: (item: CarListingType) => (
            <p onClick={() => console.log('Delete', item.id)}>Delete</p>
        )},
    ];

    const handleParamsChange = useCallback((newParams: Partial<CarListingsParams>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    }, []);

    const handleAddListing = (formData: any) => {
        console.log('Add Listing', formData);
    };

    useEffect(() => {
        document.title = 'Laravel - Listings';
    }, []);

    return (
        <>
            <Head>
                <title>Laravel - Profile</title>
            </Head>
            <DashboardBreadcrumb items={breadcrumbItems} />
            <CardLayout
                title={
                    <div className="flex justify-between items-center">
                        <h1>Car Listings</h1>
                        <AddCarListingDialog onAddListing={handleAddListing} />
                    </div>
                }
                description="Manage your car listings and view their details."
            >
                <DataTable
                    columns={columns}
                    actions={actions}
                    data={data?.data || []}
                    totalItems={data?.meta.total || 0}
                    currentPage={params.page}
                    itemsPerPage={params.perPage}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    onParamsChange={handleParamsChange}
                />
            </CardLayout>
        </>
    );
};

export default CarListings;