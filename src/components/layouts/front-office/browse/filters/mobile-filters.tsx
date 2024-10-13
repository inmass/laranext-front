import { Input } from '@/components/ui/input';
import { CarListingsParams } from '@/hooks/api/car-listings';
import { cn } from '@/lib/utils';
import { Filter, RefreshCcw, Search } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckBox } from '@/components/ui/checkbox';
import MakeSelect from '@/components/dynamic/make-select';
import BodyStyleSelect from '@/components/dynamic/body-style-select';
import ConditionSelect from '@/components/dynamic/condition-select';
import { useTranslations } from 'next-intl';
import { FuelTypes, TransmissionTypes } from '@/constants/constants';
import Slider from '@/components/ui/slider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileFilterProps {
  params: CarListingsParams;
  setParams: (params: CarListingsParams) => void;
  handleReset: () => void;
  handleMakeChange: (value: string) => void;
  handleBodyStyleChange: (value: string) => void;
  handleConditionChange: (value: string) => void;
  handlePriceChange: (value: number[]) => void;
  transmissionFilters: string[];
  handleTransmissionChange: (type: string, checked: boolean) => void;
  fuelTypeFilters: string[];
  handleFuelTypeChange: (type: string, checked: boolean) => void;
  className?: string;
}

const MobileFilters: React.FC<MobileFilterProps> = ({
  params,
  setParams,
  handleReset,
  handleMakeChange,
  handleBodyStyleChange,
  handleConditionChange,
  handlePriceChange,
  transmissionFilters,
  handleTransmissionChange,
  fuelTypeFilters,
  handleFuelTypeChange,
  className,
}) => {
  const t = useTranslations('FrontOffice.CarListings.Filters');
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex justify-between items-center p-4">
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className=" bg-muted hover:bg-muted/80 border border-input rounded-md"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <div className="relative w-[200px]">
            <Input
              placeholder={t('search')}
              value={params.filters?.title || ''}
              onChange={(e) =>
                setParams({
                  ...params,
                  filters: { ...params.filters, title: e.target.value },
                  page: 1,
                })
              }
            />
            <Button
              variant="ghost"
              className="text-gray-400 absolute inset-y-0 right-0 flex items-center pr-2 hover:bg-transparent"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <SheetContent side="left" className="w-[300px] sm:w-[400px] pt-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">{t('title')}</h2>
            <Button
              variant="ghost"
              className="p-0 text-gray-400 hover:bg-transparent"
              onClick={handleReset}
            >
              <RefreshCcw className="h-5 w-5" />
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
              <Slider
                min={0}
                max={100000}
                step={10000}
                value={[
                  Number(params.filters?.price_gte || 0),
                  Number(params.filters?.price_lte || 100000),
                ]}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-xs mt-2">
                <span>
                  {t('priceRange', {
                    min: params.filters?.price_gte || 0,
                    max: params.filters?.price_lte || 100000,
                  })}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                {t('transmission')}
              </h3>
              <div className="space-y-2">
                {TransmissionTypes.map((type) => (
                  <React.Fragment key={type}>
                    <CheckBox
                      checked={transmissionFilters.includes(type)}
                      onChange={(e) =>
                        handleTransmissionChange(type, e.target.checked)
                      }
                      label={t(`transmissionTypes.${type}`)}
                    />
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">{t('fuelType')}</h3>
              <div className="space-y-2">
                {FuelTypes.map((type) => (
                  <React.Fragment key={type}>
                    <CheckBox
                      checked={fuelTypeFilters.includes(type)}
                      onChange={(e) =>
                        handleFuelTypeChange(type, e.target.checked)
                      }
                      label={t(`fuelTypes.${type}`)}
                    />
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;
