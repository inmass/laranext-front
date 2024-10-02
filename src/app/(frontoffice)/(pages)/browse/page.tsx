'use client';

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
    include: ['primaryImage', 'images', 'features', 'user'],
  });

  const { data, isLoading, isError, error } = getCarListings(params);

  return (
    <div className="md:grid md:grid-cols-4 md:gap-4">
      <Filters className="md:col-span-1" params={params} setParams={setParams} />
      <div className="products flex-1 md:col-span-3 p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            {data?.data.map((carListing) => (
              <div className="aspect-square">
                <Image src={carListing.primary_image?.path ?? ''} alt={carListing.title} width={300} height={300} />
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">{carListing.title}</h3>
                  <p className="text-gray-500">{carListing.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
