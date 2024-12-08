import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';

const format = {
  img: '.jpeg,.png,.jpg,.gif',
  excel: '.xlsx',
  pdf: '.pdf',
};

type FormUploadProps = {
  title: string;
  name: string;
  type?: string[];
  className?: string;
  isMultiple?: boolean;
  errors?: any; // eslint-disable-line
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormUpload: React.FC<FormUploadProps> = ({
  title,
  name,
  type = ['img'],
  control,
  rules,
  errors,
  className,
  isMultiple = false,
}) => {
  return (
    <div className={`${className} flex flex-col gap-4 relative w-full`}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }): JSX.Element => {
          const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            const selectedFiles = Array.from(event.target.files || []);
            if (isMultiple) {
              const updatedFiles = [...(field.value || []), ...selectedFiles]; // Allow multiple file uploads
              field.onChange(updatedFiles);
            } else field.onChange(selectedFiles[0] ? [selectedFiles[0]] : []); // Only allow single file upload
          };

          const handleDeleteFile = (index: number): void => {
            const updatedFiles = (field.value || []).filter((_: File, i: number) => i !== index);
            field.onChange(updatedFiles); // Update react-hook-form state
          };

          return (
            <div>
              <label>
                <span className="btn btn-primary btn-outline">{title}</span>
                <input
                  accept={type.map((k) => format[k]).join(',')}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {field.value?.length > 0 && (
                <div className="mt-2">
                  {field.value.map((file: File, index: number) => (
                    <div
                      key={file.name}
                      className="hover:bg-berry30 flex justify-between items-center duration-300 rounded-lg p-2"
                    >
                      <div>{file.name}</div>
                      <i
                        onClick={() => handleDeleteFile(index)}
                        className="icon-trash text-20 cursor-pointer hover:text-red70 duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />

      {handleError(errors?.[name])}
    </div>
  );
};

export default FormUpload;
