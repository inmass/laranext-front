import React, { useEffect, useState } from 'react';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Pen, Plus } from 'lucide-react';
import CarListingWizard, { UpdateCarListingFormData, mapCarListingForFormData } from './car-listing-wizard';
import { CarListingType } from '@/types/car-listing';

interface CarListingFormDialogProps {
    carListing?: CarListingType;
}

const CarListingFormDialog = ({ carListing }: CarListingFormDialogProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const trigger = (
        carListing ? (
            <Pen className="h-5 w-5 cursor-pointer text-blue-300" />
        ) : (
            <Button className="p-1 sm:px-4 sm:py-2">
                <Plus className="w-6 h-6 inline-block sm:mr-2" />
                <span className='hidden sm:inline'>Add New Listing</span>
            </Button>
        )      
    );

    const carListingData = carListing ? mapCarListingForFormData(carListing) : undefined;

    return (
        <Dialog
            trigger={trigger}
            title={carListing ? `Edit ${carListing.title}` : "Add New Car Listing"}
            description={carListing ? "Update the details of the car listing here." : "Enter the details of the new car listing here."}
            className="max-w-[600px]"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CarListingWizard onSubmitSuccess={handleClose} carListing={carListingData} />
        </Dialog>
    );
};

export default CarListingFormDialog;