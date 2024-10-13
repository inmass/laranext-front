import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/button';
import { Pen, Plus } from 'lucide-react';
import CarListingWizard, {
  mapCarListingForFormData,
} from './car-listing-wizard';
import { CarListingType } from '@/types/car-listing';

interface CarListingFormDialogProps {
  carListing?: CarListingType;
}

const CarListingFormDialog = ({ carListing }: CarListingFormDialogProps) => {
  const t = useTranslations('Dashboard.CarListings.FormDialog');

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const trigger = carListing ? (
    <Pen className="h-5 w-5 cursor-pointer text-blue-300" />
  ) : (
    <Button className="p-1 sm:px-4 sm:py-2">
      <Plus className="w-6 h-6 inline-block sm:mr-2" />
      <span className="hidden sm:inline">{t('addNewListing')}</span>
    </Button>
  );

  const carListingData = carListing
    ? mapCarListingForFormData(carListing)
    : undefined;

  return (
    <Dialog
      trigger={trigger}
      title={
        carListing ? t('editTitle', { title: carListing.title }) : t('addTitle')
      }
      description={carListing ? t('editDescription') : t('addDescription')}
      className="max-w-[600px]"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CarListingWizard
        onSubmitSuccess={handleClose}
        carListing={carListingData}
      />
    </Dialog>
  );
};

export default CarListingFormDialog;
