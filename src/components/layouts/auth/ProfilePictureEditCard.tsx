import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import CardLayout from '@/components/layouts/card-layout';
import Button from '@/components/button';
import { asset } from '@/lib/helpers';
import Image from 'next/image';
import { TrashIcon } from 'lucide-react';
import AlertDialog from '@/components/layouts/alert-dialog';
import { useProfile } from '@/hooks/api/profile';
import ClipLoader from 'react-spinners/ClipLoader';

const ProfilePictureEditCard = ({ userAvatar }: { userAvatar?: string }) => {
  const t = useTranslations('Dashboard.Profile.ProfilePictureEditCard');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateProfileAvatar, loading } = useProfile();
  const [avatar, setAvatar] = useState(userAvatar);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateProfileAvatar(file);
    }
  };

  const handleDelete = () => {
    updateProfileAvatar();
    fileInputRef.current!.value = '';
  };

  useEffect(() => {
    setAvatar(userAvatar);
  }, [userAvatar]);

  return (
    <CardLayout title={t('title')} description={t('description')}>
      <p className="text-sm text-gray-500 mb-4 md:mt-6">
        {t('fileRequirements')}
      </p>
      <div className="mb-4 flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full overflow-hidden border border-gray-300">
        {loading ? (
          <ClipLoader />
        ) : (
          <Image
            src={avatar ? avatar : asset('images/placeholder-user.webp')}
            width={100}
            height={100}
            alt={t('profileImageAlt')}
          />
        )}
      </div>
      <div className="flex space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Button className="!m-0" onClick={handleUploadClick}>
          {avatar ? t('changePicture') : t('uploadPicture')}
        </Button>

        <AlertDialog
          trigger={
            <Button className="bg-red-500 hover:bg-red-600">
              <TrashIcon className="w-4 h-4" />
            </Button>
          }
          title={t('deleteConfirmation.title')}
          description={t('deleteConfirmation.description')}
          cancelText={t('deleteConfirmation.cancelText')}
          actionText={t('deleteConfirmation.actionText')}
          onAction={handleDelete}
        />
      </div>
    </CardLayout>
  );
};

export default ProfilePictureEditCard;
