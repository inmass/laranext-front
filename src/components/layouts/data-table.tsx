'use client';

import React, { useState } from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowBigDown, ArrowUp, ArrowDown } from 'lucide-react';
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
}

interface ActionColumn<T> {
  name: string;
  accessor: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title?: string;
  description?: string;
  columns: Column<T>[];
  actions?: ActionColumn<T>[];
  data: T[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
  onSortChange: (sortKey: string, sortDirection: 'asc' | 'desc') => void;
  onFilterChange: (filters: Record<string, string>) => void;
}

export function DataTable<T>({
  title,
  description,
  columns,
  actions,
  data,
  totalItems,
  currentPage,
  itemsPerPage,
  isLoading,
  isError,
  error,
  onPageChange,
  onSortChange,
  onFilterChange,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  if (isError) return <div>Error: {error?.message}</div>;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function prevPage() {
    onPageChange(Math.max(currentPage - 1, 1));
  }

  function nextPage() {
    onPageChange(Math.min(currentPage + 1, totalPages));
  }

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey && sortKey.key === key && sortKey.direction === 'asc') {
      direction = 'desc';
    } else if (sortKey && sortKey.key === key && sortKey.direction === 'desc') {
      key = '';
    }

    setSortKey(key ? { key, direction } : null);
    onSortChange(key, direction);
  };

  const handleFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
                  {column.filterable && (
                    <Input
                      placeholder={`Filter ${column.header}`}
                      onChange={(e) => handleFilter(column.accessor as string, e.target.value)}
                      value={filters[column.accessor as string] || ''}
                      className="mt-2"
                    />
                  )}
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
      </CardContent>
      <CardFooter>
        <div className="flex items-center w-full justify-between">
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
      </CardFooter>
    </Card>
  );
}