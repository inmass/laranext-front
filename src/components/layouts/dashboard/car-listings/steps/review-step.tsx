import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';
import Image from 'next/image';
import { useLookup } from '../context/lookup-context';
import { Star } from 'lucide-react';
import { asset } from '@/lib/helpers';

const ReviewStep: React.FC = () => {
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
      {/* <h3 className="text-2xl font-semibold">Review Your Listing</h3> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h1 className="text-lg font-bold mb-2">Basic Information</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">Make:</p>
              <p>{lookupFunctions.getMakeName(values.make_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Model:</p>
              <p>{lookupFunctions.getModelName(values.car_model_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Year:</p>
              <p>{values.year}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Title:</p>
              <p>{values.title}</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">Vehicle Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">Body Style:</p>
              <p>{lookupFunctions.getBodyStyleName(values.body_style_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Condition:</p>
              <p>{lookupFunctions.getConditionName(values.condition_id)}</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Mileage:</p>
              <p>{values.mileage.toLocaleString()} miles</p>
            </div>
            <div>
              <p className="font-medium text-gray-500">Transmission:</p>
              <p>{values.transmission}</p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">Features</h4>
          <ul className="list-disc list-inside">
            {values.features.map((feature, index) => (
              <li key={index}>{lookupFunctions.getFeatureName(feature)}</li>  
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">Appearance</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">Exterior Color:</p>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: values.exterior_color }}></div>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-500">Interior Color:</p>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: values.interior_color }}></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold mb-2">Pricing</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-500">Price:</p>
              <p>{formatCurrency(values.price)}</p>
            </div>
            {values.original_price ? (
              <div>
                <p className="font-medium text-gray-500">Original Price:</p>
                <p>{formatCurrency(values.original_price)}</p>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <section>
        <h4 className="text-lg font-bold mb-2">Description</h4>
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: values.description }}></div>
      </section>

      <section>
        <h4 className="text-lg font-bold mb-2">Images</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {values.images.map((img, index) => (
            <div key={index} className="relative">
              <Image src={asset(img.image)} alt={`Car image ${index + 1}`} width={200} height={150} className="object-cover rounded" />
              {img.is_primary && (
                <span className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-br rounded-tl"><Star size={16} /></span>
              )}
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-gray-500 mt-4">
        Please review all the information above carefully. If everything looks correct, you can proceed to submit your listing.
        If you need to make any changes, you can go back to the previous steps.
      </p>
    </div>
  );
};

export default ReviewStep;