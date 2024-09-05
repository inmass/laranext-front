import React from 'react';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Plus } from 'lucide-react';
import CarListingWizard from './new-car-listing-form';

const AddCarListingDialog = () => {

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
        >
            <CarListingWizard />
        </Dialog>
    );
};

export default AddCarListingDialog;