export interface GetRequestParams {
    page: number;
    perPage?: number;
    sort?: { key: string; direction: 'asc' | 'desc' } | null;
    filters?: Record<string, string>;
    include?: string[];
    fields?: string[];
    noPagination?: boolean;
}

export interface Pagination {
    current_page: number;
    from: number;
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}