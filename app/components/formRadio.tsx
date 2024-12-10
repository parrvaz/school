import React from 'react';
import { Control, Controller } from 'react-hook-form';
import clsx from 'clsx';
import { handleError } from 'app/utils/component.util';

type RadioType = {
  options: { value: string | number; label: string }[];
  errors?: any; // eslint-disable-line
  className?: string;
  name: string;
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
  onChange?: (value: string | number) => void;
};

const FormRadio: React.FC<RadioType> = (props) => {
  const { options, className, control, name, errors, rules, onChange } = props;

  return (
    <div className={`relative flex ${className}`}>
      <Controller
        {...{ control, name, rules }}
        render={({ field }): JSX.Element => (
          <div className="join">
            {options.map(({ label, value }) => (
              <label
                key={value}
                className={clsx('join-item btn btn-sm', field.value === value ? 'btn-primary' : '')}
              >
                <input
                  type="radio"
                  value={value}
                  checked={field.value === value}
                  onChange={() => (field.onChange(value), onChange?.(value))}
                  className="hidden"
                />
                {label}
              </label>
            ))}
          </div>
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormRadio;
