import {
  CarListingsParams,
  CarListingsResponse,
} from '@/hooks/api/car-listings';
import { cn } from '@/lib/utils';
import TableFooter from '@/components/layouts/table/table-footer';
import { useTranslations } from 'next-intl';
import CarListingCard from './car-listing-card';

interface CarListingsListProps {
  data?: CarListingsResponse;
  params: CarListingsParams;
  setParams: (params: CarListingsParams) => void;
  className?: string;
}

const CarListingsList = ({
  data,
  params,
  setParams,
  className,
}: CarListingsListProps) => {
  const carListings = data?.data;
  const t = useTranslations('FrontOffice.CarListings');
  // const t = (key: string) => key;

  return (
    <div className={cn('p-4 md:pl-8 pt-16 pb-40', className)}>
      <h2 className="text-3xl font-bold mb-4">{t('carListings')}</h2>
      <div
        className={cn(
          'products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12'
        )}
      >
        {carListings && carListings.length > 0 ? (
          carListings.map((carListing) => (
            <CarListingCard key={carListing.id} carListing={carListing} />
          ))
        ) : (
          <div className="col-span-3">
            <p>{t('noListingsFound')}</p>
          </div>
        )}
      </div>

      <TableFooter
        currentPage={params.page}
        itemsPerPage={params.perPage ?? 9}
        totalItems={data?.meta?.total ?? 0}
        prevPage={() => setParams({ ...params, page: params.page - 1 })}
        nextPage={() => setParams({ ...params, page: params.page + 1 })}
      />
    </div>
  );
};

export default CarListingsList;
