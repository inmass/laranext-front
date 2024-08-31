'use client';

import Button from '@/components/Button';
import CardLayout from '@/components/layouts/CardLayout';
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
    const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const perPage = 10;

    const { data, isLoading, isError, error, refetch } = useCarListings(page, perPage, sort, filters);

    const columns = [
        { header: 'Title', accessor: 'title' as const, sortable: true, filterable: true },
        { header: 'Year', accessor: 'year' as const, sortable: true, filterable: true },
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

    const handleSortChange = (sortKey: string, sortDirection: 'asc' | 'desc') => {
        // setSort({ key: sortKey, direction: sortDirection });
        setSort(sortKey ? { key: sortKey, direction: sortDirection } : null);
        setPage(1);
        refetch();
      };
    
    const handleFilterChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
        setPage(1);
        refetch();
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        refetch();
    };
    
    useEffect(() => {
        document.title = 'Laravel - Profile';
    }, []);

    return (
        <>
            <Head>
                <title>Laravel - Profile</title>
            </Head>
            <DashboardBreadcrumb items={breadcrumbItems} />
            <CardLayout
                title="Car Listings"
                description="Manage your car listings and view their details."
            >
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold"></h1>
                <Link href="/dashboard/listings/create">
                    <Button>Create Listing</Button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                actions={actions}
                data={data?.data || []}
                totalItems={data?.meta.total || 0}
                currentPage={page}
                itemsPerPage={perPage}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
            />
            </CardLayout>
            
        </>
    );
};

export default Dashboard;
