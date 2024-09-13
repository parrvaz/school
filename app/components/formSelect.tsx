import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { handleError } from 'app/utils/component.util';

type SelectType = {
  options: { value: string | number; label: string }[];
  errors?: any; // eslint-disable-line
  className?: string;
  placeholder?: string;
  name: string;
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormSelect: React.FC<SelectType> = (props) => {
  const { options, className, control, name, errors, rules, placeholder } = props;
  return (
    <div className={`relative ${className}`}>
      <Controller
        {...{ control, name, rules }}
        render={({ field }): JSX.Element => (
          <Select
            {...field}
            {...{ placeholder, options }}
            components={{ IndicatorSeparator: null }}
            styles={{
              control: (baseStyles) => ({ ...baseStyles, borderRadius: '8px', fontSize: 14 }),
            }}
          />
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormSelect;
