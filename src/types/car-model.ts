export interface CarModelType {
    id: number;
    make_id: number;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    make?: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
    };
};