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
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableRow } from '@/components/layouts/data-table-row';
import ClipLoader from '@/components/clip-loader';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  type?: 'text' | 'number' | 'date' | 'image' | 'currency';
  className?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'daterange' | 'number';
}

interface ActionColumn<T> {
  name: string;
  accessor: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  actions?: ActionColumn<T>[];
  data: T[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onParamsChange: (params: {
    page: number;
    sort: { key: string; direction: 'asc' | 'desc' } | null;
    filters: Record<string, string>;
  }) => void;
}

export function DataTable<T>({
  columns,
  actions,
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

  const clearFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const renderFilterInput = (column: Column<T>) => {
    const accessor = column.accessor as string;
    
    switch (column.filterType) {
      case 'number':
        return (
          <Input
            type="number"
            placeholder={`Filter by ${column.header}`}
            onChange={(e) => handleFilter(accessor, e.target.value)}
            value={filters[accessor] || ''}
            className="w-40"
          />
        );
      case 'text':
      default:
        return (
          <Input
            type="text"
            placeholder={`Filter by ${column.header}`}
            onChange={(e) => handleFilter(accessor, e.target.value)}
            value={filters[accessor] || ''}
            className="w-40"
          />
        );
    }
  };

  return (
      <>
        <div className="flex flex-wrap gap-4 mb-4">
          {columns.map((column, index) => 
            column.filterable && (
              <div key={index} className="flex items-center">
                {renderFilterInput(column)}
                {filters[column.accessor as string] && (
                  <button
                    onClick={() => clearFilter(column.accessor as string)}
                    className="ml-2 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )
          )}
        </div>
              
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  <div className="flex items-center">
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
            {isError && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  {error?.message}
                </TableCell>
              </TableRow>
            )}
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="text-center">
                  <ClipLoader className='text-muted-foreground' />
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <DataTableRow key={(item as any).id} item={item} columns={columns} actions={actions} />
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center w-full justify-between mt-4">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)}
            </strong>{' '}
            of <strong>{totalItems}</strong> items
          </div>
          <div className="flex">
            <Button
              onClick={prevPage}
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              onClick={nextPage}
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
  );
}