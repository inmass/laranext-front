import React, { forwardRef } from 'react';
import { getBodyStyles, BodyStylesParams } from '@/hooks/api/body-styles';
import Select, { SelectRef } from '@/components/layouts/select';
import { useTranslations } from 'next-intl';

interface BodyStyleSelectProps {
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

interface BodyStyle {
    id: number;
    name: string;
}

const BodyStyleSelect = forwardRef<SelectRef, BodyStyleSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {
    const t = useTranslations('Dashboard.CarListings.Wizard.steps.VehicleDetailsStep.BodyStyleSelect');

    const params: BodyStylesParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getBodyStyles(params);

    const options: Option[] = data?.map(({ id, name }: BodyStyle) => ({ label: name, value: String(id) })) || [];

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
            disabled={disabled}
            placeholder={t('placeholder')}
            name={name}
            searchable={false}
        />
    );
});

export default BodyStyleSelect;