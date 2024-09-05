import React, { forwardRef } from 'react';
import { getConditions, ConditionsParams } from '@/hooks/api/conditions';
import Select, { SelectRef } from '@/components/layouts/select';


interface ConditionSelectProps {
    value?: string;
    onChange?: (value: string|number) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

const ConditionSelect = forwardRef<SelectRef, ConditionSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {

    const params: ConditionsParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getConditions(params);

    return (
        <Select
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={data?.map(({ id, name }: any) => ({ label: name, value: String(id) })) || []}
            loading={isLoading}
            error={isError}
            className={className}
            disabled={disabled}
            placeholder="Select a condition"
            name={name}
            searchable={false}
        />
    );
});

export default ConditionSelect;