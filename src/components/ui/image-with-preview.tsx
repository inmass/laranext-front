import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageWithPreviewProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

const ImageWithPreview = ({ src, alt, width, height, className, ...props }: ImageWithPreviewProps) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const openPreview = () => setIsPreviewOpen(true);
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
  
    return (
      <>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`cursor-pointer ${className}`}
          onClick={openPreview}
          {...props}
        />
        {isPreviewOpen && (
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
                className="max-w-full max-h-full object-contain"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        )}
      </>
    );
  };
  
export default ImageWithPreview;