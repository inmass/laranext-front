import React, { useRef, useState } from 'react';
import CardLayout from '@/components/layouts/CardLayout';
import Button from '@/components/Button';
import { asset } from '@/lib/helpers';
import Image from 'next/image';
import { TrashIcon } from 'lucide-react';
import AlertDialog from '@/components/layouts/AlertDialog';

const ProfilePictureEditCard = ({ userAvatar }: { userAvatar?: string }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState(userAvatar);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Here you would typically upload the file to your server
            // For this example, we'll just use a local URL
            const localUrl = URL.createObjectURL(file);
            setAvatar(localUrl);
        }
    };

    const handleDelete = () => {
        setAvatar(undefined);
        // Here you would typically delete the file from your server
    };

    return (
        <CardLayout
            title="Profile Picture"
            description="Add a profile picture to make your account more recognizable."
        >
            <p className="text-sm text-gray-500 mb-4 md:mt-6">JPG, GIF or PNG. Max size of 800K</p>
            <div className="mb-4">
                <Image 
                    src={
                        avatar
                        ? asset(avatar)
                        : asset('images/placeholder-user.webp')
                    }
                    width={100}
                    height={100}
                    alt="Profile"
                    className="overflow-hidden rounded-full border border-gray-300"
                />
            </div>
            <div className="flex space-x-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <Button
                    className="!m-0"
                    onClick={handleUploadClick}
                >
                    Upload picture
                </Button>
                <AlertDialog
                    trigger={
                        <Button
                            className="bg-red-500 hover:bg-red-600"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    }
                    title="Are you absolutely sure?"
                    description="This action cannot be undone. This will permanently delete your profile picture."
                    cancelText="Cancel"
                    actionText="Yes, delete picture"
                    onAction={handleDelete}
                />
            </div>
        </CardLayout>
    );
}

export default ProfilePictureEditCard;