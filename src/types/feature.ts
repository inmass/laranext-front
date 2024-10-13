export interface FeatureType {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  feature_type_id: number;
  feature_type?: {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
  };
}
