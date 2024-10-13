import { CarListingsParams } from '@/hooks/api/car-listings';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import DesktopFilters from '@/components/layouts/front-office/browse/filters/desktop-filters';
import MobileFilters from './mobile-filters';

interface FilterProps {
  params: CarListingsParams;
  setParams: (params: CarListingsParams) => void;
  className?: string;
}

const Filters: React.FC<FilterProps> = ({ params, setParams, className }) => {
  const t = useTranslations('FrontOffice.CarListings.Filters');
  const [transmissionFilters, setTransmissionFilters] = useState<string[]>([]);
  const [fuelTypeFilters, setFuelTypeFilters] = useState<string[]>([]);

  const handleReset = () => {
    setParams({ ...params, filters: {}, page: 1 });
    setTransmissionFilters([]);
    setFuelTypeFilters([]);
  };

  const handleMakeChange = (value: string) => {
    setParams({
      ...params,
      filters: { ...params.filters, make_id: value },
      page: 1,
    });
  };

  const handleBodyStyleChange = (value: string) => {
    setParams({
      ...params,
      filters: { ...params.filters, body_style_id: value },
      page: 1,
    });
  };

  const handleConditionChange = (value: string) => {
    setParams({
      ...params,
      filters: { ...params.filters, condition_id: value },
      page: 1,
    });
  };

  const handlePriceChange = (value: number[]) => {
    setParams({
      ...params,
      filters: {
        ...params.filters,
        price_gte: value[0].toString(),
        price_lte: value[1].toString(),
      },
      page: 1,
    });
  };

  const handleTransmissionChange = (type: string, checked: boolean) => {
    const updatedFilters = checked
      ? [...transmissionFilters, type]
      : transmissionFilters.filter((t) => t !== type);
    setTransmissionFilters(updatedFilters);
    setParams({
      ...params,
      filters: { ...params.filters, transmission: updatedFilters.join(',') },
      page: 1,
    });
  };

  const handleFuelTypeChange = (type: string, checked: boolean) => {
    const updatedFilters = checked
      ? [...fuelTypeFilters, type]
      : fuelTypeFilters.filter((t) => t !== type);
    setFuelTypeFilters(updatedFilters);
    setParams({
      ...params,
      filters: { ...params.filters, fuel_type: updatedFilters.join(',') },
      page: 1,
    });
  };

  return (
    <>
      <DesktopFilters
        handleReset={handleReset}
        handleMakeChange={handleMakeChange}
        handleBodyStyleChange={handleBodyStyleChange}
        handleConditionChange={handleConditionChange}
        handlePriceChange={handlePriceChange}
        transmissionFilters={transmissionFilters}
        handleTransmissionChange={handleTransmissionChange}
        fuelTypeFilters={fuelTypeFilters}
        handleFuelTypeChange={handleFuelTypeChange}
        params={params}
        setParams={setParams}
        className={className}
      />
      <MobileFilters
        handleReset={handleReset}
        handleMakeChange={handleMakeChange}
        handleBodyStyleChange={handleBodyStyleChange}
        handleConditionChange={handleConditionChange}
        handlePriceChange={handlePriceChange}
        transmissionFilters={transmissionFilters}
        handleTransmissionChange={handleTransmissionChange}
        fuelTypeFilters={fuelTypeFilters}
        handleFuelTypeChange={handleFuelTypeChange}
        params={params}
        setParams={setParams}
        className={className}
      />
    </>
  );
};

export default Filters;
