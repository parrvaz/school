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
};

const FormRadio: React.FC<RadioType> = (props) => {
  const { options, className, control, name, errors, rules } = props;

  return (
    <div className={`relative flex ${className}`}>
      <Controller
        {...{ control, name, rules }}
        render={({ field }): JSX.Element => (
          <>
            {options.map(({ title, value }) => (
              <div key={title} role="button" onClick={(): void => field.onChange(value)}>
                <label
                  className="flex cursor-pointer items-center gap-2 font-regular text-14"
                  htmlFor={title}
                >
                  <input
                    onChange={(): void => {}}
                    checked={field.value === value}
                    type="radio"
                    value={value}
                    id={title}
                  />
                  {title}
                </label>
              </div>
            ))}
          </>
        )}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormRadio;
