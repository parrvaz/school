import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';
import Checkbox from './checkbox';

type CheckboxType = {
  errors?: any; // eslint-disable-line
  className?: string;
  name: string;
  label: string;
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormCheckbox: React.FC<CheckboxType> = (props) => {
  const { className, label, control, name, errors, rules } = props;

  return (
    <div className={`relative flex ${className}`}>
      <Controller
        {...{ control, name, rules }}
        render={({ field }): JSX.Element => (
          <Checkbox checked={field.value} onChange={(e) => field.onChange(e)} label={label} />
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormCheckbox;
