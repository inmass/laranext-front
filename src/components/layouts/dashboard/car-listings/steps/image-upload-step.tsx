import React, { useCallback, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { X, Image as ImagePlusIcon, Star, StarOff } from 'lucide-react';
import { CarListingFormData } from '@/components/layouts/dashboard/car-listings/new-car-listing-form';
import { cn } from '@/lib/utils';
import { asset } from '@/lib/helpers';

interface ImageData {
  image: File;
  is_primary: boolean;
}

const ImageUploadStep: React.FC = () => {
  const { control, setValue, watch, formState:  {errors} } = useFormContext<CarListingFormData>();
  const images = watch('images') || [];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ImageData[] = acceptedFiles.map((file) => ({
      image: file,
      is_primary: false
    }));

    if (!images.some(img => img.is_primary)) {
      newImages[0].is_primary = true;
    }

    setValue('images', [...images, ...newImages]);

  }, [images, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/*': []}
  });

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);

    if (!newImages.some(img => img.is_primary) && newImages.length > 0) {
      newImages[0].is_primary = true;
    }

    setValue('images', newImages);
  };

  const setPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index
    }));
    setValue('images', newImages);
  };

  useEffect(() => {
    return () => images.forEach(image => URL.revokeObjectURL(asset(image.image)));
  }, [images]);

  return (
    <div className="space-y-4">
      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <div {...getRootProps()} className={cn(
            'p-4 rounded-md border border-input',
            isDragActive ? 'border-blue-500 bg-blue-50' : ''
          )}>
            <input {...getInputProps()} />
            <div className="text-muted-foreground text-sm flex items-center justify-center space-x-2">
              <ImagePlusIcon size={24} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>
        )}
      />
      {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
      <div className="grid grid-cols-3 gap-4">
        {images.map((file: ImageData, index: number) => (
          <div key={file.image.name} className="relative">
            <img src={asset(file.image)} alt={`preview ${index}`} className="w-full h-32 object-cover rounded-md" />
            <button
              type='button'
              onClick={() => removeImage(index)} 
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
            >
              <X size={16} />
            </button>
            <div className='absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent rounded-b-md' >
              <button 
                type='button'
                onClick={() => setPrimary(index)}
                className={cn(
                  'absolute bottom-0 left-0 rounded-full p-1 m-1 text-white',
                  file.is_primary ? 'bg-blue-500' : ''
                )}
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