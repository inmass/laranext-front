import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import Image from 'next/image';

interface CarouselProps {
    children: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> = ({ children }) => {
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? children.length - 1 : prevIndex - 1
        );
    };

    const next = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === children.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {children.map((child, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            {child}
                        </div>
                        ))}
                    </div>
                </div>
                {children.length > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-1/2 left-2 transform -translate-y-1/2"
                            onClick={prev}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                            onClick={next}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </div>
            {children.length > 1 && (
                <div className="flex mt-4 space-x-2 overflow-x-auto items-center">
                    {children.map((child: React.ReactNode, index: number) => {
                        const childElement = React.isValidElement(child) ? child : null;
                        return (
                            <Button
                                variant="ghost"
                                size="icon"
                                key={index}
                                className={`w-10 h-10 flex-shrink-0 overflow-hidden rounded-lg ${
                                    index === currentIndex ? 'w-12 h-12' : ''
                                }`}
                                onClick={() => setCurrentIndex(index)}
                                >
                                {childElement && childElement.props.src && (
                                    <Image 
                                    src={childElement.props.src}
                                    alt={childElement.props.alt || ''}
                                    width={60}
                                    height={40}
                                    className="w-full h-full object-cover"
                                    />
                                )}
                            </Button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};