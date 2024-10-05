import ImageWithPreview from '@/components/ui/image-with-preview';
import { CarListingsParams, CarListingsResponse } from '@/hooks/api/car-listings';
import { getMakeImage } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import TableFooter from '@/components/layouts/table/table-footer';
import { useTranslations } from 'next-intl';
import AppRoutes from '@/constants/app-routes';
interface CarListingsListProps {
  data?: CarListingsResponse;
  params: CarListingsParams;
  setParams: (params: CarListingsParams) => void;
  className?: string;
}

const CarListingsList = ({ data, params, setParams, className }: CarListingsListProps) => {

  const carListings = data?.data;
  const t = useTranslations('FrontOffice.CarListings');
  // const t = (key: string) => key;

  return (
    <div className={cn(
      'p-4 md:pl-8 pt-16',
      className
    )}>
      <h2 className="text-3xl font-bold mb-4">{t('carListings')}</h2>
      <div className={cn('products grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-12')}>
        {
          carListings && carListings.length > 0 ? 
          (carListings.map((carListing) => (
            <div className="bg-muted/40 rounded-lg border border-border col-span-1 hover:border-border/50 transition-all duration-300">
              <ImageWithPreview
                asBackground={true}
                src={carListing.primary_image?.path ?? ''}
                alt={carListing.title}
                width={300}
                height={300}
                className="rounded-t-lg h-[150px]"
              />
              <Link href={AppRoutes.frontOffice.listing(carListing.slug)}>
                <div className='bg-muted/40 rounded-b-lg hover:scale-[1.01] hover:rounded-b-lg transition-all duration-300'>
                  <div className="p-4">

                    <div className="flex items-center gap-2 mb-4 h-6">
                      <Image 
                        src={getMakeImage(carListing.make?.name ?? '')} 
                        alt={carListing.make?.name ?? ''} 
                        width={40} 
                        height={30}
                      />
                      <span className="text-xs font-medium">{carListing.car_model?.name}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">{carListing.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm flex-wrap">
                      <span className="">{carListing.year}</span>·
                      <span className="">{carListing.transmission}</span>·
                      <span className="">{carListing.fuel_type}</span>·
                      <span className="">{carListing.mileage}</span>
                    </div>
                  </div>
                  <div className="rounded-b-lg p-2 px-4 bg-muted-foreground/15">
                    <p className="text-muted-foreground">{carListing.price}€ <span className="text-muted-foreground/70 text-xs">{t('askingPrice')}</span></p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <p>{t('noListingsFound')}</p>
          </div>
        )
      }
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
