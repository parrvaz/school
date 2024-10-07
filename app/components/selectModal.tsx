import React, { memo, useState } from 'react';
import Modal from 'app/components/modal';
import { SelectOptionType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import Checkbox from 'app/components/checkbox';
import Button from 'app/components/button';
import { faNumber } from 'app/utils/common.util';
import { handleError } from 'app/utils/component.util';

const SelectModal: React.FC<{
  options: SelectOptionType[];
  title: string;
  className?: string;
  name: string;
  setValue;
  register;
  errors;
}> = ({ options, title, name, setValue, register, errors, className }) => {
  const [selectedId, setSelectedId] = useState<(number | string)[]>([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const allSelected = options.every((options) => selectedId.includes(options.value));
  const someSelected =
    options.some((options) => selectedId.includes(options.value)) && !allSelected;

  const handleSelectAll = (): void => {
    if (allSelected) {
      // Uncheck all
      const remainingSelected = selectedId.filter(
        (id) => !options.some((option) => option.value === id)
      );
      setSelectedId(remainingSelected);
    } else {
      // Select all
      const newSelected = [
        ...selectedId,
        ...options
          .filter((option) => !selectedId.includes(option.value))
          .map((option) => option.value),
      ];
      setSelectedId(newSelected);
    }
  };

  const handleSubmit = (): void => {
    setValue(name, selectedId, { shouldValidate: true });
    setOpen(false);
  };

  return (
    <>
      <div className={`${className} relative`}>
        <div
          onClick={() => setOpen(true)}
          className={`${errors[name] ? 'border-red70' : 'border-berry10'} h-10 bg-white text-14 flex items-center border rounded-md p-2 text-black70 cursor-pointer`}
        >
          {!selectedId.length
            ? title
            : selectedId.length < 4
              ? options
                  .filter((k) => selectedId.includes(k.value))
                  .map((k) => k.label)
                  .join(', ')
              : `${faNumber(selectedId.length)} ${fa.global.person}`}
        </div>
        {handleError(errors[name])}
      </div>
      <Modal
        className="min-w-[44rem] flex flex-col"
        open={open}
        setOpen={() => setOpen(false)}
        id={name}
      >
        <div className="text-center font-bold text-16 text-berry100">{title}</div>
        {options.length ? (
          <div className="border-b border-b-black20 flex justify-between pb-2 mb-2 mt-5">
            <Checkbox
              className="w-fit"
              label={fa.global.selectAll}
              checked={allSelected}
              indeterminate={someSelected}
              onChange={handleSelectAll}
            />
            <input
              className="border border-berry20 py-2 w-56 px-3 rounded-lg"
              value={searchValue}
              placeholder={fa.global.search}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        ) : (
          <div className="mt-8">{fa.global.noData}</div>
        )}
        <div className="grid grid-cols-4 ">
          {options
            .filter((k) => k.label.includes(searchValue))
            .map((k) => (
              <Checkbox
                className="w-fit"
                key={k.value}
                checked={selectedId.includes(k.value)}
                label={k.label}
                onChange={(check) =>
                  setSelectedId((prev) =>
                    check ? [...prev, k.value] : prev.filter((id) => id !== k.value)
                  )
                }
              />
            ))}
        </div>

        <div className="flex justify-end mt-5">
          <Button onClick={handleSubmit} type="button" className="btn btn-primary w-44">
            {options.length ? fa.global.submit : fa.global.return}
          </Button>
        </div>
      </Modal>

      <input
        type="hidden"
        {...register(name, {
          required: true,
        })}
      />
    </>
  );
};

export default memo(SelectModal);
