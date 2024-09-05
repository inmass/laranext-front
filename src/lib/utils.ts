import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// features
import { FeatureType } from '@/types/feature';

export interface GroupedFeatures {
  [key: number]: {
    name: string;
    features: FeatureType[];
  };
}

export const groupFeatures = (features: FeatureType[]): GroupedFeatures => {
  return features.reduce((acc, feature) => {
    const typeId = feature.feature_type_id;
    if (!acc[typeId] && feature.feature_type) {
      acc[typeId] = {
        name: feature.feature_type.name,
        features: []
      };
    }
    acc[typeId].features.push(feature);
    return acc;
  }, {} as GroupedFeatures);
};