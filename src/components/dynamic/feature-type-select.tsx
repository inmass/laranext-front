import React, { forwardRef } from 'react';
import { getFeatureTypes, FeatureTypesParams } from '@/hooks/api/feature-types';
import Select, { SelectRef } from '@/components/layouts/select';
import { useTranslations } from 'next-intl';

interface FeatureTypeSelectProps {
    value?: string;
    onChange?: (value: string, label: string) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

interface FeatureType {
    id: number;
    name: string;
}

interface Option {
    label: string;
    value: string;
}

const FeatureTypeSelect = forwardRef<SelectRef, FeatureTypeSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {
    const t = useTranslations('Dashboard.Features.FormDialog.FeatureTypeSelect');

    const params: FeatureTypesParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getFeatureTypes(params);
    const options: Option[] = data?.data?.map(({ id, name }: FeatureType) => ({ label: name, value: String(id) })) || [];

    const handleChange = (newValue: string) => {
        const selectedOption = options.find(option => option.value === newValue);
        if (selectedOption && onChange) {
            onChange(selectedOption.value, selectedOption.label);
        }
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
            disabled={disabled}
            placeholder={t('placeholder')}
            name={name}
        />
    );
});

FeatureTypeSelect.displayName = 'FeatureTypeSelect';
export default FeatureTypeSelect;