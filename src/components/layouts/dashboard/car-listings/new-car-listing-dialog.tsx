import React, { useState } from 'react';
import Dialog from '@/components/layouts/dialog';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface AddCarListingDialogProps {
    onAddListing: (formData: any) => void;
}

const addCarListingSchema = z.object({
    // make_id, car_model_id, body_style_id, condition_id, features are selected from dropdown/checkbox that get their values from the backend
    make_id: z.string().min(1, 'Make is required'),
    car_model_id: z.string().min(1, 'Car Model is required'),
    body_style_id: z.string().min(1, 'Body Style is required'),
    condition_id: z.string().min(1, 'Condition is required'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(1, 'Price is required'),
    original_price: z.number().nullable(),
    year: z.number().min(1, 'Year is required'),
    mileage: z.number().min(1, 'Mileage is required'),
    vin: z.string().min(1, 'VIN is required'),
    exterior_color: z.string().min(1, 'Exterior Color is required'),
    interior_color: z.string().min(1, 'Interior Color is required'),
    transmission: z.string().min(1, 'Transmission is required'),
    images: z.array(z.object({
        image: z.string().min(1, 'Image is required'),
        is_primary: z.boolean()
    })).min(1, 'At least one image is required')
});

type AddCarListingFormData = z.infer<typeof addCarListingSchema>;

const AddCarListingDialog = ({ onAddListing }: AddCarListingDialogProps) => {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        price: '',
        mileage: '',
        condition: 'used'
    });

    const { register, handleSubmit, formState: { errors } } = useForm<AddCarListingFormData>({
        resolver: zodResolver(addCarListingSchema),
        mode: 'onChange'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitForm = () => {
        onAddListing(formData);
    };

    const formContent = (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
                <div>
                <label htmlFor="title">Title</label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Car Title"
                />
                </div>
                <div>
                <label htmlFor="year">Year</label>
                <Input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Year"
                />
                </div>
                <div>
                <label htmlFor="price">Price</label>
                <Input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                />
                </div>
                <div>
                <label htmlFor="mileage">Mileage</label>
                <Input
                    type="number"
                    id="mileage"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    pattern="[0-9]*"
                    placeholder="Mileage"
                />
                </div>
                <div>
                <label htmlFor="condition">Condition</label>
                <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="certified">Certified Pre-Owned</option>
                </select>
                </div>
            </div>
        </form>
    );

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
            onAction={submitForm}
            actionText="Add Listing"
        >
            {formContent}
        </Dialog>
    );
};

export default AddCarListingDialog;