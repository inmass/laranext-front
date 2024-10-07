import React, { forwardRef } from 'react';
import { getMakes, MakesParams } from '@/hooks/api/makes';
import Select, { emptyValue, SelectRef } from '@/components/layouts/select';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getMakeImage } from '@/lib/helpers';

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
    slug: string;
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
        fields: ['id', 'name', 'slug'],
        sort: { key: 'name', direction: 'asc' }
    };

    const { data, isLoading, isError } = getMakes(params);

    const generateLabel = (make: string, slug: string): React.ReactNode => {
        return (
            <div className='flex items-center gap-2'>
                <Image
                    src={getMakeImage(slug)}
                    alt={make}
                    width={30}
                    height={30}
                />
                <span>{make}</span>
            </div>
        )
    };

    const options: Option[] = data?.data?.map(({ id, name, slug }: Make) => ({ label: name, value: String(id), labelElement: generateLabel(name, slug) })) || [];

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