import React, { useState } from 'react';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Plus } from 'lucide-react';
import CarListingWizard from './new-car-listing-form';

const AddCarListingDialog = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const trigger = (
        <Button>
            <Plus className="w-6 h-6 mr-2 inline-block" />
            Add New Listing
        </Button>
    );

    return (
        <Dialog
            trigger={trigger}
            title="Add New Car Listing"
            description="Enter the details of the new car listing here."
            className="max-w-[600px]"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <CarListingWizard onSubmitSuccess={handleClose}/>
        </Dialog>
    );
};

export default AddCarListingDialog;