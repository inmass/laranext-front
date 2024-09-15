'use client';

import AlertDialog from '@/components/layouts/AlertDialog';
import CardLayout from '@/components/layouts/CardLayout';
import CarListingFormDialog from '@/components/layouts/dashboard/car-listings/car-listing-form-dialog';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import { CarListingsParams, getCarListings, useDeleteCarListing } from '@/hooks/api/car-listings';
import { CarListingType } from '@/types/car-listing';
import { Eye, Trash2 } from 'lucide-react';
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
        include: ['primaryImage', 'images', 'features'], // we include images and features for the edit form
    });

    const { data, isLoading, isError, error } = getCarListings(params);
    const deleteCarListingMutation = useDeleteCarListing();
    const deleteCarListing = (id: number) => async () => {
        await deleteCarListingMutation.mutateAsync(id);
    };

    const columns = [
        { header: '', type: 'image' as const, accessor: (item: CarListingType) => item.primary_image?.path, className: 'hidden md:table-cell md:w-1/12' },
        { header: 'Title', accessor: 'title' as const, sortable: true, filterable: true, filterType: 'text' as const, className: 'w-1/4' },
        { header: 'Year', accessor: 'year' as const, sortable: true, filterable: true, filterType: 'number' as const },
        { header: 'Price', type: 'currency' as const,accessor: 'price' as const, className: 'table-cell', sortable: true },
        { header: 'Mileage', accessor: (item: CarListingType) => `${item.mileage.toLocaleString()} miles`, className: 'table-cell' },
        { header: 'Created At', type: 'date' as const ,accessor: 'created_at' as const, className: 'table-cell', sortable: true },
    ];

    const actions = [
        { name: 'View', accessor: (item: CarListingType) => (
            <Eye className="h-5 w-5 cursor-pointer text-blue-300" />
        )},
        { name: 'Edit', accessor: (item: CarListingType) => (
                <CarListingFormDialog carListing={item} />
            )
        },
        { name: 'Delete', accessor: (item: CarListingType) => (
            <AlertDialog
                trigger={
                    <Trash2 className="h-5 w-5 cursor-pointer text-red-500" />
                }
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete the car listing."
                cancelText="Cancel"
                actionText="Yes, delete listing"
                onAction={deleteCarListing(item.id)}
            />
        )},
    ];

    const handleParamsChange = useCallback((newParams: Partial<CarListingsParams>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    }, []);

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
                        <CarListingFormDialog />
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
                    itemsPerPage={params.perPage || 10}
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