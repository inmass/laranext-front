'use client';

import CarListingsList from '@/components/layouts/front-office/browse/car-listings-list';
import Filters from '@/components/layouts/front-office/browse/filters';
import Hero from '@/components/layouts/front-office/home/hero';
import LoginLinks from '@/components/LoginLinks';
import { CarListingsParams, getCarListings } from '@/hooks/api/car-listings';
import Image from 'next/image';
import { useState } from 'react';

const Home = () => {

  const [params, setParams] = useState<CarListingsParams>({
    page: 1,
    perPage: 8,
    // sort: null as { key: string; direction: 'asc' | 'desc' } | null,
    sort: { key: 'created_at', direction: 'desc' } as { key: string; direction: 'asc' | 'desc' } | null,
    filters: {} as Record<string, string>,
    include: ['primaryImage', 'images', 'make', 'carModel'],
  });

  const { data, isLoading, isError, error } = getCarListings(params);

  return (
    <div className="md:grid md:grid-cols-4">
      <Filters className="md:col-span-1" params={params} setParams={setParams} />
      <CarListingsList carListings={data?.data} className="md:col-span-3" />
    </div>
  );
};

export default Home;
