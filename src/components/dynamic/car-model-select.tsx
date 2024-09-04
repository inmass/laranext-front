import React, { forwardRef, useMemo } from 'react';
import { getCarModels, CarModelsParams } from '@/hooks/api/car-models';
import Select, { SelectRef } from '@/components/layouts/select';

interface CarModelSelectProps {
    make_id?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

const CarModelSelect = forwardRef<SelectRef, CarModelSelectProps>(
    ({ make_id, value, onChange, onBlur, className, disabled, name }, ref) => {
    
    const queryParams: CarModelsParams = useMemo(() => ({
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' },
        filters: make_id ? { make_id } : {make_id: '0'}
    }), [make_id]);

    const { data, isLoading, isError } = getCarModels(queryParams);

    const options = useMemo(() => 
        data?.map(({ id, name }: any) => ({ label: name, value: String(id) })) || []
    , [data]);

    const handleChange = (selectedValue: string | number) => {
        onChange?.(String(selectedValue));
    };

    return (
        <Select
            ref={ref}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            options={options}
            loading={isLoading}
            error={isError}
            className={className}
            disabled={disabled || !make_id}
            placeholder={make_id ? "Select a car model" : "Select a make first"}
            name={name}
        />
    );
});

export default CarModelSelect;