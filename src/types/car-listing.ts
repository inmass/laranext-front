export interface CarListingType {
    id: number;
    user_id: number;
    make_id: number;
    car_model_id: number;
    body_style_id: number;
    condition_id: number;
    title: string;
    description: string;
    price: string;
    original_price: string | null;
    year: number;
    mileage: number;
    vin: string;
    exterior_color: string;
    interior_color: string;
    transmission: string;
    fuel_type: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    slug: string;
    primary_image?: {
        id: number;
        car_listing_id: number;
        path: string;
        is_primary: boolean;
        created_at: string;
        updated_at: string;
    };
    user?: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
        facebook_id: string | null;
        google_id: string | null;
        avatar: string;
    };
    car_model: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        make_id: number;
    };
    make: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
    };
    condition: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
    };
    features: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        feature_type_id: number;
        pivot: {
            taggable_type: string;
            taggable_id: number;
            feature_id: number;
            created_at: string;
            updated_at: string;
        };
    }[];
    images: {
        id: number;
        car_listing_id: number;
        path: string;
        is_primary: boolean;
        created_at: string;
        updated_at: string;
    }[];
}