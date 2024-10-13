'use client';

import CarListingsList from '@/components/layouts/front-office/browse/car-listings-list';
import Filters from '@/components/layouts/front-office/browse/filters/filters';
import Loading from '@/components/loading';
import { CarListingsParams, getCarListings } from '@/hooks/api/car-listings';
import { useState } from 'react';

const Home = () => {
  const [params, setParams] = useState<CarListingsParams>({
    page: 1,
    perPage: 9,
    filters: {} as Record<string, string>,
    include: ['primaryImage', 'images', 'make', 'carModel'],
    aditionalParams: {
      browsing: 'true',
    } as Record<string, string>,
  });

  const { data, isLoading, isError, error } = getCarListings(params);

  return (
    <div className="md:grid md:grid-cols-4">
      <Filters
        className="md:col-span-1"
        params={params}
        setParams={setParams}
      />
      {isLoading ? (
        <div className="md:col-span-3">
          <Loading />
        </div>
      ) : (
        <CarListingsList
          data={data}
          params={params}
          setParams={setParams}
          className="md:col-span-3"
        />
      )}
    </div>
  );
};

export default Home;
