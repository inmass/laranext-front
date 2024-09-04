import React, { forwardRef } from 'react';
import { getMakes } from '@/hooks/api/makes';
import Select, { SelectRef } from '@/components/layouts/select';


interface MakeSelectProps {
    value?: string;
    onChange?: (value: string|number) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    name?: string;
}

const MakeSelect = forwardRef<SelectRef, MakeSelectProps>(({ value, onChange, onBlur, className, disabled, name }, ref) => {
    const { data, isLoading, isError } = getMakes({
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    });

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
        />
    );
});

export default MakeSelect;