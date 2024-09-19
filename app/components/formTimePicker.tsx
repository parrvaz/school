import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';
import { getNestedError } from 'app/utils/common.util';

type TimePickerType = {
  control: Control<any>; // eslint-disable-line
  errors: any; // eslint-disable-line
  name: string;
  rtl?: boolean;
  className?: string;
  disabled?: boolean;
  onFocus?: () => void;
  rules?: any; // eslint-disable-line
};

const FormTimePicker: React.FC<TimePickerType> = (props) => {
  const { rtl, errors, name, control, rules, onFocus, disabled } = props;
  const { className } = props;

  const fieldError = getNestedError(errors, name);

  return (
    <Controller
      {...{ control, name, rules }}
      render={({ field: { onChange, value } }): JSX.Element => (
        <div
          className={`isCenter relative rounded-lg border text-black80 duration-500 hover:text-berry60 ${
            disabled
              ? 'hover:border-black30 border-black30 hover:border'
              : fieldError
                ? 'border-red70'
                : 'border-black30 hover:border-berry60 focus:border-berry60'
          }  ${className || 'w-full'}`}
        >
          <input
            {...{ value: value || '' }}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            type="time"
            min="00:00"
            max="23:59"
            onFocus={onFocus}
            className={`${rtl ? 'rtl' : 'ltr'} ${
              fieldError
                ? 'border-red70 focus:border focus:shadow-inputError'
                : 'focus:border  focus:border-berry60 focus:shadow-input'
            } pl-4 placeholder-rtl disabled:bg-black10 disabled:text-black40 h-10 w-full rounded-lg pr-4 font-regular text-14 text-black70 outline-none transition-shadow duration-500`}
          />

          <i className="icon-clock text-24 absolute right-3 bg-white top-1/2 transform -translate-y-1/2" />

          {handleError(fieldError)}
        </div>
      )}
    />
  );
};

export default FormTimePicker;
