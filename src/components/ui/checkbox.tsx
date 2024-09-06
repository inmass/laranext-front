import * as React from 'react';

import { cn } from '@/lib/utils';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="inline-flex items-center">
        <label className="flex items-center cursor-pointer relative" htmlFor={props.id}>
          <input
            type="checkbox"
            className={cn(
              'peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800',
              className
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
              stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"></path>
            </svg>
          </span>
        </label>
        <label className="cursor-pointer ml-2 text-sm" htmlFor={props.id}>
          {label}
        </label>
      </div>
    );
  }
);

CheckBox.displayName = 'CheckBox';

export { CheckBox };
