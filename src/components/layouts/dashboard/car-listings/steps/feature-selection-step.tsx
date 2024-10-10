import React, { useEffect, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { CheckBox } from "@/components/ui/checkbox";
import { FeaturesParams, getFeatures } from "@/hooks/api/features";
import { GroupedFeatures, groupFeatures } from "@/lib/utils";
import { FeatureType } from "@/types/feature";
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';
import { useLookup } from '../context/lookup-context';
import { useTranslations } from 'next-intl';
import { translateFeature, translateFeatureType } from '@/lib/helpers';

const FeatureSelectionStep: React.FC = () => {
  const { control, formState: { errors, isValid } } = useFormContext<CarListingFormData>();
  const { addLookupData } = useLookup();
  const t = useTranslations('Dashboard.CarListings.Wizard.steps.FeatureSelectionStep');
  const tFeatureTypes = useTranslations('General.featureTypes');
  const tFeatures = useTranslations('General.features');

  const params: FeaturesParams = {
    page: 1,
    noPagination: true,
    include: ['featureType'],
    sort: { key: 'name', direction: 'asc' }
  };

  const { data: features, isLoading, error } = getFeatures(params);

  const { groupedFeatures, featureLookup } = useMemo(() => {
    if (!features?.data) return { groupedFeatures: {}, featureLookup: {} };

    const grouped = groupFeatures(features.data);
    const lookup: Record<string, string> = {};

    features.data.forEach((feature: FeatureType) => {
      lookup[feature.id.toString()] = feature.name;
    });

    return { groupedFeatures: grouped, featureLookup: lookup };
  }, [features]);

  useEffect(() => {
    if (featureLookup) {
      Object.entries(featureLookup).forEach(([id, name]) => {
        addLookupData('features', id, name);
      });
    }
  }, [featureLookup, addLookupData]);

  if (isLoading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error', { message: error.message })}</div>;

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold">{t('title')}</h2>
      <Controller
        name="features"
        control={control}
        render={({ field }) => (
          <>
            {Object.entries(groupedFeatures).map(([typeId, { name, features }]) => (
              <div key={typeId} className="space-y-2">
                <h3 className="text-lg font-medium">{translateFeatureType(name, tFeatureTypes)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feature: FeatureType) => (
                    <CheckBox 
                      key={feature.id}
                      label={translateFeature(feature.name, tFeatures)}
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