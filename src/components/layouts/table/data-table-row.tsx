import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import ImageWithPreview from '@/components/ui/image-with-preview';
import { useTranslations } from 'next-intl';
import { DataTableRowProps } from './interfaces';

const renderCellContent = <T,>(content: any, type?: string): React.ReactNode => {
  const t = useTranslations();

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
    case 'mileage':
      return `${parseFloat(content).toLocaleString()} ${t('General.table.km')}`;
    case 'boolean':
      return content ?
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Yes</span> :
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">No</span>;
    default:
      if (typeof content === 'object' && !React.isValidElement(content)) {
        return JSON.stringify(content);
      }
      return content;
  }
};

export const DataTableRow = <T,>({ item, columns, actions, actionsAsDropdown = false }: DataTableRowProps<T>) => {
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
        {
          actionsAsDropdown ? (
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
          ) : (
            <div className="flex items-center space-x-2">
              {actions?.map((action, index) => (
                <span key={index}>
                  {action.accessor(item)}
                </span>
              ))}
            </div>
          ) 
        }
      </TableCell>
    </TableRow>
  );
};