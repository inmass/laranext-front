'use client';

import Loading from "@/components/Loading";
import ImageWithPreview from "@/components/ui/image-with-preview";
import { getCarListing } from "@/hooks/api/car-listings";
import { useParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { getMakeImage } from '@/lib/helpers';
import Image from 'next/image';
import { Carousel } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import SectionDivider from '@/components/SectionDivider';

const ListingPage = () => {
    const { slug } = useParams();
    const { data: carListing, isLoading, isError, error } = getCarListing(slug as string);
    const t = useTranslations('FrontOffice.CarListingView');

    if (isLoading) return <Loading />;
    if (isError) return <div>{error.message}</div>;
    if (!carListing) return <div>{t('listingNotFound')}</div>;

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Carousel>
                        {carListing.images?.map((image, index) => (
                            <ImageWithPreview
                                key={index}
                                src={image.path}
                                alt={`${carListing.title} - Image ${index + 1}`}
                                width={1000}
                                height={200}
                                className="rounded-lg mx-auto"
                            />
                        ))}
                    </Carousel>
                </div>
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <Image 
                            src={getMakeImage(carListing.make?.name ?? '')} 
                            alt={carListing.make?.name ?? ''} 
                            width={60} 
                            height={40}
                        />
                        <h1 className="text-3xl font-bold">{carListing.title}</h1>
                    </div>
                    <p className="text-2xl font-semibold mb-4">{carListing.price}€ <span className="text-muted-foreground text-sm">{t('askingPrice')}</span></p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <DetailItem label={t('year')} value={carListing.year} />
                        <DetailItem label={t('mileage')} value={`${carListing.mileage} km`} />
                        <DetailItem label={t('transmission')} value={t(`transmissionTypes.${carListing.transmission}`)} />
                        <DetailItem label={t('fuelType')} value={t(`fuelTypes.${carListing.fuel_type}`)} />
                        <DetailItem label={t('bodyStyle')} value={carListing.body_style?.name} />
                        <DetailItem label={t('condition')} value={carListing.condition?.name} />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: carListing.description }} />
                </div>
            </div>
            <SectionDivider dividerText={t('features')} />
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {carListing.features?.map((feature, index) => (
                        <Badge key={index} variant="outline">
                            {feature.name}
                        </Badge>
                    ))}
                </div>
            </div>
            <SectionDivider dividerText={t('technicalDetails')} />
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailItem label={t('engine')} value={carListing.fuel_type} />
                    {/* <DetailItem label={t('power')} value={`${carListing.power} hp`} />
                    <DetailItem label={t('acceleration')} value={`${carListing.acceleration} s (0-100 km/h)`} />
                    <DetailItem label={t('topSpeed')} value={`${carListing.top_speed} km/h`} />
                    <DetailItem label={t('fuelConsumption')} value={`${carListing.fuel_consumption} l/100km`} />
                    <DetailItem label={t('co2Emissions')} value={`${carListing.co2_emissions} g/km`} /> */}
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

export default ListingPage;