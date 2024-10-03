import Button from '@/components/Button';
import ImageWithPreview from '@/components/ui/image-with-preview';
import { getMakeImage } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { CarListingType } from '@/types/car-listing';
import Image from 'next/image';
import Link from 'next/link';
interface CarListingsListProps {
  carListings?: CarListingType[];
  className?: string;
}

const CarListingsList = ({ carListings, className }: CarListingsListProps) => {

  return (
    <div className={cn(
      'p-4 pl-8 pt-16',
      className
    )}>
      <h2 className="text-3xl font-bold mb-4">Car Listings</h2>
      <div className={cn('products grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-12')}>
        {
          carListings && carListings.length > 0 ? 
          (carListings.map((carListing) => (
            <div className="bg-card rounded-lg border border-border col-span-1 hover:border-border/50 transition-all duration-300">
              <ImageWithPreview
                asBackground={true}
                src={carListing.primary_image?.path ?? ''}
                alt={carListing.title}
                width={300}
                height={300}
                className="rounded-t-lg h-[150px]"
              />
              <Link href='#'>
                <div className='bg-card rounded-b-lg hover:scale-[1.01] hover:rounded-b-lg transition-all duration-300'>
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
                  <div className="rounded-b-lg p-2 px-4 bg-muted/60">
                    <p className="text-muted-foreground">{carListing.price}€ <span className="text-muted-foreground/50 text-xs">Asking Price</span></p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <p>No listings found :(</p>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default CarListingsList;
