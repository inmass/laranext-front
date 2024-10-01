import React, { forwardRef } from 'react';
import { getConditions, ConditionsParams } from '@/hooks/api/conditions';
import Select, { emptyValue, SelectRef } from '@/components/layouts/select';
import { useTranslations } from 'next-intl';

interface ConditionSelectProps {
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

interface Condition {
    id: number;
    name: string;
}

const ConditionSelect = forwardRef<SelectRef, ConditionSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {
    const t = useTranslations('Dashboard.CarListings.Wizard.steps.VehicleDetailsStep.ConditionSelect');

    const params: ConditionsParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getConditions(params);

    const options: Option[] = data?.data?.map(({ id, name }: Condition) => ({ label: name, value: String(id) })) || [];

    const handleChange = (selectedValue: string) => {
        const selectedOption = options.find(option => option.value === selectedValue);
        if (selectedOption && onChange) {
            onChange(selectedOption.value, selectedOption.label);
        } else if (selectedValue === emptyValue) {
            onChange?.('', '');
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

export default ConditionSelect;