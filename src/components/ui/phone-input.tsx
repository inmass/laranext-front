import * as React from 'react';
import { forwardRef } from 'react';
import ReactPhoneInput, {
  PhoneInputProps as ReactPhoneInputProps,
} from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { cn } from '@/lib/utils';

export interface PhoneInputProps
  extends Omit<ReactPhoneInputProps, 'onChange'> {
  onChange?: (value: string) => void;
  className?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <ReactPhoneInput
        country={'ma'}
        disableDropdown={true}
        inputClass={cn('flex w-full', className)}
        onChange={(value) => onChange?.(value)}
        {...props}
        inputProps={{
          ref: ref,
          className: cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className
          ),
          maxLength: 16,
          ...props.inputProps,
        }}
        buttonStyle={{
          backgroundColor: 'hsl(var(--border))',
          border: 'none',
          borderRight: '1px solid',
          borderColor: 'hsl(var(--border))',
        }}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
