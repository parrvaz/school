import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';
import { faNumber, getNestedError } from 'app/utils/common.util';

type InputType = {
  control: Control<any>; // eslint-disable-line
  errors: any; // eslint-disable-line
  name: string;
  rtl?: boolean;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onFocus?: () => void;
  rules?: any; // eslint-disable-line
};

const FormInput: React.FC<InputType> = (props) => {
  const { rtl, errors, name, type, control, textarea, rules, onFocus, disabled } = props;
  const { className, placeholder } = props;
  const [showPassword, setShowPassword] = useState(false);

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
          {!textarea ? (
            <input
              {...{ value: value || '' }}
              disabled={disabled}
              onChange={(e) => onChange(faNumber(e.target.value, true))}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              placeholder={placeholder}
              onFocus={onFocus}
              className={`${rtl ? 'rtl' : 'ltr'} ${
                fieldError
                  ? 'border-red70 focus:border focus:shadow-inputError'
                  : 'focus:border  focus:border-berry60 focus:shadow-input'
              } ${
                type === 'password' ? 'pl-10' : 'pl-4'
              } placeholder-rtl disabled:bg-black10 disabled:text-black40 h-10 w-full rounded-lg pr-4 font-regular text-13 text-black70 outline-none transition-shadow duration-500`}
            />
          ) : (
            <textarea
              {...{ value, onFocus, placeholder }}
              onChange={(e) => onChange(faNumber(e.target.value, true))}
              className={`${
                fieldError
                  ? 'border-red70 focus:border focus:shadow-inputError'
                  : 'focus:border  focus:border-berry60 focus:shadow-input'
              } h-20 w-full rounded-lg p-3 font-regular text-13 text-black70 outline-none transition-shadow duration-500`}
            />
          )}

          {type === 'password' && (
            <span
              onClick={(): void => setShowPassword((prev) => !prev)}
              className={`icon-${
                !showPassword ? 'eye' : 'eye-slash'
              } absolute left-3 cursor-pointer text-20 text-black60`}
            />
          )}
          {handleError(fieldError)}
        </div>
      )}
    />
  );
};

export default FormInput;
