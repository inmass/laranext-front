'use client';

import { useTranslations } from 'next-intl';
import AlertDialog from '@/components/layouts/AlertDialog';
import CardLayout from '@/components/layouts/CardLayout';
import CarListingFormDialog from '@/components/layouts/dashboard/car-listings/car-listing-form-dialog';
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import { CarListingsParams, getCarListings, useDeleteCarListing } from '@/hooks/api/car-listings';
import { CarListingType } from '@/types/car-listing';
import { Eye, Trash2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';

const CarListings = () => {
    const t = useTranslations('Dashboard.CarListings');

    const breadcrumbItems = [
        { label: t('breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('breadcrumb.listings')}
    ];

    const [params, setParams] = useState<CarListingsParams>({
        page: 1,
        perPage: 10,
        sort: null as { key: string; direction: 'asc' | 'desc' } | null,
        filters: {} as Record<string, string>,
        include: ['primaryImage', 'images', 'features'],
    });

    const { data, isLoading, isError, error } = getCarListings(params);
    const deleteCarListingMutation = useDeleteCarListing();
    const deleteCarListing = (id: number) => async () => {
        await deleteCarListingMutation.mutateAsync(id);
    };

    const columns = [
        { header: '', type: 'image' as const, accessor: (item: CarListingType) => item.primary_image?.path, className: 'hidden md:table-cell md:w-1/12' },
        { header: t('columns.title'), accessor: 'title' as const, sortable: true, filterable: true, filterType: 'text' as const, className: 'w-1/4' },
        { header: t('columns.year'), accessor: 'year' as const, sortable: true, filterable: true, filterType: 'number' as const },
        { header: t('columns.price'), type: 'currency' as const, accessor: 'price' as const, className: 'table-cell', sortable: true },
        { header: t('columns.mileage'), type: 'mileage' as const, accessor: 'mileage' as const, className: 'table-cell', sortable: true },
        { header: t('columns.createdAt'), type: 'date' as const, accessor: 'created_at' as const, className: 'table-cell', sortable: true },
    ];

    const actions = [
        { name: t('actions.view'), accessor: (item: CarListingType) => (
            <Eye className="h-5 w-5 cursor-pointer text-blue-300" />
        )},
        { name: t('actions.edit'), accessor: (item: CarListingType) => (
                <CarListingFormDialog carListing={item} />
            )
        },
        { name: t('actions.delete'), accessor: (item: CarListingType) => (
            <AlertDialog
                trigger={
                    <Trash2 className="h-5 w-5 cursor-pointer text-red-500" />
                }
                title={t('deleteConfirmation.title')}
                description={t('deleteConfirmation.description')}
                cancelText={t('deleteConfirmation.cancelText')}
                actionText={t('deleteConfirmation.actionText')}
                onAction={deleteCarListing(item.id)}
            />
        )},
    ];

    const handleParamsChange = useCallback((newParams: Partial<CarListingsParams>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    }, []);

    useEffect(() => {
        document.title = t('pageTitle');
    }, [t]);

    return (
        <>
            <Head>
                <title>{t('pageTitle')}</title>
            </Head>
            <DashboardBreadcrumb items={breadcrumbItems} />
            <CardLayout
                title={
                    <div className="flex justify-between items-center">
                        <h1>{t('cardTitle')}</h1>
                        <CarListingFormDialog />
                    </div>
                }
                description={t('cardDescription')}
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