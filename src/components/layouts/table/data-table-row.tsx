import React from 'react';
import Image from 'next/image';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import ImageWithPreview from '@/components/ui/image-with-preview';

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

interface DataTableRowProps<T> {
  item: T;
  columns: Column<T>[];
  actions?: ActionColumn<T>[];
}

const renderCellContent = <T,>(content: any, type?: string): React.ReactNode => {
  if (content === null || content === undefined) {
    return '';
  }
  switch (type) {
    case 'date':
      return new Date(content).toLocaleDateString();
    case 'currency':
      return `$${parseFloat(content).toLocaleString()}`;
    case 'image':
      return <ImageWithPreview alt="Item image" className="aspect-square rounded-md object-cover" height={65} src={content} width={65} />;
    default:
      if (typeof content === 'object' && !React.isValidElement(content)) {
        return JSON.stringify(content);
      }
      return content;
  }
};

export const DataTableRow = <T,>({ item, columns, actions }: DataTableRowProps<T>) => {
  return (
    <TableRow>
      {columns.map((column, index) => {
        const cellContent = typeof column.accessor === 'function'
          ? column.accessor(item)
          : item[column.accessor as keyof T];

        return (
          <TableCell key={index} className={column.className}>
            {renderCellContent(cellContent, column.type)}
          </TableCell>
        );
      })}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {actions?.map((action, index) => (
              <DropdownMenuItem key={index}>
                {action.accessor(item)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};