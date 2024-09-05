import React, { forwardRef } from 'react';
import { getBodyStyles, BodyStylesParams } from '@/hooks/api/body-styles';
import Select, { SelectRef } from '@/components/layouts/select';


interface BodyStyleSelectProps {
    value?: string;
    onChange?: (value: string|number) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

const BodyStyleSelect = forwardRef<SelectRef, BodyStyleSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {

    const params: BodyStylesParams = {
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getBodyStyles(params);

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
            placeholder="Select a body style"
            name={name}
            searchable={false}
        />
    );
});

export default BodyStyleSelect;