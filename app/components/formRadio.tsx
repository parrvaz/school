import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';

type RadioType = {
  options: { value: string | number; title: string }[];
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
            {options.map(({ title, value }) => (
              <input
                key={value}
                type="radio"
                className="join-item btn btn-sm"
                value={value}
                checked={field.value === value}
                onChange={() => (field.onChange(value), onChange?.(value))}
                aria-label={title}
              />
            ))}
          </div>
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormRadio;
