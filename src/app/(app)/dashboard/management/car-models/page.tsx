'use client';

import { useTranslations } from 'next-intl';
import AlertDialog from '@/components/layouts/AlertDialog';
import CardLayout from '@/components/layouts/CardLayout';
import CarModelFormDialog from '@/components/layouts/dashboard/car-models/car-models-form-dialog'
import DashboardBreadcrumb from '@/components/layouts/DashboardBreadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import { CarModelsParams, getCarModels, useDeleteCarModel } from '@/hooks/api/car-models'
import { CarModelType } from '@/types/car-model';
import { Eye, Trash2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { getAppName } from '@/lib/helpers';

const CarModels = () => {
    const t = useTranslations('Dashboard.CarModels');

    const breadcrumbItems = [
        { label: t('breadcrumb.dashboard'), href: '/dashboard' },
        { label: t('breadcrumb.carModels')}
    ];

    const [params, setParams] = useState<CarModelsParams>({
        page: 1,
        perPage: 10,
        sort: null,
        filters: {},
        include: ['make'],
    });

    const { data, isLoading, isError, error } = getCarModels(params);

    const deleteCarModelMutation = useDeleteCarModel();
    const deleteCarModel = (id: number) => async () => {
        await deleteCarModelMutation.mutateAsync(id);
    };

    const columns = [
        { header: t('columns.name'), accessor: 'name' as const, sortable: true, filterable: true, filterType: 'text' as const, className: 'table-cell' },
        { header: t('columns.slug'), accessor: 'slug' as const },
        { header: t('columns.make'), accessor: (item: CarModelType) => item.make?.name, filterable: true, filterType: 'text' as const, filterParam: 'make.name' as const },
        { header: t('columns.createdAt'), type: 'date' as const, accessor: 'created_at' as const, className: 'table-cell', sortable: true },
        { header: t('columns.updatedAt'), type: 'date' as const, accessor: 'updated_at' as const, className: 'table-cell', sortable: true },
    ];

    const actions = [
        { name: t('actions.edit'), accessor: (item: CarModelType) => (
                <CarModelFormDialog carModel={item} />
            )
        },
        { name: t('actions.delete'), accessor: (item: CarModelType) => (
            <AlertDialog
                trigger={
                    <Trash2 className="h-5 w-5 cursor-pointer text-red-500" />
                }
                title={t('deleteConfirmation.title')}
                description={t('deleteConfirmation.description')}
                cancelText={t('deleteConfirmation.cancelText')}
                actionText={t('deleteConfirmation.actionText')}
                onAction={deleteCarModel(item.id)}
            />
        )},
    ];

    const handleParamsChange = useCallback((newParams: Partial<CarModelsParams>) => {
        setParams(prev => ({ ...prev, ...newParams }));
    }, []);

    useEffect(() => {
        document.title = getAppName() + ' - ' + t('pageTitle');
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
                        <CarModelFormDialog />
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

export default CarModels;