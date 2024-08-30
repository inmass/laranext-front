'use client';

import React from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableRow } from '@/components/layouts/data-table-row';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  type?: 'text' | 'number' | 'date' | 'image' | 'currency';
  className?: string;
}

interface ActionColumn<T> {
  name: string;
  accessor: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  description: string;
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
}: DataTableProps<T>) {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  function prevPage() {
    onPageChange(Math.max(currentPage - 1, 1));
  }

  function nextPage() {
    onPageChange(Math.min(currentPage + 1, totalPages));
  }

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
                  {column.header}
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <DataTableRow key={item.id} item={item} columns={columns} actions={actions} />
            ))}
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