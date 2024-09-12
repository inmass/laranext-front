'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from '@/components/ui/table';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { DataTableRow } from '@/components/layouts/table/data-table-row';
import ClipLoader from '@/components/clip-loader';
import { DataTableProps } from './interfaces';
import TableFilters from './table-filters';
import TableFooter from './table-footer';

export function DataTable<T>({
  columns,
  actions,
  actionsAsDropdown = false,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  isLoading,
  isError,
  error,
  onParamsChange,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleParamsChange = useCallback(() => {
    onParamsChange({ page, sort: sortKey, filters });
  }, [page, sortKey, filters, onParamsChange]);

  useEffect(() => {
    handleParamsChange();
  }, [handleParamsChange]);

  function prevPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function nextPage() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey && sortKey.key === key && sortKey.direction === 'asc') {
      direction = 'desc';
    } else if (sortKey && sortKey.key === key && sortKey.direction === 'desc') {
      key = '';
    }

    setSortKey(key ? { key, direction } : null);
  };

  const handleFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
      <>
        <TableFilters
          columns={columns}
          filters={filters}
          handleFilter={handleFilter}
          setFilters={setFilters}
        />
              
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  <div className="flex items-center font-bold">
                    {column.header}
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.accessor as string)}
                        className="ml-2 h-8 w-8 p-0"
                      >
                        {sortKey?.key === column.accessor ? (
                          sortKey.direction === 'asc' ? (
                            <ArrowUp className="h-4 w-4 text-primary" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-primary" />
                          )
                        ) : (
                          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  {error?.message}
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  <ClipLoader className='text-muted-foreground' />
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <DataTableRow key={(item as any).id} item={item} columns={columns} actions={actions} actionsAsDropdown={actionsAsDropdown} />
              ))
            )
            }
          </TableBody>
        </Table>

        <TableFooter
          currentPage={page}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </>
  );
}