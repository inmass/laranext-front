import React, { useEffect, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CheckBox } from "@/components/ui/checkbox";
import { FeaturesParams, getFeatures } from "@/hooks/api/features";
import { GroupedFeatures, groupFeatures } from "@/lib/utils";
import { FeatureType } from "@/types/feature";
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';

const FeatureSelectionStep: React.FC = () => {
  const { control, formState: { errors, isValid } } = useFormContext<CarListingFormData>();

  const params: FeaturesParams = {
    page: 1,
    noPagination: true,
    include: ['featureType'],
    sort: { key: 'name', direction: 'asc' }
  };

  const { data: features, isLoading, error } = getFeatures(params);

  const groupedFeatures: GroupedFeatures = useMemo(() => {
    if (!features?.data) return {};
    return groupFeatures(features.data);
  }, [features]);

  if (isLoading) return <div>Loading features...</div>;
  if (error) return <div>Error loading features: {error.message}</div>;

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold">Select Features</h2>
      <Controller
        name="features"
        control={control}
        render={({ field }) => (
          <>
            {Object.entries(groupedFeatures).map(([typeId, { name, features }]) => (
              <div key={typeId} className="space-y-2">
                <h3 className="text-lg font-medium">{name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feature: FeatureType) => (
                    <CheckBox 
                      key={feature.id}
                      label={feature.name}
                      id={`feature-${feature.id}`}
                      checked={field.value?.includes(feature.id.toString())}
                      onChange={(e) => {
                        const updatedFeatures = e.target.checked
                          ? [...(field.value || []), feature.id.toString()]
                          : (field.value || []).filter((id: string) => id !== feature.id.toString());
                        field.onChange(updatedFeatures);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            {errors.features && (
              <p className="text-red-500 text-sm mt-2">{errors.features.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FeatureSelectionStep;