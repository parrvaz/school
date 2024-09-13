import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';
import ReactSelect from './select';

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
          <ReactSelect {...field} {...{ placeholder, options }} />
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormSelect;
