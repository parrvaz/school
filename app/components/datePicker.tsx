import React from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { utils } from '@hassanmojab/react-modern-calendar-datepicker';
import { convertToDate, convertToDayValue } from 'app/utils/common.util';
import fa from 'app/lib/fa.json';

const AppDatePicker: React.FC<{
  value: string;
  onChange: (item: string) => void;
  placeholder?: string;
  error?: boolean;
}> = ({ value, onChange, placeholder, error }) => {
  const { getToday } = utils('fa');

  return (
    <div className="relative">
      <DatePicker
        locale="fa"
        value={convertToDayValue(value)}
        onChange={(e) => onChange(convertToDate(e))}
        shouldHighlightWeekends
        maximumDate={getToday()}
        inputPlaceholder={placeholder || fa.global.birthday}
        inputClassName={`${error ? '!border !border-red70' : '!border-black30 !hover:border-berry60 !focus:border-berry60'} w-full border placeholder-rtl !pr-11 rounded-lg !font-regular !px-4 !text-end !text-13 h-10`}
        wrapperClassName={`w-full rounded-lg`}
      />
      <i className="icon-calendar text-24 absolute right-3 top-1.5 z-[101]" />
    </div>
  );
};

export default AppDatePicker;
