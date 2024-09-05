export interface CarModelType {
    id: number;
    make_id: number;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    car_model?: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
    };
};