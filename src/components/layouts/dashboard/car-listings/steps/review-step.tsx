import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';
import { useLookup } from '../context/lookup-context';
import { asset } from '@/lib/helpers';

const ReviewStep: React.FC = () => {
  const t = useTranslations('Dashboard.CarListings.Wizard.steps.ReviewStep');
  const { getValues } = useFormContext<CarListingFormData>();
  const values = getValues();

  const { lookupData } = useLookup();

  const lookupFunctions = useMemo(() => ({
    getMakeName: (id: string) => lookupData.makes[id] || id,
    getModelName: (id: string) => lookupData.models[id] || id,
    getBodyStyleName: (id: string) => lookupData.bodyStyles[id] || id,
    getConditionName: (id: string) => lookupData.conditions[id] || id,
    getFeatureName: (id: string) => lookupData.features[id] || id,
  }), [lookupData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h1 className="text-lg font-bold mb-2">{t('basicInformation')}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">{t('make')}:</p>
              <p>{lookupFunctions.getMakeName(values.make_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('model')}:</p>
              <p>{lookupFunctions.getModelName(values.car_model_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('year')}:</p>
              <p>{values.year}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('title')}:</p>
              <p>{values.title}</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">{t('vehicleDetails')}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">{t('bodyStyle')}:</p>
              <p>{lookupFunctions.getBodyStyleName(values.body_style_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('condition')}:</p>
              <p>{lookupFunctions.getConditionName(values.condition_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('mileage')}:</p>
              <p>{t('mileageValue', { value: values.mileage.toLocaleString() })}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('transmission')}:</p>
              <p>{values.transmission}</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">{t('features')}</h4>
          <ul className="list-disc list-inside">
            {values.features.map((feature, index) => (
              <li key={index}>{lookupFunctions.getFeatureName(feature)}</li>  
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">{t('appearance')}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">{t('exteriorColor')}:</p>
              <div className="flex items-center">
                <div className="w-12 h-6 rounded-full mr-2 p-2 border-2 border-muted" style={{ backgroundColor: values.exterior_color }}></div>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-500">{t('interiorColor')}:</p>
              <div className="flex items-center">
                <div className="w-12 h-6 rounded-full mr-2 p-2 border-2 border-muted" style={{ backgroundColor: values.interior_color }}></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">{t('pricing')}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">{t('price')}:</p>
              <p>{formatCurrency(values.price)}</p>
            </div>
            {values.original_price ? (
              <div>
                <p className="font-medium text-gray-500">{t('originalPrice')}:</p>
                <p>{formatCurrency(values.original_price)}</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <section>
        <h4 className="text-lg font-bold mb-2">{t('description')}</h4>
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: values.description }}></div>
      </section>

      <section>
        <h4 className="text-lg font-bold mb-2">{t('images')}</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {values.images.map((img, index) => (
            <div key={index} className="relative">
              <Image src={asset(img.image)} alt={t('carImageAlt', { index: index + 1 })} width={200} height={150} className="object-cover rounded" />
              {img.is_primary && (
                <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br rounded-tl"><Star size={16} /></span>
              )}
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-gray-500 mt-4">
        {t('reviewInstructions')}
      </p>
    </div>
  );
};

export default ReviewStep;