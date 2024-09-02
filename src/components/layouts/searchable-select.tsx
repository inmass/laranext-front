import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { Check, ChevronsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClipLoader from '@/components/clip-loader';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  loading = false,
  error = false,
}) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`}>
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-background text-left shadow-sm">
            <Combobox.Input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              displayValue={(val: string) => options.find(option => option.value === val)?.label || ''}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              aria-label={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsDown
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background p-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-input">
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  className={({ active }) =>
                    cn(
                      'relative cursor-default select-none px-2 py-1.5 pl-8 pr-4 rounded-md',
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
                        {option.label}
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
        </div>
      </Combobox>
      {loading && (
        <div className="p-4 mt-2 text-sm text-muted-foreground flex items-center justify-center">
          <ClipLoader /></div>
      )}
      {error && (
        <div className="mt-2 text-sm text-destructive">Error loading options</div>
      )}
    </div>
  );
};

export default SearchableSelect;