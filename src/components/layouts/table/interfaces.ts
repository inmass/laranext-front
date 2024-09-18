export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    type?: 'text' | 'number' | 'date' | 'image' | 'currency' | 'mileage' | 'boolean';
    className?: string;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: 'text' | 'daterange' | 'number';
    filterParam?: string;
}

export interface ActionColumn<T> {
    name: string;
    accessor: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    columns: Column<T>[];
    actions?: ActionColumn<T>[];
    actionsAsDropdown?: boolean;
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

export interface DataTableRowProps<T> {
    item: T;
    columns: Column<T>[];
    actions?: ActionColumn<T>[];
    actionsAsDropdown?: boolean;
}