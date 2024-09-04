import React from 'react';
import { useFormContext } from 'react-hook-form';

const ReviewStep: React.FC = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Review Your Listing</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Make:</p>
          <p>{values.make_id}</p>
        </div>
        <div>
          <p className="font-medium">Model:</p>
          <p>{values.car_model_id}</p>
        </div>
        <div>
          <p className="font-medium">Body Style:</p>
          <p>{values.body_style_id}</p>
        </div>
        <div>
          <p className="font-medium">Condition:</p>
          <p>{values.condition_id}</p>
        </div>
        <div>
          <p className="font-medium">Title:</p>
          <p>{values.title}</p>
        </div>
        <div>
          <p className="font-medium">Price:</p>
          <p>${values.price}</p>
        </div>
        <div>
          <p className="font-medium">Year:</p>
          <p>{values.year}</p>
        </div>
        <div>
          <p className="font-medium">Mileage:</p>
          <p>{values.mileage} miles</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-4">Please review the information above. If everything looks correct, click 'Submit' to create your listing.</p>
    </div>
  );
};

export default ReviewStep;