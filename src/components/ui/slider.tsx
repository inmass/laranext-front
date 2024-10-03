import * as React from 'react';
import { cn } from '@/lib/utils';
import * as SliderPrimitive from '@radix-ui/react-slider';

export interface RangeSliderProps extends Omit<SliderPrimitive.SliderProps, 'value'> {
  className?: string;
  value: [number, number];
}

const RangeSlider = React.forwardRef<HTMLSpanElement, RangeSliderProps>(
  ({ className, value, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      min={props.min}
      max={props.max}
      value={value}
      onValueChange={props.onValueChange}
      step={props.step || 1}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-3 w-3 rounded-full border-1 border-primary bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
      />
      <SliderPrimitive.Thumb
        className="block h-3 w-3 rounded-full border-1 border-primary bg-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50"
      />
    </SliderPrimitive.Root>
  )
);

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;
