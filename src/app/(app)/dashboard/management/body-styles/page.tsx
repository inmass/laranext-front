'use client';

import { useTranslations } from 'next-intl';
import AlertDialog from '@/components/layouts/alert-dialog';
import CardLayout from '@/components/layouts/card-layout';
import BodyStyleFormDialog from '@/components/layouts/dashboard/body-styles/body-style-form-dialog';
import DashboardBreadcrumb from '@/components/layouts/dashboard-breadcrumb';
import { DataTable } from '@/components/layouts/table/data-table';
import {
  BodyStylesParams,
  getBodyStyles,
  useDeleteBodyStyle,
} from '@/hooks/api/body-styles';
import { BodyStyleType } from '@/types/body-style';
import { Eye, Trash2 } from 'lucide-react';
import Head from 'next/head';
import { useEffect, useState, useCallback } from 'react';
import { getAppName } from '@/lib/helpers';

const BodyStyles = () => {
  const t = useTranslations('Dashboard.BodyStyles');

  const breadcrumbItems = [
    { label: t('breadcrumb.dashboard'), href: '/dashboard' },
    { label: t('breadcrumb.bodyStyles') },
  ];

  const [params, setParams] = useState<BodyStylesParams>({
    page: 1,
    perPage: 10,
    sort: null,
    filters: {},
  });

  const { data, isLoading, isError, error } = getBodyStyles(params);

  const deleteBodyStyleMutation = useDeleteBodyStyle();
  const deleteBodyStyle = (id: number) => async () => {
    await deleteBodyStyleMutation.mutateAsync(id);
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
      accessor: (item: BodyStyleType) => (
        <BodyStyleFormDialog bodyStyle={item} />
      ),
    },
    {
      name: t('actions.delete'),
      accessor: (item: BodyStyleType) => (
        <AlertDialog
          trigger={<Trash2 className="h-5 w-5 cursor-pointer text-red-500" />}
          title={t('deleteConfirmation.title')}
          description={t('deleteConfirmation.description')}
          cancelText={t('deleteConfirmation.cancelText')}
          actionText={t('deleteConfirmation.actionText')}
          onAction={deleteBodyStyle(item.id)}
        />
      ),
    },
  ];

  const handleParamsChange = useCallback(
    (newParams: Partial<BodyStylesParams>) => {
      setParams((prev) => ({ ...prev, ...newParams }));
    },
    []
  );

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
            <BodyStyleFormDialog />
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

export default BodyStyles;
