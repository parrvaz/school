import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';
import ReactSelect from './select';
import { getNestedError } from 'app/utils/common.util';

type SelectType = {
  options: { value: string | number; label: string }[];
  errors?: any; // eslint-disable-line
  className?: string;
  placeholder?: string;
  name: string;
  isMulti?: boolean;
  onChange?: () => void;
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormSelect: React.FC<SelectType> = (props) => {
  const { options, className, control, name, errors, rules, placeholder, isMulti, onChange } =
    props;
  const fieldError = getNestedError(errors, name);
  return (
    <div className={`relative text-right ${className || 'w-full'}`}>
      <Controller
        {...{ control, name, rules }}
        render={({ field }): JSX.Element => (
          <ReactSelect
            {...field}
            onChange={(e) => {
              field.onChange(e);
              onChange?.();
            }}
            {...{ placeholder, options, isMulti }}
            error={!!fieldError}
          />
        )}
      />

      {handleError(fieldError)}
    </div>
  );
};

export default FormSelect;
