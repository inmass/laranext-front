import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Combobox } from '@headlessui/react';
import { Check, ChevronsDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClipLoader from '@/components/clip-loader';
import { Button } from '../ui/button';

interface Option {
  value: string;
  label: string;
  labelImage?: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  name?: string;
  searchable?: boolean;
}

export interface SelectRef {
  focus: () => void;
  blur: () => void;
}

export const emptyValue = 'empty';

const Select = forwardRef<SelectRef, SelectProps>(({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  loading = false,
  error = false,
  name,
  searchable = true
}, ref) => {
  const [selectedOption, setSelectedOption] = useState<string>(value ?? '');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable && query !== ''
    ? options.filter((option) =>
        option.label
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )
    : options;

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchable) {
      setQuery(event.target.value);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    onChange?.(emptyValue);
    setSelectedOption('');
    closeDropdown();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    onChange?.(value ?? '');
    setSelectedOption(value ?? '');
  }, [value]);

  // useEffect(() => {
  //   // if selected option is not in options, set it to empty
  //   if (selectedOption && options.length && !options.find(option => option.value === selectedOption)) {
  //     onChange?.(emptyValue);
  //     setSelectedOption('');
  //   }
  // }, [options]);

  const selectedOptionData = options.find(option => option.value === selectedOption);

  return (
    <div className={'relative'} ref={containerRef}>
      <Combobox 
        value={selectedOption ?? ''} 
        onChange={(newValue) => {
          onChange?.(newValue);
          setSelectedOption(newValue);
          closeDropdown();
        }} 
        disabled={disabled}
      >
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-md bg-background text-left">
                {searchable ? (
                  <div className="flex items-center">
                    {selectedOptionData?.labelImage && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        {selectedOptionData.labelImage}
                      </div>
                    )}
                    <Combobox.Input
                      ref={inputRef}
                      className={cn(
                        'flex h-10 w-full rounded-md border border-input focus:border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                        selectedOptionData?.labelImage && 'pl-12',
                        className
                      )}
                      displayValue={(val: string) => options.find(option => option.value === val)?.label || ''}
                      onChange={handleInputChange}
                      onBlur={onBlur}
                      placeholder={placeholder}
                      aria-label={placeholder}
                      name={name}
                      onClick={() => setIsOpen(true)}
                      autoComplete="off"
                    />
                  </div>
                ) : (
                  <Combobox.Button 
                    className={cn(
                      'flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 truncate',
                      className,
                      !selectedOptionData && 'text-muted-foreground'
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <div className="flex items-center">
                      {selectedOptionData?.labelImage && (
                        <div className="mr-2">{selectedOptionData.labelImage}</div>
                      )}
                      <span>{selectedOptionData?.label || placeholder}</span>
                    </div>
                  </Combobox.Button>
                )}
                {
                  selectedOption && selectedOption !== '' ? (
                    <Button variant="ghost" className="text-gray-400 absolute inset-y-0 right-0 flex items-center pr-2 hover:bg-transparent" onClick={handleClear}>
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2 my-2 bg-background border-r border-input text-muted-foreground">
                      <ChevronsDown
                          className="h-4 w-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  )
                }
                
              </div>
              {(open || isOpen) && (
                <Combobox.Options static className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background p-1 text-sm focus:outline-none border border-input z-[1]">
                  {loading && (
                    <div className="p-4 mt-2 text-sm text-muted-foreground flex items-center justify-center">
                      <ClipLoader />
                    </div>
                  )}
                  {error && (
                    <div className="mt-2 text-sm text-destructive">Error loading options</div>
                  )}
                  {filteredOptions.length === 0 ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <Combobox.Option
                        key={option.value}
                        className={({ active }) =>
                          cn(
                            'relative cursor-pointer select-none px-2 py-1.5 pl-8 pr-4 rounded-md',
                            active ? 'bg-accent text-accent-foreground' : 'text-foreground'
                          )
                        }
                        value={option.value}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.labelImage ? (
                                <div className='flex items-center gap-2'>
                                  {option.labelImage}
                                  <span>{option.label}</span>
                                </div>
                              ) : option.label}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 rounded-md ${
                                  active ? 'bg-accent text-accent-foreground' : 'text-accent-foreground'
                                }`}
                              >
                                <Check className="h-4 w-4" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              )}
            </div>
          </>
        )}
      </Combobox>
    </div>
  );
});

export default Select;