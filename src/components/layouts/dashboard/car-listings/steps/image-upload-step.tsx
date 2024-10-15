import React, { useCallback, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { X, Image as ImagePlusIcon, Star, StarOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/car-listing-wizard';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/helpers';
import Image from 'next/image';

interface ImageData {
  id?: number;
  image: File | string;
  is_primary: boolean;
}

const ImageUploadStep: React.FC = () => {
  const t = useTranslations(
    'Dashboard.CarListings.Wizard.steps.ImageUploadStep'
  );
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CarListingFormData>();
  const images = watch('images') || [];
  const removedImageIds = watch('removed_image_ids') || [];

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages: ImageData[] = acceptedFiles.map((file) => ({
        image: file,
        is_primary: false,
      }));

      if (!images.some((img) => img.is_primary)) {
        newImages[0].is_primary = true;
      }

      setValue('images', [...images, ...newImages], { shouldDirty: true });
    },
    [images, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];

    if (removedImage.id) {
      setValue('removed_image_ids', [...removedImageIds, removedImage.id]);
    }

    if (!newImages.some((img) => img.is_primary) && newImages.length > 0) {
      newImages[0].is_primary = true;
    }

    setValue('images', newImages, { shouldDirty: true });
  };

  const setPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index,
    }));
    setValue('images', newImages, { shouldDirty: true });
  };

  const getImageSrc = (image: File | string) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return asset(image);
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.image instanceof File) {
          URL.revokeObjectURL(getImageSrc(image.image));
        }
      });
    };
  }, [images]);

  return (
    <div className="space-y-4">
      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <div
            {...getRootProps()}
            className={cn(
              'p-4 rounded-md border border-input',
              isDragActive ? 'border-blue-500 bg-blue-50' : ''
            )}
          >
            <input {...getInputProps()} />
            <div className="text-muted-foreground text-sm flex items-center justify-center space-x-2">
              <ImagePlusIcon size={24} />
              {isDragActive ? (
                <p>{t('dropFilesHere')}</p>
              ) : (
                <p>{t('dragAndDropInstructions')}</p>
              )}
            </div>
          </div>
        )}
      />
      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {images.map((file: ImageData, index: number) => (
          <div
            key={
              file.id ||
              (file.image instanceof File ? file.image.name : file.image)
            }
            className="relative"
          >
            <Image
              src={getImageSrc(file.image)}
              alt={t('previewAlt', { index: index + 1 })}
              className="w-full h-32 w-auto object-cover rounded-md"
              width={100}
              height={100}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
              aria-label={t('removeImage')}
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent rounded-b-md">
              <button
                type="button"
                onClick={() => setPrimary(index)}
                className={cn(
                  'absolute bottom-0 left-0 rounded-full p-1 m-1 text-white',
                  file.is_primary ? 'bg-blue-500' : ''
                )}
                aria-label={
                  file.is_primary ? t('primaryImage') : t('setPrimaryImage')
                }
              >
                {file.is_primary ? <Star size={16} /> : <StarOff size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadStep;
