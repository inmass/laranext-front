'use client';

import Loading from "@/components/Loading";
import ImageWithPreview from "@/components/ui/image-with-preview";
import { getCarListing } from "@/hooks/api/car-listings";
import { useParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { asset, getMakeImage, translateConditionType, translateFeature, translateFeatureType, translateFuelType, translateTransmissionType } from '@/lib/helpers';
import Image from 'next/image';
import { Carousel } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import SectionDivider from '@/components/SectionDivider';
import { Button } from "@/components/ui/button";
import { FaCheckCircle, FaDashcube, FaEye, FaTimesCircle, FaWhatsapp } from "react-icons/fa";
import { getFeatures } from "@/hooks/api/features";
import { groupFeatures } from "@/lib/utils";
import { Check, Minus, X } from "lucide-react";
import { ReactNode } from "react";
import Dialog from "@/components/layouts/dialog";
import Link from "next/link";
import RelatedListings from '@/components/layouts/front-office/browse/related-listings';

const ListingPage = () => {
    const { slug } = useParams();
    const { data: carListing, isLoading, isError, error } = getCarListing(slug as string);
    const t = useTranslations('FrontOffice.CarListingView');
    const tFeatureTypes = useTranslations('General.featureTypes');
    const tFeatures = useTranslations('General.features');
    const tTransmissionTypes = useTranslations('General.transmissionTypes');
    const tFuelTypes = useTranslations('General.fuelTypes');
    const tConditionTypes = useTranslations('General.conditionTypes');

    const featuresParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name', 'feature_type_id'],
        include: ['featureType'],
    };
    const { data: features } = getFeatures(featuresParams);

    if (isLoading) return <Loading />;
    if (isError) return <div>{error.message}</div>;
    if (!carListing) return <div>{t('listingNotFound')}</div>;

    const groupedFeatures = groupFeatures(features?.data ?? []);

    return (
        <div className="container mx-auto px-4 md:px-10 py-10">
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
                <div className="relative">
                    <div className="gap-4 justify-center lg:flex lg:justify-between lg:items-start lg:gap-2">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <Image 
                                    src={getMakeImage(carListing.make?.slug ?? '')} 
                                    alt={carListing.make?.name ?? ''} 
                                    width={60} 
                                    height={40}
                                />
                                <h1 className="text-2xl font-bold">{carListing.title}</h1>
                            </div>
                            <p className="text-xl font-semibold mb-4">{carListing.price}€ <span className="text-muted-foreground text-sm">{t('askingPrice')}</span></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <DetailItem label={t('year')} value={carListing.year} />
                        <DetailItem label={t('mileage')} value={`${carListing.mileage} km`} />
                        <DetailItem label={t('transmission')} value={translateTransmissionType(carListing.transmission, tTransmissionTypes)} />
                        <DetailItem label={t('fuelType')} value={translateFuelType(carListing.fuel_type, tFuelTypes)} />
                        <DetailItem label={t('bodyStyle')} value={carListing.body_style?.name} />
                        <DetailItem label={t('condition')} value={translateConditionType(carListing.condition?.name, tConditionTypes)} />
                        <DetailItem label={t('originalPrice')} value={carListing.original_price && Number(carListing.original_price) > 0 ? carListing.original_price : '---'} />
                        <DetailItem label={t('exteriorColor')} value={(
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-full mt-2 mr-2 p-2 border-2 border-muted" style={{ backgroundColor: carListing.exterior_color }}></div>
                            </div>
                        )} />
                        <DetailItem label={t('interiorColor')} value={(
                            <div className="flex items-center">
                                <div className="w-7 h-7 rounded-full mt-2 mr-2 p-2 border-2 border-muted" style={{ backgroundColor: carListing.interior_color }}></div>
                            </div>
                        )} />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="overflow-hidden rounded-full bg-gray-100 w-12 h-12 flex items-center justify-center">
                            <Image
                                src={
                                    carListing.user?.avatar
                                    ? carListing.user.avatar
                                    : asset('images/placeholder-user.webp')
                                }
                                width={50}
                                height={50}
                                alt={carListing.user?.name || t('anonymousSeller')}
                            />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{t('seller')}</p>
                            <p className="font-medium">{carListing.user?.name || t('anonymousSeller')}</p>
                        </div>
                    </div>
                    <div className="sm:flex gap-2 mb-4">
                        <Dialog
                            description={t('viewNumberDescription')}
                            trigger={
                                <Button className="mb-2 mr-2 sm:mr-0">
                                    <FaEye className="mr-2 w-5 h-5" />
                                    {t('viewNumber')}
                                </Button>
                            }
                            children={
                                <div>
                                    <Link href={`tel:${carListing.user?.phone}`}>
                                        {carListing.user?.phone ?? '---'}
                                    </Link>
                                </div>
                            }
                        />
                        <Link href={`https://wa.me/${carListing.user?.phone}`} target="_blank">
                            <Button className="bg-[#25D366] text-white hover:bg-[#1fa950] rounded-full p-2">
                                <FaWhatsapp className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <SectionDivider dividerText={t('description')} />
            <div>
                <div dangerouslySetInnerHTML={{ __html: carListing.description }} />
            </div>
            <SectionDivider dividerText={t('features')} />
            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.values(groupedFeatures).map((group: any, index: any) => (
                        <div key={index}>
                            <h3 className="text-lg font-medium mb-2">{translateFeatureType(group.name, tFeatureTypes)}</h3>
                            <div className="flex flex-col flex-wrap gap-2">
                                {group.features.map((feature: any, index: any) => (
                                    <div key={index} className="text-sm font-medium flex items-center">
                                        {
                                            carListing.features?.some(f => f.id === feature.id) ?
                                            <Check className="mr-2 w-4 h-4 text-green-500" /> :
                                            <Minus className="mr-2 w-4 h-4 text-foreground" />
                                        }
                                        <p>{translateFeature(feature.name, tFeatures)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <RelatedListings listing={carListing} />
            {/* <SectionDivider dividerText={t('technicalDetails')} />
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailItem label={t('engine')} value={carListing.fuel_type} />
                    <DetailItem label={t('power')} value={`${carListing.power} hp`} />
                    <DetailItem label={t('acceleration')} value={`${carListing.acceleration} s (0-100 km/h)`} />
                    <DetailItem label={t('topSpeed')} value={`${carListing.top_speed} km/h`} />
                    <DetailItem label={t('fuelConsumption')} value={`${carListing.fuel_consumption} l/100km`} />
                    <DetailItem label={t('co2Emissions')} value={`${carListing.co2_emissions} g/km`} />
                </div>
            </div> */}
        </div>
    );
};

const DetailItem = ({ label, value }: { label: string, value: string | number | ReactNode | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        {
            // if value is react node
            typeof value === 'object' ? value :
            <p className="font-medium">{value}</p>
        }
    </div>
);

export default ListingPage;