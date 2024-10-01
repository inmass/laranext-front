import React, { forwardRef } from 'react';
import { getMakes, MakesParams } from '@/hooks/api/makes';
import Select, { emptyValue, SelectRef } from '@/components/layouts/select';
import { useTranslations } from 'next-intl';

interface MakeSelectProps {
    value?: string;
    onChange?: (value: string, label: string) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

interface Make {
    id: number;
    name: string;
}

interface Option {
    label: string;
    value: string;
}

const MakeSelect = forwardRef<SelectRef, MakeSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {
    const t = useTranslations('Dashboard.CarListings.Wizard.steps.BasicInfoStep.MakeSelect');

    const params: MakesParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getMakes(params);
    const options: Option[] = data?.data?.map(({ id, name }: Make) => ({ label: name, value: String(id) })) || [];

    const handleChange = (newValue: string) => {
        const selectedOption = options.find(option => option.value === newValue);
        if (selectedOption && onChange) {
            onChange(selectedOption.value, selectedOption.label);
        } else if (newValue === emptyValue) {
            onChange?.('', '');
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

MakeSelect.displayName = 'MakeSelect';
export default MakeSelect;