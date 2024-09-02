import React from 'react';
import { getBodyStyles } from '@/hooks/api/body-styles';
import SearchableSelect from '@/components/layouts/searchable-select';

interface BodyStyleSelectProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
}

const BodyStyleSelect: React.FC<BodyStyleSelectProps> = ({ value, onChange, className, disabled }) => {
    const { data, isLoading, isError } = getBodyStyles({
        page: 1,
        noPagination: true,
        fields: ['id', 'name'],
        sort: { key: 'name', direction: 'asc' }
    });

    return (
        <SearchableSelect
            value={value}
            onChange={onChange}
            options={data?.map(({ id, name }: any) => ({ label: name, value: id })) || []}
            loading={isLoading}
            error={isError}
            className={className}
            disabled={disabled}
            placeholder="Select a body style"
        />
    );
}

export default BodyStyleSelect;