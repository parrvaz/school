import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';
import AppDatePicker from './datePicker';

type DatePikerType = {
  errors?: any; // eslint-disable-line
  className?: string;
  placeholder?: string;
  name: string;
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormDatePiker: React.FC<DatePikerType> = (props) => {
  const { className, control, name, errors, rules, placeholder } = props;
  return (
    <div className={`relative ${className}`}>
      <Controller
        {...{ control, name, rules }}
        render={({ field }): JSX.Element => (
          <AppDatePicker {...field} placeholder={placeholder} error={!!errors?.[name]} />
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormDatePiker;
