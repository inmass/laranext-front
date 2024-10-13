import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface ImageWithPreviewProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  asBackground?: boolean;
}

const ImageWithPreview = ({
  src,
  alt,
  width,
  height,
  className,
  asBackground = false,
  ...props
}: ImageWithPreviewProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // const openPreview = () => setIsPreviewOpen(true);
  const openPreview = () => {
    setIsPreviewOpen(true);
  };
  const closePreview = useCallback(() => setIsPreviewOpen(false), []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }
    };

    if (isPreviewOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isPreviewOpen, closePreview]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closePreview();
    }
  };

  const PreviewPortal = () => {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
        onClick={handleOverlayClick}
      >
        <div className="relative max-w-3xl max-h-3xl">
          <button
            onClick={closePreview}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <Image
            src={src}
            alt={alt}
            className="object-contain max-w-full max-h-[700px]"
            width={1000}
            height={1000}
          />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {asBackground ? (
        <div
          className={cn('cursor-pointer bg-cover bg-center', className)}
          style={{ backgroundImage: `url(${src})` }}
          onClick={openPreview}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`cursor-pointer ${className}`}
          onClick={openPreview}
          {...props}
        />
      )}
      {isPreviewOpen && <PreviewPortal />}
    </>
  );
};

export default ImageWithPreview;
