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
  isDisabled?: boolean;
  hasSelectAll?: boolean;
  onChange?: () => void;
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormSelect: React.FC<SelectType> = (props) => {
  const { className, control, name, errors, rules, onChange, ...rest } = props;
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
            {...rest}
            error={!!fieldError}
          />
        )}
      />

      {handleError(fieldError)}
    </div>
  );
};

export default FormSelect;
