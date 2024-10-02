import { Input } from '@/components/ui/input';
import { CarListingsParams } from '@/hooks/api/car-listings';
import { cn } from '@/lib/utils';
import { RefreshCcw, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
// import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { CheckBox } from "@/components/ui/checkbox";
import MakeSelect from '@/components/dynamic/make-select';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import ConditionSelect from '@/components/dynamic/condition-select';
import { useTranslations } from 'next-intl';
import { FuelTypes, TransmissionTypes } from '@/constants/constants';

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
    setParams({ ...params, filters: {} });
    setTransmissionFilters([]);
    setFuelTypeFilters([]);
    // setParams({ ...params, filters: { ...params.filters, make_id: '', body_style_id: '', condition_id: '', price_gte: '', price_lte: '', transmission: '', fuel_type: '' } });
  };

  const handleMakeChange = (value: string) => {

    console.log(value, 'changed');
    setParams({ ...params, filters: { ...params.filters, make_id: value } });
  };

  const handleBodyStyleChange = (value: string) => {
    setParams({ ...params, filters: { ...params.filters, body_style_id: value } });
  };

  const handleConditionChange = (value: string) => {
    setParams({ ...params, filters: { ...params.filters, condition_id: value } });
  };

  const handlePriceChange = (value: number[]) => {
    setParams({ ...params, filters: { ...params.filters, price_gte: value[0].toString(), price_lte: value[1].toString() } });
  };

  const handleTransmissionChange = (values: string[]) => {
    setParams({ ...params, filters: { ...params.filters, transmission: transmissionFilters.join(',') } });
  };

  const handleFuelTypeChange = (values: string[]) => {
    setParams({ ...params, filters: { ...params.filters, fuel_type: fuelTypeFilters.join(',') } });
  };

  useEffect(() => {
    if (transmissionFilters.length > 0) {
      handleTransmissionChange(transmissionFilters);
    }
  }, [transmissionFilters]);

  useEffect(() => {
    if (fuelTypeFilters.length > 0) {
      handleFuelTypeChange(fuelTypeFilters);
    }
  }, [fuelTypeFilters]);

  return (
    <div className={cn(
        "hidden md:block",
        // only border bottom and right
        "bg-card p-10 border-r border-border",
        className
    )}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">{t('title')}</h2>
        <Button variant="ghost" className='p-0' onClick={handleReset}>
          <RefreshCcw className='h-5 w-5' />
        </Button>
      </div>
      
      <div className="mb-6 relative">
        <Input 
          placeholder={t('search')} 
          value={params.filters?.title || ''}
          onChange={(e) => setParams({ ...params, filters: { ...params.filters, title: e.target.value } })}
        />
        <Button variant="ghost" className="text-gray-400 absolute inset-y-0 right-0 flex items-center pr-2 hover:bg-transparent">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-2">{t('make')}</h3>
          <MakeSelect
            value={params.filters?.make_id || ''}
            onChange={handleMakeChange}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">{t('bodyStyle')}</h3>
          <BodyStyleSelect
            value={params.filters?.body_style_id || ''}
            onChange={handleBodyStyleChange}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">{t('condition')}</h3>
          <ConditionSelect
            value={params.filters?.condition_id || ''}
            onChange={handleConditionChange}
          />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">{t('price')}</h3>
          {/* <Slider
            min={0}
            max={100000}
            step={1000}
            value={[params.filters?.price_min || 0, params.filters?.price_max || 100000]}
            onValueChange={handlePriceChange}
          /> */}
          <input type="range" min="0" max="100000" step="1000" value={params.filters?.price_min || 0} onChange={(e) => handlePriceChange([e.target.valueAsNumber, Number(params.filters?.price_max || 100000)])} />
          <div className="flex justify-between text-xs mt-2">
            <span>{t('priceRange', { min: params.filters?.price_min || 0, max: params.filters?.price_max || 100000 })}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">{t('transmission')}</h3>
          <div className="space-y-2">
            {TransmissionTypes.map((type) => (
              <>
                <CheckBox
                    key={type}
                    checked={transmissionFilters.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTransmissionFilters([...transmissionFilters, type]);
                      } else {
                        setTransmissionFilters(transmissionFilters.filter((t) => t !== type));
                      }
                    }}
                    label={t(`transmissionTypes.${type}`)}
                />
                <br/>
              </>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">{t('fuelType')}</h3>
          <div className="space-y-2">
            {FuelTypes.map((type) => (
              <>
                <CheckBox
                  key={type}
                  checked={fuelTypeFilters.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFuelTypeFilters([...fuelTypeFilters, type]);
                    } else {
                      setFuelTypeFilters(fuelTypeFilters.filter((t) => t !== type));
                    }
                  }}
                  label={t(`fuelTypes.${type}`)}
                />
                <br/>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;