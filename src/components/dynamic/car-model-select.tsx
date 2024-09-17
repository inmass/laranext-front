import React, { forwardRef, useMemo } from 'react';
import { getCarModels, CarModelsParams } from '@/hooks/api/car-models';
import Select, { SelectRef } from '@/components/layouts/select';
import { useTranslations } from 'next-intl';

interface CarModelSelectProps {
    make_id?: string;
    value?: string;
    onChange?: (value: string, label: string) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

interface Option {
    label: string;
    value: string;
}

interface CarModel {
    id: number;
    name: string;
}

const CarModelSelect = forwardRef<SelectRef, CarModelSelectProps>(
    ({ make_id, value, onChange, onBlur, className, disabled, name }, ref) => {
    const t = useTranslations('Dashboard.CarListings.Wizard.steps.BasicInfoStep.CarModelSelect');
    
    const queryParams: CarModelsParams = useMemo(() => ({
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' },
        filters: make_id ? { make_id } : {make_id: '0'}
    }), [make_id]);

    const { data, isLoading, isError } = getCarModels(queryParams);

    const options: Option[] = useMemo(() => 
        data?.data?.map(({ id, name }: CarModel) => ({ label: name, value: String(id) })) || []
    , [data]);

    const handleChange = (selectedValue: string) => {
        const selectedOption = options.find(option => option.value === selectedValue);
        if (selectedOption && onChange) {
            onChange(selectedOption.value, selectedOption.label);
        }
    }

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
            placeholder={make_id ? t('placeholderWithMake') : t('placeholderNoMake')}
            name={name}
        />
    );
});

export default CarModelSelect;