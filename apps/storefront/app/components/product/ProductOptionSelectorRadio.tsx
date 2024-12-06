import { Label, Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type { FC } from 'react';

export interface ProductOptionSelectorProps {
  option: {
    title: string;
    id: string;
    values: { value: string; label: string; disabled?: boolean }[];
  };
  onChange?: (name: string, value: string) => void;
  value?: string;
}

export const ProductOptionSelectorRadio: FC<ProductOptionSelectorProps> = ({ option, onChange, value }) => {
  const handleChange = (name: string, value: string) => {
    if (onChange) onChange(name, value);
  };

  const filteredValues: { value: string; label?: string; disabled?: boolean }[] = option.values.filter(
    (productOptionValue, index, self) => self.findIndex((item) => item.value === productOptionValue.value) === index,
  );

  return (
    <RadioGroup
      name={`options.${option.id}`}
      value={value}
      onChange={(changedValue) => handleChange(option.id, changedValue)}
    >
      <div className="grid grid-cols-1 gap-2">
        {filteredValues.map((optionValue, valueIndex) => (
          <Radio
            key={valueIndex}
            value={optionValue.value}
            disabled={optionValue.disabled}
            className={({ checked, disabled }) =>
              clsx(
                'group',
                checked ? 'ring-primary-300 ring-1 bg-highlight' : 'bg-white border-primary-300',
                'active:ring-primary-300 relative col-span-1 flex h-full cursor-pointer flex-col justify-between rounded-lg border px-4 py-2 font-bold shadow-sm hover:bg-highlight/40 focus:outline-none',
                disabled ? 'opacity-50' : '',
              )
            }
          >
            {({ checked }) => (
              <Label as="div" className="flex items-center">
                <div className="flex-1">
                  <span className={checked ? 'text-primary-800' : ''}>{optionValue.label}</span>
                </div>
                {optionValue.disabled && <span className="text-xs text-gray-500">&nbsp;(not available)</span>}
                {checked && <CheckCircleIcon className="text-primary-600 h-5 w-5" aria-hidden="true" />}
              </Label>
            )}
          </Radio>
        ))}
      </div>
    </RadioGroup>
  );
};
