import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import toast from 'react-hot-toast';
import DatePicker, { Day, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import React from 'react';
import fa from 'app/lib/fa.json';
import { convertToDate, convertToDayValue, getFiscalYear } from 'app/utils/common.util';

const GroupDatePicker: React.FC<{
  values: { startDate: string; endDate: string };
  className?: string;
  disableFuture?: boolean;
  onChange: (value: { startDate: string; endDate: string }) => void;
}> = ({ className, disableFuture, values, onChange }) => {
  const { getToday, isBeforeDate } = utils('fa');

  return (
    <div
      className={`relative bg-white items-center border gap-1 px-2 flex rounded-lg !border-black30 h-10 !hover:border-berry60 !focus:border-berry60 ${className}`}
    >
      <i className="icon-calendar mr-1 text-24" />
      <div className="text-12 shrink-0 text-black70 font-regular">{fa.global.fromDate}</div>
      <DatePicker
        locale="fa"
        value={convertToDayValue(values?.startDate)}
        onChange={(e) => {
          e && values?.endDate && !isBeforeDate(e, convertToDayValue(values?.endDate) as Day)
            ? toast.error(fa.global.rules.dateError)
            : onChange({ ...values, startDate: convertToDate(e) });
        }}
        shouldHighlightWeekends
        minimumDate={disableFuture ? undefined : getFiscalYear(getToday())?.start}
        maximumDate={disableFuture ? getToday() : getFiscalYear(getToday())?.end}
        inputPlaceholder="_/ _/ __ "
        inputClassName="w-full !border-none !font-regular !text-end !text-13"
        wrapperClassName={`w-full rounded-lg`}
      />
      <div className="text-12 shrink-0 text-black70 font-regular border-r border-r-black30 pr-2">
        {fa.global.toDate}
      </div>
      <DatePicker
        locale="fa"
        value={convertToDayValue(values?.endDate)}
        onChange={(e) => {
          e && values?.endDate && !isBeforeDate(convertToDayValue(values?.startDate) as Day, e)
            ? toast.error(fa.global.rules.dateError)
            : onChange({ ...values, endDate: convertToDate(e) });
        }}
        shouldHighlightWeekends
        minimumDate={disableFuture ? undefined : getFiscalYear(getToday())?.start}
        maximumDate={disableFuture ? getToday() : getFiscalYear(getToday())?.end}
        inputPlaceholder="_/ _/ __ "
        inputClassName="w-full !border-none !font-regular !text-end !text-13"
        wrapperClassName={`w-full rounded-lg`}
      />
    </div>
  );
};

export default GroupDatePicker;
