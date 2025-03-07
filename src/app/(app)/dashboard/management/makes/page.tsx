'use client';

import { useTranslations } from 'next-intl';
import AlertDialog from '@/components/layouts/alert-dialog';
import CardLayout from '@/components/layouts/card-layout';
import MakeFormDialog from '@/components/layouts/dashboard/makes/make-form-dialog';
import DashboardBreadcrumb from '@/components/layouts/dashboard-breadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import { MakesParams, getMakes, useDeleteMake } from '@/hooks/api/makes';
import { MakeType } from '@/types/make';
import { Eye, Trash2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { getAppName } from '@/lib/helpers';

const Makes = () => {
  const t = useTranslations('Dashboard.Makes');

  const breadcrumbItems = [
    { label: t('breadcrumb.dashboard'), href: '/dashboard' },
    { label: t('breadcrumb.makes') },
  ];

  const [params, setParams] = useState<MakesParams>({
    page: 1,
    perPage: 10,
    sort: null,
    filters: {},
  });

  const { data, isLoading, isError, error } = getMakes(params);

  const deleteMakeMutation = useDeleteMake();
  const deleteMake = (id: number) => async () => {
    await deleteMakeMutation.mutateAsync(id);
  };

  const columns = [
    {
      header: t('columns.name'),
      accessor: 'name' as const,
      sortable: true,
      filterable: true,
      filterType: 'text' as const,
      className: 'table-cell',
    },
    { header: t('columns.slug'), accessor: 'slug' as const },
    {
      header: t('columns.hasCarModels'),
      accessor: 'has_car_models' as const,
      type: 'boolean' as const,
    },
    {
      header: t('columns.createdAt'),
      type: 'date' as const,
      accessor: 'created_at' as const,
      className: 'table-cell',
      sortable: true,
    },
    {
      header: t('columns.updatedAt'),
      type: 'date' as const,
      accessor: 'updated_at' as const,
      className: 'table-cell',
      sortable: true,
    },
  ];

  const actions = [
    {
      name: t('actions.edit'),
      accessor: (item: MakeType) => <MakeFormDialog make={item} />,
    },
    {
      name: t('actions.delete'),
      accessor: (item: MakeType) => (
        <AlertDialog
          trigger={<Trash2 className="h-5 w-5 cursor-pointer text-red-500" />}
          title={t('deleteConfirmation.title')}
          description={t('deleteConfirmation.description')}
          cancelText={t('deleteConfirmation.cancelText')}
          actionText={t('deleteConfirmation.actionText')}
          onAction={deleteMake(item.id)}
        />
      ),
    },
  ];

  const handleParamsChange = useCallback((newParams: Partial<MakesParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
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
            <MakeFormDialog />
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

export default Makes;
