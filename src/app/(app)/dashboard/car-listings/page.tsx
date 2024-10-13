'use client';

import { useTranslations } from 'next-intl';
import AlertDialog from '@/components/layouts/alert-dialog';
import CardLayout from '@/components/layouts/card-layout';
import CarListingFormDialog from '@/components/layouts/dashboard/car-listings/car-listing-form-dialog';
import DashboardBreadcrumb from '@/components/layouts/dashboard-breadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import { CarListingsParams, getCarListings, useDeleteCarListing, useUpdateCarListingStatus } from '@/hooks/api/car-listings';
import { CarListingType } from '@/types/car-listing';
import { CircleDot, Eye, Trash2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { getAppName } from '@/lib/helpers';

const CarListings = () => {
    const { user } = useAuth({ requiredRole: ['admin', 'user'] });

    const t = useTranslations('Dashboard.CarListings');

    const breadcrumbItems = [
        { label: t('breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('breadcrumb.listings')}
    ];

    const [params, setParams] = useState<CarListingsParams>({
        page: 1,
        perPage: 10,
        sort: { key: 'created_at', direction: 'desc' } as { key: string; direction: 'asc' | 'desc' },
        filters: {} as Record<string, string>,
        include: ['primaryImage', 'images', 'features', 'user'],
    });

    const { data, isLoading, isError, error } = getCarListings(params);
    const deleteCarListingMutation = useDeleteCarListing();
    const deleteCarListing = (id: number) => async () => {
        await deleteCarListingMutation.mutateAsync(id);
    };

    const updateCarListingStatusMutation = useUpdateCarListingStatus();
    const updateCarListingStatus = (id: number, is_sold: 0 | 1) => async () => {
        await updateCarListingStatusMutation.mutateAsync({ id, is_sold });
    };

    const columns = [
        { header: '', type: 'image' as const, accessor: (item: CarListingType) => item.primary_image?.path, className: 'hidden md:table-cell md:w-1/12' },
        { header: t('columns.user'), accessor: (item: CarListingType)  => item.user?.name, className: 'table-cell', filterable: true, filterType: 'text' as const, filterParam: 'user.name' as const },
        { header: t('columns.title'), accessor: 'title' as const, sortable: true, filterable: true, filterType: 'text' as const, className: 'w-1/4' },
        { header: t('columns.year'), accessor: 'year' as const, sortable: true, filterable: true, filterType: 'number' as const },
        { header: t('columns.price'), type: 'currency' as const, accessor: 'price' as const, className: 'table-cell', sortable: true },
        { header: t('columns.isSold'), accessor: 'is_sold' as const, type: 'boolean' as const, className: 'table-cell' },
        { header: t('columns.mileage'), type: 'mileage' as const, accessor: 'mileage' as const, className: 'table-cell', sortable: true },
        { header: t('columns.createdAt'), type: 'date' as const, accessor: 'created_at' as const, className: 'table-cell', sortable: true },
    ];
    
    if (user?.role != 'admin') {
        columns.splice(1, 1);
    }

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
        { name: t('actions.isSold'), accessor: (item: CarListingType) => (
            <AlertDialog
                trigger={<CircleDot className="h-5 w-5 cursor-pointer text-yellow-500" />}
                description={t(item.is_sold ? 'isSoldConfirmation.description.toSold' : 'isSoldConfirmation.description.toNotSold')}
                cancelText={t('isSoldConfirmation.cancelText')}
                actionText={t('isSoldConfirmation.actionText')}
                onAction={updateCarListingStatus(item.id, item.is_sold ? 0 : 1)}
            />
        )}
    ];

    if (user?.role != 'admin') {
        // remove delete action
        actions.splice(2, 1);
    }

    const handleParamsChange = useCallback((newParams: Partial<CarListingsParams>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    }, []);

    useEffect(() => {
        document.title = getAppName() + ' - ' + t('pageTitle');
    }, [t]);

    return (
        <>
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
                    defaultSort={params.sort}
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