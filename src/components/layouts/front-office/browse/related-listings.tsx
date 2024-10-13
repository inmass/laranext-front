import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CarListingType } from '@/types/car-listing';
import { useTranslations } from 'next-intl';
import { getCarListings } from '@/hooks/api/car-listings';
import CarListingCard from './car-listing-card';
import { cn } from '@/lib/utils';
import SectionDivider from '@/components/section-divider';

interface RelatedListingsProps {
  listing: CarListingType;
}

const RelatedListings: React.FC<RelatedListingsProps> = ({ listing }) => {

  const t = useTranslations('FrontOffice.CarListingView');
  const { data: relatedListings } = getCarListings({
    perPage: 3,
    page: 1,
    filters: {
        'id_ne': String(listing.id),
        'make_id': String(listing.make_id),
        'is_sold': '0',
    },
    fields: ['id', 'title', 'slug', 'make_id', 'year', 'transmission', 'fuel_type', 'mileage', 'car_model_id', 'price', 'is_sold'],
    include: ['primaryImage', 'make', 'carModel'],
    aditionalParams: {
        'browsing': 'true',
    } as Record<string, string>,
  });

  return (
    <>
        {
            relatedListings?.data && relatedListings?.data.length > 0 ? (
                <div className='mb-20 mt-20 bg-foreground/5 p-10 rounded-lg'>
                    {/* <SectionDivider /> */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-center mb-8">{t('relatedListings')}</h2>
                        <div className={cn(
                            'grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3 md:w-[90%]',
                        )}>
                            {relatedListings?.data.map((listing) => (
                                <CarListingCard carListing={listing} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='mb-40 mt-20'>
                </div>
            )
        }
    </>
  );
};

export default RelatedListings;