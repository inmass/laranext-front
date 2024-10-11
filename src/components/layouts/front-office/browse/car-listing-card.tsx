import ImageWithPreview from "@/components/ui/image-with-preview";
import AppRoutes from "@/constants/app-routes";
import { CarListingType } from "@/types/car-listing";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getMakeImage } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { LucideMessageCircleWarning } from "lucide-react";

interface CarListingCardProps {
    carListing: CarListingType;
    className?: string;
}

const CarListingCard: React.FC<CarListingCardProps> = ({ carListing, className }) => {
  const t = useTranslations('FrontOffice.CarListings');
  return (
    <div key={carListing.id} className={cn("bg-muted/40 rounded-lg border border-border col-span-1 hover:border-border/50 transition-all duration-300 flex flex-col relative", className)}>
        {carListing.is_sold && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold z-2 flex items-center justify-center">
            <LucideMessageCircleWarning className="w-4 h-4 mr-1" />
            <span className="text-xs font-semibold">{t('sold')}</span>
          </div>
        )}
        <ImageWithPreview
            asBackground={true}
            src={carListing.primary_image?.path ?? ''}
            alt={carListing.title}
            width={300}
            height={300}
            className="rounded-t-lg h-[150px]"
        />
        <Link href={AppRoutes.frontOffice.listing(carListing.slug)} className="flex-grow flex flex-col">
            <div className='bg-muted/40 rounded-b-lg hover:scale-[1.01] hover:rounded-b-lg transition-all duration-300 flex flex-col flex-grow'>
                <div className="p-4 flex-grow">
                    <div className="flex items-center gap-2 mb-4 h-6">
                        {carListing.make?.slug && (
                        <Image 
                            src={getMakeImage(carListing.make.slug ?? '')} 
                            alt={carListing.make.name ?? ''} 
                            width={40} 
                            height={30}
                        />
                        )}
                        <span className="text-xs font-medium">{carListing.car_model?.name}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">{carListing.title}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm flex-wrap mt-2">
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
  );
};

export default CarListingCard;
