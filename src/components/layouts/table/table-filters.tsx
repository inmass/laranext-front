import React from 'react';
import { Input } from '@/components/ui/input';
import { Column } from './interfaces';
import { X } from 'lucide-react';
        

interface TableFiltersProps<T> {
    columns: Column<T>[];
    filters: Record<string, string>;
    handleFilter: (key: string, value: string) => void;
    setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const TableFilters = <T,>({ columns, filters, handleFilter, setFilters }: TableFiltersProps<T>) => {

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
        </>
    );
}

export default TableFilters;